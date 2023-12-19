import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import { useModal } from '../../hooks/useModal'; //metodos siempre gg
import { estilos } from '../../components/estilosdatatables';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getGobernacions, destroyGobernacion, passwordGobernacion } from '../../api/gobernacionApi';

// modales 
import ShowGob from './ShowGob';
import SelectGobernacion from './reporte/SelectGobernacion';

const IndexGob = () => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [showgobernacion, openGobernacion, closeGobernacion] = useModal(false);
  const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
  const [gobernacionShow, setgobernacionShow] = useState({});
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
    queryKey: ['gobernacions'],
    queryFn: getGobernacions,
    select: gobernacions => gobernacions.sort((a, b) => b.id - a.id)
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      const nombres = registro.nombres + ' ' + registro.paterno + ' ' + registro.materno;
      if (
        nombres.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.ci.toString().includes(search.toLowerCase()) ||
        registro.institucion.toString().includes(search.toLowerCase()) ||
        registro.departamento.toString().includes(search.toLowerCase()) ||
        registro.usuario.toString().includes(search.toLowerCase()) ||
        registro.email.toLowerCase().includes(search.toLowerCase())
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

  const passGobernacion = useMutation({
    mutationFn: passwordGobernacion,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries('gobernacions')
      show_alerta('Contraseña Actualizada', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
      setLoading(false);
    },
    onError: (error) => {
      console.log(error)
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

  const handlePassword = (e, row) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Reiniciar Contraseña?",
      text: "¡No podrás revertir esto!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, reiniciar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        passGobernacion.mutate(row);
      }
    });
  };

  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        row.estado === 1 ?
          <div className='container-fluid d-flex flex-row gap-1'>
            <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
            <div className='dropdown'>
              <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-gear"></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link to={`/gobernacion/editar/${row.id}`} className="button_edit_table dropdown-item">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span className='mx-2'>Editar</span>
                  </Link>
                </li>
                <li>
                  <button onClick={(e) => handlePassword(e, row)} className="button_show_table dropdown-item">
                    <i className="fa-solid fa-key"></i>
                    <span className='mx-2'>Reiniciar Contraseña</span>
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleDelete(e, row)} className="button_delete_table dropdown-item">
                    <i className="fa-solid fa-x"></i>
                    <span className='mx-2'>Eliminar</span>
                  </button>
                </li>
              </ul>
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
      name: 'G.A.D.',
      selector: row => row.institucion,
      sortable: true,
      wrap: true,
      width: '250px',
      center: 1,
    },
    {
      name: 'Responsable Departamental',
      selector: row => row.nombres + ' ' + row.paterno + ' ' + row.materno,
      sortable: true,
      wrap: true,
      width: '250px',
    },
    {
      name: 'Cargo Departamental',
      selector: row => row.cargo,
      sortable: true,
      wrap: true,
      width: '200px',
    },

    {
      name: 'C.I.',
      selector: row => row.ci + ' ' + row.ext_ci,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Correo Institucional',
      selector: row => row.email,
      wrap: true,
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
      <Banner text="LISTA DE USUARIOS GOBERNACIÓN" />
      {/* modales   */}
      <ShowGob modal={showgobernacion} close={closeGobernacion} registro={gobernacionShow} />
      <SelectGobernacion registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
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
          <Link to="/gobernacion/crear" className='button_green'>
            <span>AÑADIR</span>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
      <div className='table-responsive'>
        <DataTable
          title='GOBERNACIONES REGISTRADOS'
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

export default IndexGob
