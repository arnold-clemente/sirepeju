import { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

import { useMutation, useQueryClient } from 'react-query';
import { getEnlace, updateEnlace } from 'api/panel/enlaceApi';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import Banner from 'components/Banner';
import image_default from 'assets/images/servicios.png'

const EditarEnlace = () => {
  const queryClient = useQueryClient();
  const go = useNavigate();
  const { enlaceId } = useParams();

  const [error, serError] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageprev, setImageprev] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const [enlaceenv, setEnlace] = useState({
    id: 0,
    enlace: '',
    nombre: '',
    imagen: null,
    tipo: 1,
  });

  const { id, enlace, nombre, imagen, tipo } = enlaceenv;

  useEffect(() => {
    if (id == 0) {
      getPanelEnlace.mutate(enlaceId)
    }

  }, [id])

  const getPanelEnlace = useMutation({
    mutationFn: getEnlace,
    onSuccess: (response) => {
      setEnlace({ ...enlaceenv, ...response });
      setImageprev(true)
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    },
  });

  if (enlaceId == 0) {
    return <Navigate to='/panel/enlaces' />
  }

  const handleInputFile = ({ target }) => {
    setEnlace({
      ...enlaceenv,
      [target.name]: URL.createObjectURL(target.files[0])
    });
    if (target.name == 'imagen') {
      setImageprev(false);
    }
  };

  const handleInputChange = ({ target }) => {
    setEnlace({
      ...enlaceenv,
      [target.name]: target.value
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    formData.append('enlace_id', enlaceenv.id)

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
        editEnlace.mutate(formData);
      }
    });
  };

  const editEnlace = useMutation({
    mutationFn: updateEnlace,
    onSuccess: (response) => {
      if (response.status === true) {
        console.log(response)
        queryClient.invalidateQueries('panel_enlaces')
        queryClient.invalidateQueries('inicio')
        show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        setLoading(false);
        go('/panel/enlaces')
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
          <Banner text="ACTUALIZACIÓN DE ENLACE" />
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

              <div className="form-group col-12 py-1">
                <label>Nombre</label>
                <input type="text" className="form-control" placeholder="Escriba el Nombre de enlace"
                  name="nombre" value={nombre} onChange={handleInputChange} required />
                {error.nombre
                  ? <ValidationError text={error.nombre} />
                  : ''}
              </div>
              <div className="form-group col-12 py-1">
                <label>Direccion URL</label>
                <input type="text" className="form-control" placeholder="https//www.example.com"
                  name="enlace" value={enlace} onChange={handleInputChange} required />
                {error.enlace
                  ? <ValidationError text={error.enlace} />
                  : ''}
              </div>

              <div className="form-group col-md-12 py-2">
                <div className="form-group">
                  <label>TIPO DE ENLACE</label>
                  <select className="form-control" id="exampleFormControlSelect1"
                    name="tipo" value={tipo} onChange={handleInputChange}>
                    <option value="1">INTERES</option>
                    <option value="2">GOBERNACIÓN</option>
                  </select>
                </div>
              </div>
              <div className="form-group col-12 py-1">
                <div className='d-flex justify-content-between gap-1'>
                  <Link to='/panel/enlaces' type="submit" className="btn btn-danger my-4">Cancelar</Link>
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

export default EditarEnlace
