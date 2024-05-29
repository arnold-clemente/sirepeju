import React, { useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getRegistrado, updateRegistrado } from '../../api/registradoApi';

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import Banner from '../../components/Banner';

const EditRegistrados = () => {

  const { registradoId } = useParams();
  const queryClient = useQueryClient();
  const go = useNavigate();

  const [registrado, setRegistrado] = useState({
    id: 0,
    fecha: "",
    codigo: "",
    personalidad_juridica: "",
    sigla: "",
    naturaleza: 'FUNDACION',
    observacion: "Sin Observacion",
    estado: 1,
    administrativo_id: 0,
    created_at: "",
    updated_at: ""
  });

  const { fecha, codigo, personalidad_juridica, sigla, naturaleza, observacion } = registrado;

  const { isLoading, data: registro, isError, error } = useQuery({
    queryFn: () => getRegistrado(registradoId),
    onSuccess: async (response) => {
      await setRegistrado({ ...registrado, ...response });
    }
  })
  if (!registro) {
    return <Navigate to='/admin/registrados' />
  }

  const [errorval, serErrorval] = useState({});

  const [loading, setLoading] = useState(false);

  const updateAdm = useMutation({
    mutationFn: updateRegistrado,
    onSuccess: (response) => {
      console.log(response)
      setLoading(false);
      if (response.status === true) {
        queryClient.invalidateQueries('registrados')
        show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        go('/admin/registrados')
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
    setRegistrado({
      ...registrado,
      [target.name]: target.value
    });
  };


  const handleUpdate = (e) => {
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
        updateAdm.mutate(registrado);
      }

    });
  };

  if (isLoading) return <Spiner />
  else if (isError) return <div>Error: {error.message}</div>
  if (registrado.id === 0) return <Spiner />
  else
    return (
      <>
        {loading === true ? <Loading /> : ''}
        <Banner text="ACTUALIZACIÓN DE REGISTRADO ADECUACIÓN" />
        <form onSubmit={handleUpdate} >
          <div className="form-group py-2">
            <label>Nombre de la persona colectiva</label>
            <input type="text" className="form-control" placeholder="Escriba Nombre de la Entidad"
              name="personalidad_juridica" value={personalidad_juridica} onChange={handleInputChange} />
            {errorval.personalidad_juridica
              ? <ValidationError text={errorval.personalidad_juridica} />
              : ''}
          </div>
          <div className="form-group py-2">
            <label>Sigla</label>
            <input type="text" className="form-control" placeholder="Escriba la sigla de la Entidad"
              name="sigla" value={sigla} onChange={handleInputChange} />
            {errorval.sigla
              ? <ValidationError text={errorval.sigla} />
              : ''}
          </div>

          <div className="form-group">
            <label>Naturaleza</label>
            <select className="form-control" id="exampleFormControlSelect1"
              name="naturaleza" value={naturaleza} onChange={handleInputChange}>
              <option value="FUNDACION">FUNDACIÓN</option>
              <option value="ENTIDAD SIN FINES DE LUCRO">ENTIDAD SIN FINES DE LUCRO</option>
              <option value="ONG">ONG</option>
              <option value="ORGANIZACIÓN SOCIA">ORGANIZACIÓN SOCIAL</option>
            </select>
          </div>

          <div className='row'>

            <div className="col-md-6">
              <label className="form-label">Fecha de registro:</label>
              <input type="date" className="form-control" placeholder="fecha" aria-label="First name"
                name="fecha" value={fecha} onChange={handleInputChange} />
              {errorval.fecha
                ? <ValidationError text={errorval.fecha} />
                : ''}
            </div>

            <div className="col-md-6">
              <label className="form-label">Num_Registro</label>
              <input type="text" className="form-control" placeholder="Escriba codigo 123" aria-label="Codigo"
                name="codigo" value={codigo} onChange={handleInputChange} />
              {errorval.codigo
                ? <ValidationError text={errorval.codigo} />
                : ''}
            </div>

            <div className="col-md-12">
              <label className="form-label">Tipo de registro de adecuación</label>
              <textarea rows={5} className="form-control" placeholder="Escriba una Observacion" aria-label="Last name" name="observacion" value={observacion} onChange={handleInputChange} />
              {errorval.observacion
                ? <ValidationError text={errorval.observacion} />
                : ''}
            </div>
          </div>
          <Link to='/admin/registrados' type="submit" className="btn btn-danger my-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary my-4 mx-4">Actualizar cambios</button>
        </form>
      </>
    )
}

export default EditRegistrados;
