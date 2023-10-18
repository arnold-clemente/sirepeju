import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import Swal from 'sweetalert2';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre
import { useModal } from '../../hooks/useModal'; //metodos siempre gg

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
                    <Link to={`/buscar-reserva/${row.entidad.toLowerCase().replace(/ /g, '~')}`}className="button_delete"><i className="fa-solid fa-magnifying-glass"></i><span>Verificar</span></Link>                
                </div >
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            grow: 1,
        },
        {
            name: 'Entidad',
            selector: row => row.entidad,
            sortable: true,
            grow: 3,
        },
        {
            name: 'Sigla',
            selector: row => row.sigla,
            sortable: true,
        },
        {
            name: 'Representante',
            selector: row => row.representante,
            sortable: true,
        },
        {
            name: 'Nro',
            selector: row => row.nro_certificado,
            sortable: true,
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
            sortable: true,
        },
        {
            name: 'Cedula',
            selector: row => row.ci_rep + " " + row.ext_ci_rep,
            sortable: true,
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
                <ModalDiv isOpen={showreserva} closeModal={closeReserva} title={'LISTA DE RESERVA DE NOMBRE'}>
                    <div className="modal-dialog modal-lg">
                        <h2 className="fs-6"><b>Entidad:</b>&nbsp;&nbsp;{reservaShow.entidad}</h2> <hr />
                        <h2 className="fs-6"><b>Sigla:</b>&nbsp;&nbsp;{reservaShow.sigla}<hr /></h2> <hr />
                        <h2 className="fs-6"><b>Representante legal:</b>&nbsp;&nbsp; {reservaShow.representante}<b>CI:</b>9999</h2> <hr />
                        <h2 className="fs-6"><b>Nº Correlativo:</b> &nbsp;&nbsp;{reservaShow.nro_certificado}</h2><hr />
                        <h2 className="fs-6"><b>Naturaleza:</b> &nbsp;&nbsp;{reservaShow.naturaleza}</h2>
                    </div>
                    <hr />
                    <div className='d-flex'>
                        <button className="btn btn-secondary" title="cerrar" onClick={closeReserva}>cerrar</button>
                    </div>
                </ModalDiv>
                <div>
                    <Link to="/reserva/create" className='btn button_green'>
                        <span>AÑADIR</span>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </Link>
                </div>
            </div>
            <div className='table-responsive'>
                <DataTable
                    columns={columns}
                    data={filteredRegistros()}
                    paginationComponentOptions={paginationOptions}
                    fixedHeader
                    fixedHeaderScrollHeight='800px'
                    pagination
                    noDataComponent={<span>No se encontro ningun elemento</span>}
                    progressPending={isLoading}
                />
            </div>

        </div>
    )
}

export default IndexReserva
