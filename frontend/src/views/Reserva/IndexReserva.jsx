import React, { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux'
import { updateSearch } from '../../store/slices/searchSlice';

import { useQuery, useQueryClient } from 'react-query';
import { getReservas, entregarReserva } from '../../api/reservaApi';

import { estilos } from '../../components/estilosdatatables';
import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';
import Banner from '../../components/Banner';
import { useModal } from '../../hooks/useModal';

// modales 
import ShowSolicitud from './ShowSolicitud';
import SelectSolicitudes from './reporte/selectSolicitudes';

const IndexReserva = () => {

    const go = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const permisos = useSelector(state => state.userStore.permisos)
    const queryClient = useQueryClient();

    //para el modal
    const [showreserva, openReserva, closeReserva] = useModal(false);
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
        queryKey: ['reservas'],
        queryFn: getReservas,
        select: reservas => reservas.sort((a, b) => b.id - a.id),
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

    const handleShow = (e, row) => {
        e.preventDefault();
        openReserva();
        const prueba = row;
        setreservaShow({ ...reservaShow, ...prueba })
        console.log(reservaShow)
    }

    const handleVerificar = (e, row) => {
        e.preventDefault();
        let aux = row.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        dispatch(updateSearch(aux));
        go('/admin/verificar/reserva')
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (

                <div className='d-flex flex-row justify-content-start gap-1'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    {permisos.includes('reserva.update')
                        ? <Link to={`/admin/reserva/editar/${row.id}`} className="button_edit"><i className="fa-solid fa-pen-to-square"></i><span>Editar</span></Link>
                        : null
                    }
                    {permisos.includes('verificacion.entidades')
                        ? <button onClick={(e) => handleVerificar(e, row)} className="button_delete"><i className="fa-solid fa-magnifying-glass"></i><span>Verificar</span></button>
                        : null
                    }

 
                </div >
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
        },
        {
            name: 'Hoja de Ruta',
            selector: row => row.id,
            sortable: true,
            center: true,
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
            name: 'Naturaleza',
            selector: row => row.naturaleza,
            sortable: true,
            wrap: true,
            width: '200px',
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
            name: 'Tipo de Persona Colectiva',
            selector: row => row.persona_colectiva,
            sortable: true,
            wrap: true,
            width: '200px',
        },
        
        {
            name: 'Representante Legal',
            selector: row => row.representante,
            sortable: true,
            wrap: true,
            width: '200px',
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
            <Banner text="SOLICITUDES DE RESERVA DE NOMBRES" />

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
                <ShowSolicitud registro={reservaShow} modal={showreserva} close={closeReserva} />
                <SelectSolicitudes registro={selectedRows} modal={selectpdf} close={closeSelectpdf} />
                <div>
                    {permisos.includes('reserva.store')
                        ? <Link to="/admin/reserva/crear" className='btn button_green'>
                            <span>AÑADIR</span>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </Link>
                        : null}
                </div>
            </div>
            <div className='table-responsive'>
                <DataTable
                    title={'TABLA DE SOLICITUDE DE RESERVA DE NOMBRE'}
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

export default IndexReserva
