import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getRol, updateRol } from '../../api/rolesApi';

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import Banner from '../../components/Banner';

const EditRol = () => {
    const { rolId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();
    const [errorval, serErrorval] = useState({});
    const [errorper, setErrorper] = useState('');
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [filtro, setFiltro] = useState(0);
    const [rol, setRol] = useState({
        id: 0,
        name: "",
        guard_name: "",
        created_at: "",
        updated_at: "",
    });

    useEffect(() => {
        if (rolId != 0) {
            getRolUser.mutate(rolId);
        }
    }, [rolId])

    const getRolUser = useMutation({
        mutationFn: getRol,
        onSuccess: (response) => {
            const aux = {
                id: response.rol.id,
                name: response.rol.name,
                guard_name: response.rol.name,
                created_at: response.rol.created_at,
                updated_at: response.rol.updated_at,
            }
            setRol({ ...rol, ...aux });
            setPermisos(response.permisos)
            setPermissions(response.permissions)
            setFiltro(6);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        }
    });

    const { name, guard_name, created_at, updated_at } = rol;

    // filtar permisos 
    const filteredPermisos = () => {
        if (filtro == 0) {
            return permissions;
        } else {
            const filtered = permissions.filter(permission => {
                if (permission.type == filtro) {
                    return permission;
                }
            });
            return filtered
        }
    }

    if (rolId == 0) {
        return <Navigate to='/roles' />
    }

    const handleInputChange = ({ target }) => {
        setRol({
            ...rol,
            [target.name]: target.value
        });
    };

    const handleCheckedChange = ({ target }) => {
        const permiso_id = target.value;
        if (target.checked) {
            const aux = permisos;
            aux.push(Number(permiso_id));
            setPermisos([...aux])
        } else {
            permisos.map((permiso, index) => {
                if (permiso == Number(permiso_id)) {
                    const auxiliar = permisos;
                    auxiliar.splice(index, 1);
                    setPermisos([...auxiliar])
                }
            })
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (permisos.length == 0) {
            setErrorper('Ningun permiso Asignado')
            setTimeout(() => {
                setErrorper('')
            }, 3000)
        } else {
            Swal.fire({
                title: "Está seguro?",
                text: "Verifique los datos antes de enviar.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#009186",
                confirmButtonText: "Sí, estoy seguro!",
                cancelButtonText: "Cancelar",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    setLoading(true);
                    const enviar = {
                        id: rol.id,
                        name: rol.name,
                        permisos: permisos,
                    }
                    actualizarRol.mutate(enviar);
                }
            });
        }

    };

    const actualizarRol = useMutation({
        mutationFn: updateRol,
        onSuccess: (response) => {
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('roles')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/roles')
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErrorval(response.errors);
                setLoading(false);
            }
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        }
    });

    if (rol.id === 0) return <Spiner />
    else
        return (
            <>
                {loading === true ? <Loading /> : ''}
                <Banner text={"ACTUALIZAR ROL " + rol.name} />
                <form onSubmit={handleUpdate} >
                    <div className="form-group py-2">
                        <label>Nombre de Rol</label>
                        <input type="text" className="form-control" placeholder="Escriba Nombre del Rol"
                            name="name" value={name} onChange={handleInputChange} />
                        {errorval.name
                            ? <ValidationError text={errorval.name} />
                            : ''}
                    </div>

                    <h4 className='fs-6 py-2 text-danger'>SELECCIONAR LOS ROLES </h4>
                    <div className='container_roles'>
                        <div className='container_roles_buttons'>
                            <button type='button' onClick={() => setFiltro(6)}
                                className={filtro === 6 ? 'btn btn-primary' : 'btn btn-danger'}>
                                <span className='fs-6'>Vistas</span>
                            </button>
                            <button type='button' onClick={() => setFiltro(1)}
                                className={filtro === 1 ? 'btn btn-primary' : 'btn btn-danger'}>
                                <span className='fs-6'>Usuarios</span>
                            </button>
                            <button type='button' onClick={() => setFiltro(2)}
                                className={filtro === 2 ? 'btn btn-primary' : 'btn btn-danger'}>
                                <span className='fs-6'>Reserva Nombre</span>
                            </button>
                            <button type='button' onClick={() => setFiltro(3)}
                                className={filtro === 3 ? 'btn btn-primary' : 'btn btn-danger'}>
                                <span className='fs-6'>Otorgacion</span>
                            </button>
                            <button type='button' onClick={() => setFiltro(4)}
                                className={filtro === 4 ? 'btn btn-primary' : 'btn btn-danger'}>
                                <span className='fs-6'>Adecuacion</span>
                            </button>
                            <button type='button' onClick={() => setFiltro(5)}
                                className={filtro === 5 ? 'btn btn-primary' : 'btn btn-danger'}>
                                <span className='fs-6'>Registro Adecuacion</span>
                            </button>
                        </div>
                        <div className='row container_roles_checks'>
                            {filteredPermisos().map((permission) => {
                                return (
                                    <div className="form-check col-md-6" key={permission.id}>
                                        {permisos.includes(permission.id)
                                            ? <input
                                                id={permission.name}
                                                className="form-check-input"
                                                type="checkbox"
                                                value={permission.id}
                                                checked={true}
                                                onChange={handleCheckedChange}
                                            />
                                            : <input
                                                id={permission.name}
                                                className="form-check-input"
                                                type="checkbox"
                                                value={permission.id}
                                                checked={false}
                                                onChange={handleCheckedChange}

                                            />
                                        }
                                        <label className="form-check-label" htmlFor={permission.name}>
                                            {permission.description}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {errorper.length == 0
                        ? null
                        : <div className="alert alert-danger mt-4 mb-2" role="alert">
                            <span>{errorper}</span>
                        </div>
                    }
                    <div className='d-flex justify-content-between'>
                        <Link to='/roles' className="btn btn-danger my-4">Cancelar</Link>
                        <button type="submit" className="btn btn-primary my-4 mx-4">Actualizar</button>
                    </div>
                </form>
            </>
        )
}

export default EditRol
