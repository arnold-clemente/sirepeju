import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getAdministrativo } from '../../api/administrativosApi';
import Loading from '../../components/Loading';
import { useNavigate, Link } from 'react-router-dom'
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import { useQueryClient } from 'react-query';
import { updateAdministrativo } from '../../api/administrativosApi';
import { useMutation } from 'react-query';
import Banner from '../../components/Banner';

const EditAdm = () => {

    const { adminId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [admin, setAdmin] = useState({
        nombres: '',
        paterno: '',
        materno: '',
        cargo: '',
        usuario: '',
        ci: '',
        ext_ci: '',
        id: 0,
        email: ''
    });

    const { isLoading, data: registro, isError, error } = useQuery({
        queryFn: () => getAdministrativo(adminId),
        onSuccess: async (response) => {
            await setAdmin(response);
        }
    })

    if (!registro) {
        return <Navigate to='/administrativos' />
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
                go('/administrativos')
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
        setLoading(true);
        e.preventDefault();
        updateAdm.mutate(admin);
    };

    if (isLoading) return <Loading />
    else if (isError) return <div>Error: {error.message}</div>
    if (admin.id === 0) return <Loading />
    else
        return (
            <>
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
                            {errorval.length
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
                            <input type="text" className="form-control" placeholder="Escriba apellido paterno"
                                name="cargo" value={admin.cargo} onChange={handleInputChange} />
                            {errorval.length
                                ? <ValidationError text={errorval.cargo} />
                                : ''}
                        </div>
                        <div className="form-group col-md-6 py-2">
                            <div className="form-group">
                                <label>Nivel de Acceso</label>
                                <select className="form-control" id="exampleFormControlSelect1"
                                    name="usuario" value={admin.usuario} onChange={handleInputChange}>
                                    <option value="superadmin">Administrador</option>
                                    <option value="ejecutivo">Ejecutivo</option>
                                    <option value="tecnico">Tecnico</option>
                                    <option value="especialista">Especialista</option>
                                    <option value="operativo">Operativo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <Link to='/administrativos' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                    <button type="submit" className="btn btn-primary my-4 mx-4">Enviar</button>
                </form>
            </>
        )
}

export default EditAdm
