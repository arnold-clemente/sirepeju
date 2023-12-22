import React, { useCallback, useMemo, useState } from 'react'
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";
import { useQuery, useQueryClient, useMutation } from 'react-query';

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';
import { show_alerta } from '../../components/MessageAlert';

import { getArchivados, desarchivarAdecuacion, desarchivarModificacionAdecuacion, caducarAdecuacion } from '../../api/adecuacionApi';
// modal 
import { useModal } from '../../hooks/useModal'
// modal components 
import ShowAdecuacionArchivado from './ShowAdecuacionArchivado';
import SelectAdecuacionArchivados from './reporte/SelectAdecuacionArchivados';

const IndexAdecuacionArchivados = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    // para el modal show Adecuacion
    const [modalAdecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
    const [adecuacionShow, setadecuacionShow] = useState({ id: 0 });

    const now = new Date().getTime();

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
        queryKey: ['adecuaciones_archivados'],
        queryFn: getArchivados,
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

    const handleDesarchivar = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "Desarchivar Adecuacion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, Desarchivar!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                if (row.estado == 2) {
                    desarchivateAdecuacion.mutate(row);
                }
                if (row.estado == 8) {
                    desarchivateModificacionAdecuacion.mutate(row);
                }
            }
        });
    }

    const desarchivateAdecuacion = useMutation({
        mutationFn: desarchivarAdecuacion,
        onSuccess: (response) => {
            queryClient.invalidateQueries('adecuaciones')
            queryClient.invalidateQueries('adecuaciones_archivados')
            show_alerta('Adecuacion Desarchivado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const desarchivateModificacionAdecuacion = useMutation({
        mutationFn: desarchivarModificacionAdecuacion,
        onSuccess: (response) => {
            queryClient.invalidateQueries('personalidades_adecuacion')
            queryClient.invalidateQueries('adecuaciones_archivados')
            show_alerta('Adecuacion Desarchivado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const handleCaducar = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "Caducar Adecuacion?",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, caducar!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                caducateAdecuacion.mutate(row);
            }
        });
    }

    const caducateAdecuacion = useMutation({
        mutationFn: caducarAdecuacion,
        onSuccess: (response) => {
            console.log(response)
            queryClient.invalidateQueries('adecuaciones_archivados')
            queryClient.invalidateQueries('personalidades_adecuacion')
            queryClient.invalidateQueries('adecuaciones_caducados')
            show_alerta('Adecuacion Caducado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });



    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='container-fluid d-flex flex-row gap-1'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show">
                        <i className="fa-solid fa-eye"></i>
                        <span>Ver</span>
                    </button>
                    {row.estado == 2
                        ? <button onClick={(e) => handleDesarchivar(e, row)} className="button_edit">
                            <i className="fa-solid fa-check"></i>
                            <span>Desarchivar</span>
                        </button>
                        : <button onClick={(e) => handleDesarchivar(e, row)} className="button_print">
                            <i className="fa-solid fa-check"></i>
                            <span>Desarchivar</span>
                        </button>
                    }
                    {Math.round((now - (new Date(row.fecha_ingreso_tramite).getTime())) / (1000 * 60 * 60 * 24)) > 200
                        ? (<button onClick={(e) => handleCaducar(e, row)} className="button_delete">
                            <i className="fa-solid fa-x"></i>
                            <span>Caducar</span>
                        </button>)
                        : null
                    }

                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
        },
        {
            name: 'Tiempo',
            selector: row => Math.round((now - (new Date(row.fecha_ingreso_tramite).getTime())) / (1000 * 60 * 60 * 24)) + ' dias',
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Codigo OPJ',
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
    if (isLoading) return <Spiner />
    else if (isError) return <div>Error: {error.message}</div>

    return (
        <div>
            {loading === true ? <Loading /> : ''}
            {/* para le modal show adecuacion  */}
            <ShowAdecuacionArchivado registro={adecuacionShow} modalRegistro={modalAdecuacion} closeRegistro={closeAdecuacion} />
            {/* seleccionados  */}
            <SelectAdecuacionArchivados registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

            <Banner text="ADECUACION ARCHIVADOS" />
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
                    title='TABLA ADECUACION ARCHIVADOS'
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

export default IndexAdecuacionArchivados;