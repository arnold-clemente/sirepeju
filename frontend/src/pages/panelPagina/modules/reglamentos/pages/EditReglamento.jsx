import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getReglamento, updateReglamento } from 'api/panel/reglamentoApi';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';

const EditReglamento = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();
    const { tramiteId, reglamentoId } = useParams();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;
    const [reglamento, setReglamento] = useState({
        id: 0,
        nombre: '',
        descripcion: '',
        fecha: '',
        archivo: '',
    });

    const { id, nombre, descripcion, fecha, archivo } = reglamento;

    useEffect(() => {
        if (id == 0) {
            getPanelReglamento.mutate(reglamentoId)
        }

    }, [id])

    const getPanelReglamento = useMutation({
        mutationFn: getReglamento,
        onSuccess: (response) => {
            setReglamento({ ...reglamento, ...response });
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    if (reglamentoId == 0) {
        return <Navigate to={`/panel/tramite/${tramiteId}/reglamentos`} />
    }

    const handleInputFile = ({ target }) => {
        setReglamento({
            ...reglamento,
            [target.name]: URL.createObjectURL(target.files[0])
        });
    };

    const handleInputChange = ({ target }) => {
        setReglamento({
            ...reglamento,
            [target.name]: target.value
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('tramite_id', tramiteId)
        formData.append('reglamento_id', reglamento.id)

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
                EditReglamento.mutate(formData);
            }
        });
    };

    const EditReglamento = useMutation({
        mutationFn: updateReglamento,
        onSuccess: (response) => {
            if (response.status === true) {
                console.log(response)
                queryClient.invalidateQueries('requisitos')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go(`/panel/tramite/${tramiteId}/reglamentos`)
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
    return (
        <>
            {id == 0
                ? <Spiner />
                : <>
                    {loading === true ? <Loading /> : ''}
                    <Banner text="ACTUALIZACIÓN DE REGLAMENTO" />

                    <form onSubmit={handleAdd}>
                        <div className="row">

                            <div className="form-group col-12 py-1">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="Escriba el Nombre"
                                    name="nombre" value={nombre} onChange={handleInputChange} required />
                                {error.nombre
                                    ? <ValidationError text={error.nombre} />
                                    : ''}
                            </div>
                            <div className="form-group col-md-6 py-2">
                                <label>Fecha</label>
                                <input type="date" className='form-control' placeholder='Rellenar Campo' required
                                    name='fecha' value={fecha} onChange={handleInputChange} />
                                {error.fecha
                                    ? <ValidationError text={error.fecha} />
                                    : ''}
                            </div>

                            <div className="form-group col-md-6 py-2">
                                <label>Documento</label>
                                <input className='form-control' type="file" name='archivo' onChange={handleInputFile} accept="application/pdf"  />
                                {error.archivo
                                    ? <ValidationError text={error.archivo} />
                                    : ''}
                            </div>


                            <div className="form-group col-12 py-1">
                                <label>Descripción</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Escriba la descripción"
                                    name="descripcion"
                                    value={descripcion}
                                    rows='4'
                                    onChange={handleInputChange}
                                    required>
                                </textarea>
                                {error.descripcion
                                    ? <ValidationError text={error.descripcion} />
                                    : ''}
                            </div>

                            <div className="form-group col-12 py-1">
                                <div className='d-flex justify-content-between gap-1'>
                                    <Link to={`/panel/tramite/${tramiteId}/reglamentos`} type="submit" className="btn btn-danger my-4">Cancelar</Link>
                                    <button type='submit' className='btn btn-primary'>GUARDAR</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </>

            }
        </>
    )
}

export default EditReglamento
