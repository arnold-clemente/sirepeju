import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import bcrypt from "bcryptjs-react";
import { useSelector } from 'react-redux'

import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { estilos } from '../../components/estilosdatatables';
import { show_alerta } from '../../components/MessageAlert';

import { getOtorgaciones, archivarOtorgacion } from '../../api/otorgacionesApi';
// modal 
import { useModal } from '../../hooks/useModal'
// modal components 
import ModalShowOtorgacion from './ModalShowOtorgacion';
import ModalRegistroFinalOtorgacion from './ModalRegistroFinalOtorgacion';
import ModalPersonaOtorgacion from './ModalPersonaOtorgacion';
import ModalSeguimientoOtorgacion from './ModalSeguimientoOtorgacion';
import ModalInformeOtorgacion from './ModalInformeOtorgacion';
import SelectOtorgaciones from './reporte/SelectOtorgaciones';

const IndexOtorgacion = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const permisos = useSelector(state => state.userStore.permisos)

    // para el modal show Otorgacion
    const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [otorgacionShow, setotorgacionShow] = useState({ id: 0 });

    //para registro persona colectiva
    const [personaModal, openPersonaModal, closePersonaModal] = useModal(false);
    const [personaCol, setPersonaCol] = useState({ otorgacion_id: 1 });

    //para el seguimiento
    const [segumientoModal, openSeguimientoModal, closeSeguimientoModal] = useModal(false);
    const [seguimiento, setSeguimiento] = useState({ otorgacion_id: 1, seguimiento: '', fecha: '' });

    // para el informe
    const [informeModal, openInformeModal, closeInformeModal] = useModal(false);
    const [informe, setInforme] = useState({ otorgacion_id: 1, informe: '', fecha: '' });

    // para el registro final 
    const [registrorModal, openRegistrorModal, closeRegistrorModal] = useModal(false);
    const [registroFinal, setRegistroFinal] = useState({
        otorgacion_id: 1,
        alfanumerico: '',
        nota_interna_final: '',
        numero_informe_final: '',
        fecha_envio: '',
    })
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
        queryKey: ['otorgaciones'],
        queryFn: getOtorgaciones,
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

    const handleRegistroFinal = (e, row) => {
        e.preventDefault();
        const encript = '$2a$10$CwTycUXWue0Thq9StjUM0u'
        const concatenar = row.personalidad_juridica + '-' + row.naturaleza + '-' + row.codigo_otorgacion;
        const alfanumerico_cript = bcrypt.hashSync(concatenar, encript)
        let auxiliar = {
            otorgacion_id: row.id,
            alfanumerico: alfanumerico_cript,
            nota_interna_final: '',
            numero_informe_final: '',
            fecha_envio: '',
        }
        setRegistroFinal({ ...auxiliar })
        openRegistrorModal()
    };

    const handlePersonaModal = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
        }
        setPersonaCol({ ...personaCol, ...auxiliar })
        openPersonaModal();
    }

    const handleSeguimiento = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
            seguimiento: '',
            fecha: '',
        }
        setSeguimiento({ ...seguimiento, ...auxiliar })
        openSeguimientoModal();
    }

    const handleInforme = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
            informe: '',
            fecha: '',
        }
        setInforme({ ...informe, ...auxiliar })
        openInformeModal();
    }


    const handleInputChange = ({ target }) => {
        setRegistroFinal({
            ...registroFinal,
            [target.name]: target.value
        });
    };

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

    const handleArchivar = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "Archivar Otorgacion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, Archivar!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                archivateOtorgacion.mutate(row);
            }
        });
    }

    const archivateOtorgacion = useMutation({
        mutationFn: archivarOtorgacion,
        onSuccess: (response) => {
            queryClient.invalidateQueries('otorgaciones')
            queryClient.invalidateQueries('otorgaciones_archivados')
            show_alerta('Otorgacion Archivado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
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
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    {permisos.includes('otorgacion.personalidad') || permisos.includes('otorgacion.seguimiento') || permisos.includes('otorgacion.informe') || permisos.includes('otorgacion.archivar') || permisos.includes('otorgacion.registro')
                        ? <div className='dropdown'>
                            <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-gear"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {permisos.includes('otorgacion.informe') || permisos.includes('otorgacion.personalidad')
                                    ? <li>
                                        <button onClick={(e) => handleInforme(e, row)} className="button_download_table">
                                            <i className="fa-solid fa-file-pen"></i>
                                            <span className='mx-2'>Informe Preliminar</span>
                                        </button>
                                    </li>
                                    : null}
                                {permisos.includes('otorgacion.seguimiento') || permisos.includes('otorgacion.personalidad')
                                    ? <li>
                                        <button onClick={(e) => handleSeguimiento(e, row)} className="button_show_table">
                                            <i className="fa-solid fa-pen"></i>
                                            <span className='mx-2'>Seguimiento</span>
                                        </button>
                                    </li>
                                    : null
                                }
                                <li>
                                    {row.miembros_fundador == 'sin agregar' && permisos.includes('otorgacion.personalidad')
                                        ? <Link to={`/otorgaciones/${row.id}/fundadores`} className="button_edit_table">
                                            <i className="fa-solid fa-users"></i>
                                            <span className='mx-2'>fundadores</span>
                                        </Link>
                                        : ''
                                    }
                                </li>
                                <li>
                                    {row.miembros_fundador != 'sin agregar' && !row.alfanumerico && permisos.includes('otorgacion.registro')
                                        ? <button onClick={(e) => handleRegistroFinal(e, row)} className="button_edit_table">
                                            <i className="fa-regular fa-registered"></i>
                                            <span className='mx-2'>Etapa Final</span>
                                        </button>
                                        : ''
                                    }
                                </li>
                                <li>
                                    {row.miembros_fundador && row.alfanumerico && permisos.includes('otorgacion.personalidad')
                                        ? <button onClick={(e) => handlePersonaModal(e, row)} className="button_edit_table">
                                            <i className="fa-solid fa-file-pdf"></i>
                                            <span className='mx-2'>Persona Colectiva</span>
                                        </button>
                                        : ''
                                    }
                                </li>
                                <li>
                                    {Math.round((now - (new Date(row.fecha_ingreso_tramite).getTime())) / (1000 * 60 * 60 * 24)) > 20 && permisos.includes('otorgacion.archivar')
                                        ? <button onClick={(e) => handleArchivar(e, row)} className="button_delete_table">
                                            <i className="fa-solid fa-box-archive"></i>
                                            <span className='mx-2'>Archivar</span>
                                        </button>
                                        : ''
                                    }
                                </li>
                            </ul>
                        </div>
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
        <div>
            {loading === true ? <Loading /> : ''}
            {/* para le modal show adecuacion  */}
            <ModalShowOtorgacion registro={otorgacionShow} modalRegistro={modalOtorgacion} closeRegistro={closeOtorgacion} />
            {/* par el modal de seguimiento  */}
            <ModalSeguimientoOtorgacion registrorModal={segumientoModal} closeRegistrorModal={closeSeguimientoModal} openRegistrorModal={openSeguimientoModal}
                registro={seguimiento} handleInputChange={handleInputSeguimiento} />

            {/* par el modal de citeinforme  */}
            <ModalInformeOtorgacion registrorModal={informeModal} closeRegistrorModal={closeInformeModal} openRegistrorModal={openInformeModal}
                registro={informe} handleInputChange={handleInputInforme} />

            {/* par el modal de etapa final  */}
            <ModalRegistroFinalOtorgacion registrorModal={registrorModal} closeRegistrorModal={closeRegistrorModal} openRegistrorModal={openRegistrorModal}
                registroFinal={registroFinal} handleInputChange={handleInputChange} />

            {/* para el modal de persona colectiva  */}
            <ModalPersonaOtorgacion persona={personaCol} modalRegistro={personaModal} openRegistrorModal={openPersonaModal} closeRegistrorModal={closePersonaModal} />

            {/* seleccionados  */}
            <SelectOtorgaciones registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

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
            </div>
            <div className='table-responsive'>
                <DataTable
                    title='TABLA PROCESO DE OTORGACION'
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

export default IndexOtorgacion
