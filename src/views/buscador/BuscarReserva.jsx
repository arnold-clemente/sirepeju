import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import Swal from 'sweetalert2';

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import storage from '../../Storage/storage'

import { getEntidadesGlobal, createHonimia, createRegistro } from '../../api/buscardorApi';

const BuscarReserva = () => {

    const { entidad } = useParams();
    const buscar = entidad.replace(/_/g, ' ');
    const [search, setSearch] = useState(buscar.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();    

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['entidades'],
        queryFn: getEntidadesGlobal
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.persona_colectiva.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.ci_rep.toLowerCase().includes(search.toLowerCase())
            ) {
                return registro;
            }
        });

        return filtered
    }

    const homonimiaReserva = useMutation({
        mutationFn: createHonimia,
        onSuccess: (response) => {
            queryClient.invalidateQueries('entidades')
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
            queryClient.invalidateQueries('entidades')
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
        const user = {user_id: storage.get('authUser').id, name: storage.get('authUser').name}
        const setregistro = {...row, ...user};
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

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (

                <div className='d-flex flex-row justify-content-start'>
                    {row.estado === 1
                        ? <div className='d-flex'>
                            <button onClick={(e) => handleReserva(e, row)} className="button_edit"><i className="fa-solid fa-square-check"></i></button>
                            <button onClick={(e) => handleHomonimia(e, row)} className="button_delete"><i className="fa-solid fa-ban"></i></button>
                        </div>
                        : <button onClick={(e) => handlePassword(e, row)} className="button_show"><i className="fa-solid fa-eye"></i></button>

                    }

                </div>

            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        // {
        //     name: 'Id',
        //     selector: row => uuidv4(),
        //     sortable: true,
        // },   
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
            name: 'cedula',
            selector: row => row.ci_rep + " " + row.ext_ci_rep,
            sortable: true,
        },
        {
            name: 'Persona Colectiva',
            selector: row => row.persona_colectiva,
            sortable: true,
        },
        {
            name: 'Naturaleza',
            selector: row => row.naturaleza,
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
        <>
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
                        columns={columns}
                        data={filteredRegistros()}
                        paginationComponentOptions={paginationOptions}
                        fixedHeader
                        fixedHeaderScrollHeight='400px'
                        pagination
                        noDataComponent={<span>No se encontro ningun elemento</span>}
                        progressPending={isLoading}
                    />
                </div>
            </div>
        </>
    )
}

export default BuscarReserva;
