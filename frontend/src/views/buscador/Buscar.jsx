import React, { useCallback, useMemo, useState, lazy } from 'react'
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getEntidadesGlobal, createHomonimia, createRegistro } from '../../api/verificadorApi';

import { estilos } from '../../components/estilosdatatables';
import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import storage from '../../Storage/storage'
import { useModal } from '../../hooks/useModal';
import { estados, color_estados } from './Estados';

// modales 
import SelectVerificacion from './reporte/SelectVerificacion';

const VerificacionReserva = lazy(() => import('./VerificacionReserva'));
const VerificaionOtorgacion = lazy(() => import('./VerificacionOtorgacion'));
const VerificacionAdecuacion = lazy(() => import('./VerificacionAdecuacion'));
const VerificacionGobernacion = lazy(() => import('./VerificacionGobernacion'));
const ModalVerificacionShow = lazy(() => import('./ModalVerificacionShow'));

const Buscar = () => {

    const [search, setSearch] = useState(useSelector(state => state.searchStore.busqueda));
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const permisos = useSelector(state => state.userStore.permisos)
    // par el modal true - false
    const [showregistro, openRegistro, closeRegistro] = useModal(false);
    const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
    // declarar un hook 
    const [registroShow, setregistroShow] = useState({});

    //consulta personalizada
    const [consulta, setConsulta] = useState({
        reserva_id: 0,
        otorgacion_id: 0,
        adecuacion_id: 0,
        gobernacion_id: 0,
    });
    //modales personalizados
    const [reserva, openReserva, closeReserva] = useModal(false);
    const [otorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [adecuacion, openAdecuacion, closeAdecuacion] = useModal(false);
    const [gobernacion, openGobernacion, closeGobernacion] = useModal(false);

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const tipos = ['reserva', 'otorgacion', 'adecuacion', 'gobernacion'];

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
        queryKey: ['entidades'],
        queryFn: getEntidadesGlobal,
    });

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
            ) {
                return registro;
            }
        });

        return filtered
    }

    const homonimiaReserva = useMutation({
        mutationFn: createHomonimia,
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries('entidades')
            queryClient.invalidateQueries('homonimias')
            show_alerta('Homonimia', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('Algo Salio Mal', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const registroReserva = useMutation({
        mutationFn: createRegistro,
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries('entidades')
            queryClient.invalidateQueries('registros')
            show_alerta('Entidad reservada', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('Algo Salio Mal', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });


    const searchOnChange = async (e, row) => {
        e.persist();
        await setSearch(e.target.value);
    };

    const handleReserva = (e, row) => {
        e.preventDefault();
        const user = { user_id: storage.get('authUser').id, name: storage.get('authUser').name }
        const setregistro = { ...row, ...user };
        Swal.fire({
            title: "¿Reserva Entidad?",
            text: "¡No podrás revertir esto!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, reserva!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                registroReserva.mutate(setregistro);
            }
        });
    };

    const handleHomonimia = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Homonimia?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, Homonimia!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                homonimiaReserva.mutate(row);
            }
        });
    };

    const handleShow = (e, row) => {
        e.preventDefault();
        switch (row.tipo) {
            case 1:
                setConsulta({ ...consulta, ...row });
                openReserva();
                break;
            case 2:
                setConsulta({ ...consulta, ...row });
                openOtorgacion();
                break;
            case 3:
                setConsulta({ ...consulta, ...row });
                openAdecuacion();
                break;
            case 4:
                setConsulta({ ...consulta, ...row });
                openGobernacion();
                break;
            default:
                setregistroShow({ ...registroShow, ...row });
                openRegistro();
                break;
        }
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='d-flex flex-row justify-content-center gap-1'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    {row.tipo === 1 && row.estado == 1
                        ? <div className='d-flex justify-content-center gap-1'>
                            {permisos.includes('reserva.reservar')
                                ? <button onClick={(e) => handleReserva(e, row)} className="button_edit">
                                    <i className="fa-solid fa-square-check"></i>
                                    <span>Reservar</span>
                                </button>
                                : null
                            }
                            {permisos.includes('reserva.homonimo')
                                ? <button onClick={(e) => handleHomonimia(e, row)} className="button_delete">
                                    <i className="fa-solid fa-ban"></i>
                                    <span>Homonimia</span>
                                </button>
                                : null
                            }
                        </div>
                        : ''
                    }
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '130px',
        },
        {
            name: 'Tipo Tramite',
            cell: (row) => (
                <div className={'d-flex justify-content-center'}>
                    <span className={color_estados[row.tipo] + ' color_estado_white'}>{estados[row.tipo][row.estado]}</span>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            wrap: true,
            width: '100px',
        },
        {
            name: 'Entidad',
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
            name: 'Miembros | Representante',
            selector: row => row.representante,
            sortable: true,
            wrap: true,
            width: '300px',
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
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
    if (isLoading) return <Spiner />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            <VerificacionReserva registro={consulta} modal={reserva} close={closeReserva} />
            <VerificaionOtorgacion registro={consulta} modal={otorgacion} close={closeOtorgacion} />
            <VerificacionAdecuacion registro={consulta} modal={adecuacion} close={closeAdecuacion} />
            <VerificacionGobernacion registro={consulta} modal={gobernacion} close={closeGobernacion} />
            <ModalVerificacionShow registro={registroShow} modal={showregistro} close={closeRegistro} />
            <SelectVerificacion registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
            <div>
                {loading === true ? <Loading /> : ''}
                <Banner text="VERIFICACIÓN DE PERSONA JURIDICA" />

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
        </>
    )
}

export default Buscar
