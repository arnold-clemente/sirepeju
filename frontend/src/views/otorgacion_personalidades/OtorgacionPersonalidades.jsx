import React, { useCallback, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';
import storage from '../../Storage/storage'

import { getPersonalidades } from '../../api/otorgacionesApi';
// modal 
import { useModal } from '../../hooks/useModal'
import ModalShowPersonalidadesOtor from './ModalShowPersonalidadesOtor';
import ModalRevocarOtorgacion from './ModalRevocarOtorgacion';
import ModalModificacion from './ModalModificacion';
import ModalExtinguirOtorgacion from './ModalExtinguirOtorgacion';
import SelectOtorgacionPersonalidades from './reporte/SelectOtorgacionPersonalidades';

const OtorgacionPersonalidades = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // para el modal show Otorgacion
    const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [modificacion, openModificacion, closeModificacion] = useModal(false);
    const [otorgacionShow, setotorgacionShow] = useState({ id: 0 });

    //para el revocatoria
    const [revocatoriaModal, openRevocatoriaModal, closeRevocatoriaModal] = useModal(false);
    const [revocatoria, setRevocatoria] = useState({ otorgacion_id: 1, nota_revocatorio: '', fecha_revocatoria: '', observacion: '' });
    const [extintoModal, openExtintoModal, closeExtintoModal] = useModal(false);
    const [extinto, setExtinto] = useState({ otorgacion_id: 1, nota_extincion: '', fecha_extenion: '', observacion: '' });
    const [update, setUpdate] = useState({
        fecha: '',
        otorgacion_id: 0,
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
        queryKey: ['personalidadesotorgacion'],
        queryFn: getPersonalidades,
        select: otorgaciones => otorgaciones.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.codigo_otorgacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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
        openOtorgacion();
        const prueba = row;
        setotorgacionShow({ ...otorgacionShow, ...prueba })

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
            otorgacion_id: row.id,
            nota_revocatorio: '',
            fecha_revocatoria: '',
            observacion: ''
        }
        setRevocatoria({ ...revocatoria, ...auxiliar })
        openRevocatoriaModal();
    }

    const handleExtinguir = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
            nota_extincion: '',
            fecha_extenion: '',
            observacion: ''
        };
        setExtinto({ ...extinto, ...auxiliar })
        openExtintoModal();
    }

    const handleInputExtinto = ({ target }) => {
        setExtinto({
            ...extinto,
            [target.name]: target.value
        });
    };

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
            otorgacion_id: row.id,
            codigo_modificacion: '',
            personalidad_juridica: row.personalidad_juridica,
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
                    <button onClick={(e) => handleShow(e, row)} className="button_show">
                        <i className="fa-solid fa-eye"></i>
                        <span>Ver</span>
                    </button>
                    <div className='dropdown'>
                        <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button onClick={(e) => handleModificar(e, row)} className="button_edit_table">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    <span className='mx-1'>Modificar</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={(e) => handleRevocar(e, row)} className="button_delete_table">
                                    <i className="fa-regular fa-circle-xmark"></i>
                                    <span className='mx-1'>Revocar</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={(e) => handleExtinguir(e, row)} className="button_print_table">
                                    <i className="fa-regular fa-circle-xmark"></i>
                                    <span className='mx-1'>Extinguir</span>
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
            name: 'Codigo OPJ',
            selector: row => row.codigo_otorgacion,
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
    if (isLoading) return <Spiner />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            {loading === true ? <Loading /> : ''}

            {/* par el modal de revocatoria  */}
            <ModalRevocarOtorgacion registrorModal={revocatoriaModal} closeRegistrorModal={closeRevocatoriaModal} openRegistrorModal={openRevocatoriaModal}
                registro={revocatoria} handleInputChange={handleInputRevocatoria} />

            <ModalExtinguirOtorgacion registrorModal={extintoModal} closeRegistrorModal={closeExtintoModal} openRegistrorModal={openExtintoModal}
                registro={extinto} handleInputExtinto={handleInputExtinto} />

            {/* para le modal show otorgacion  */}
            <ModalShowPersonalidadesOtor registro={otorgacionShow} modalRegistro={modalOtorgacion} closeRegistro={closeOtorgacion} />
            {/* modal modoificacion  */}
            <ModalModificacion registro={update} handleInputChange={handleInputModificacion} modal={modificacion} open={openModificacion} close={closeModificacion} />
            <SelectOtorgacionPersonalidades registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

            <Banner text="PERSONALIDAD JURIDICA OTORGACION" />
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
                    title={'TABLA DE OTORGACIONES'}
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

export default OtorgacionPersonalidades
