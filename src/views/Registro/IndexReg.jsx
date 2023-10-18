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
import ValidationError from '../../components/ValidationError';
import storage from '../../Storage/storage'

import { getRegistros, entregarRegistro, createOtorgacion } from '../../api/registroApi';
// modal 
import ModalDiv from '../../components/ModalDiv'
import { useModal } from '../../hooks/useModal'

const IndexReg = () => {

    const url = 'http://sirepeju.test/reporte/reserva/'
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const [isModalOtorgacion, openModalOtorgacion, closeModalOtorgacion] = useModal(false);
    //para el modal
    const [showregistro, openRegistro, closeRegistro] = useModal(false);
    const [registroShow, setRegistroShow] = useState({});
    const [otorgacion, setOtorgacion] = useState({
        id: 0,
        fecha: '',
        codigo: '',
        domicilio: '',
        objeto: '',
        user_id: storage.get('authUser').id
    })
    const [errorval, serErroreval] = useState({});

    const { fecha, codigo, domicilio, objeto } = otorgacion;

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

    const enviarRegistro = useMutation({
        mutationFn: createOtorgacion,
        onSuccess: (response) => {
            if (response.status === true) {

                queryClient.invalidateQueries('registros')
                show_alerta('Creado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
                // go('/user-gobernaciones')
            } else {
                openModalOtorgacion();
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErroreval(response.errors);
                setLoading(false);
            }
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

    const handleEnviar = (e) => {
        e.preventDefault();
        closeModalOtorgacion();
        setLoading(true);
        const enviar = otorgacion;
        enviarRegistro.mutate(enviar);
    }

    const handleOtorgacion = (e, row) => {
        e.preventDefault();
        setOtorgacion({
            ...otorgacion,
            ['id']: row.id
        });
        const resetval = { fecha: '', codigo: '', domicilio: '', objeto: '' }
        serErroreval({ ...errorval, ...resetval });
        openModalOtorgacion();
        console.log(otorgacion)
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

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='d-flex flex-row justify-content-start'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <a href={url + row.id} target='_blank' className="button_print"><i className="fa-solid fa-print"></i><span>Imprimir</span></a>
                    <div className='d-flex flex-row justify-content-start'>
                        {row.fecha_entrega
                            ? <div className='d-flex flex-row justify-content-starts'>
                                <button onClick={(e) => handleOtorgacion(e, row)} className="button_show"><i className="fa-solid fa-file-import"></i><span>Otorgacion</span></button>
                            </div>
                            : <button onClick={(e) => handleEntregar(e, row)} className="button_download"><i className="fa-solid fa-check"></i><span>Entregar</span></button>
                        }
                    </div>
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
            <Banner text="REGISTRO DE ENTIDADES" />
            <ModalDiv isOpen={showregistro} closeModal={closeRegistro} title={'ENTIDAD RESERVADA'}>
                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Entidad:</b>&nbsp;&nbsp;{registroShow.entidad}</h2> <hr />
                    <h2 className="fs-6"><b>Sigla:</b>&nbsp;&nbsp;{registroShow.sigla}<hr /></h2> <hr />
                    <h2 className="fs-6"><b>Representante legal:</b>&nbsp;&nbsp; {registroShow.representante}<b>CI:</b>9999</h2> <hr />
                    <h2 className="fs-6"><b>Nº Correlativo:</b> &nbsp;&nbsp;{registroShow.nro_certificado}</h2><hr />
                    <h2 className="fs-6"><b>Naturaleza:</b> &nbsp;&nbsp;{registroShow.naturaleza}</h2>
                </div>
                <hr />
                <div className='d-flex'>
                    <button className="btn btn-secondary" title="cerrar" onClick={closeRegistro}>cerrar</button>
                </div>
            </ModalDiv>
            <ModalDiv isOpen={isModalOtorgacion} closeModal={closeModalOtorgacion} title={'REGISTRO DE OTORGACION'}>
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
    )
}

export default IndexReg
