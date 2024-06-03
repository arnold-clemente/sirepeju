import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';
import { showRol } from 'api/rolesApi';

import Spiner from 'components/Spiner';
import ModalDiv from 'components/ModalDiv';

const ShowRol = ({ role, modal, close }) => {

    const { rol_id } = role;

    const [cargando, setCargando] = useState(true);
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

        if (rol_id != 0) {
            setCargando(true)
            getRolUser.mutate(rol_id);
        }

    }, [rol_id])

    const getRolUser = useMutation({
        mutationFn: showRol,
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
            setFiltro(6);
            setCargando(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        }
    });

    // filtar permisos 
    const filteredPermisos = () => {
        if (filtro == 0) {
            return permisos;
        } else {
            const filtered = permisos.filter(permiso => {
                if (permiso.type == filtro) {
                    return permiso;
                }
            });
            return filtered
        }
    }


    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'Nombre: ' + rol.name}>
                {cargando
                    ? <Spiner />
                    : <div>
                        <div className='container_roles'>
                            <div className='container_roles_buttons'>
                                <button onClick={() => setFiltro(6)}
                                    className={filtro === 6 ? 'btn btn-primary' : 'btn btn-danger'}>
                                    <span className='fs-6'>Vistas</span>
                                </button>
                                <button onClick={() => setFiltro(1)}
                                    className={filtro === 1 ? 'btn btn-primary' : 'btn btn-danger'}>
                                    <span className='fs-6'>Usuarios</span>
                                </button>
                                <button onClick={() => setFiltro(2)}
                                    className={filtro === 2 ? 'btn btn-primary' : 'btn btn-danger'}>
                                    <span className='fs-6'>Reserva Nombre</span>
                                </button>
                                <button onClick={() => setFiltro(3)}
                                    className={filtro === 3 ? 'btn btn-primary' : 'btn btn-danger'}>
                                    <span className='fs-6'>Otorgacion</span>
                                </button>
                                <button onClick={() => setFiltro(4)}
                                    className={filtro === 4 ? 'btn btn-primary' : 'btn btn-danger'}>
                                    <span className='fs-6'>Adecuacion</span>
                                </button>
                                <button onClick={() => setFiltro(5)}
                                    className={filtro === 5 ? 'btn btn-primary' : 'btn btn-danger'}>
                                    <span className='fs-6'>Registro Adecuacion</span>
                                </button>
                            </div>
                            <div className='row container_roles_checks'>
                                {filteredPermisos().length == 0
                                    ? <div className='d-flex align-items-center justify-content-center gap-1 text-center'>
                                        <i className="fa-solid fa-x text-danger"></i>
                                        <span className='text-danger text-bold'>Ningun permiso Asignado de Esta Categoria</span>
                                    </div>
                                    : filteredPermisos().map((permiso) => {
                                        return (
                                            <div className='col-md-6' key={permiso.id}>
                                                <div className='d-flex align-items-center gap-1'>
                                                    <i className="fa-solid fa-check text-primary"></i>
                                                    <span>{permiso.description}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='container-fluid d-flex justify-content-end py-2'>
                            <button type='button' className='btn btn-danger' onClick={close}>
                                <i className='fa-solid fa-x mx-2'></i>
                                <span>Cerrar</span>
                            </button>
                        </div>

                    </div>
                }
            </ModalDiv>
        </>
    )
}

export default ShowRol
