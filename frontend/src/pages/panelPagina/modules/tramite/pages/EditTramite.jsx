import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getTramite, updateTramite } from 'api/panel/tramiteApi';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';

const EditTramite = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();
    const { requisitoId, tramiteId } = useParams();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;
    const [tramite, setTramite] = useState({
        id: 0,
        nombre: '',
        requisito_id: null,
    });
    const { id, nombre, requisito_id } = tramite;

    useEffect(() => {
        if (id == 0) {
            getPanelTramite.mutate(tramiteId)
        }

    }, [id])

    const getPanelTramite = useMutation({
        mutationFn: getTramite,
        onSuccess: (response) => {
            setTramite({ ...tramite, ...response });
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    if (tramiteId == 0) {
        return <Navigate to={`/panel/requisito/${requisitoId}/tramites`} />
    }

    const handleInputFile = ({ target }) => {
        setTramite({
            ...tramite,
            [target.name]: URL.createObjectURL(target.files[0])
        });
    };

    const handleInputChange = ({ target }) => {
        setTramite({
            ...tramite,
            [target.name]: target.value
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('requisito_id', requisitoId)
        formData.append('tramite_id', tramite.id)

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
                editTramite.mutate(formData);
            }
        });
    };

    const editTramite = useMutation({
        mutationFn: updateTramite,
        onSuccess: (response) => {
            if (response.status === true) {
                console.log(response)
                queryClient.invalidateQueries('requisitos')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go(`/panel/requisito/${requisitoId}/tramites`)
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
                    <Banner text="ACTUALIZACIÓN DE TRAMITE" />
                   
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

                            <div className="form-group col-12 py-1">
                                <div className='d-flex justify-content-between gap-1'>
                                    <Link to={`/panel/requisito/${requisitoId}/tramites`} type="submit" className="btn btn-danger my-4">Cancelar</Link>
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

export default EditTramite
