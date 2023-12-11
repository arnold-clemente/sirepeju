import React, { useCallback, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import storage from '../../Storage/storage'

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';

import { getPersonalidades } from '../../api/adecuacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
import ModalAdePersonalidadShow from './ModalAdePersonalidadShow';
import SelectPersonalidadAdecuacion from './reporte/SelectPersonalidadAdecuacion';
import ModalRevocar from './ModalRevocar';
import ModalModificacionAde from './ModalModificacionAde';

const PersAdecuacion = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // par el modal show
    const [modalAdecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
    const [modificacion, openModificacion, closeModificacion] = useModal(false);
    const [adecuacionShow, setadecuacionShow] = useState({id: 0});

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
        queryKey: ['personalidades_adecuacion'],
        queryFn: getPersonalidades,
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
                <div className='container-fluid d-flex flex-row gap-1'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <button onClick={(e) => handleModificar(e, row)} className="button_edit"><i className="fa-solid fa-pen-to-square"></i><span>Modificar</span></button>
                    <button onClick={(e) => handleRevocar(e, row)} className="button_delete"><i className="fa-solid fa-eye"></i><span>Revocar</span></button>
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
        <>
            {loading === true ? <Loading /> : ''}

            {/* par el modal de revocatoria  */}
            <ModalAdePersonalidadShow registro={adecuacionShow} modalRegistro={modalAdecuacion} closeRegistro={closeAdecuacion} />
            <SelectPersonalidadAdecuacion registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
            <ModalRevocar registrorModal={revocatoriaModal} closeRegistrorModal={closeRevocatoriaModal} openRegistrorModal={openRevocatoriaModal}
                registro={revocatoria} handleInputChange={handleInputRevocatoria} />

            {/* para le modal show adecuacion  */}
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
                    title='TABLA PROCESO DE PERSONALIDAD ADECUACION'
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
        </>
    )
}

export default PersAdecuacion
