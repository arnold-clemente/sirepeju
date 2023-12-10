import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

import ModalDiv from '../../components/ModalDiv'
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import Loading from '../../components/Loading';
import ModalSm from '../../components/ModalSm';
import { useModal } from '../../hooks/useModal';

import { useMutation, useQueryClient } from 'react-query';
import { getFundadoresOtorgacion, createFundadorOtor, updateFundadorOtor, destroyFundadorOtor } from '../../api/modificacionOtorgacionApi';
import { updateOtorgacionModificacion } from '../../api/modificacionOtorgacionApi';

const ModalUpdateOtorgacion = ({ registro, handleInputChange, modal, open, close }) => {

  const queryClient = useQueryClient();

  const [vista, setVista] = useState('otorgacion');
  const [button, setButton] = useState('add')
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorval, setErrorval] = useState({});
  const [errorfun, setErrorfun] = useState({});
  const [arrayFundadores, setArratFundadores] = useState([]);
  const [fundador, setFundador] = useState({ id: 0, nombre_completo: '', ci: '', otorgacion_id: 0 });
  const [modalFundador, openFundador, closeFundador] = useModal();

  const { personalidad_juridica, otorgacion_id, domicilio_legal, estatuto_organico, reglamento_interno } = registro;

  const { nombre_completo, ci } = fundador;

  useEffect(() => {
    if (otorgacion_id != 0) {
      setCargando(true);
      getFundadores.mutate(otorgacion_id);
    }
    setErrorval({});
  }, [otorgacion_id])


  const getFundadores = useMutation({
    mutationFn: getFundadoresOtorgacion,
    onSuccess: (response) => {
      open();
      setArratFundadores(response);
      setCargando(false);
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
    },
  });

  const createFun = (e) => {
    e.preventDefault();
    closeFundador();
    close();
    setLoading(true);
    addFundador.mutate(fundador);
  }

  const addFundador = useMutation({
    mutationFn: createFundadorOtor,
    onSuccess: (response) => {
      console.log(response)
      if (response.status === true) {
        queryClient.invalidateQueries('modificaciones_otorgacion')
        show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        setCargando(true);
        getFundadores.mutate(otorgacion_id);
      } else {
        show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
        setErrorfun(response.errors);
        setLoading(false);
        open();
        openFundador();
      }
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setButton('add');
    setErrorfun({});
    const auxiliar = { id: 0, nombre_completo: '', ci: '', otorgacion_id: registro.otorgacion_id }
    setFundador(auxiliar);
    openFundador();
  }

  const handleEdit = (e, fundadorEdit) => {
    e.preventDefault();
    setErrorfun({});
    let auxiliar = {};
    if (fundadorEdit.ci === null) {
      auxiliar = { id: fundadorEdit.id, nombre_completo: fundadorEdit.nombre_completo, ci: '', otorgacion_id: fundadorEdit.otorgacion_id }
      setFundador(auxiliar);
    } else {
      auxiliar = { id: fundadorEdit.id, nombre_completo: fundadorEdit.nombre_completo, ci: fundadorEdit.ci, otorgacion_id: fundadorEdit.otorgacion_id }
      setFundador(auxiliar);
    }
    openFundador();
    setButton('edit');
  }

  const guardarFun = (e) => {
    e.preventDefault();
    closeFundador();
    close();
    setLoading(true);
    updateFundador.mutate(fundador);
  }

  const updateFundador = useMutation({
    mutationFn: updateFundadorOtor,
    onSuccess: (response) => {
      console.log(response)
      if (response.status === true) {
        queryClient.invalidateQueries('modificaciones_otorgacion')
        show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        setCargando(true);
        getFundadores.mutate(otorgacion_id);
      } else {
        show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
        setErrorfun(response.errors);
        setLoading(false);
        open();
        openFundador();
      }
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });

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
        close();
        destroyFundador.mutate(fundador);
      }
    });
  }

  const destroyFundador = useMutation({
    mutationFn: destroyFundadorOtor,
    onSuccess: (response) => {
      console.log(response)
      queryClient.invalidateQueries('modificaciones_otorgacion')
      show_alerta('Eliminado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
      setLoading(false);
      setCargando(true);
      getFundadores.mutate(otorgacion_id);
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });

  const handleInputFund = ({ target }) => {
    setFundador({
      ...fundador,
      [target.name]: target.value
    });
  }

  const handleSaved = (e) => {
    e.preventDefault();
    setErrorval({});
    const formData = new FormData(e.currentTarget)
    formData.append('otorgacion_id', otorgacion_id)
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto...!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar!"
    }).then((result) => {
      if (result.isConfirmed) {
        // for (const value of formData.values()) {
        //   console.log(value);
        // }
        setLoading(true);
        close();
        updatedOtorgacion.mutate(formData)
      }
    });
  }

  const updatedOtorgacion = useMutation({
    mutationFn: updateOtorgacionModificacion,
    onSuccess: (response) => {
      console.log(response)
      if (response.status === true) {
        queryClient.invalidateQueries('modificaciones_otorgacion')
        queryClient.invalidateQueries('personalidadesotorgacion')
        show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
      } else {
        show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
        setErrorval(response.errors);
        setLoading(false);
        open();
      }
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });

  if (!registro) {
    <Loading />
  } else {
    return (
      <>
        {loading === true ? <Loading /> : ''}
        <ModalDiv isOpen={modal} closeModal={close} title={'Modificar'}>
          <div className='container-fluid mb-2'>
            <div className="row">
              <button onClick={() => setVista('otorgacion')} className='col-md-6 button_opcion_1'>Otorgacion</button>
              <button onClick={() => setVista('fundadores')} className='col-md-6 button_opcion_2'>Fundadores</button>
            </div>

          </div>
          {vista === 'otorgacion'
            ? <>
              <form onSubmit={handleSaved}>
                <div className="form-group py-2">
                  <label>Nombre Persona Colectiva</label>
                  <input type="text" className="form-control" placeholder="Escriba Nombre de la Entidad"
                    name="personalidad_juridica" value={personalidad_juridica} onChange={handleInputChange} />
                  {errorval.personalidad_juridica
                    ? <ValidationError text={errorval.personalidad_juridica} />
                    : ''}
                </div>
                <div className="row">
                  <div className="form-group col-md-6 py-2">
                    <label>Estatuto Organico</label>
                    <input type="file" className="form-control"
                      name="estatuto_organico" id="estatuto_organico" />
                    {errorval.estatuto_organico
                      ? <ValidationError text={errorval.estatuto_organico} />
                      : ''}
                  </div>
                  <div className="form-group col-md-6 py-2">
                    <label>Reglamento Interno</label>
                    <input type="file" className="form-control"
                      name="reglamento_interno" id="reglamento_interno" />
                    {errorval.reglamento_interno
                      ? <ValidationError text={errorval.reglamento_interno} />
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

                <div className='container-fluid mt-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <button onClick={close} className="btn btn-danger">Cancelar</button>
                    <button type='submit' className='btn btn-success'>Guardar</button>
                  </div>
                </div>
              </form>
            </>
            : null
          }

          {vista === 'fundadores'
            ? <>
              <div className='container-fluid py-4'>
                <div className='d-flex justify-content-end'>
                  <button onClick={handleAdd} className='btn btn-success'>Añadir</button>
                </div>
              </div>
              {cargando === false
                ? (<table className="table mt-2">
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
                </table>)
                : <div className='spiner_content'><span className='loader_spiner'></span></div>}
              <div className='container-fluid mt-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <button onClick={close} className="btn btn-danger">Cancelar</button>
                </div>
              </div>
              {/* modal para editar fundadores  */}
              <ModalSm isOpen={modalFundador} closeModal={closeFundador} title={'Editar Fundador'}>
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
                    <button onClick={(e) => closeFundador()} className='btn btn-danger'>Cancelar</button>
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


        </ModalDiv>
      </>
    )
  }
}

export default ModalUpdateOtorgacion
