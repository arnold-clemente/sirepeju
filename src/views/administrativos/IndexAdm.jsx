import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import DataTable from "react-data-table-component";
import Banner from '../../components/Banner';
import { useQuery } from 'react-query';
import { getAdministrativos } from '../../api/administrativosApi';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { destroyAdministrativo } from '../../api/administrativosApi';
import { passwordAdministrativo } from '../../api/administrativosApi';
import Swal from 'sweetalert2';
import { show_alerta } from '../../components/MessageAlert';

const IndexAdministrativos = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['administrativos'],
        queryFn: getAdministrativos,
        select: administrativos => administrativos.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            const nombres = registro.nombres + ' ' + registro.paterno + ' ' + registro.materno;
            if (
                // registro.nombres.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                // registro.paterno.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                // registro.materno.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                nombres.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.ci.toString().includes(search.toLowerCase()) ||
                registro.user.email.toLowerCase().includes(search.toLowerCase())
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

    const dropAdministrativo = useMutation({
        mutationFn: destroyAdministrativo,
        onSuccess: (response) => {
            queryClient.invalidateQueries('administrativos')
            show_alerta('Eliminado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const passAdministrativo = useMutation({
        mutationFn: passwordAdministrativo,
        onSuccess: (response) => {
            queryClient.invalidateQueries('administrativos')
            show_alerta('Contraseña Actualizada', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const handleDelete = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Estas seguro",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                dropAdministrativo.mutate(row);
            }
        });
    };

    const handlePassword = (e, row) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Reiniciar Contraseña?",
            text: "¡No podrás revertir esto!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, reiniciar!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                passAdministrativo.mutate(row);
            }
        });
    };

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                row.estado === 1 ?
                    <div className='d-flex flex-row'>
                        <Link to={`/administrativo/edit/${row.id}`} className="button_edit"><i className="fa-solid fa-pen-to-square"></i></Link>
                        <button onClick={(e) => handleDelete(e, row)} className="button_delete"><i className="fa-solid fa-x"></i></button>
                        <button onClick={(e) => handlePassword(e, row)} className="button_show"><i className="fa-solid fa-key"></i></button>
                    </div>
                    : ''
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
            name: 'Nombres',
            selector: row => row.nombres + ' ' + row.paterno + ' ' + row.materno,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Cargo',
            selector: row => row.cargo,
            sortable: true,
        },
        {
            name: 'Cedula',
            selector: row => row.ci + ' ' + row.ext_ci,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.user.email,
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
            <Banner text="LISTA DE ADMINISTRATIVOS" />

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
                <div>
                    <Link to="/administrativo/create" className='btn button_green'>
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
                    fixedHeaderScrollHeight='400px'
                    pagination
                    noDataComponent={<span>No se encontro ningun elemento</span>}
                    progressPending={isLoading}
                />
            </div>
        </div>
    )
}

export default IndexAdministrativos
