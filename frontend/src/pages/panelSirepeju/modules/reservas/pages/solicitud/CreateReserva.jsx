import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { createReserva } from 'api/reservaApi';

import Loading from 'components/Loading';
import storage from 'storage/Storage';
import { useForm } from 'hooks/useForm';
import ValidationError from 'components/ValidationError';
import { show_alerta } from 'components/MessageAlert';
import Banner from 'components/Banner';


const CreateReserva = () => {

    const queryClient = useQueryClient();

    const go = useNavigate();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);

    const addReserva = useMutation({
        mutationFn: createReserva,
        onSuccess: (response) => {
            if (response.status === true) {
                queryClient.invalidateQueries('reservas')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/admin/reservas/solicitudes')
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serError(response.errors);
                setLoading(false);
            }
        },
        onError: (error) => {
            setLoading(false);
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            
        },
    });

    const [formValues, handleInputChange] = useForm({
        hr: '',
        entidad: '',
        sigla: '',
        persona_colectiva: '',
        naturaleza: '',
        obs: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: 'LP',
        telefono: '',
        correo: '',
        user_id: storage.get('authUser').id
    });

    const handleAdd = (e) => {
        e.preventDefault();
        serError({})
        const reserva = formValues;
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
                addReserva.mutate(reserva);
            }

        });
    };

    const { hr, entidad, sigla, persona_colectiva, nro_certificado, naturaleza, obs, representante, ci_rep, ext_ci_rep, telefono, correo } = formValues;

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="AGREGAR RESERVA DE OTORGACION" />
            <form onSubmit={handleAdd}>
                <div className="form-group py-2">
                    <label>Entidad</label>
                    <input type="text" className="form-control" placeholder="Escriba Nombre de la entidad"
                        name="entidad" value={entidad} onChange={handleInputChange} />
                    {error.entidad
                        ? <ValidationError text={error.entidad} />
                        : ''}
                </div>
                <div className="form-group py-2">
                    <label>Sigla</label>
                    <input type="text" className="form-control" placeholder="Escriba la sigla de la entidad"
                        name="sigla" value={sigla} onChange={handleInputChange} />
                    {error.sigla
                        ? <ValidationError text={error.sigla} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Hoja de Ruta</label>
                        <input type="text" className="form-control" placeholder="Escriba el número de  hoja de ruta"
                            name="hr" value={hr} onChange={handleInputChange} />
                        {error.hr
                            ? <ValidationError text={error.hr} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <div className="form-group">
                            <label>Persona Colectiva</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                name="persona_colectiva" value={persona_colectiva} onChange={handleInputChange}>
                                <option value="PERSONA NATURAL">PERSONA NATURAL</option>
                                <option value="ENTE DE COORDINACIÓN">ENTE DE COORDINACIÓN</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Naturaleza</label>
                    <select className="form-control" id="exampleFormControlSelect1"
                        name="naturaleza" value={naturaleza} onChange={handleInputChange}>
                        <option value="FUNDACION">FUNDACIÓN</option>
                        <option value="ENTIDAD SIN FINES DE LUCRO">ENTIDAD SIN FINES DE LUCRO</option>
                        <option value="ONG">ONG</option>
                        <option value="ORGANIZACIÓN SOCIAL">ORGANIZACIÓN SOCIAL</option>
                    </select>
                </div>
                <div className="form-group py-2">
                    <label>Solicitante</label>
                    <input type="text" className="form-control" placeholder="Escriba el nombre completo del solicitante"
                        name="representante" value={representante} onChange={handleInputChange} />
                    {error.representante
                        ? <ValidationError text={error.representante} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>C.I. solicitante</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de CI"
                            name="ci_rep" value={ci_rep} onChange={handleInputChange} />
                        {error.ci_rep
                            ? <ValidationError text={error.ci_rep} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <div className="form-group">
                            <label>Expedido</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                name="ext_ci_rep" value={ext_ci_rep} onChange={handleInputChange}>
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
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Celular del solicitante</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de celular"
                            name="telefono" value={telefono} onChange={handleInputChange} />
                        {error.telefono
                            ? <ValidationError text={error.telefono} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <label>Correo de referencia</label>
                        <input type="email" className="form-control" placeholder="Escriba el correo de contacto"
                            name="correo" value={correo} onChange={handleInputChange} />
                        {error.correo
                            ? <ValidationError text={error.correo} />
                            : ''}
                    </div>
                </div>
                <div className="form-group py-2">
                    <label>Observación</label>
                    <input type="text" className="form-control" placeholder="Escriba alguna observacion"
                        name="obs" value={obs} onChange={handleInputChange} />
                    {error.obs
                        ? <ValidationError text={error.obs} />
                        : ''}
                </div>
                <Link to='/admin/reservas/solicitudes' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                <button type="submit" className="btn btn-primary my-4 mx-4">Enviar</button>
            </form>
        </>
    )
}

export default CreateReserva
