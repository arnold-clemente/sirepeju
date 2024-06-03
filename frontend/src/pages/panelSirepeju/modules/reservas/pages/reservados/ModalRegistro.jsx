import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';

import { createOtorgacion } from 'api/otorgacionesApi';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import Loading from 'components/Loading';
import ModalDiv from 'components/ModalDiv'
import storage from 'storage/Storage';

const ModalRegistro = ({ registro, modal, close, handleInputChange, open }) => {

    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const [errorval, serErroreval] = useState({});
    const { id, fecha, codigo_otorgacion, domicilio, objeto } = registro;

    const handleEnviar = (e) => {
        e.preventDefault();
        const enviar = {
            id: id,
            fecha: fecha,
            codigo_otorgacion: 'OPJ - ' + codigo_otorgacion,
            domicilio: domicilio,
            objeto: objeto,
            user_id: storage.get('authUser').id
        };

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
                serErroreval({});
                close();
                setLoading(true);
                enviarRegistro.mutate(enviar);
            }
        });
    }


    const enviarRegistro = useMutation({
        mutationFn: createOtorgacion,
        onSuccess: (response) => {
            console.log(response)
            if (response.status === true) {
                queryClient.invalidateQueries('registros')
                queryClient.invalidateQueries('otorgaciones')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
            } else {
                open();
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErroreval(response.errors);
                setLoading(false);
                // setTimeout(() => {
                //     serErroreval({});
                // }, 3000);
            }
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <ModalDiv isOpen={modal} closeModal={close} title={'REGISTRO DE OTORGACION'}>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Fecha de Ingreso:</label>
                        <input type="date" className="form-control" placeholder="fecha" aria-label="First name"
                            name="fecha" value={fecha} onChange={handleInputChange} />
                        {errorval.fecha
                            ? <ValidationError text={errorval.fecha} />
                            : ''}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Codigo</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">OPJ - </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Escriba codigo 123" aria-label="Last name"
                                name="codigo_otorgacion" value={codigo_otorgacion} onChange={handleInputChange} />
                            {errorval.codigo_otorgacion
                                ? <ValidationError text={errorval.codigo_otorgacion} />
                                : ''}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Domicilio Legal</label>
                        <input type="text" className="form-control" placeholder="Escriba la direccion" aria-label="Last name" name="domicilio" value={domicilio} onChange={handleInputChange} />
                        {errorval.domicilio
                            ? <ValidationError text={errorval.domicilio} />
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
                <div className='container-fluid d-flex gap-2 justify-content-end pt-4'>
                    <button onClick={close} className='btn btn-danger'>Cerrar</button>
                    <button onClick={handleEnviar} className='btn btn-primary'>Enviar</button>
                </div>
            </ModalDiv>
        </>
    )
}

export default ModalRegistro
