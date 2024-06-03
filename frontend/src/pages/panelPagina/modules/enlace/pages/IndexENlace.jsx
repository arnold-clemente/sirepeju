import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import Banner from 'components/Banner';
import { show_alerta } from 'components/MessageAlert';
import { estilos } from 'components/estilosdatatables';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getEnlaces, destroyEnlace } from 'api/panel/enlaceApi';

const IndexENlace = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [enlaceShow, setenlaceShow] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;

  const { isLoading, data: registros, isError, error } = useQuery({
    queryKey: ['panel_enlaces'],
    queryFn: getEnlaces,
    select: enlaces => enlaces.sort((a, b) => b.id - a.id)
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      if (
        registro.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.enlace.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
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

  const dropEnlace = useMutation({
    mutationFn: destroyEnlace,
    onSuccess: (response) => {
      queryClient.invalidateQueries('panel_enlaces')
      queryClient.invalidateQueries('inicio')
      show_alerta('Eliminado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
      setLoading(false);
    },

    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    },
  });

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
        dropEnlace.mutate(row);
      }
    });
  };

  const tipos = ['ninguno', 'INTERES', 'GOBERNACION', 'Default'];

  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        row.estado === 1 ?
          <div className='container-fluid d-flex flex-row gap-1'>
            <div className='dropdown'>
              <div className='d-flex gap-2'>
                <Link to={`/panel/enlaces/editar/${row.id}`} className="button_edit dropdown-item">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span className='mx-2'>Editar</span>
                </Link>
                <button onClick={(e) => handleDelete(e, row)} className="button_delete dropdown-item">
                  <i className="fa-solid fa-x"></i>
                  <span className='mx-2'>Eliminar</span>
                </button>
              </div>
            </div>

          </div>
          : ''
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      grow: 4,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div className='container-fluid d-flex flex-row gap-1'>
          <div className='dropdown'>
            <div className='imagen_table'>
              <img src={url + '/storage/' + row.imagen} alt="image" />
            </div>
          </div>

        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      grow: 4,
    },
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      wrap: true,
      width: '200px',
    },
    {
      name: 'DIRECCIÓN',
      selector: row => row.enlace,
      wrap: false,
      width: '200px',
    },
    {
      name: 'TIPO',
      selector: row => tipos[row.tipo],
      wrap: false,
      width: '200px',
    },
  ];
  const paginationOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'todos'
  };

  if (isLoading) return <Spiner />
  else if (isError) return <div>Error: {error.message}</div>
  return (
    <div>
      {loading === true ? <Loading /> : ''}
      <Banner text="LISTA DE ENLACES" />
      <div className='container-fluid d-flex flex-row md:flex-columns my-4'>
        <div className='input_search'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            className='form-control'
            placeholder='Buscar'
            name='search'
            value={search}
            onChange={searchOnChange}
          />
        </div>

        <div>
          <Link to="/panel/enlaces/crear" className='button_green'>
            <span>AÑADIR</span>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Link>

        </div>
      </div>
      <div className='table-responsive'>
        <DataTable
          title='ENLACE DE PAGINAS WEBS'
          columns={columns}
          data={filteredRegistros()}
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight='800px'
          pagination
          noDataComponent={<span>No se encontro ningun elemento</span>}
          progressPending={isLoading}
          customStyles={estilos}
          highlightOnHover={true}
          persistTableHead={true}
        />
      </div>
    </div>
  )
}

export default IndexENlace
