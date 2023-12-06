import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom'

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';

import { createFundadores } from '../../api/adecuacionApi';

const FundAdecuacion = () => {
    const { adecuacionId } = useParams();
    const queryClient = useQueryClient();
    const go = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fundador, setFundador] = useState({ id: 1, nombre: '', ci: '', adecuacion_id: adecuacionId })
    const [arrayFundadores, setArratFundadores] = useState([]);
    const [errorval, setErrorval] = useState({ nombre: '', ci: '' })
    let array = [];

    const handleInputChange = ({ target }) => {
        setFundador({
            ...fundador,
            [target.name]: target.value
        });
    };
    const { nombre, ci } = fundador;

    const create = (e) => {
        e.preventDefault();
        if (nombre != '') {
            if (nombre.length < 100) {
                if (ci.length < 12) {
                    array.push(fundador);
                    setArratFundadores([...arrayFundadores, ...array]);
                    setFundador({ id: fundador.id + 1, nombre: '', ci: '', adecuacion_id: adecuacionId })
                }
                else {
                    setErrorval({ nombre: '', ci: 'ci demasiado largo' })
                    setTimeout(() => { setErrorval({ nombre: '', ci: '' }) }, 2000)
                }
            } else {
                setErrorval({ nombre: 'Nombre de fundador demasiado largo', ci: '' })
                setTimeout(() => { setErrorval({ nombre: '', ci: '' }) }, 2000)
            }
        } else {
            setErrorval({ nombre: 'Nombre de fundador es requerido', ci: '' })
            setTimeout(() => { setErrorval({ nombre: '', ci: '' }) }, 2000)
        }

    }

    const handleDelete = (e, delfundador) => {
        e.preventDefault();
        arrayFundadores.sort((a, b) => b.id - a.id).map((element, index) => {
            if (element.id == delfundador.id) {
                const auxiliar = arrayFundadores;
                auxiliar.splice(index, 1);
                setArratFundadores([...auxiliar]);
            }
        })

    }

    const addFundadores = useMutation({
        mutationFn: createFundadores,
        onSuccess: (response) => {
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('adecuaciones')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                go('/adecuaciones')
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
        },
    });

    const createdFundadores = (e) => {
        e.preventDefault();
        setLoading(true);
        addFundadores.mutate(arrayFundadores);
    }

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Banner text="INGRESAR FUNDADORES" />
            <div className='container-fluid mt-4'>
                <form onSubmit={create} className='row'>
                    <div className='col-md-6 px-0'>
                        <input className='form-control' placeholder='Ingrese el nombre completo'
                            onChange={handleInputChange} name='nombre' value={nombre} />
                        <span className='fs-6 text-danger'>{errorval.nombre}</span>
                    </div>
                    <div className='col-md-4 px-0'>
                        <input className='form-control' placeholder='Cedula de identidad'
                            onChange={handleInputChange} name='ci' value={ci} />
                        <span className='fs-6 text-danger'>{errorval.ci}</span>
                    </div>
                    <div className='col-md-2 px-0'>
                        <button type='submit' className='btn btn-success'>Añadir</button>
                    </div>
                </form>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Accion</th>
                            <th scope="col">#</th>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Cedula Indentidad</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {arrayFundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                            return (
                                <tr key={fundador.id}>
                                    <th>
                                        <button onClick={(e) => handleDelete(e, fundador)} className="button_delete">
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </th>
                                    <th scope="row">{fundador.id}</th>
                                    <td>{fundador.nombre}</td>
                                    <td>{fundador.ci}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                {arrayFundadores.length > 0
                    ? <div className='container-fluid mt-4'>
                        <div className='d-flex justify-content-between'>
                            <Link to='/adecuaciones' type="submit" className="btn btn-danger">Cancelar</Link>
                            <button onClick={createdFundadores} className='btn btn-success'>Guardar</button>
                        </div>
                    </div>
                    : ''
                }

            </div>
        </>
    )
}

export default FundAdecuacion
