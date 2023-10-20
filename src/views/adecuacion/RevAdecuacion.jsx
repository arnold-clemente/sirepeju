import React, { useState } from 'react'
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';

import { getRevocatorias } from '../../api/adecuacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
import ModalShow from './ModalShow';
import ModalRevocar from './ModalRevocar';

const RevAdecuacion = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // par el modal show
  const [modalAdecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
  const [adecuacionShow, setadecuacionShow] = useState({});

  const { isLoading, data: registros, isError, error } = useQuery({
    queryKey: ['revocadosadecuacion'],
    queryFn: getRevocatorias,
    select: adecuaciones => adecuaciones.sort((a, b) => b.id - a.id)
  })

  const filteredRegistros = () => {
    if (search.length == 0)
      return registros;
    const filtered = registros.filter(registro => {
      if (
        registro.miembros_fundador.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
        registro.codigo_adecuacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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
    console.log(row)
    e.preventDefault();
    openAdecuacion();
    const prueba = row;
    setadecuacionShow({ ...adecuacionShow, ...prueba })

  }

  const columns = [
    {
      name: 'Acciones',
      cell: (row) => (
        <div className='container-fluid d-flex flex-row'>
          <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
        </div>
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
      name: 'Persona Juridica',
      selector: row => row.personalidad_juridica,
      sortable: true,
      grow: 3,
    },
    {
      name: 'Mienbros',
      selector: row => row.miembros_fundador,
      sortable: true,
      grow: 2
    },
    {
      name: 'Sigla',
      selector: row => row.sigla,
      sortable: true,
    },
    {
      name: 'Representante',
      selector: row => row.representante,
      sortable: true,
    },
    {
      name: 'Codigo',
      selector: row => row.codigo_adecuacion,
      sortable: true,
    },
    {
      name: 'Naturaleza',
      selector: row => row.naturaleza,
      sortable: true,
    },
    {
      name: 'Cedula',
      selector: row => row.ci_rep + " " + row.ext_ci_rep,
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
    <>
      {loading === true ? <Loading /> : ''}
      {/* para le modal show adecuacion  */}
      <ModalShow showRegistro={adecuacionShow} modalRegistro={modalAdecuacion} closeRegistro={closeAdecuacion} />
      <Banner text="REVOCATORIAS ADECUACIONES" />
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
          columns={columns}
          data={filteredRegistros()}
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight='800px'
          pagination
          noDataComponent={<span>No se encontro ningun elemento</span>}
          progressPending={isLoading}
        />
      </div>
    </>
  )
}

export default RevAdecuacion
