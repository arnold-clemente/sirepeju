import React, { createRef, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import bcrypt from "bcryptjs-react";

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';

import { getOtorgaciones, createRegistroFinal } from '../../api/otorgacionesApi';
import { createRegisroPersonaColectiva } from '../../api/registroPersonaColectivaApi';
// modal 
import ModalSm from '../../components/ModalSm'
import ModalMd from '../../components/ModalMd'
import { useModal } from '../../hooks/useModal'//esto ya estaba
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

const IndexOtorgacion = () => {

    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrorModal, openRegistrorModal, closeRegistrorModal] = useModal(false);
    const [personaModal, openPersonaModal, closePersonaModal] = useModal(false);
    const [errorval, serErrorval] = useState({});
    // par el modal 
        const [showotorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
        // declarar un hook 
        const [otorgacionShow, setotorgacionShow] = useState({});

    const [registroFinal, setRegistroFinal] = useState({
        otorgacion_id: 1,
        alfanumerico: '',
        nota_interna_final: '',
        numero_informe_final: '',
        fecha_envio: '',
    })
    const [file, setFile] = useState(null);

    const inputRef = createRef()


    const { nota_interna_final, alfanumerico, numero_informe_final, fecha_envio, otorgacion_id } = registroFinal;

    const [personaCol, setPersonaCol] = useState({
        otorgacion_id: 1,
    })
    const { estatuto_organico, reglamento_interno, informe_final, nota_final, resolucion_ministerial, fecha_resolucion } = personaCol

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['otorgaciones'],
        queryFn: getOtorgaciones,
        select: reservas => reservas.sort((a, b) => b.id - a.id)
    })

    const filteredRegistros = () => {
        if (search.length == 0)
            return registros;
        const filtered = registros.filter(registro => {
            if (registro.miembros_fundador) {
                if (
                    registro.miembros_fundador.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.domicilio_legal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.objeto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.ci_rep.toLowerCase().includes(search.toLowerCase())
                ) {
                    return registro;
                }
            } else {
                if (
                    registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.domicilio_legal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.objeto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.ci_rep.toLowerCase().includes(search.toLowerCase())
                ) {
                    return registro;
                }
            }

        });

        return filtered
    }

    const searchOnChange = async (e, row) => {
        e.persist();
        await setSearch(e.target.value);
    };

    const handleRegistroFinal = (e, row) => {
        e.preventDefault();
        serErrorval({});
        const encript = '$2a$10$CwTycUXWue0Thq9StjUM0u'
        const concatenar = row.personalidad_juridica + '-' + row.naturaleza + '-' + row.codigo_otorgacion;
        const alfanumerico_cript = bcrypt.hashSync(concatenar, encript)
        let auxiliar = {
            otorgacion_id: row.id,
            alfanumerico: alfanumerico_cript,
            nota_interna_final: '',
            numero_informe_final: '',
            fecha_envio: '',
        }
        setRegistroFinal({ ...auxiliar })
        openRegistrorModal()
        // let comp = bcrypt.compareSync(concatenar, alfanumerico)
    };

    const handleInputChange = ({ target }) => {
        setRegistroFinal({
            ...registroFinal,
            [target.name]: target.value
        });
    }; 

    const handleGuardarRegistro = (e) => {
        e.preventDefault();
        setLoading(true);
        closeRegistrorModal();
        addRegistroFinal.mutate(registroFinal)
    }

    const addRegistroFinal = useMutation({
        mutationFn: createRegistroFinal,
        onSuccess: (response) => {
            setLoading(false);
            if (response.status === true) {
                let auxiliar = {
                    otorgacion_id: 1,
                    alfanumerico: '',
                    nota_interna_final: '',
                    numero_informe_final: '',
                    fecha_envio: '',
                }
                setRegistroFinal({ ...auxiliar })
                serErrorval({});
                queryClient.invalidateQueries('otorgaciones')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErrorval(response.errors);
                openRegistrorModal();
                setLoading(false);
            }
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        }
    });

    const handlePersonaModal = (e, row) => {
        e.preventDefault();
        serErrorval({});
        const auxiliar = {
            otorgacion_id: row.id,
        }
        setPersonaCol({ ...personaCol, ...auxiliar })
        openPersonaModal();
    }
    const handleShow = (e, row) => {
        e.preventDefault();
        openOtorgacion();
        const prueba = row;
        setotorgacionShow({ ...otorgacionShow, ...prueba })
        console.log(otorgacionShow)
    }

    const handleGuardarPersona = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const otorgacion_id = formData.append('otorgacion_id', personaCol.otorgacion_id)
        const estatuto_organico = formData.get('estatuto_organico')
        const reglamento_interno = formData.get('reglamento_interno')
        const informe_final = formData.get('informe_final')
        const nota_final = formData.get('nota_final')
        const resolucion_ministerial = formData.get('resolucion_ministerial')
        const fecha_resolucion = formData.get('fecha_resolucion')
        setLoading(true);
        closePersonaModal();
        addPersonaColectiva.mutate(formData)
    }

    const addPersonaColectiva = useMutation({
        mutationFn: createRegisroPersonaColectiva,
        onSuccess: (response) => {
            setLoading(false);  
            console.log(response)
            if (response.status === true) {  
                queryClient.invalidateQueries('otorgaciones')
                show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setLoading(false);
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
                serErrorval(response.errors);
                openPersonaModal();
                setLoading(false);
            }
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        }
    });

   

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (

                <div className='d-flex justify-content-start'>
                    {!row.miembros_fundador
                        ? <Link to={`/otorgaciones/${row.id}/fundadores`} className="button_edit"><i className="fa-solid fa-users"></i><span>fundadores</span></Link>
                        : ''}
                    {row.estado === 1
                        ? <Link to={`/buscar-reserva/${row.entidad.toLowerCase().replace(/ /g, '_')}`} className="button_verificar"><span className=''>Verificar</span></Link>
                        : <div className='d-flex justify-content-start'>
                            {!row.alfanumerico
                                ? <button onClick={(e) => handleRegistroFinal(e, row)} className="button_print"><i className="fa-regular fa-registered"></i><span>Etapa Final</span></button>
                                : ''
                            }
                            <button onClick={(e) => handlePersonaModal(e, row)} className="button_delete"><i className="fa-solid fa-file-pdf"></i><span>Persona Colectiva</span></button>
                            <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i></button> 
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
            name: 'Persona Juridica',
            selector: row => row.personalidad_juridica,
            sortable: true,
            grow: 3,
        },
        {
            name: 'Mienbros',
            selector: row => row.miembros_fundador,
            sortable: true,
            grow: 2
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
            {loading === true ? <Loading /> : ''}
            {/* modal para el etapa final de registro  */}
            <ModalSm isOpen={registrorModal} closeModal={closeRegistrorModal} title={'ETAPA FINAL DE REGISTRO'}>
                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>CITE NOTA INTERNA FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="text" className='form-control' placeholder='Rellenar Campo'
                                name='nota_interna_final' value={nota_interna_final} onChange={handleInputChange} />
                            {errorval.nota_interna_final
                                ? <ValidationError text={errorval.nota_interna_final} />
                                : ''}
                        </div>
                    </div>
                
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>NUMERO INFORME FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="text" className='form-control' placeholder='Rellenar Campo'
                                name='numero_informe_final' value={numero_informe_final} onChange={handleInputChange} />
                            {errorval.numero_informe_final
                                ? <ValidationError text={errorval.numero_informe_final} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>FECHA ENVIO: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="date" className='form-control' placeholder='Rellenar Campo'
                                name='fecha_envio' value={fecha_envio} onChange={handleInputChange} />
                            {errorval.fecha_envio
                                ? <ValidationError text={errorval.fecha_envio} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-4 px-0'>
                            <span className='font_span_input'>ALFANUMERICO: </span>
                        </div>
                        <div className='col-sm-8 px-0'>
                            <textarea cols="8" type="text" className='form-control' disabled
                                name='alfanumerico' value={alfanumerico} />
                            {errorval.alfanumerico
                                ? <ValidationError text={errorval.alfanumerico} />
                                : ''}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <button onClick={closeRegistrorModal} className='btn btn-danger'>Cancelar</button>
                        <button onClick={handleGuardarRegistro} className='btn btn-primary'>Guardar</button>
                    </div>
                </div>

            </ModalSm>
            
            {/* modal para registro persona colectiva  */}
            <ModalMd isOpen={personaModal} closeModal={closePersonaModal} title={'REGISTRO PERSONA COLECTIVA'}>
                <form onSubmit={handleGuardarPersona} className='container-fluid' >
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>ESTATUTO ORGANICO: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='estatuto_organico' accept="application/pdf"/>
                            {errorval.estatuto_organico
                                ? <ValidationError text={errorval.estatuto_organico} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>REGLAMENTO INTERNO: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='reglamento_interno' accept="application/pdf"/>
                            {errorval.reglamento_interno
                                ? <ValidationError text={errorval.reglamento_interno} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>INFORME FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='informe_final' accept="application/pdf"/>
                            {errorval.informe_final
                                ? <ValidationError text={errorval.informe_final} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>NOTA FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='nota_final' accept="application/pdf"/>
                            {errorval.nota_final
                                ? <ValidationError text={errorval.nota_final} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>N° RESOLUCION MINISTERIAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="text" className='form-control' placeholder='Rellenar Campo'
                                name='resolucion_ministerial'/>
                            {errorval.resolucion_ministerial
                                ? <ValidationError text={errorval.resolucion_ministerial} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>FECHA RESOLUCION: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="date" className='form-control' placeholder='Rellenar Campo'
                                name='fecha_resolucion' />
                            {errorval.fecha_resolucion
                                ? <ValidationError text={errorval.fecha_resolucion} />
                                : ''}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <button onClick={closePersonaModal} className='btn btn-danger'>Cancelar</button>
                        <button type='submit' className='btn btn-primary'>Guardar</button>
                    </div>
                </form>
            </ModalMd>
            <ModalDiv isOpen={showotorgacion} closeModal={closeOtorgacion} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
            <div  class="modal-dialog modal-lg">
                    <h2 class="fs-6"><b>Codigo:</b> &nbsp;&nbsp; <b>Naturaleza:</b></h2> <hr />
                    <h2 class="fs-6"><b>Institucion Sin Fin de Lucro:</b> &nbsp;&nbsp; <b>Sigla:</b></h2> <hr />
                    <h2 class="fs-6"><b>Resolucion Ministerial:</b></h2> <hr />
                    <h2 class="fs-6"><b>Fecha de Resolucion Ministerial:</b></h2> <hr />
                    <h2 class="fs-6"><b>Domicilio Legal:</b></h2> <hr />
                    <h2 class="fs-6"><b>Objeto:</b></h2><hr />
                    <h2 class="fs-6"><b>Miembros Fundadores:</b>
                    
                    <center>
                    <div className='d-flex'>
                    <button button class="btn btn-secondary" title="Visualizar Miembros">Visualizar lista de fundadores</button>
                    </div>
                    </center>
                    </h2>
                       
                </div>
                <hr />
                <div className='d-flex'>
                    <button button class="btn btn-secondary" title="cerrar" onClick={closeOtorgacion}>cerrar</button>
                </div>
        
        </ModalDiv>
        
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
