import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';

import { getModificacionesAdecuacion } from '../../api/modificacionAdecuacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
// modal components 
import ModalShowAdecuacion from './ModalShowAdecuacion';
import ModalSeguimientoAde from './ModalSeguimientoAde';
import ModalInformeAde from './ModalInformeAde';
import ModalUpdateAdecuacion from './ModalUpdateAdecuacion';
import SelectModificacionAdecuacion from './reporte/SelectModificacionAdecuacion';
// import { lazy } from 'react';
// const ModalUpdateAdecuacion = lazy(() => import('./ModalUpdateAdecuacion'));

const IndexModificacionAd = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // para el modal show Adecuacion
  const [modalAdecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
  const [adecuacionShow, setadecuacionShow] = useState({ id: 0 });

  //para el seguimiento
  const [segumientoModal, openSeguimientoModal, closeSeguimientoModal] = useModal(false);
  const [seguimiento, setSeguimiento] = useState({ adecuacion_id: 1, seguimiento: '', fecha: '' });

  // para el informe
  const [informeModal, openInformeModal, closeInformeModal] = useModal(false);
  const [informe, setInforme] = useState({ adecuacion_id: 1, informe: '', fecha: '' });

  //para actualizar los registros 
  const [modalModificacion, openModificacion, closeModificacion] = useModal(false);
  const [adecuacion, setAdecuacion] = useState({
    adecuacion_id: 0,
    personalidad_juridica: '',
    estatuto_organico: '',
    reglamento_interno: '',
    domicilio_legal: '',
  })

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
    queryKey: ['modificaciones_adecuacion'],
    queryFn: getModificacionesAdecuacion,
    select: adecuaciones => adecuaciones.sort((a, b) => b.id - a.id)
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      if (
        registro.codigo_adecuacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.fecha_ingreso_tramite.includes(search.toLowerCase()) ||
        registro.persona_colectiva.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.objeto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.cite_informe_preliminar.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.seguimiento.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.miembros_fundador.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.ci_rep.toLowerCase().includes(search.toLowerCase())
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
    e.preventDefault();
    openAdecuacion();
    const prueba = row;
    setadecuacionShow({ ...adecuacionShow, ...prueba })

  }

  const handleSeguimiento = (e, row) => {
    e.preventDefault();
    const auxiliar = {
      adecuacion_id: row.id,
      seguimiento: '',
      fecha: '',
    }
    setSeguimiento({ ...seguimiento, ...auxiliar })
    openSeguimientoModal();
  }

  const handleInforme = (e, row) => {
    e.preventDefault();
    const auxiliar = {
      adecuacion_id: row.id,
      informe: '',
      fecha: '',
    }
    setInforme({ ...informe, ...auxiliar })
    openInformeModal();
  }

  const handleInputSeguimiento = ({ target }) => {
    setSeguimiento({
      ...seguimiento,
      [target.name]: target.value
    });
  };

  const handleInputInforme = ({ target }) => {
    setInforme({
      ...informe,
      [target.name]: target.value
    });
  };

  const handleUpdate = async (e, row) => {
    e.preventDefault();
    const auxiliar = {
      adecuacion_id: row.id,
      personalidad_juridica: row.personalidad_juridica,
      estatuto_organico: row.registro_persona_adecuacion.estatuto_organico,
      reglamento_interno: row.registro_persona_adecuacion.reglamento_interno,
      domicilio_legal: row.domicilio_legal,
    }
    setAdecuacion({ ...adecuacion, ...auxiliar })
    await queryClient.invalidateQueries('fundadores_adecuacion');
    openModificacion();
  }

  const handleInputChange = ({ target }) => {
    setAdecuacion({
      ...adecuacion,
      [target.name]: target.value
    });
  }

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
                <button onClick={(e) => handleInforme(e, row)} className="button_download_table">
                  <i className="fa-solid fa-file-pen"></i>
                  <span className='mx-2'>Informe Preliminar</span>
                </button>
              </li>
              <li>
                <button onClick={(e) => handleSeguimiento(e, row)} className="button_show_table">
                  <i className="fa-solid fa-pen"></i>
                  <span className='mx-2'>Seguimiento</span>
                </button>
              </li>
              <li>
                {row.miembros_fundador
                  ? <button onClick={(e) => handleUpdate(e, row)} className="button_edit_table">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span className='mx-2'>Modificar
                    </span>
                  </button>
                  : ''
                }
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
      name: 'Codigo APJ',
      selector: row => row.codigo_adecuacion,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Fecha de Ingreso',
      selector: row => row.fecha_ingreso_tramite,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Tipo de Persona Colectiva',
      selector: row => row.persona_colectiva,
      sortable: true,
      wrap: true,
      width: '200px',
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
      name: 'Objeto',
      selector: row => row.objeto,
      width: '300px',
    },
    {
      name: 'Informes',
      selector: row => row.cite_informe_preliminar,
      wrap: true,
      width: '250px',
    },
    {
      name: 'Seguimiento',
      selector: row => row.seguimiento,
      wrap: true,
      width: '250px',
    },
    {
      name: 'Representante',
      selector: row => row.representante,
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Mienbros Fundadores',
      selector: row => row.miembros_fundador,
      sortable: true,
      wrap: true,
      width: '300px',
    },
    {
      name: 'Cedula',
      selector: row => row.ci_rep + " " + row.ext_ci_rep,
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
      <ModalShowAdecuacion registro={adecuacionShow} modalRegistro={modalAdecuacion} closeRegistro={closeAdecuacion} />

      <ModalSeguimientoAde registrorModal={segumientoModal} closeRegistrorModal={closeSeguimientoModal} openRegistrorModal={openSeguimientoModal}
        registro={seguimiento} handleInputChange={handleInputSeguimiento} />

      <ModalInformeAde registrorModal={informeModal} closeRegistrorModal={closeInformeModal} openRegistrorModal={openInformeModal}
        registro={informe} handleInputChange={handleInputInforme} />

      <ModalUpdateAdecuacion registro={adecuacion} handleInputChange={handleInputChange}
        modal={modalModificacion} open={openModificacion} close={closeModificacion} />

      <SelectModificacionAdecuacion registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

      <Banner text="PROCESO DE MODIFICACION ADECUACION" />
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
      </div>
      <div className='table-responsive'>
        <DataTable
          title='TABLA MODIFICACIONES ADECUACION'
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

export default IndexModificacionAd
