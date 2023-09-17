import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { useNavigate, Link } from 'react-router-dom'
import { useQueryClient } from 'react-query';

import storage from '../../Storage/storage'
import Loading from '../../components/Loading';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import { updateReserva } from '../../api/reservaApi';
import { getReserva } from '../../api/reservaApi';

const EditReserva = () => {

    const { reservaId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [reserva, setReserva] = useState({
        hr: 1,
        entidad: '',
        sigla: '',
        persona_colectiva: 1,
        naturaleza: 1,
        obs: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: 'LP',
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
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('reservas')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/reservas')
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
        setLoading(true);
        e.preventDefault();
        UpdateRes.mutate(reserva);
    };  

    if (isLoading) return <Loading />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            {loading === true ? <Loading /> : ''}
            <form onSubmit={handleUpdate}>
                <div className="form-group py-2">
                    <label>Entidad</label>
                    <input type="text" className="form-control" placeholder="Escriba Nombre de la Entidad"
                        name="entidad" value={entidad} onChange={handleInputChange} />
                    {errorval.entidad
                        ? <ValidationError text={errorval.entidad} />
                        : ''}
                </div>
                <div className="form-group py-2">
                    <label>Sigla</label>
                    <input type="text" className="form-control" placeholder="Escriba la sigla de la Entidad"
                        name="sigla" value={sigla} onChange={handleInputChange} />
                    {errorval.sigla
                        ? <ValidationError text={errorval.sigla} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Hoja de Ruta</label>
                        <input type="text" className="form-control" placeholder="Escriba el nuemro de  hoja de ruta"
                            name="hr" value={hr} onChange={handleInputChange} />
                        {errorval.hr
                            ? <ValidationError text={errorval.hr} />
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
                        <option value="FUNDACION">FUNDACION</option>
                        <option value="ENTIDAD SIN FINES DE LUCRO">ENTIDAD SIN FINES DE LUCRO</option>
                        <option value="ONG">ONG</option>
                        <option value="ORGANIZACIÓN SOCIA">ORGANIZACIÓN SOCIAL</option>
                    </select>
                </div>
                <div className="form-group py-2">
                    <label>Representante</label>
                    <input type="text" className="form-control" placeholder="Escriba el nombre completo del representante"
                        name="representante" value={representante} onChange={handleInputChange} />
                    {errorval.representante
                        ? <ValidationError text={errorval.representante} />
                        : ''}
                </div>
                <div className="row">
                    <div className="form-group col-md-6 py-2">
                        <label>Cedula</label>
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
                        <label>Telefono</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de Telefono"
                            name="telefono" value={telefono} onChange={handleInputChange} />
                        {errorval.telefono
                            ? <ValidationError text={errorval.telefono} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-2">
                        <label>Correo</label>
                        <input type="email" className="form-control" placeholder="Escriba el correo de contacto"
                            name="correo" value={correo} onChange={handleInputChange} />
                        {errorval.correo
                            ? <ValidationError text={errorval.correo} />
                            : ''}
                    </div>
                </div>
                <Link to='/reservas' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                <button type="submit" className="btn btn-primary my-4 mx-4">Actualizar</button>
            </form>
        </>
    )
}

export default EditReserva
