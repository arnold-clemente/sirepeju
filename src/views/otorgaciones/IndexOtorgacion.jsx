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

import { getOtorgaciones } from '../../api/otorgacionesApi';
// modal 
import ModalDiv from '../../components/ModalDiv'
import { useModal } from '../../hooks/useModal'

const IndexOtorgacion = () => {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const [fundadorModal, openFundadorModal, closeFundadorModal] = useModal(false);

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['otorgaciones'],
        queryFn: getOtorgaciones,
        select: reservas => reservas.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (
                registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.domicilio_legal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.objeto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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

    const handleFundadores = (e, row) => {
        e.preventDefault();
        openFundadorModal();
        console.log(row);
       
    }; 

    const enviarFundadores = (e) => {
        e.preventDefault();
        // closeModalOtorgacion();
        // setLoading(true);
        const enviar = otorgacion;
        // enviarRegistro.mutate(enviar);
    }

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (

                <div className='d-flex flex-row justify-content-start'>
                    <Link to={`/reserva/edit/${row.id}`} className="button_edit"><i className="fa-solid fa-pen-to-square"></i></Link>
                    {row.estado === 1
                        ? <Link to={`/buscar-reserva/${row.entidad.toLowerCase().replace(/ /g, '_')}`} className="button_verificar"><span className=''>Verificar</span></Link>
                        : <div className='d-flex flex-row justify-content-start'>
                            {row.fecha_entrega
                                ? <button onClick={(e) => handleFundadores(e, row)} className="button_print"><i className="fa-solid fa-print"></i></button>
                                : <button onClick={(e) => handleFundadores(e, row)} className="button_download"><i className="fa-regular fa-user"></i></button>
                            }
                        </div>
                    }

                </div>

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
            name: 'Mienbros',
            selector: row => row.id,
            sortable: true,
            grow: 3
        },
        {
            name: 'Persona Juridica',
            selector: row => row.personalidad_juridica,
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
            name: 'Codigo',
            selector: row => row.codigo_otorgacion,
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
            <ModalDiv isOpen={fundadorModal} closeModal={closeFundadorModal} title={'AGREGAR FUNDADORES'}>
            <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Fecha de Ingreso:</label>
                        <input type="date" className="form-control" placeholder="fecha" aria-label="First name"
                            name="fecha" value={fecha} onChange={handleInputChange} />
                        {errorval.fecha
                            ? <ValidationError text={errorval.fecha} />
                            : ''}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Codigo OPJ</label>
                        <input type="text" className="form-control" placeholder="Escriba codigo OPJ" aria-label="Last name"
                            name="codigo" value={codigo} onChange={handleInputChange} />
                        {errorval.codigo
                            ? <ValidationError text={errorval.codigo} />
                            : ''}
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Domicilio Legal</label>
                        <input type="text" className="form-control" placeholder="Escriba la direccion" aria-label="Last name" name="domicilio" value={domicilio} onChange={handleInputChange} />
                        {errorval.domicilio
                            ? <ValidationError text={errorval.domicilio} />
                            : ''}
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Objeto</label>
                        <textarea rows={5} className="form-control" placeholder="Escriba el objeto" aria-label="Last name" name="objeto" value={objeto} onChange={handleInputChange} />
                        {errorval.objeto
                            ? <ValidationError text={errorval.objeto} />
                            : ''}
                    </div>
                </div>
                <div className='container-fluid d-flex gap-2 justify-content-end pt-4'>
                    <button onClick={closeModalOtorgacion} className='btn btn-danger'>Cerrar</button>
                    <button onClick={handleEnviar} className='btn btn-primary'>Enviar</button>
                </div>
            </ModalDiv>
            {loading === true ? <Loading /> : ''}
            <Banner text="REGISTRO DE OTORGACION" />

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
                    fixedHeaderScrollHeight='400px'
                    pagination
                    noDataComponent={<span>No se encontro ningun elemento</span>}
                    progressPending={isLoading}
                />
            </div>
        </div>
    )
}

export default IndexOtorgacion
