import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import Banner from '../../components/Banner';
import { getGobernacion } from '../../api/gobernacionApi';
import Loading from '../../components/Loading';
import { useNavigate, Link } from 'react-router-dom'
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import { useQueryClient } from 'react-query';
import { updateGobernacion } from '../../api/gobernacionApi';
import { useMutation } from 'react-query';

const EditGob = () => {

    const { gobernacionId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();

    const [gobernacion, setGobernacion] = useState({
        departamento_id: 4,
        id: 0,
    });

    const { isLoading, data: registro, isError, error } = useQuery({
        queryFn: () => getGobernacion(gobernacionId),
        onSuccess: async (response) => {
            await setGobernacion(response);
        }
    })

    const [errorval, serErrorval] = useState({});
    const { nombres, paterno, materno, cargo, ci, ext_ci, email, departamento_id, user_id } = gobernacion;

    const [loading, setLoading] = useState(false);

    const updateGob = useMutation({
        mutationFn: updateGobernacion,
        onSuccess: (response) => {
            console.log(response);
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('gobernacions')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/user-gobernaciones')
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErrorval(response.errors);
                setLoading(false);
            }
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        }
    });

    const handleInputChange = ({ target }) => {
        setGobernacion({
            ...gobernacion,
            [target.name]: target.value
        });
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        updateGob.mutate(gobernacion);
    };

    if (isLoading) return <Loading />
    else if (isError) return <div>Error: {errorval.message}</div>
    if (gobernacion.id === 0) return <Loading />
    else
        return (
            <>
                {loading === true ? <Loading /> : ''}
                <Banner text="ACTUALIZACIÓN DE USUARIO GOBERNACIÓN" />
                <form onSubmit={handleUpdate}>
                    <div className="form-group py-2">
                        <label>Nombres</label>
                        <input type="text" className="form-control" placeholder="Escriba Nombre Completo"
                            name="nombres" value={nombres} onChange={handleInputChange} />
                        {errorval.nombres
                            ? <ValidationError text={errorval.nombres} />
                            : ''}
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6 py-2">
                            <label>Apellido Paterno</label>
                            <input type="text" className="form-control" placeholder="Escriba apellido paterno"
                                name="paterno" value={paterno} onChange={handleInputChange} />
                            {errorval.paterno
                                ? <ValidationError text={errorval.paterno} />
                                : ''}
                        </div>
                        <div className="form-group col-md-6 py-2">
                            <label>Apellido Materno</label>
                            <input type="text" className="form-control" placeholder="Escriba apellido materno"
                                name="materno" value={materno} onChange={handleInputChange} />
                            {errorval.materno
                                ? <ValidationError text={errorval.materno} />
                                : ''}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6 py-2">
                            <label>Cedula de Identidad</label>
                            <input type="text" className="form-control" placeholder="Escriba la cedula de identidad"
                                name="ci" value={ci} onChange={handleInputChange} />
                            {errorval.ci
                                ? <ValidationError text={errorval.ci} />
                                : ''}
                        </div>
                        <div className="form-group col-md-6 py-2">
                            <div className="form-group">
                                <label>Expedido</label>
                                <select className="form-control" id="exampleFormControlSelect1"
                                    name="ext_ci" value={ext_ci} onChange={handleInputChange}>
                                    <option value="LP">LA PAZ</option>
                                    <option value="OR">ORURO</option>
                                    <option value="PT">POTOSI</option>
                                    <option value="CB">COCHABAMBA</option>
                                    <option value="SC">SANTA CRUZ</option>
                                    <option value="BN">BENI</option>
                                    <option value="PA">PANDO</option>
                                    <option value="TJ">TARIJA</option>
                                    <option value="CH">CHUQUISACA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group py-2">
                        <label>Correo Electronico</label>
                        <input type="email" className="form-control" placeholder="correo electronico de referencia"
                            name="email" value={email} onChange={handleInputChange} />
                        {errorval.email
                            ? <ValidationError text={errorval.email} />
                            : ''}
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6 py-2">
                            <label>Cargo</label>
                            <input type="text" className="form-control" placeholder="Escriba el cargo"
                                name="cargo" value={cargo} onChange={handleInputChange} />
                            {errorval.cargo
                                ? <ValidationError text={errorval.cargo} />
                                : ''}
                        </div>
                        <div className="form-group col-md-6 py-2">
                            <div className="form-group">
                                <label>Gobernacion Departamento </label>
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
                    <Link to='/user-gobernaciones' type="submit" className="btn btn-danger my-4">Cancelar</Link>
                    <button type="submit" className="btn btn-primary my-4 mx-4">Actualizar</button>
                </form>
            </>
        )
}

export default EditGob
