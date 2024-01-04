import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getEditAdministrativo, updateAdministrativo } from '../../api/administrativosApi';

import storage from '../../Storage/storage'
import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import Banner from '../../components/Banner';

const EditAdm = () => {

    const { adminId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [admin, setAdmin] = useState({
        id: 0,
        nombres: '',
        paterno: '',
        materno: '',
        cargo: '',
        usuario: '',
        ci: '',
        ext_ci: '',
        email: '',
        auth_id: storage.get('authUser').id,
    });
    const [roles, setRoles] = useState([])

    const { id, nombres, paterno, materno, cargo, usuario, ci, ext_ci, email, auth_id } = admin;

    useEffect(() => {
        if (id == 0 && roles.length == 0) {
            getAdministrativo.mutate(adminId)
        }

    }, [id])

    const getAdministrativo = useMutation({
        mutationFn: getEditAdministrativo,
        onSuccess: (response) => {
            setAdmin({ ...admin, ...response.administrativo });
            setRoles(response.roles);;
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });



    // const { isLoading, data: registro, isError, error } = useQuery({
    //     queryFn: () => getEditAdministrativo(adminId),
    //     onSuccess: async (response) => {
    //         await setAdmin({ ...admin, ...response });
    //     }
    // })

    if (adminId == 0) {
        return <Navigate to='/admin/administrativos' />
    }

    const [errorval, serErrorval] = useState({});

    const [loading, setLoading] = useState(false);

    const updateAdm = useMutation({
        mutationFn: updateAdministrativo,
        onSuccess: (response) => {
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('administrativos')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/admin/administrativos')
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErrorval(response.errors);
                setLoading(false);
            }
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        }
    });

    const handleInputChange = ({ target }) => {
        setAdmin({
            ...admin,
            [target.name]: target.value
        });
    };


    const handleUpdate = (e) => {
        e.preventDefault();
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
                updateAdm.mutate(admin);
            }

        });
    };


    return (
        <>
            {id == 0 && roles.length == 0
                ? <Spiner />
                : <>
                    {loading === true ? <Loading /> : ''}
                    <Banner text="ACTUALIZACIÓN DE ADMINISTRATIVO" />
                    <form onSubmit={handleUpdate} >
                        <div className="form-group py-2">
                            <label>Nombres</label>
                            <input type="text" className="form-control" placeholder="Escriba Nombre Completo"
                                name="nombres" value={admin.nombres} onChange={handleInputChange} />
                            {errorval.nombres
                                ? <ValidationError text={errorval.nombres} />
                                : ''}
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6 py-2">
                                <label>Apellido Paterno</label>
                                <input type="text" className="form-control" placeholder="Escriba apellido paterno"
                                    name="paterno" value={admin.paterno} onChange={handleInputChange} />
                                {errorval.paterno
                                    ? <ValidationError text={errorval.paterno} />
                                    : ''}
                            </div>
                            <div className="form-group col-md-6 py-2">
                                <label>Apellido Materno</label>
                                <input type="text" className="form-control" placeholder="Escriba apellido materno"
                                    name="materno" value={admin.materno} onChange={handleInputChange} />
                                {errorval.materno
                                    ? <ValidationError text={errorval.materno} />
                                    : ''}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6 py-2">
                                <label>Cedula de Identidad</label>
                                <input type="text" className="form-control" placeholder="Escriba la cedula de identidad"
                                    name="ci" value={admin.ci} onChange={handleInputChange} />
                                {errorval.ci
                                    ? <ValidationError text={errorval.ci} />
                                    : ''}
                            </div>
                            <div className="form-group col-md-6 py-2">
                                <div className="form-group">
                                    <label>Expedido</label>
                                    <select className="form-control" id="exampleFormControlSelect1"
                                        name="ext_ci" value={admin.ext_ci} onChange={handleInputChange}>
                                        <option value="LP">LA PAZ</option>
                                        <option value="OR">ORURO</option>
                                        <option value="PT">POTOSI</option>
                                        <option value="CB">COCHABAMBA</option>
                                        <option value="SC">SANTA CRUZ</option>
                                        <option value="BN">BENI</option>
                                        <option value="PA">PANDO</option>
                                        <option value="TJ">TARIJA</option>
                                        <option value="CH">CHUQUISACA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group py-2">
                            <label>Correo Electronico</label>
                            <input type="email" className="form-control" placeholder="correo electronico de referencia"
                                name="email" value={admin.email} onChange={handleInputChange} />
                            {errorval.email
                                ? <ValidationError text={errorval.email} />
                                : ''}
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6 py-2">
                                <label>Cargo</label>
                                <input type="text" className="form-control" placeholder="Escriba el cargo"
                                    name="cargo" value={admin.cargo} onChange={handleInputChange} />
                                {errorval.cargo
                                    ? <ValidationError text={errorval.cargo} />
                                    : ''}
                            </div>
                            <div className="form-group col-md-6 py-2">
                                <div className="form-group">
                                    <label>Nivel de Acceso</label>
                                    <select className="form-control" id="exampleFormControlSelect1"
                                        name="usuario" value={admin.usuario} onChange={handleInputChange}>
                                        {roles.map((role) => {
                                            return (
                                                <option key={role.id} value={role.name}>{role.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Link to='/admin/administrativos' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                        <button type="submit" className="btn btn-primary my-4 mx-4">Enviar</button>
                    </form>
                </>

            }
        </>
    )
}

export default EditAdm
