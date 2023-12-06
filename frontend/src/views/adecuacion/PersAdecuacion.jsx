import React, { useState } from 'react'
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import storage from '../../Storage/storage'

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';

import { getPersonalidades } from '../../api/adecuacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
import ModalShow from './ModalShow';
import ModalRevocar from './ModalRevocar';
import ModalModificacionAde from './ModalModificacionAde';

const PersAdecuacion = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // par el modal show
    const [modalAdecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
    const [modificacion, openModificacion, closeModificacion] = useModal(false);
    const [adecuacionShow, setadecuacionShow] = useState({});

    //para el revocatoria
    const [revocatoriaModal, openRevocatoriaModal, closeRevocatoriaModal] = useModal(false);
    const [revocatoria, setRevocatoria] = useState({ 
        adecuacion_id: 1, 
        nota_revocatorio: '', 
        fecha_revocatoria: '', 
        observacion: '' 
    });

    const [update, setUpdate] = useState({
        fecha: '',
        adecuacion_id: 0,
        codigo_modificacion: '',
        personalidad_juridica: '',
        estatuto_organico: '',
        reglamento_interno: '',
        domicilio_legal: '',
        miembros_fundador: '',
        seguimiento: '',
        cite_informe_preliminar: '',
        user_id: storage.get('authUser').id,
    });

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['personalidades_adecuacion'],
        queryFn: getPersonalidades,
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

    const handleInputRevocatoria = ({ target }) => {
        setRevocatoria({
            ...revocatoria,
            [target.name]: target.value
        });
    };

    const handleRevocar = (e, row) => {
        e.preventDefault();
        const auxiliar = {
          adecuacion_id: row.id,
          nota_revocatorio: '',
          fecha_revocatoria: '',
          observacion: ''
        }
        setRevocatoria({ ...revocatoria, ...auxiliar })
        openRevocatoriaModal();
      }

      const handleInputModificacion = ({ target }) => {
        setUpdate({
            ...update,
            [target.name]: target.value
        });
    }

      const handleModificar = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            fecha: '',
            adecuacion_id: row.id,
            codigo_modificacion: '',
            personalidad_juridica: row.personalidad_juridica,
            estatuto_organico: row.registro_persona_adecuacion.estatuto_organico,
            reglamento_interno: row.registro_persona_adecuacion.reglamento_interno,
            domicilio_legal: row.domicilio_legal,
            miembros_fundador: row.miembros_fundador,
            seguimiento: row.seguimiento,
            cite_informe_preliminar: row.cite_informe_preliminar,
        }
        setUpdate({ ...update, ...auxiliar });
        openModificacion();
    }
    

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='container-fluid d-flex flex-row'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <button onClick={(e) => handleModificar(e, row)} className="button_edit"><i className="fa-solid fa-pen-to-square"></i><span>Modificar</span></button>
                    <button onClick={(e) => handleRevocar(e, row)} className="button_delete"><i className="fa-solid fa-eye"></i><span>Revocar</span></button>
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
            
            {/* par el modal de revocatoria  */}
            <ModalRevocar registrorModal={revocatoriaModal} closeRegistrorModal={closeRevocatoriaModal} openRegistrorModal={openRevocatoriaModal}
                registro={revocatoria} handleInputChange={handleInputRevocatoria} />

            {/* para le modal show adecuacion  */}
            <ModalShow showRegistro={adecuacionShow} modalRegistro={modalAdecuacion} closeRegistro={closeAdecuacion} />
            <ModalModificacionAde registro={update} handleInputChange={handleInputModificacion} modal={modificacion} open={openModificacion} close={closeModificacion} />
            <Banner text="PERSONALIDAD JURIDICA ADECUACION" />
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

export default PersAdecuacion
