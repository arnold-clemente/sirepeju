import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { createRed, getIcons } from 'api/panel/redesApi';

import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';
import Banner from 'components/Banner';
import { useDispatch } from 'react-redux'
import { getFooter } from 'api/pagina/footerApi';
import { updateRedes, updateReferencias } from 'store/slices/paginaWeb/footerSlice';

const CreateRedes = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();
    const dispatch = useDispatch();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);

    const addRed = useMutation({
        mutationFn: createRed,
        onSuccess: (response) => {
            if (response.status === true) {
                queryClient.invalidateQueries('panel_redes')
                queryClient.invalidateQueries('inicio')
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

    const [iconos, setIconos] = useState([]);
    const [red, setRed] = useState({
        id: 1,
        nombre: '',
        url: '',
        icon: '',
    });

    const { id, nombre, url, icon } = red;

    useEffect(() => {
        if (id != 0) {
            getPanelIcons.mutate()
        }

    }, [id])

    const getPanelIcons = useMutation({
        mutationFn: getIcons,
        onSuccess: (response) => {
            setIconos(response);
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
                addRed.mutate(formData);
                handleFooter.mutate();
            }
        });
    };

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

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="CREACIÓN DE NUEVA RED SOCIAL" />

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
    )
}

export default CreateRedes
