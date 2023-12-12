import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';
import Swal from 'sweetalert2';
import { show_alerta } from '../../components/MessageAlert';

import { getOtorgacionesGob, destroyOtorgacionGob } from '../../api/otorgacionGobApi';
// modal 
import { useModal } from '../../hooks/useModal'
import { useMutation } from 'react-query';
import ShowOtorgacionGob from './ShowOtorgacionGob';
import SelectOtorgaciongobernacion from './reporte/SelectOtorgaciongobernacion';

const IndexOtorgacionGob = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // para el modal show Otorgacion
  const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
  const [otorgacionShow, setotorgacionShow] = useState({});

  const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      openSelectpdf();
    };

    return (
      <button onClick={handleDelete} className='button_select_pdf'>
        <i className="fa-solid fa-print"></i>
        <span>Imprimir</span>
      </button>
    );

  }, [selectedRows, toggleCleared]);

  const { isLoading, data: registros, isError, error } = useQuery({
    queryKey: ['otorgaciones_gobs'],
    queryFn: getOtorgacionesGob,
    select: otorgaciones => otorgaciones.sort((a, b) => b.id - a.id)
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      if (
        registro.resolucion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.nombre_persona_colectiva.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
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

  const handleShow = (e, row) => {
    console.log(row)
    e.preventDefault();
    openOtorgacion();
    const prueba = row;
    setotorgacionShow({ ...otorgacionShow, ...prueba })
  }

  const handleEliminar = (e, row) => {
    e.preventDefault();
    const prueba = row;
    setotorgacionShow({ ...otorgacionShow, ...prueba })
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
        destroyOtorgacion.mutate(otorgacionShow);
      }
    });
  }

  const destroyOtorgacion = useMutation({
    mutationFn: destroyOtorgacionGob,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries('otorgaciones_gobs');
      show_alerta('Eliminado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
      setLoading(false);
    },
    onError: (error) => {
      console.log(error)
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      setLoading(false);
    }
  });

  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        <div className='container-fluid d-flex flex-row gap-1'>
          <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
          <div className='dropdown'>
            <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-solid fa-gear"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to={`/otorgaciones-gobernaciones/edit/${row.id}`} className="button_edit_table">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Editar</span>
                </Link>
              </li>
              <li>
                <button onClick={(e) => handleEliminar(e, row)} className="button_delete_table">
                  <i className="fa-solid fa-x"></i>
                  <span className='mx-2'>Eliminar</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '120px',
    },
    {
      name: 'Resolucion ',
      selector: row => row.resolucion,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Naturaleza ',
      selector: row => row.naturaleza,
      sortable: true,
      wrap: true,
      width: '200px',
    },
    {
      name: 'Nombre Persona Colectiva ',
      selector: row => row.nombre_persona_colectiva,
      sortable: true,
      wrap: true,
      width: '300px',
    },
    {
      name: 'Sigla ',
      selector: row => row.sigla,
      sortable: true,
      wrap: true,
      width: '150px',
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
      {/* para le modal show adecuacion  */}
      <SelectOtorgaciongobernacion registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
      <ShowOtorgacionGob registro={otorgacionShow} modal={modalOtorgacion} close={closeOtorgacion} />
      <Banner text="PROCESO DE OTORGACION" />
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
        <div>
          <Link to="/otorgaciones-gobernaciones/create" className='btn button_green'>
            <span>AÑADIR</span>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
      <div className='table-responsive'>
        <DataTable
          title='TABLA PROCESO DE OTORGACION GOBERNACIÓN'
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
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </div>
    </div>
  )
}

export default IndexOtorgacionGob
