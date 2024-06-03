import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import Banner from 'components/Banner';
import { show_alerta } from 'components/MessageAlert';
import { estilos } from 'components/estilosdatatables';
import { useDispatch } from 'react-redux'
import { updateRedes, updateReferencias } from 'store/slices/paginaWeb/footerSlice';
import { getFooter } from 'api/pagina/footerApi';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getReferencia, updateReferencia } from 'api/panel/referenciaApi';

const IndexReferencia = () => {


    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [geterror, setErrorget] = useState({});
    const [error, serError] = useState({});
    const [referencia, setReferencia] = useState({
        id: 0,
        direccion: '',
        horario: '',
        whatsapp: '',
        correo: '',
        telefono: '',
        fax: '',
    });

    const { id, direccion, horario, whatsapp, correo, telefono, fax } = referencia;

    useEffect(() => {
        if (referencia.id == 0) {
            getPanelReferencia.mutate()
        }

    }, [id])


    const getPanelReferencia = useMutation({
        mutationFn: getReferencia,
        onSuccess: (response) => {
            setReferencia({ ...referencia, ...response });
            setLoading(false)
        },
        onError: (error) => {
            setErrorget({ ...geterror, ...error.message })
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const handleInputChange = ({ target }) => {
        setReferencia({
            ...referencia,
            [target.name]: target.value
        });
    };

    const handleFooter = useMutation({
        mutationFn: getFooter,
        onSuccess: (response) => {
            if (response.status === true) {
                dispatch(updateReferencias(response.referencias));
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
            }
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
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
                editRefrencia.mutate(formData);
            }
        });
    };

    const editRefrencia = useMutation({
        mutationFn: updateReferencia,
        onSuccess: (response) => {
            if (response.status === true) {
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                getPanelReferencia.mutate();
                handleFooter.mutate();
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

    if (loading) return <Spiner />
    else if (referencia.id == 0) return <div>Error: {geterror.message}</div>
    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="ACTUALIZACIÓN DE DATOS DE CONTACTO" />
            <form onSubmit={handleAdd}>
                <div className="row">

                    <div className="form-group col-12 py-1">
                        <label>Dirección</label>
                        <input type="text" className="form-control" placeholder="Escriba la direccion"
                            name="direccion" value={direccion} onChange={handleInputChange} required />
                        {error.direccion
                            ? <ValidationError text={error.direccion} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-1">
                        <label>Whatsapp</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de whatsapp"
                            name="whatsapp" value={whatsapp} onChange={handleInputChange} required />
                        {error.whatsapp
                            ? <ValidationError text={error.whatsapp} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-1">
                        <label>Telefono</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de Telefono"
                            name="telefono" value={telefono} onChange={handleInputChange} required />
                        {error.telefono
                            ? <ValidationError text={error.telefono} />
                            : ''}
                    </div>
                    <div className="form-group col-12 py-1">
                        <label>Horario</label>
                        <input type="text" className="form-control" placeholder="Horarios de Atencion"
                            name="horario" value={horario} onChange={handleInputChange} required />
                        {error.horario
                            ? <ValidationError text={error.horario} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-1">
                        <label>Correo</label>
                        <input type="email" className="form-control" placeholder="Escriba el correo electronico"
                            name="correo" value={correo} onChange={handleInputChange} required />
                        {error.correo
                            ? <ValidationError text={error.correo} />
                            : ''}
                    </div>
                    <div className="form-group col-md-6 py-1">
                        <label>Numero de Fax</label>
                        <input type="text" className="form-control" placeholder="Escriba el numero de Fax"
                            name="fax" value={fax} onChange={handleInputChange} required />
                        {error.fax
                            ? <ValidationError text={error.fax} />
                            : ''}
                    </div>

                    <div className="form-group col-12 py-1 d-flex justify-content-end py-2">
                        <div className='d-flex justify-content-between gap-1'>
                            <button type='submit' className='btn btn-primary'>GUARDAR</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default IndexReferencia
