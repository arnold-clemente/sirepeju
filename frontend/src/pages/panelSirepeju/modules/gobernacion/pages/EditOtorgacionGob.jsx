import React, { useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import storage from 'storage/Storage';
import Banner from 'components/Banner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import Swal from 'sweetalert2';

import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { useQuery } from 'react-query';
import { useModal } from 'hooks/useModal'
import ModalSm from 'components/ModalMd';
import { getOtorgacionGob, updateOtorgacionGob } from 'api/otorgacionGobApi';
import { createFundadorGob, updateFundadorGob, destroyFundadorGob } from 'api/otorgacionGobApi';


const EditOtorgacionGob = () => {

  const { otorgacionGobId } = useParams();
  const queryClient = useQueryClient();
  const go = useNavigate();

  const [otorgacion, SetOtorgacion] = useState({ id: 0, nombre_persona_colectiva: '', resolucion: '', fecha_resolucion: '', sigla: '', naturaleza: '', objeto: '', domicilio_legal: '', });
  const [arrayFundadores, setArratFundadores] = useState([]);
  const [fundador, setFundador] = useState({ id: 0, nombre_completo: '', ci: '', otorgacion_gobernacion_id: 0 });
  const [loading, setLoading] = useState(false);
  const [errorval, setErrorval] = useState({});
  const [errorfun, setErrorfun] = useState({});
  const [modal, openModal, closeModal] = useModal();
  const [vista, setVista] = useState('otorgacion');
  const [button, setButton] = useState('add')

  const { isLoading, data: registro, isError, error } = useQuery({
    queryKey: ['fundadores_gobs'],
    queryFn: () => getOtorgacionGob(otorgacionGobId),
    onSuccess: async (response) => {
      const otorgob = response.otorgacion;
      const funds = response.fundadores;
      setArratFundadores(funds)
      SetOtorgacion(otorgob);
    }
  })

  const updateOtorgacion = useMutation({
    mutationFn: updateOtorgacionGob,
    onSuccess: (response) => {
      setLoading(false);
      if (response.status === true) {
        queryClient.invalidateQueries('otorgaciones_gobs');
        show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        go('/admin/otorgaciones-gobernaciones')
      } else {
        show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
        setErrorval(response.errors);
        setLoading(false);
      }
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });


  const addFundador = useMutation({
    mutationFn: createFundadorGob,
    onSuccess: (response) => {
      console.log(response)
      if (response.status === true) {
        queryClient.invalidateQueries('fundadores_gobs')
        show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
      } else {
        show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
        setErrorfun(response.errors);
        setLoading(false);
        openModal();
      }
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    },
  });

  const updateFundador = useMutation({
    mutationFn: updateFundadorGob,
    onSuccess: (response) => {
      if (response.status === true) {
        console.log(response);
        queryClient.invalidateQueries('fundadores_gobs');
        show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
      } else {
        show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
        setErrorfun(response.errors);
        setLoading(false);
        openModal();
      }
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });

  const destroyFundador = useMutation({
    mutationFn: destroyFundadorGob,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries('fundadores_gobs');
      show_alerta('Eliminado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
      setLoading(false);
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });

  const handleInputChange = ({ target }) => {
    SetOtorgacion({
      ...otorgacion,
      [target.name]: target.value
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setButton('add');
    setErrorfun({});
    const auxiliar = { id: 0, nombre_completo: '', ci: '', otorgacion_gobernacion_id: otorgacion.id }
    setFundador(auxiliar);
    openModal();
  }

  const handleEdit = (e, fundadorEdit) => {
    e.preventDefault();
    setErrorfun({});
    let auxiliar = {};
    if (fundadorEdit.ci === null) {
      auxiliar = { id: fundadorEdit.id, nombre_completo: fundadorEdit.nombre_completo, ci: '', otorgacion_gobernacion_id: fundadorEdit.otorgacion_gobernacion_id }
      setFundador(auxiliar);
    } else {
      auxiliar = { id: fundadorEdit.id, nombre_completo: fundadorEdit.nombre_completo, ci: fundadorEdit.ci, otorgacion_gobernacion_id: fundadorEdit.otorgacion_gobernacion_id }
      setFundador(auxiliar);
    }
    openModal();
    setButton('edit');
  }

  const handleDelete = (e, fundador) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estas seguro",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        destroyFundador.mutate(fundador);
      }
    });
  }

  const handleInputFund = ({ target }) => {
    setFundador({
      ...fundador,
      [target.name]: target.value
    });
  }

  const createFun = (e) => {
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
        closeModal();
        setLoading(true);
        addFundador.mutate(fundador);
      }
    });
  }

  const guardarFun = (e) => {
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
        closeModal();
        updateFundador.mutate(fundador);
      }
    });
  }

  const handleSaved = (e) => {
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
        setLoading(true);
        updateOtorgacion.mutate(otorgacion);
      }
    });
  }

  const {
    nombre_persona_colectiva,
    resolucion,
    fecha_resolucion,
    sigla,
    naturaleza,
    objeto,
    domicilio_legal,
  } = otorgacion;

  const { nombre_completo, ci } = fundador;

  if (isLoading) return <Spiner />
  else if (isError) return <div>Error: {error.message}</div>
  if (otorgacion.id === 0) return <Spiner />
  else
    return (
      <>
        {loading === true ? <Loading /> : ''}
        <div className='container-fluid mb-2'>
          <div className="row">
            <button onClick={() => setVista('otorgacion')} className='col-md-6 button_opcion_1'>Otorgacion</button>
            <button onClick={() => setVista('fundadores')} className='col-md-6 button_opcion_2'>Fundadores</button>
          </div>

        </div>

        {/* *************************+ actualizar registro **************************  */}
        {vista === 'otorgacion'
          ? <>
            <Banner text="ACTUALIZAR REGISTRO DE OTORGACION" />
            <form onSubmit={handleSaved}>
              <div className="form-group py-2">
                <label>Nombre Persona Colectiva</label>
                <input type="text" className="form-control" placeholder="Escriba Nombre de la Entidad"
                  name="nombre_persona_colectiva" value={nombre_persona_colectiva} onChange={handleInputChange} />
                {errorval.nombre_persona_colectiva
                  ? <ValidationError text={errorval.nombre_persona_colectiva} />
                  : ''}
              </div>
              <div className="row">
                <div className="form-group col-md-6 py-2">
                  <label>Sigla</label>
                  <input type="text" className="form-control" placeholder="Escriba la sigla de la Entidad"
                    name="sigla" value={sigla} onChange={handleInputChange} />
                  {errorval.sigla
                    ? <ValidationError text={errorval.sigla} />
                    : ''}
                </div>
                <div className="form-group col-md-6 py-2">
                  <label>Naturaleza</label>
                  <select className="form-control" id="exampleFormControlSelect1"
                    name="naturaleza" value={naturaleza} onChange={handleInputChange}>
                    <option value="FUNDACION">FUNDACION</option>
                    <option value="ENTIDAD SIN FINES DE LUCRO">ENTIDAD SIN FINES DE LUCRO</option>
                    <option value="ONG">ONG</option>
                    <option value="ORGANIZACIÓN SOCIAL">ORGANIZACIÓN SOCIAL</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 py-2">
                  <label>Resolucion</label>
                  <input type="text" className="form-control" placeholder="Escriba codigo de resolucion"
                    name="resolucion" value={resolucion} onChange={handleInputChange} />
                  {errorval.resolucion
                    ? <ValidationError text={errorval.resolucion} />
                    : ''}
                </div>
                <div className="form-group col-md-6 py-2">
                  <label>Fecha de Resolución</label>
                  <input type="date" className="form-control" placeholder="Escriba fecha"
                    name="fecha_resolucion" value={fecha_resolucion} onChange={handleInputChange} />
                  {errorval.fecha_resolucion
                    ? <ValidationError text={errorval.fecha_resolucion} />
                    : ''}
                </div>
              </div>
              <div className="form-group py-2">
                <label>Domicilio Legal</label>
                <input type="text" className="form-control" placeholder="Escriba el domicilio"
                  name="domicilio_legal" value={domicilio_legal} onChange={handleInputChange} />
                {errorval.domicilio_legal
                  ? <ValidationError text={errorval.domicilio_legal} />
                  : ''}
              </div>
              <div className="form-group py-2">
                <label>Objeto</label>
                <textarea rows='4' className="form-control" placeholder="Escriba el objeto"
                  name="objeto" value={objeto} onChange={handleInputChange} >
                </textarea>
                {errorval.objeto
                  ? <ValidationError text={errorval.objeto} />
                  : ''}
              </div>
              <div className='container-fluid mt-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <Link to='/admin/otorgaciones-gobernaciones' type="submit" className="btn btn-danger">Cancelar</Link>
                  <button type='submit' className='btn btn-success'>Guardar</button>
                </div>
              </div>
            </form>
          </>
          : null
        }


        {/* *************************+ para los fundadores   **************************  */}
        {vista === 'fundadores'
          ? <>
            <Banner text="ACTUALIZAR REGISTRO DE FUNDADORES" />
            <div className='container-fluid py-4'>
              <div className='d-flex justify-content-end'>
                <button onClick={handleAdd} className='btn btn-success'>Añadir</button>
              </div>
            </div>
            <table className="table mt-2">
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
                        <div className='d-flex align-items-center'>
                          <button onClick={(e) => handleDelete(e, fundador)} className="button_delete">
                            <i className="fa-solid fa-x"></i>
                            <span>Eliminar</span>
                          </button>
                          <button onClick={(e) => handleEdit(e, fundador)} className="button_edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span>Editar</span>
                          </button>
                        </div>
                      </th>
                      <th scope="row">{fundador.id}</th>
                      <td>{fundador.nombre_completo}</td>
                      <td>{fundador.ci}</td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
            <div className='container-fluid mt-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <Link to='/admin/otorgaciones-gobernaciones' type="submit" className="btn btn-danger">Cancelar</Link>
              </div>
            </div>
            {/* modal para editar fundadores  */}
            <ModalSm isOpen={modal} closeModal={closeModal} title={'Editar Fundador'}>
              <div className='container-fluid'>
                <div className='row'>
                  <div className="form-group col-12 py-2">
                    <label>Nombre Completo</label>
                    <input type="text" className="form-control" placeholder="Escriba el nombre completo"
                      name="nombre_completo" value={nombre_completo} onChange={handleInputFund} />
                    {errorfun.nombre_completo
                      ? <ValidationError text={errorfun.nombre_completo} />
                      : ''}
                  </div>
                  <div className="form-group col-12 py-2">
                    <label>Cedula de Identidad</label>
                    <input type="text" className="form-control" placeholder="Ej. 9223453"
                      name="ci" value={ci} onChange={handleInputFund} />
                    {errorfun.ci
                      ? <ValidationError text={errorfun.ci} />
                      : ''}
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-between mt-4'>
                  <button onClick={(e) => closeModal()} className='btn btn-danger'>Cancelar</button>
                  {button === 'add'
                    ? <button onClick={createFun} className='btn btn-primary'>Añadir</button>
                    : null}
                  {button === 'edit'
                    ? <button onClick={guardarFun} className='btn btn-primary'>Actualizar</button>
                    : null}
                </div>
              </div>
            </ModalSm>
          </>
          : null}
      </>
    )
}

export default EditOtorgacionGob
