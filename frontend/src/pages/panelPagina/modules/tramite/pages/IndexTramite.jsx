import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom'
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import Banner from 'components/Banner';
import { show_alerta } from 'components/MessageAlert';
import { estilos } from 'components/estilosdatatables';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTramites, destroyTramite } from 'api/panel/tramiteApi';

const IndexTramite = () => {
  const queryClient = useQueryClient();
  const go = useNavigate();
  const { requisitoId } = useParams();
  const [error, serError] = useState({});
  const [loading, setLoading] = useState(true);
  const [tramites, setTramites] = useState([]);
  const [search, setSearch] = useState('');
  const [errorasync, setErrorasync] = useState({});
  const [requisito, setRequisito] = useState({});

  useEffect(() => {
    if (requisitoId != 0) {
      getPanelTramites.mutate(requisitoId)
    }
  }, [requisitoId])

  const getPanelTramites = useMutation({
    mutationFn: getTramites,
    onSuccess: (response) => {
      setTramites(response.tramites);
      setRequisito(response.requisito);
      setLoading(false);
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
      setErrorasync({ ...errorasync, ...error.message })
    },
  });

  const filteredRegistros = () => {
    if (search.length == 0)
      return tramites;
    const filtered = tramites.filter(registro => {
      if (
        registro.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
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

  const dropTramite = useMutation({
    mutationFn: destroyTramite,
    onSuccess: (response) => {
      getPanelTramites.mutate(requisitoId)
      queryClient.invalidateQueries('requisitos')
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
        dropTramite.mutate(row);
      }
    });
  };

  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        row.estado === 1 ?
          <div className='container-fluid d-flex flex-row gap-1'>
            <div className='dropdown'>
              <div className='d-flex gap-2'>
                <Link to={`/panel/tramite/${row.id}/reglamentos`} className="button_show dropdown-item">
                  <i className="fa-solid fa-eye"></i>
                  <span className='mx-2'>Ver</span>
                </Link>
                <Link to={`/panel/requisito/${requisito.id}/tramites/editar/${row.id}`} className="button_edit dropdown-item">
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
      width: '140px',
      grow: 4,
    },
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true,
      wrap: true,
      width: '350px',
      center: 1,
    },
  ];
  const paginationOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'todos'
  };

  if (requisitoId == 0) {
    return <Navigate to='/panel/requisitos' />
  }

  if (loading) return <Spiner />
  else if (errorasync.message) return <div>Error: {errorasync.message}</div>
  else return (
    <div>
      {loading === true ? <Loading /> : ''}
      <Banner text={`LISTA DE ${requisito.nombre}`} />
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
          <Link to={`/panel/requisito/${requisito.id}/tramites/crear`} className='button_green'>
            <span>AÑADIR</span>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Link>

        </div>
      </div>
      <div className='table-responsive'>
        <DataTable
          title={`LISTA DE TRAMITES`}
          columns={columns}
          data={filteredRegistros()}
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight='800px'
          pagination
          noDataComponent={<span>No se encontro ningun elemento</span>}
          progressPending={loading}
          customStyles={estilos}
          highlightOnHover={true}
          persistTableHead={true}
        />
      </div>

      <div className='d-flex container-fluid'>
        <Link to='/panel/requisitos' type="submit" className="btn btn-danger my-4">VOLVER</Link>
      </div>
    </div>
  )
}

export default IndexTramite
