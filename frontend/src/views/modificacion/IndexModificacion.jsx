import React, { useCallback, useMemo, useState, lazy } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';

import { getModificaciones } from '../../api/modificacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
// modal components 
import SelectModificaciones from './reporte/SelectModificaciones';

const ShowModificacionOtorgacion = lazy(() => import('./ShowModificacionOtorgacion'));
const ShowModificacionAdecuacion = lazy(() => import('./ShowModificacionAdecuacion'));
const ModalShowMod = lazy(() => import('./ModalShowMod'));

const IndexModificacion = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // para el modal show Otorgacion
    const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [modalAdecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
    const [otorgacionShow, setotorgacionShow] = useState({
        id: 0,
        codigo_modificacion: 'APN - 000',
        tipo: 'undefine',
        personalidad_juridica: 'undefine',
        miembros_fundador: 'undefine',
        domicilio_legal: 'undefine',
        seguimiento: 'undefine',
        cite_informe_preliminar: 'undefine',
        otorgacion_id: 0,
        adecuacion_id: 0,
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
        queryKey: ['modificaciones'],
        queryFn: getModificaciones,
        select: modificaciones => modificaciones.sort((a, b) => b.id - a.id)
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
                registro.codigo_modificacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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
        switch (row.tipo) {
            case 'adecuacion':
                const auxiliar_adecuacion = {
                    id: row.id,
                    estatuto_organico: row.estatuto_organico,
                    reglamento_interno: row.reglamento_interno,
                    codigo_modificacion: row.codigo_modificacion,
                    tipo: row.tipo,
                    personalidad_juridica: row.personalidad_juridica,
                    miembros_fundador: row.miembros_fundador,
                    domicilio_legal: row.domicilio_legal,
                    seguimiento: row.seguimiento,
                    cite_informe_preliminar: row.cite_informe_preliminar,
                    otorgacion_id: 0,
                    adecuacion_id: row.adecuacion_id,
                }
                setotorgacionShow({ ...otorgacionShow, ...auxiliar_adecuacion });
                openAdecuacion();
                break;
            case 'otorgacion':
                const auxiliar_otorgacion = {
                    id: row.id,
                    estatuto_organico: row.estatuto_organico,
                    reglamento_interno: row.reglamento_interno,
                    codigo_modificacion: row.codigo_modificacion,
                    tipo: row.tipo,
                    personalidad_juridica: row.personalidad_juridica,
                    miembros_fundador: row.miembros_fundador,
                    domicilio_legal: row.domicilio_legal,
                    seguimiento: row.seguimiento,
                    cite_informe_preliminar: row.cite_informe_preliminar,
                    otorgacion_id: row.otorgacion_id,
                    adecuacion_id: 0,
                }
                setotorgacionShow({ ...otorgacionShow, ...auxiliar_otorgacion });
                openOtorgacion();
                break;
            default:
                const auxiliar_default = {
                    id: row.id,
                    estatuto_organico: row.estatuto_organico,
                    reglamento_interno: row.reglamento_interno,
                    codigo_modificacion: row.codigo_modificacion,
                    tipo: row.tipo,
                    personalidad_juridica: row.personalidad_juridica,
                    miembros_fundador: row.miembros_fundador,
                    domicilio_legal: row.domicilio_legal,
                    seguimiento: row.seguimiento,
                    cite_informe_preliminar: row.cite_informe_preliminar,
                    otorgacion_id: row.otorgacion_id,
                    adecuacion_id: row.adecuacion_id,
                }
                setotorgacionShow({ ...otorgacionShow, ...auxiliar_default });
                openOtorgacion();
                break;
        }
    }

    const handleImprimir = (e, row) => {
        e.preventDefault();
        const prueba = row;
        setotorgacionShow({ ...otorgacionShow, ...prueba })
        console.log(otorgacionShow)
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
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '80px',
        },
        {
            name: 'Codigo',
            selector: row => row.codigo_modificacion,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Persona Juridica',
            selector: row => row.personalidad_juridica,
            sortable: true,
            wrap: true,
            width: '300px',
        },
        {
            name: 'Miembros',
            selector: row => row.miembros_fundador,
            sortable: true,
            wrap: true,
            width: '300px',
        },
        {
            name: 'Domicilio',
            selector: row => row.domicilio_legal,
            sortable: true,
        },
        {
            name: 'Seguimiento',
            selector: row => row.seguimiento,
            wrap: true,
            width: '300px',
        },
        {
            name: 'Informe',
            selector: row => row.cite_informe_preliminar,
            wrap: true,
            width: '300px',
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
            <ModalShowMod showRegistro={otorgacionShow} modalRegistro={modalOtorgacion} closeRegistro={closeOtorgacion} />
            <ShowModificacionOtorgacion modificacion={otorgacionShow} modal={modalOtorgacion} close={closeOtorgacion} />
            <ShowModificacionAdecuacion modificacion={otorgacionShow} modal={modalAdecuacion} close={closeAdecuacion} />
            <SelectModificaciones registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

            <Banner text="MODIFICACIONES" />
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
                    title='TABLA MODIFICACIONES OTORGACION'
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

export default IndexModificacion
