import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";
import { useSelector } from 'react-redux'

import { show_alerta } from 'components/MessageAlert';
import { estilos } from 'components/estilosdatatables';
import Banner from 'components/Banner';
import Loading from 'components/Loading';
import Spiner from 'components/Spiner';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRegistrados, destroyRegistrado } from 'api/registradoApi';
import { useModal } from 'hooks/useModal';
// modales 
import ShowRegistrado from './ShowRegistrado';
import SelectRegistrados from './reporte/SelectRegistrados';

const IndexRegistrados = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const permisos = useSelector(state => state.userStore.permisos)
  // para el modal true- false - paso 3
  const [showRegistrado, openRegistrado, closeRegistrado] = useModal(false);
  const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
  // declar ar un hook - paso 4
  const [registradoShow, setRegistradoShow] = useState({});
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
    queryKey: ['registrados'],
    queryFn: getRegistrados,
    select: registrados => registrados.sort((a, b) => b.id - a.id),
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      const nombres = registro.nombres + ' ' + registro.paterno + ' ' + registro.materno;
      if (
        registro.fecha.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.codigo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.observacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
      ) {
        return registro;
      }
    });

    return filtered
  }

  const searchOnChange = async (e, row) => {
    e.persist();
    setSearch(e.target.value);
  };

  const handleShow = (e, row) => {
    e.preventDefault();
    openRegistrado();
    const prueba = row;
    setRegistradoShow({ ...registradoShow, ...prueba })
    console.log(registradoShow)
  }
  const dropRegistrado = useMutation({
    mutationFn: destroyRegistrado,
    onSuccess: (response) => {
      queryClient.invalidateQueries('registrados')
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
        dropRegistrado.mutate(row);
      }
    });
  };


  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        row.estado === 1 ?
          <div className='container-fluid d-flex flex-row'>
            <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
            {permisos.includes('registrado.update') || permisos.includes('registrado.destroy')
              ? <div className='dropdown'>
                <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-gear"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {permisos.includes('registrado.update')
                    ? <li>
                      <Link to={`/admin/registrados/editar/${row.id}`} className="button_edit_table dropdown-item">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span className='mx-2'>Editar</span>
                      </Link>
                    </li>
                    : null
                  }
                  {permisos.includes('registrado.destroy')
                    ? <li>
                      <button onClick={(e) => handleDelete(e, row)} className="button_delete_table dropdown-item">
                        <i className="fa-solid fa-x"></i>
                        <span className='mx-2'>Eliminar</span>
                      </button>
                    </li>
                    : null
                  }
                </ul>
              </div>
              : null
            }

          </div>
          : ''
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '120px',
    },
    {
      name: 'Código',
      selector: row => row.codigo,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Fecha de registro',
      selector: row => row.fecha,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Naturaleza',
      selector: row => row.naturaleza,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Nombre de la Persona Colectiva',
      selector: row => row.personalidad_juridica,
      sortable: true,
      wrap: true,
      width: '300px',
    },
    {
      name: 'Sigla',
      selector: row => row.sigla,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Tipo de registro',
      selector: row => row.observacion,
      width: '250px',
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
      <Banner text="REGISTROS DE ADECUACIÓN" />

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
        {/* modales  */}
        <ShowRegistrado modal={showRegistrado} close={closeRegistrado} registro={registradoShow} />
        <SelectRegistrados registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
        <div>
          {permisos.includes('registrado.store')
            ? <Link to="/admin/registrados/crear" className='btn button_green'>
              <span>AÑADIR</span>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Link>
            : null
          }
        </div>
      </div>
      <div className='table-responsive'>
        <DataTable
          title='ADECUACION REGISTRADOS'
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

export default IndexRegistrados;