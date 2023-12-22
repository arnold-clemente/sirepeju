import React, { useCallback, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRegistros, entregarRegistro, caducarRegistro } from '../../api/registroApi';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import storage from '../../Storage/storage'
import { estilos } from '../../components/estilosdatatables';
import { useModal } from '../../hooks/useModal'

// modal 
import ShowRegistro from './ShowRegistro';
import ModalRegistro from './ModalRegistro';
import RepReservados from './reporte/RepReservados';
import SelectReservados from './reporte/SelectReservados';

const IndexReg = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const [isModalOtorgacion, openModalOtorgacion, closeModalOtorgacion] = useModal(false);
    //para el modal
    const [showregistro, openRegistro, closeRegistro] = useModal(false);
    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
    const [registroShow, setRegistroShow] = useState({});
    const [otorgacion, setOtorgacion] = useState({
        id: 0,
        fecha: '',
        codigo_otorgacion: '',
        domicilio: '',
        objeto: '',
        user_id: storage.get('authUser').id
    });
    const now = new Date().getTime();

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
        queryKey: ['registros'],
        queryFn: getRegistros,
        select: reservas => reservas.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.nro_certificado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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

    const fechaReserva = useMutation({
        mutationFn: entregarRegistro,
        onSuccess: (response) => {
            queryClient.invalidateQueries('registros')
            show_alerta('Fecha registrada', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const caduarReserva = useMutation({
        mutationFn: caducarRegistro,
        onSuccess: (response) => {
            queryClient.invalidateQueries('registros')
            queryClient.invalidateQueries('registros_caducados')
            show_alerta('Registro caducado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const handleEntregar = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Entregar Documento?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, entrega!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                fechaReserva.mutate(row);
            }
        });
    };

    const handleCaducar = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "Caducar Reserva?",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, caducar!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                caduarReserva.mutate(row);
            }
        });
    };

    const handleOtorgacion = (e, row) => {
        e.preventDefault();
        setOtorgacion({
            ...otorgacion,
            ['id']: row.id
        });
        openModalOtorgacion();
    }

    const handleInputChange = ({ target }) => {
        setOtorgacion({
            ...otorgacion,
            [target.name]: target.value
        });
    };

    const handleShow = (e, row) => {
        e.preventDefault();
        const prueba = row;
        setRegistroShow({ ...registroShow, ...prueba })
        openRegistro();
    }

    const handleImprimir = (e, row) => {
        e.preventDefault();
        const prueba = row;
        setRegistroShow({ ...registroShow, ...prueba })
        openImprimir();
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='d-flex flex-row justify-content-start gap-1'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show">
                        <i className="fa-solid fa-eye"></i>
                        <span>Ver</span>
                    </button>
                    <button onClick={(e) => handleImprimir(e, row)} className="button_print">
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir</span>
                    </button>
                    <div className='dropdown'>
                        <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"> 
                            <li>
                                {row.fecha_entrega
                                    ? <button onClick={(e) => handleOtorgacion(e, row)} className="button_show_table">
                                        <i className="fa-solid fa-file-import"></i>
                                        <span className='mx-2'>Otorgacion</span>
                                    </button>
                                    : ''
                                }
                            </li>
                            <li>
                                {!row.fecha_entrega
                                    ? <button onClick={(e) => handleEntregar(e, row)} className="button_download_table">
                                        <i className="fa-solid fa-check"></i>
                                        <span className='mx-2'>Entregar</span>
                                    </button>
                                    : ''
                                }
                            </li>
                            <li>
                                {Math.round((now - (new Date(row.fecha_reg).getTime())) / (1000 * 60 * 60 * 24)) > 60
                                    ? <button onClick={(e) => handleCaducar(e, row)} className="button_delete_table">
                                        <i className="fa-solid fa-x"></i>
                                        <span className='mx-2'>Caducar</span>
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
            name: 'Tiempo',
            selector: row => Math.round((now - (new Date(row.fecha_reg).getTime())) / (1000 * 60 * 60 * 24)) + ' dias',
            sortable: true,
            wrap: true,         
            width: '150px',
        },
        {
            name: 'Hoja de Ruta',
            selector: row => row.id,
            sortable: true,
            wrap: true,         
            width: '150px',
        },
        {
            name: 'Nº Correlativo',
            selector: row => row.nro_certificado,
            sortable: true,
            wrap: true,         
            width: '150px',
        },
        {
            name: 'Tipo de Personas Colectiva ',
            selector: row => row.persona_colectiva,
            sortable: true,
            wrap: true,         
            width: '250px',
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
            sortable: true,
            wrap: true,         
            width: '250px',
        },
        {
            name: 'Nombre de la Persona Colectiva',
            selector: row => row.entidad,
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
            name: 'Representante Legal',
            selector: row => row.representante,
            sortable: true,
            wrap: true,         
            width: '250px',
        },

        {
            name: 'CI',
            selector: row => row.ci_rep + " " + row.ext_ci_rep,
            sortable: true,
            wrap: true,         
            width: '150px',
        },
        {
            name: 'Nº Celular',
            selector: row => row.telefono,
            sortable: true,
            wrap: true,         
            width: '150px',
        },
        {
            name: 'Correo Registrado',
            selector: row => row.correo,
            sortable: true,
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
    if (isLoading) return <Loading />
    else if (isError) return <div>Error: {error.message}</div>

    return (

        <div>
            {loading === true ? <Loading /> : ''}
            <Banner text="PERSONAS COLECTIVAS QUE CUENTAN CON RESERVA DE NOMBRE" />
            <ShowRegistro registro={registroShow} modal={showregistro} close={closeRegistro} />
            <ModalRegistro registro={otorgacion} modal={isModalOtorgacion} close={closeModalOtorgacion}
                handleInputChange={handleInputChange} open={openModalOtorgacion} />
            <RepReservados registro={registroShow} modal={imprimir} close={closeImprimir} />
            <SelectReservados registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />

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
                    title={'TABLA DE RESERVADOS'}
                    columns={columns}
                    data={filteredRegistros()}
                    paginationComponentOptions={paginationOptions}
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
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

export default IndexReg
