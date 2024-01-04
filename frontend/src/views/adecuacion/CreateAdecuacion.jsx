import React, { Component, useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom'

// Component
import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import ValidationError from '../../components/ValidationError';
import { show_alerta } from '../../components/MessageAlert';
import storage from '../../Storage/storage'
import { useForm } from '../../hooks/useForm';

//queris
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { createAdecuacion } from '../../api/adecuacionApi';

const CreateAdecuacion = () => {

    const queryClient = useQueryClient();
    const go = useNavigate();

    const [errorval, serErrorval] = useState({});
    const [loading, setLoading] = useState(false);

    const addAdecuacion = useMutation({
        mutationFn: createAdecuacion,
        onSuccess: (response) => {
            console.log(response);
            if (response.status === true) {
                queryClient.invalidateQueries('adecuaciones')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/admin/adecuaciones')
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
        },
    });

    const [formValues, handleInputChange] = useForm({
        personalidad_juridica: '',
        sigla: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: 'LP',
        naturaleza: 'FUNDACION',
        persona_colectiva: 'PERSONA NATURAL',
        fecha_ingreso_tramite: '',
        codigo_adecuacion: '',
        domicilio_legal: '',
        objeto: '',
        user_id: storage.get('authUser').id
    });

    const handleAdd = (e) => {
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
                const adecuacion = {
                    personalidad_juridica: personalidad_juridica,
                    sigla: sigla,
                    representante: representante,
                    ci_rep: ci_rep,
                    ext_ci_rep: ext_ci_rep,
                    naturaleza: naturaleza,
                    persona_colectiva: persona_colectiva,
                    fecha_ingreso_tramite: fecha_ingreso_tramite,
                    codigo_adecuacion: 'APJ - ' + codigo_adecuacion,
                    domicilio_legal: domicilio_legal,
                    objeto: objeto,
                    user_id: storage.get('authUser').id                 
                };
                addAdecuacion.mutate(adecuacion);
            }
        });
    };

    const {
        personalidad_juridica,
        sigla,
        representante,
        ci_rep,
        ext_ci_rep,
        naturaleza,
        persona_colectiva,
        fecha_ingreso_tramite,
        codigo_adecuacion,
        domicilio_legal,
        objeto
    } = formValues;

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="CREAR NUEVA ADECUACION" />
            <form onSubmit={handleAdd}>
                <div className="form-group py-2">
                    <label>Personalidad Juridica</label>
                    <input type="text" className="form-control" placeholder="Escriba Nombre de la Entidad"
                        name="personalidad_juridica" value={personalidad_juridica} onChange={handleInputChange} />
                    {errorval.personalidad_juridica
                        ? <ValidationError text={errorval.personalidad_juridica} />
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
                <div className="form-group">
                    <label>Persona Colectiva</label>
                    <select className="form-control" id="exampleFormControlSelect1"
                        name="persona_colectiva" value={persona_colectiva} onChange={handleInputChange}>
                        <option value="PERSONA NATURAL">PERSONA NATURAL</option>
                        <option value="ENTE DE COORDINACIÓN">ENTE DE COORDINACIÓN</option>
                    </select>
                </div>
                <div className="form-group py-2">
                    <label>Representante</label>
                    <input type="text" className="form-control" placeholder="Escriba nombre completo"
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
                <div className='row'>
                    <div className="col-md-6">
                        <label className="form-label">Fecha de Ingreso:</label>
                        <input type="date" className="form-control" placeholder="fecha" aria-label="First name"
                            name="fecha_ingreso_tramite" value={fecha_ingreso_tramite} onChange={handleInputChange} />
                        {errorval.fecha_ingreso_tramite
                            ? <ValidationError text={errorval.fecha_ingreso_tramite} />
                            : ''}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Codigo APJ</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">APJ - </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Escriba codigo 123" aria-label="Last name"
                                name="codigo_adecuacion" value={codigo_adecuacion} onChange={handleInputChange} />
                            {errorval.codigo_adecuacion
                                ? <ValidationError text={errorval.codigo_adecuacion} />
                                : ''}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Domicilio Legal</label>
                        <input type="text" className="form-control" placeholder="Escriba la direccion" aria-label="Last name" name="domicilio_legal" value={domicilio_legal} onChange={handleInputChange} />
                        {errorval.domicilio_legal
                            ? <ValidationError text={errorval.domicilio_legal} />
                            : ''}
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Objeto</label>
                        <textarea rows={5} className="form-control" placeholder="Escriba el objeto" aria-label="Last name" name="objeto" value={objeto} onChange={handleInputChange} />
                        {errorval.objeto
                            ? <ValidationError text={errorval.objeto} />
                            : ''}
                    </div>
                </div>

                <Link to='/admin/adecuaciones' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                <button type="submit" className="btn btn-primary my-4 mx-4">Guardar</button>
            </form>
        </>
    )
}

export default CreateAdecuacion
