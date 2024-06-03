import React, { useCallback, useMemo, useState } from 'react'
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getHomonimias, entregarReserva } from 'api/reservaApi';

import Loading from 'components/Loading';
import Spiner from 'components/Spiner';
import Banner from 'components/Banner';
import { show_alerta } from 'components/MessageAlert';
import { estilos } from 'components/estilosdatatables';
import { useModal } from 'hooks/useModal';
import ShowHomonimia from './ShowHomonimia';
// modales
import RepHominimia from './reporte/RepHominimia';
import SelectHomonimia from './reporte/SelectHomonimia';

const HomReserva = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    //para el modal
    const [showreserva, openReserva, closeReserva] = useModal(false);
    const [Imprimir, openImprimir, closeImprimir] = useModal(false);
    const [selectpdf, openSelectpdf, closeSelectpdf] = useModal(false);
    // declarar un hook 
    const [reservaShow, setreservaShow] = useState({});
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
        queryKey: ['homonimias'],
        queryFn: getHomonimias,
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
                registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.correo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.persona_colectiva.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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
        mutationFn: entregarReserva,
        onSuccess: (response) => {
            queryClient.invalidateQueries('homonimias')
            show_alerta('Fecha Registrada', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            console.log(error)
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
    const handleShow = (e, row) => {
        e.preventDefault();
        openReserva();
        const prueba = row;
        setreservaShow({ ...reservaShow, ...prueba })
        console.log(reservaShow)
    }

    const handleImprimir = (e, row) => {
        e.preventDefault();
        openImprimir();
        const prueba = row;
        setreservaShow({ ...reservaShow, ...prueba })
        console.log(reservaShow)
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (

                <div className='d-flex flex-row justify-content-start gap-1'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <div className='d-flex flex-row justify-content-start'>
                        <button onClick={(e) => handleImprimir(e, row)} className="button_print"><i className="fa-solid fa-print"></i><span>Imprimir</span></button>
                        {!row.fecha_entrega
                            ? <button onClick={(e) => handleEntregar(e, row)} className="button_download"><i className="fa-solid fa-check"></i><span>Entregar</span></button>
                            : ''
                        }
                    </div>

                </div >

            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
        },
        {
            name: 'Nº Hoja Ruta',
            selector: row => row.hr,
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
            width: '250px',
        },
        {
            name: 'Nombre de la Persona Colectiva Colectiva',
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
            width: '300px',
        }
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
            <Banner text="RESERVAS HOMONIMIAS" />

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
                {/* modales  */}
                <ShowHomonimia registro={reservaShow} modal={showreserva} close={closeReserva} />
                <RepHominimia registro={reservaShow} modal={Imprimir} close={closeImprimir} />
                <SelectHomonimia registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
            </div>
            <div className='table-responsive'>
                <DataTable
                    title={'TABLA DE HOMONIMIAS'}
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

export default HomReserva
