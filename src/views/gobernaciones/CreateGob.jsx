import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import storage from '../../Storage/storage'
import { useForm } from '../../hooks/useForm';
import Banner from '../../components/Banner';
import { useMutation } from 'react-query';
import { createGobernacion } from '../../api/gobernacionApi';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import { useQueryClient } from 'react-query';
import Loading from '../../components/Loading';

const CreateGob = () => {

    const queryClient = useQueryClient();

    const go = useNavigate();

    const [error, serError] = useState({});
    const [loading, setLoading] = useState(false);

    const addGobernacion = useMutation({
        mutationFn: createGobernacion,
        onSuccess: (response) => {
            console.log(response)
            if (response.status === true) {
                queryClient.invalidateQueries('gobernacions')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/user-gobernaciones')
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

    const [formValues, handleInputChange] = useForm({
        departamento_id: 4,
        correo: 'marika@marika.com',
        user_id: storage.get('authUser').id,
        password: '87654321'
    });

    const handleAdd = (e) => {
        setLoading(true);
        e.preventDefault();
        const gobernacion = formValues;
        addGobernacion.mutate(gobernacion);
    };

    const { departamento_id, correo, user_id, password } = formValues;

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="CREACIÓN DE NUEVO USUARIO GOBERNACIÓN" />
            <form onSubmit={handleAdd}>
                <div className="row">
                    <div className="form-group col-md-12 py-2">
                        <div className="form-group">
                            <label>Expedido</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                name="departamento_id" value={departamento_id} onChange={handleInputChange}>
                                <option value="1">BENI</option>
                                <option value="2">CHUQUISACA</option>
                                <option value="3">COCHABAMBA</option>
                                <option value="4">LA PAZ</option>
                                <option value="5">ORURO</option>
                                <option value="6">PANDO</option>
                                <option value="7">POTOSI</option>
                                <option value="8">SANTA CRUZ</option>
                                <option value="9">TARIJA</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group py-2">
                    <label>Correo Electronico</label>
                    <input type="email" className="form-control" placeholder="correo electronico de referencia"
                        name="correo" value={correo} onChange={handleInputChange} />
                    {error.correo
                        ? <ValidationError text={error.correo} />
                        : ''}
                </div>
                <div className="form-group py-2">
                    <label>Contraseña</label>
                    <input type="text" className="form-control" placeholder="Escriba una contraseña"
                        name="password" value={password} onChange={handleInputChange} />
                    {error.password
                        ? <ValidationError text={error.password} />
                        : ''}
                </div>

                <Link to='/user-gobernaciones' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                <button type="submit" className="btn btn-primary my-4 mx-4">Enviar</button>
            </form>
        </>
    )
}

export default CreateGob
