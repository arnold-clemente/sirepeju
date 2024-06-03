import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getRed, updateRed } from 'api/panel/redesApi';
import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';
import { useDispatch } from 'react-redux'
import { getFooter } from 'api/pagina/footerApi';
import { updateRedes, updateReferencias } from 'store/slices/paginaWeb/footerSlice';

const EditRedes = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();
    const { redId } = useParams();
    const dispatch = useDispatch();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);

    const [iconos, setIconos] = useState([]);
    const [red, setRed] = useState({
        id: 0,
        nombre: '',
        url: '',
        icon: '',
    });

    const { id, nombre, url, icon } = red;


    useEffect(() => {
        if (id == 0) {
            getPanelRed.mutate(redId)
        }

    }, [id])

    const getPanelRed = useMutation({
        mutationFn: getRed,
        onSuccess: (response) => {
            setRed({ ...red, ...response.redes });
            setIconos(response.icons)
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    if (redId == 0) {
        return <Navigate to='/panel/redes' />
    }

    const handleInputFile = ({ target }) => {
        setRed({
            ...red,
            [target.name]: URL.createObjectURL(target.files[0])
        });
    };

    const handleInputChange = ({ target }) => {
        setRed({
            ...red,
            [target.name]: target.value
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('red_id', red.id)

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
                editRed.mutate(formData);
                handleFooter.mutate();
            }
        });
    };

    const editRed = useMutation({
        mutationFn: updateRed,
        onSuccess: (response) => {
            if (response.status === true) {
                console.log(response)
                queryClient.invalidateQueries('panel_redes')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/panel/redes')
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

    const handleFooter = useMutation({
        mutationFn: getFooter,
        onSuccess: (response) => {
            if (response.status === true) {
                dispatch(updateRedes(response.redes));
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
            }
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    return (
        <>
            {id == 0
                ? <Spiner />
                : <>
                    {loading === true ? <Loading /> : ''}
                    <Banner text="ACTUALIZACIÓN DE RED SOCIAL" />
                    <form onSubmit={handleAdd}>
                        <div className="row">

                            <div className="form-group col-12 py-1">
                                <label>Nombre</label>
                                <input type="text" className="form-control" placeholder="Escriba el Nombre de Red Social"
                                    name="nombre" value={nombre} onChange={handleInputChange} required />
                                {error.nombre
                                    ? <ValidationError text={error.nombre} />
                                    : ''}
                            </div>
                            <div className="form-group col-12 py-1">
                                <label>Direccion URL</label>
                                <input type="text" className="form-control" placeholder="https//www.example.com"
                                    name="url" value={url} onChange={handleInputChange} required />
                                {error.url
                                    ? <ValidationError text={error.url} />
                                    : ''}
                            </div>

                            <div className="form-group col-md-12 py-2">
                                <div className="form-group">
                                    <label>ICONO</label>
                                    <select className="form-control" id="exampleFormControlSelect1"
                                        name="icon" value={icon} onChange={handleInputChange} required>
                                        <option value="">ELIJA UN ICONO</option>
                                        {
                                            iconos.map((icon) => {
                                                return (
                                                    <option value={icon.clase} key={icon.id}>
                                                        {icon.nombre}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-12 py-1">
                                <div className='d-flex justify-content-between gap-1'>
                                    <Link to='/panel/redes' type="submit" className="btn btn-danger my-4">Cancelar</Link>
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

export default EditRedes
