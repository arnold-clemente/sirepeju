import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import DataTable from "react-data-table-component";
import Banner from '../../components/Banner';
import { useQuery } from 'react-query';
import { getGobernacions } from '../../api/gobernacionApi';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { destroyGobernacion } from '../../api/gobernacionApi';
import Swal from 'sweetalert2';
import { show_alerta } from '../../components/MessageAlert';
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre
import { useModal } from '../../hooks/useModal'; //metodos siempre gg
const IndexGob = () => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
// par el modal true - false
const [showgobernacion, openGobernacion, closeGobernacion] = useModal(false);
// declarar un hook 
const [gobernacionShow, setgobernacionShow] = useState({});
  
const { isLoading, data: registros, isError, error } = useQuery({
    queryKey: ['gobernacions'],
    queryFn: getGobernacions,
    select: gobernacions => gobernacions.sort((a, b) => b.id - a.id)
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      if (
        registro.departamento.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.user.email.toLowerCase().includes(search.toLowerCase())
      ) {
        return registro;
      }
    });

    return filtered
  }

  const searchOnChange = async (e, row) => {
    e.persist();
    await setSearch(e.target.value);
  };

  const dropGobernacion = useMutation({
    mutationFn: destroyGobernacion,
    onSuccess: (response) => {
      queryClient.invalidateQueries('gobernacions')
      show_alerta('Eliminado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
      setLoading(false);
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    },
  });

  const handleShow = (e, row) => {
    e.preventDefault();
    openGobernacion();
    const prueba = row;
    setgobernacionShow({ ...gobernacionShow, ...prueba })
    console.log(gobernacionShow)
}

  const handleDelete = (e, row) => {
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
        dropGobernacion.mutate(row);
      }
    });
  };

  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        row.estado === 1 ?
          <div className='d-flex flex-row'>
            <button onClick={(e) => handleDelete(e, row)} className="button_delete"><i className="fa-solid fa-x"></i></button>
            <Link to={`/user-gobernacion/edit/${row.id}`} className="button_edit"><i className="fa-solid fa-pen-to-square"></i></Link>
            <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i></button> 
        
            
            
          </div>
          : ''
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      grow: 1,
    },
    {
      name: 'Correo',
      selector: row => row.user.email,
      sortable: true,
    },
    {
      name: 'Departamento',
      selector: row => row.departamento.nombre,
      sortable: true,
    },

  ];

  const paginationOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'todos'
  };
  if (isLoading) return <Loading />
  else if (isError) return <div>Error: {error.message}</div>

  return (

    <div>
      {loading === true ? <Loading /> : ''}
      <Banner text="LISTA DE USUARIOS GOBERNACIÓN" />

      <div className='container-fluid d-flex flex-row md:flex-columns my-4'>
        <div className='input_search'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            className='form-control'
            placeholder='Buscar entidad'
            name='search'
            value={search}
            onChange={searchOnChange}
          />
        </div>
        <ModalDiv isOpen={showgobernacion} closeModal={closeGobernacion} title={'Lista de Gobernacion'}>
        <div  class="modal-dialog modal-lg">
                    <h2 class="fs-6"><b>Cargo departamental:</b>{gobernacionShow.id}</h2> <hr />
                    <h2 class="fs-6"><b>Responsable departamental:</b> &nbsp;&nbsp; </h2><b>CI:</b> <hr />
                    <h2 class="fs-6"><b>Cargo departamental:</b></h2> <hr />
                    <h2 class="fs-6"><b>Correo Electronico:</b> &nbsp;&nbsp;</h2>       
                </div>
                <hr />
                <div className='d-flex'>
                    <button button class="btn btn-secondary" title="cerrar" onClick={closeGobernacion}>cerrar</button>
                </div>
        </ModalDiv>
        <div>
          <Link to="/user-gobernacion/create" className='btn button_green'>
            <span>AÑADIR</span>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
      <div className='table-responsive'>
        <DataTable
          columns={columns}
          data={filteredRegistros()}
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight='400px'
          pagination
          noDataComponent={<span>No se encontro ningun elemento</span>}
          progressPending={isLoading}
        />
      </div>
    </div>
  )
}

export default IndexGob
