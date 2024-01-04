import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import storage from '../../Storage/storage'
import { useForm } from '../../hooks/useForm';

import { useMutation, useQueryClient } from 'react-query';
import { createRegistrado } from '../../api/registradoApi';

import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import Loading from '../../components/Loading';
import Banner from '../../components/Banner';


const CreatedRegistrados = () => {

  const queryClient = useQueryClient();
  const go = useNavigate();

  const [error, serError] = useState({});
  const [loading, setLoading] = useState(false);

  const addRegistrado = useMutation({
    mutationFn: createRegistrado,
    onSuccess: (response) => {
      console.log(response);
      if (response.status === true) {
        queryClient.invalidateQueries('registrados')
        show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        go('/admin/registrados')
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
    fecha: '',
    codigo: '',
    personalidad_juridica: '',
    sigla: '',
    naturaleza: 'FUNDACION',
    observacion: 'sin observacion',
    estado: 1,
    user_id: storage.get('authUser').id
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const registrado = formValues;
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
        addRegistrado.mutate(registrado);
      }
    });
  };

  const { fecha, codigo, personalidad_juridica, sigla, naturaleza, observacion } = formValues;

  return (
    <>
      {loading === true ? <Loading /> : ''}
      <Banner text="CREACIÓN DE NUEVO REGISTRO ADECUACIÓN" />
      <form onSubmit={handleAdd}>
        <div className="form-group py-2">
          <label>Personalidad Juridica</label>
          <input type="text" className="form-control" placeholder="Escriba Nombre de la Entidad"
            name="personalidad_juridica" value={personalidad_juridica} onChange={handleInputChange} />
          {error.personalidad_juridica
            ? <ValidationError text={error.personalidad_juridica} />
            : ''}
        </div>
        <div className="form-group py-2">
          <label>Sigla</label>
          <input type="text" className="form-control" placeholder="Escriba la sigla de la Entidad"
            name="sigla" value={sigla} onChange={handleInputChange} />
          {error.sigla
            ? <ValidationError text={error.sigla} />
            : ''}
        </div>

        <div className="form-group">
          <label>Naturaleza</label>
          <select className="form-control" id="exampleFormControlSelect1"
            name="naturaleza" value={naturaleza} onChange={handleInputChange}>
            <option value="FUNDACION">FUNDACION</option>
            <option value="ENTIDAD SIN FINES DE LUCRO">ENTIDAD SIN FINES DE LUCRO</option>
            <option value="ONG">ONG</option>
            <option value="ORGANIZACIÓN SOCIA">ORGANIZACIÓN SOCIAL</option>
          </select>
        </div>

        <div className='row'>
          <div className="col-md-6">
            <label className="form-label">Fecha:</label>
            <input type="date" className="form-control" placeholder="fecha" aria-label="First name"
              name="fecha" value={fecha} onChange={handleInputChange} />
            {error.fecha
              ? <ValidationError text={error.fecha} />
              : ''}
          </div>
          <div className="col-md-6">
            <label className="form-label">Codigo</label>
            <input type="text" className="form-control" placeholder="Escriba codigo 123" aria-label="Codigo"
              name="codigo" value={codigo} onChange={handleInputChange} />
            {error.codigo
              ? <ValidationError text={error.codigo} />
              : ''}
          </div>
          <div className="col-md-12">
            <label className="form-label">Observacion</label>
            <textarea rows={5} className="form-control" placeholder="Escriba una Observacion" aria-label="Last name" name="observacion" value={observacion} onChange={handleInputChange} />
            {error.observacion
              ? <ValidationError text={error.observacion} />
              : ''}
          </div>
        </div>

        <Link to='/admin/registrados' type="submit" className="btn btn-danger my-4">Cancelar</Link>
        <button type="submit" className="btn btn-primary my-4 mx-4">Guardar</button>
      </form>
    </>
  )
}

export default CreatedRegistrados;
