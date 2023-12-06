import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { estilos } from '../../components/estilosdatatables';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import { useModal } from '../../hooks/useModal'; //metodos siempre gg
import ShowSolicitud from './ShowSolicitud';

import { getReservas, entregarReserva } from '../../api/reservaApi';

const IndexReserva = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    //para el modal
    const [showreserva, openReserva, closeReserva] = useModal(false);
    // declarar un hook 
    const [reservaShow, setreservaShow] = useState({});

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['reservas'],
        queryFn: getReservas,
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

    const handleShow = (e, row) => {
        e.preventDefault();
        openReserva();
        const prueba = row;
        setreservaShow({ ...reservaShow, ...prueba })
        console.log(reservaShow)
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (

                <div className='d-flex flex-row justify-content-start'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <Link to={`/reserva/edit/${row.id}`} className="button_edit"><i className="fa-solid fa-pen-to-square"></i><span>Editar</span></Link>
                    <Link to={`/buscar-reserva/${row.entidad.toLowerCase().replace(/ /g, '~')}`} className="button_delete"><i className="fa-solid fa-magnifying-glass"></i><span>Verificar</span></Link>
                </div >
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Hoja de Ruta',
            selector: row => row.id,
            sortable: true,
            center: 1,
            grow: 1,
        },
        {
            name: 'Nº Correlativo',
            selector: row => row.nro_certificado,
            sortable: true,
        },
        {
            name: 'Tipo de Persona Colectiva',
            selector: row => row.persona_colectiva,
            sortable: true,
            ligth: 1,
            grow: 2,
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Nombre de la Persona Colectiva',
            selector: row => row.entidad,
            sortable: true,
            grow: 3,
        },
        {
            name: 'Sigla',
            selector: row => row.sigla,
            sortable: true,
            center: 1,
            grow: 1,
        },
        {
            name: 'Representante Legal',
            selector: row => row.representante,
            sortable: true,
            left: 1,
            grow: 3,
        },

        {
            name: 'CI',
            selector: row => row.ci_rep + " " + row.ext_ci_rep,
            sortable: true,
            left: 1,
            grow: 1,
        },
        {
            name: 'Nº Celular',
            selector: row => row.telefono,
            sortable: true,
            left: 1,
            grow: 1,
        },
        {
            name: 'Correo Registrado',
            selector: row => row.correo,
            sortable: true,
            left: 1,
            grow: 2
        }
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
                <ShowSolicitud registro={reservaShow} modal={showreserva} close={closeReserva} />
                <div>
                    <Link to="/reserva/create" className='btn button_green'>
                        <span>AÑADIR</span>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </Link>
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
                />
            </div>

        </div>
    )
}

export default IndexReserva
