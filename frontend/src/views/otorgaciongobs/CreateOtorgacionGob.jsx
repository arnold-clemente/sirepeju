import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom'
import storage from '../../Storage/storage'
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import Loading from '../../components/Loading';

import { useMutation } from 'react-query';
import { createOtorgacionGob } from '../../api/otorgacionGobApi';
import { useQueryClient } from 'react-query';


const CreateOtorgacionGob = () => {

  const queryClient = useQueryClient();
  const go = useNavigate();

  const [error, serError] = useState({});
  const [loading, setLoading] = useState(false);
  const [fundador, setFundador] = useState({ id: 1, nombre: '', ci: '' });
  const [errorval, setErrorval] = useState({ nombre: '', ci: '' });
  const [arrayFundadores, setArratFundadores] = useState([]);
  let array = [];

  const [otorgacion, SetOtorgacion] = useState({
    nombre_persona_colectiva: '',
    resolucion: '',
    fecha_resolucion: '',
    sigla: '',
    naturaleza: 'ORGANIZACIÓN SOCIAL',
    domicilio_legal: '',
    objeto: '',
    user_id: storage.get('authUser').id,
    arrayFundadores: [],
  });

  const addOtorgacion = useMutation({
    mutationFn: createOtorgacionGob,
    onSuccess: (response) => {
      console.log(response)
      if (response.status === true) {
        queryClient.invalidateQueries('otorgaciones_gobs')
        show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        go('/admin/otorgaciones-gobernaciones')
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

  const handleAdd = (e) => {
    e.preventDefault();
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
        const enviar = { ...otorgacion, arrayFundadores }
        setLoading(true);
        addOtorgacion.mutate(enviar);
      }
    });
  };

  const create = (e) => {
    e.preventDefault();
    if (nombre != '') {
      if (nombre.length < 100) {
        if (ci.length < 12) {
          array.push(fundador);
          setArratFundadores([...arrayFundadores, ...array]);
          setFundador({ id: fundador.id + 1, nombre: '', ci: '' })
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

  const handleInputChangeaFund = ({ target }) => {
    setFundador({
      ...fundador,
      [target.name]: target.value
    });
  };

  const handleInputChange = ({ target }) => {
    SetOtorgacion({
      ...otorgacion,
      [target.name]: target.value
    });
  };

  const {
    nombre_persona_colectiva,
    resolucion,
    fecha_resolucion,
    sigla,
    naturaleza,
    objeto,
    domicilio_legal,
  } = otorgacion;

  const { nombre, ci } = fundador;

  return (
    <>
      {loading === true ? <Loading /> : ''}
      <Banner text="REGISTRO DE PERSONA COLECTIVA EMITIDA POR GOBIERNOS AUTÓNOMOS DEPARTAMENTALES" />
      <div>
        <div className="form-group py-2">
          <label>Nombre Persona Colectiva</label>
          <input type="text" className="form-control" placeholder="Escriba nombre de la institución"
            name="nombre_persona_colectiva" value={nombre_persona_colectiva} onChange={handleInputChange} />
          {error.nombre_persona_colectiva
            ? <ValidationError text={error.nombre_persona_colectiva} />
            : ''}
        </div>
        <div className="row">
          <div className="form-group col-md-6 py-2">
            <label>Sigla</label>
            <input type="text" className="form-control" placeholder="sigla de la institución"
              name="sigla" value={sigla} onChange={handleInputChange} />
            {error.sigla
              ? <ValidationError text={error.sigla} />
              : ''}
          </div>
          <div className="form-group col-md-6 py-2">
            <label>Naturaleza</label>
            <select className="form-control" id="exampleFormControlSelect1"
              name="naturaleza" value={naturaleza} onChange={handleInputChange}>
              <option value="FUNDACION">FUNDACIÓN</option>
              <option value="ENTIDAD SIN FINES DE LUCRO">ENTIDAD SIN FINES DE LUCRO</option>
              <option value="ONG">ONG</option>
              <option value="ORGANIZACIÓN SOCIAL">ORGANIZACIÓN SOCIAL</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6 py-2">
            <label>Resolución administrativa</label>
            <input type="text" className="form-control" placeholder="número de resolución"
              name="resolucion" value={resolucion} onChange={handleInputChange} />
            {error.resolucion
              ? <ValidationError text={error.resolucion} />
              : ''}
          </div>
          <div className="form-group col-md-6 py-2">
            <label>Fecha de Resolución</label>
            <input type="date" className="form-control" placeholder="Escriba fecha"
              name="fecha_resolucion" value={fecha_resolucion} onChange={handleInputChange} />
            {error.fecha_resolucion
              ? <ValidationError text={error.fecha_resolucion} />
              : ''}
          </div>
        </div>
        <div className="form-group py-2">
          <label>Domicilio legal</label>
          <input type="text" className="form-control" placeholder="Escriba el domicilio"
            name="domicilio_legal" value={domicilio_legal} onChange={handleInputChange} />
          {error.domicilio_legal
            ? <ValidationError text={error.domicilio_legal} />
            : ''}
        </div>
        <div className="form-group py-2">
          <label>Objeto o Sector</label>
          <textarea rows='4' className="form-control" placeholder="Escriba el objeto o sector a la que la entidad se dedica"
            name="objeto" value={objeto} onChange={handleInputChange} >
          </textarea>
          {error.objeto
            ? <ValidationError text={error.objeto} />
            : ''}
        </div>
      </div>

      {/* fundadores   */}
      {error.arrayFundadores
        ? <div className="alert alert-primary" role="alert">
          {error.arrayFundadores}
        </div>
        : ''}

      <div className='container-fluid mt-2'>
        <form onSubmit={create} className='row'>
          <div className='col-md-6 px-0'>
            <label>Miembro fundador</label>
            <input className='form-control' placeholder='Ingrese el nombre completo'
              onChange={handleInputChangeaFund} name='nombre' value={nombre} />
            <span className='fs-6 text-danger'>{errorval.nombre}</span>
          </div>
          <div className='col-md-4 px-0'>
            <label>Cedula de Identidad</label>
            <input className='form-control' placeholder='Cedula de identidad'
              onChange={handleInputChangeaFund} name='ci' value={ci} />
            <span className='fs-6 text-danger'>{errorval.ci}</span>
          </div>
          <div className='col-md-2 px-0 mt-4'>
            <button type='submit' className='btn btn-success'>Añadir</button>
          </div>
        </form>

        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Acción</th>
              <th scope="col">N°</th>
              <th scope="col">Nombre completo</th>
              <th scope="col">Cedula indentidad</th>
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
        <div className='container-fluid mt-4'>
          <div className='d-flex justify-content-between align-items-center'>
            <Link to='/admin/otorgaciones-gobernaciones' type="submit" className="btn btn-danger">Cancelar</Link>
            {arrayFundadores.length > 0
              ? <button onClick={handleAdd} className='btn btn-success'>Guardar</button>
              : ''
            }
          </div>
        </div>



      </div>
    </>
  )
}

export default CreateOtorgacionGob
