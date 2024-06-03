import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { createRequisito } from 'api/panel/requisitoApi';

import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';
import Banner from 'components/Banner';
import image_default from 'assets/images/servicios.png'

const CreateRequisito = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;

    const addRequisito = useMutation({
        mutationFn: createRequisito,
        onSuccess: (response) => {
            if (response.status === true) {
                queryClient.invalidateQueries('panel_requisitos')
                queryClient.invalidateQueries('requisitos')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/panel/requisitos')
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

    const [requisito, setRequisito] = useState({
        nombre: '',
        imagen: null,
    });

    const { nombre, imagen } = requisito;

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
                addRequisito.mutate(formData);
            }
        });
    };


    const handleInputFile = ({ target }) => {
        setRequisito({
            ...requisito,
            [target.name]: URL.createObjectURL(target.files[0])
        });
    };

    const handleInputChange = ({ target }) => {
        setRequisito({
            ...requisito,
            [target.name]: target.value
        });
    };

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="CREACIÓN DE NUEVO REQUISITO" />
            <div className='text-center'>
                {imagen
                    ? <img src={imagen} alt="photo profile" className='img-thumbnail' width='300' />
                    : <img src={image_default} alt="photo profile" className='img-thumbnail rounded' width='300' />
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
                        <label>Nombre</label>
                        <input type="text" className="form-control" placeholder="Escriba el Nombre"
                            name="nombre" value={nombre} onChange={handleInputChange} required />
                        {error.nombre
                            ? <ValidationError text={error.nombre} />
                            : ''}
                    </div>


                    <div className="form-group col-12 py-1">
                        <div className='d-flex justify-content-between gap-1'>
                            <Link to='/panel/requisitos' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                            <button type='submit' className='btn btn-primary'>GUARDAR</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateRequisito
