import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getNormativa, updateNormativa } from 'api/panel/normativaApi';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';

const EditNormativa = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();
    const { normativaId } = useParams();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;

    const [normativa, setNormativa] = useState({
        id: 0,
        archivo: '',
        nombre: '',
    });

    const { id, archivo, nombre } = normativa;

    useEffect(() => {
        if (id == 0) {
            getPanelNormativa.mutate(normativaId)
        }

    }, [id])

    const getPanelNormativa = useMutation({
        mutationFn: getNormativa,
        onSuccess: (response) => {
            setNormativa({ ...normativa, ...response });
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    if (normativaId == 0) {
        return <Navigate to='/panel/normativas' />
    }

    const handleInputFile = ({ target }) => {
        setNormativa({
            ...normativa,
            [target.name]: URL.createObjectURL(target.files[0])
        });
    };

    const handleInputChange = ({ target }) => {
        setNormativa({
            ...normativa,
            [target.name]: target.value
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('normativa_id', normativa.id)

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
                editNormativa.mutate(formData);
            }
        });
    };

    const editNormativa = useMutation({
        mutationFn: updateNormativa,
        onSuccess: (response) => {
            if (response.status === true) {
                console.log(response)
                queryClient.invalidateQueries('panel_normativas')
                queryClient.invalidateQueries('normativas')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/panel/normativas')
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
                    <Banner text="ACTUALIZACIÓN DE NORMATIVA" />
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
                            <div className="form-group col-12 py-2">
                                <label>Documento</label>
                                <input className='form-control' type="file" name='archivo' onChange={handleInputFile} accept="application/pdf" />
                                {error.archivo
                                    ? <ValidationError text={error.archivo} />
                                    : ''}
                            </div>
                            <div className="form-group col-12 py-1">
                                <div className='d-flex justify-content-between gap-1'>
                                    <Link to='/panel/normativas' type="submit" className="btn btn-danger my-4">Cancelar</Link>
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

export default EditNormativa
