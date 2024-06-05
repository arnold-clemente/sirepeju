import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { createGobernacion } from 'api/gobernacionApi';

import storage from 'storage/Storage';
import { useForm } from 'hooks/useForm';
import Banner from 'components/Banner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';

const CreateGob = () => {

    const queryClient = useQueryClient();

    const go = useNavigate();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);

    const addGobernacion = useMutation({
        mutationFn: createGobernacion,
        onSuccess: (response) => {
            console.log(response)
            if (response.status === true) {
                queryClient.invalidateQueries('gobernacions')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/admin/usuario-gobernaciones')
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
        ci: '',
        ext_ci: '',
        email: '',
        institucion_id: 4,
        user_id: storage.get('authUser').id
    });

    const handleAdd = (e) => {
        e.preventDefault();
        const gobernacion = formValues;
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
                addGobernacion.mutate(gobernacion);
            }

        });
    };

    const { nombres, paterno, materno, cargo, ci, ext_ci, email, institucion_id, user_id } = formValues;

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="REGISTRO DE RESPONSABLE DEPARTAMENTAL" />
            <form onSubmit={handleAdd}>
                <div className="form-group py-2">
                    <label>Nombre de resonsable departamental</label>
                    <input type="text" className="form-control" placeholder="Escriba nombre completo"
                        name="nombres" value={nombres} onChange={handleInputChange} />
                    {error.nombres
                        ? <ValidationError text={error.nombres} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Apellido paterno</label>
                        <input type="text" className="form-control" placeholder="Escriba apellido paterno"
                            name="paterno" value={paterno} onChange={handleInputChange} />
                        {error.paterno
                            ? <ValidationError text={error.paterno} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <label>Apellido materno</label>
                        <input type="text" className="form-control" placeholder="Escriba apellido materno"
                            name="materno" value={materno} onChange={handleInputChange} />
                        {error.materno
                            ? <ValidationError text={error.materno} />
                            : ''}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Cedula de identidad</label>
                        <input type="text" className="form-control" placeholder="Escriba la cedula de identidad"
                            name="ci" value={ci} onChange={handleInputChange} />
                        {error.ci
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
                    <label>Correo electrónico</label>
                    <input type="email" className="form-control" placeholder="correo electronico de referencia"
                        name="email" value={email} onChange={handleInputChange} />
                    {error.email
                        ? <ValidationError text={error.email} />
                        : ''}
                </div>

                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Cargo</label>
                        <input type="text" className="form-control" placeholder="Escriba el cargo"
                            name="cargo" value={cargo} onChange={handleInputChange} />
                        {error.cargo
                            ? <ValidationError text={error.cargo} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <div className="form-group">
                            <label>Seleccione departamento </label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                name="institucion_id" value={institucion_id} onChange={handleInputChange}>
                                <option value="1">BENI</option>
                                <option value="2">CHUQUISACA</option>
                                <option value="3">COCHABAMBA</option>
                                <option value="4">LA PAZ</option>
                                <option value="5">ORURO</option>
                                <option value="6">PANDO</option>
                                <option value="7">POTOSI</option>
                                <option value="8">SANTA CRUZ</option>
                                <option value="9">TARIJA</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Link to='/admin/usuario-gobernaciones' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                <button type="submit" className="btn btn-primary my-4 mx-4">Registrar</button>
            </form>
        </>
    )
}

export default CreateGob
