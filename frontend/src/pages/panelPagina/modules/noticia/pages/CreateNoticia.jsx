import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { createNoticia } from 'api/panel/noticiaApi';

import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';
import Banner from 'components/Banner';
import image_default from 'assets/images/servicios.png'

const CreateNoticia = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;

    const addNoticia = useMutation({
        mutationFn: createNoticia,
        onSuccess: (response) => {
            if (response.status === true) {
                queryClient.invalidateQueries('panel_noticias')
                queryClient.invalidateQueries('inicio')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/panel/noticias')
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

    const [noticia, setNoticia] = useState({
        titulo: '',
        imagen: null,
    });

    const { titulo, imagen } = noticia;

    const handleAdd = (e) => {
        e.preventDefault()
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
                addNoticia.mutate(formData);
            }
        });
    };


    const handleInputFile = ({ target }) => {
        setNoticia({
            ...noticia,
            [target.name]: URL.createObjectURL(target.files[0])
        });
    };

    const handleInputChange = ({ target }) => {
        setNoticia({
            ...noticia,
            [target.name]: target.value
        });
    };

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="CREACIÓN DE NUEVA NOTICIA" />
            <div className='text-center'>
                {imagen
                    ? <img src={imagen} alt="photo profile"  className='img-thumbnail' width='300' />
                    : <img src={image_default} alt="photo profile"  className='img-thumbnail rounded' width='300' />
                }
            </div>
            <form onSubmit={handleAdd}>
                <div className="row">
                    <div className="form-group col-12 py-1">
                        <input className='form-control' type="file" name='imagen' onChange={handleInputFile} accept="image/*" />
                        {error.imagen
                            ? <ValidationError text={error.imagen} />
                            : ''}
                    </div>

                    <div className="form-group col-12 py-1">
                        <label>Titulo</label>
                        <input type="text" className="form-control" placeholder="Escriba el Titulo"
                            name="titulo" value={titulo} onChange={handleInputChange} required />
                        {error.titulo
                            ? <ValidationError text={error.titulo} />
                            : ''}
                    </div>              

                 
                    <div className="form-group col-12 py-1">
                        <div className='d-flex justify-content-between gap-1'>
                            <Link to='/panel/noticias' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                            <button type='submit' className='btn btn-primary'>GUARDAR</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateNoticia
