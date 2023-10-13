import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import storage from '../../Storage/storage'
import { useForm } from '../../hooks/useForm';
import { useMutation } from 'react-query';
import { createAdministrativo } from '../../api/administrativosApi';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import { useQueryClient } from 'react-query';
import Loading from '../../components/Loading';
import Banner from '../../components/Banner';

const CreateAdm = () => {

    const queryClient = useQueryClient();

    const go = useNavigate();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);

    const addAdministrativo = useMutation({
        mutationFn: createAdministrativo,
        onSuccess: (response) => {
            if (response.status === true) {
                queryClient.invalidateQueries('administrativos')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/administrativos')
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serError(response.errors);
                setLoading(false);
            }
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const [formValues, handleInputChange] = useForm({
        nombres: '',
        paterno: '',
        materno: '',
        cargo: '',
        usuario: '',
        estado: 1,
        ci: '',
        ext_ci: 'LP',
        email: '',
        user_id: storage.get('authUser').id
    });

    const handleAdd = (e) => {
        setLoading(true);
        e.preventDefault();
        const administrativo = formValues;
        addAdministrativo.mutate(administrativo);
    };

    const { nombres, paterno, materno, cargo, usuario, ci, ext_ci, email } = formValues;

    return (
        <>
            { loading === true ? <Loading /> : '' }
            <Banner text="CREACIÓN DE NUEVOS ADMINISTRATIVOS" />
            <form onSubmit={handleAdd}>
                <div className="form-group py-2">
                    <label>Nombres</label>
                    <input type="text" className="form-control" placeholder="Escriba Nombre Completo"
                        name="nombres" value={nombres} onChange={handleInputChange} />
                    {error.nombres
                        ? <ValidationError text={error.nombres} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Apellido Paterno</label>
                        <input type="text" className="form-control" placeholder="Escriba apellido paterno"
                            name="paterno" value={paterno} onChange={handleInputChange} />
                        {error.paterno
                            ? <ValidationError text={error.paterno} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <label>Apellido Materno</label>
                        <input type="text" className="form-control" placeholder="Escriba apellido materno"
                            name="materno" value={materno} onChange={handleInputChange} />
                        {error.materno
                            ? <ValidationError text={error.materno} />
                            : ''}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Cedula de Identidad</label>
                        <input type="text" className="form-control" placeholder="Escriba la cedula de identidad"
                            name="ci" value={ci} onChange={handleInputChange} />
                        {error.length
                            ? <ValidationError text={error.ci} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <div className="form-group">
                            <label>Expedido</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                name="ext_ci" value={ext_ci} onChange={handleInputChange}>
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
                        name="email" value={email} onChange={handleInputChange} />
                    {error.email
                        ? <ValidationError text={error.email} />
                        : ''}
                </div>

                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Cargo</label>
                        <input type="text" className="form-control" placeholder="Escriba apellido paterno"
                            name="cargo" value={cargo} onChange={handleInputChange} />
                        {error.length
                            ? <ValidationError text={error.cargo} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <div className="form-group">
                            <label>Nivel de Acceso</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                name="usuario" value={usuario} onChange={handleInputChange}>
                                <option>Tecnico en registro</option>
                                <option>Tecnico Operativo</option>
                                <option>Jefe de Unidad</option>
                                <option>Ejecutivo</option>
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

export default CreateAdm
