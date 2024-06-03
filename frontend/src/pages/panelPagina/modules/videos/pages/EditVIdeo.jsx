import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getVideo, updateVideo } from 'api/panel/videoApi';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';
import image_default from 'assets/images/servicios.png'

const EditVIdeo = () => {
    const queryClient = useQueryClient();
    const go = useNavigate();
    const { videoId } = useParams();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageprev, setImageprev] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;

    const [videoenv, setVideo] = useState({
        id: 0,
        video: '',
        imagen: null,
        descripcion: '',
    });

    const { id, video, imagen, descripcion } = videoenv;

    useEffect(() => {
        if (id == 0) {
            getPanelVideo.mutate(videoId)
        }

    }, [id])

    const getPanelVideo = useMutation({
        mutationFn: getVideo,
        onSuccess: (response) => {
            setVideo({ ...videoenv, ...response });
            setImageprev(true)
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    if (videoId == 0) {
        return <Navigate to='/panel/videos' />
    }

    const handleInputFile = ({ target }) => {
        setVideo({
            ...videoenv,
            [target.name]: URL.createObjectURL(target.files[0])
        });
        if (target.name == 'imagen') {
            setImageprev(false);
        }
    };

    const handleInputChange = ({ target }) => {
        setVideo({
            ...videoenv,
            [target.name]: target.value
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('video_id', videoenv.id)

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
                editVideo.mutate(formData);
            }
        });
    };

    const editVideo = useMutation({
        mutationFn: updateVideo,
        onSuccess: (response) => {
            if (response.status === true) {
                console.log(response)
                queryClient.invalidateQueries('panel_videos')
                queryClient.invalidateQueries('inicio')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/panel/videos')
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
                    <Banner text="ACTUALIZACIÓN DE VIDEOS" />
                    <div className='text-center'>
                        {imageprev
                            ? <>
                                {imagen
                                    ? <img src={url + '/storage/' + imagen} alt="photo profile" className='img-thumbnail' width='300' />
                                    : <img src={image_default} alt="photo profile" className='img-thumbnail rounded' width='300' />
                                }
                            </>
                            : <img src={imagen} alt="photo profile" className='img-thumbnail' width='300' />
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

                            <div className="form-group col-12 py-2">
                                <label>Video</label>
                                <input className='form-control' type="file" name='video' onChange={handleInputFile} accept="video/mp4,video/x-m4v,video/*" />
                                {error.video
                                    ? <ValidationError text={error.video} />
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
                                    <Link to='/panel/videos' type="submit" className="btn btn-danger my-4">Cancelar</Link>
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

export default EditVIdeo
