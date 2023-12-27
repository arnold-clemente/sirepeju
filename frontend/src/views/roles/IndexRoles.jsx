import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";
import { useSelector } from 'react-redux'

import { show_alerta } from '../../components/MessageAlert';
import { estilos } from '../../components/estilosdatatables';
import Banner from '../../components/Banner';
import Loading from '../../components/Loading';
import Spiner from '../../components/Spiner';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRoles, destroyRol } from '../../api/rolesApi';
import { useModal } from '../../hooks/useModal';
import ShowRol from './ShowRol';

const IndexRoles = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const permisos = useSelector(state => state.userStore.permisos)

    const [roles, setRoles] = useState({ rol_id: 0 });
    const [showRole, openRole, closeRole] = useModal(false);

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['roles'],
        queryFn: getRoles,
        select: roles => roles.sort((a, b) => b.id - a.id),
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
            ) {
                return registro;
            }
        });

        return filtered
    }

    const searchOnChange = async (e, row) => {
        e.persist();
        setSearch(e.target.value);
    };

    const handleShow = (e, row) => {
        e.preventDefault();
        const aux = {
            rol_id: row.id
        }
        setRoles({...roles, ...aux});
        openRole();
    };

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
                dropRol.mutate(row);
            }
        });
    };

    const dropRol = useMutation({
        mutationFn: destroyRol,
        onSuccess: (response) => {
            queryClient.invalidateQueries('roles')
            show_alerta('Eliminado', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
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
                <div className='container-fluid d-flex flex-row gap-1 justify-content-center'>
                    {permisos.includes('roles')
                        ? <button onClick={(e) => handleShow(e, row)} className="button_show">
                            <i className="fa-solid fa-eye"></i>
                            <span>Ver</span>
                        </button>
                        : null
                    }
                    {permisos.includes('rol.update')
                        ? <Link to={`/rol/editar/${row.id}`} className="button_edit">
                            <i className="fa-solid fa-edit"></i>
                            <span>Editar</span>
                        </Link>
                        : null
                    }
                    {permisos.includes('rol.destroy')
                        ? <button onClick={(e) => handleDelete(e, row)} className="button_delete">
                            <i className="fa-solid fa-x"></i>
                            <span>Eliminar</span>
                        </button>
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
            name: 'Nombre de Rol',
            selector: row => row.name,
            sortable: true,
            width: '250px',
        },
        {
            name: 'Fecha Creado',
            selector: row => row.created_at,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Fecha Actualizado',
            selector: row => row.updated_at,
            sortable: true,
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
            <Banner text="LISTA DE ROLES REGISTRADOS" />
            <ShowRol role={roles}  modal={showRole} close={closeRole}/>
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
                    {permisos.includes('rol.store')
                        ? <Link to="/rol/crear" className='btn button_green'>
                            <span>AÑADIR</span>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </Link>
                        : null
                    }
                </div>
            </div>
            <div className='table-responsive'>
                <DataTable
                    title='TABLA DE ROLES'
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

export default IndexRoles
