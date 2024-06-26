import React, { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getReserva, updateReserva } from 'api/reservaApi';

import storage from 'storage/Storage';
import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';

const EditReserva = () => {

    const { reservaId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [reserva, setReserva] = useState({
        id: 0,
        hr: 1,
        entidad: '',
        sigla: '',
        persona_colectiva: 1,
        naturaleza: 1,
        obs: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: '',
        telefono: '',
        correo: '',
        user_id: storage.get('authUser').id
    });

    const { isLoading, data: registro, isError, error } = useQuery({
        queryFn: () => getReserva(reservaId),
        onSuccess: async (response) => {
            setReserva({ ...reserva, ...response });
        }
    })

    const { hr, entidad, sigla, persona_colectiva, nro_certificado, naturaleza, obs, representante, ci_rep, ext_ci_rep, telefono, correo } = reserva;

    const [errorval, serErrorval] = useState({});

    const [loading, setLoading] = useState(false);

    const UpdateRes = useMutation({
        mutationFn: updateReserva,
        onSuccess: (response) => {
            console.log(response)
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('reservas')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/admin/reservas/solicitudes')
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
        setReserva({
            ...reserva,
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
                UpdateRes.mutate(reserva);
            }

        });
    };  

    if (isLoading) return <Spiner />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="ACTUALIZAR SOLICITUD DE RESERVA DE NOMBRE" />
            <form onSubmit={handleUpdate}>
                <div className="form-group py-2">
                    <label>Entidad</label>
                    <input type="text" className="form-control" placeholder="Escriba nombre de la entidad"
                        name="entidad" value={entidad} onChange={handleInputChange} />
                    {errorval.entidad
                        ? <ValidationError text={errorval.entidad} />
                        : ''}
                </div>
                <div className="form-group py-2">
                    <label>Sigla</label>
                    <input type="text" className="form-control" placeholder="Escriba la sigla de la entidad"
                        name="sigla" value={sigla} onChange={handleInputChange} />
                    {errorval.sigla
                        ? <ValidationError text={errorval.sigla} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Hoja de ruta</label>
                        <input type="text" className="form-control" placeholder="Escriba el nuemro de  hoja de ruta"
                            name="hr" value={hr} onChange={handleInputChange} />
                        {errorval.hr
                            ? <ValidationError text={errorval.hr} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <div className="form-group">
                            <label>Persona colectiva</label>
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
                        <option value="ORGANIZACIÓN SOCIA">ORGANIZACIÓN SOCIAL</option>
                    </select>
                </div>
                <div className="form-group py-2">
                    <label>Solicitante</label>
                    <input type="text" className="form-control" placeholder="Escriba el nombre completo del representante"
                        name="representante" value={representante} onChange={handleInputChange} />
                    {errorval.representante
                        ? <ValidationError text={errorval.representante} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>C.I. solicitante</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de CI"
                            name="ci_rep" value={ci_rep} onChange={handleInputChange} />
                        {errorval.ci_rep
                            ? <ValidationError text={errorval.ci_rep} />
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
                        <input type="text" className="form-control" placeholder="Escriba el numero de Telefono"
                            name="telefono" value={telefono} onChange={handleInputChange} />
                        {errorval.telefono
                            ? <ValidationError text={errorval.telefono} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <label>Correo de referencia</label>
                        <input type="text" className="form-control" placeholder="Escriba el correo de contacto"
                            name="correo" value={correo} onChange={handleInputChange} />
                        {errorval.correo
                            ? <ValidationError text={errorval.correo} />
                            : ''}
                    </div>
                </div>
                <div className="form-group py-2">
                    <label>Observacin de la solicitud</label>
                    <input type="text" className="form-control" placeholder="Escriba alguna observacion"
                        name="obs" value={obs} onChange={handleInputChange} />
                    {errorval.obs
                        ? <ValidationError text={errorval.obs} />
                        : ''}
                </div>    
                <Link to='/admin/reservas/solicitudes' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                <button type="submit" className="btn btn-primary my-4 mx-4">Actualizar</button>
            </form>
        </>
    )
}

export default EditReserva
