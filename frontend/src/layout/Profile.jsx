import React, { useState } from 'react'
import user from '../images/user.png'
import ValidationError from '../components/ValidationError';
import storage from '../Storage/storage';
import { show_alerta } from '../components/MessageAlert';
import { url } from '../conection/env';

import { useMutation, useQueryClient } from 'react-query';
import { updateProfile } from '../api/authApi';

const Profile = ({ modal, closeModal }) => {

    const queryClient = useQueryClient();
    const [error, serError] = useState({});
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [image, setImage] = useState(false);

    const [profile, setProfile] = useState({
        user_id: storage.get('authUser').id,
        nombres: storage.get('authUser').name,
        correo: storage.get('authUser').email,
        profile_photo_path: storage.get('authUser').profile_photo_path,
    });
    const { user_id, nombres, correo, profile_photo_path } = profile;

    const handleInputChange = ({ target }) => {
        setProfile({
            ...profile,
            [target.name]: target.value
        });
    };

    const handleInputFile = ({ target }) => {
        setProfile({
            ...profile,
            [target.name]: URL.createObjectURL(target.files[0])
        });
        setImage(true);
    };

    const guardarPerfil = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('user_id', user_id)
        setLoading(true);
        guardarProfile.mutate(formData)
    };

    const guardarProfile = useMutation({
        mutationFn: updateProfile,
        onSuccess: (response) => {
            console.log(response)
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('administrativos')
                queryClient.invalidateQueries('gobernacions')
                storage.set('authUser', response.data);
                window.location.reload(false)
                show_alerta('Perfil Actualizado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serError(response.errors);
                setLoading(false);
            }
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        }
    });

    return (
        <>
            <button onClick={closeModal} className={'profile_close ' + (modal ? 'profile' : '')}></button>
            <div className={'profile_layout ' + (modal ? 'profile' : '')}>
                <div className={'scroll_style profile_content'}>
                    <form className='form_profile' onSubmit={guardarPerfil}>
                        <div className='form_informacion'>
                            <h3>INFORMACIÓN PERSONAL</h3>
                            <p>Actualice la información de perfil y la dirección de correo de su cuenta</p>
                        </div>
                        <div className='form_perfil'>
                            <div className='profile_image'>
                                {image == false
                                    ? <>
                                        {profile_photo_path
                                            ? <img src={url + '/storage/' + profile_photo_path} alt="photo profile" />
                                            : <img src={user} alt="photo profile" />

                                        }
                                    </>
                                    : <img src={profile_photo_path} alt="photo profile" />
                                }

                            </div>
                            <div className="row">
                                <div className="form-group col-12 py-1">
                                    <input className='form-control' type="file" name='profile_photo_path' onChange={handleInputFile} accept="image/*" />
                                    {error.profile_photo_path
                                        ? <ValidationError text={error.profile_photo_path} />
                                        : ''}
                                </div>

                                <div className="form-group col-12 py-1">
                                    <label>Nombres</label>
                                    <input type="text" className="form-control" placeholder="Escriba los nombres completos"
                                        name="nombres" value={nombres} onChange={handleInputChange} required />
                                    {error.nombres
                                        ? <ValidationError text={error.nombres} />
                                        : ''}
                                </div>

                                <div className="form-group col-12 py-1">
                                    <label>Correo</label>
                                    <input type="email" className="form-control" placeholder="Escriba el correo"
                                        name="correo" value={correo} onChange={handleInputChange} required />
                                    {error.correo
                                        ? <ValidationError text={error.correo} />
                                        : ''}
                                </div>
                                <div className="form-group col-12 py-1">
                                    <div className='d-flex justify-content-between gap-1'>
                                        <button className={'btn btn-danger' + ' ' + (loading ? 'd-block' : 'd-none')} disabled>
                                            <span>Cargando...</span>
                                        </button>
                                        <button type='submit' className={'btn btn-primary' + ' ' + (loading ? 'd-none' : 'd-block')}>
                                            <span>Guardar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            </div>

        </>
    )
}

export default Profile
