import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import bcrypt from "bcryptjs-react";

import Loading from '../../components/Loading';
import Banner from '../../components/Banner';

import { getOtorgaciones } from '../../api/otorgacionesApi';
// modal 
import { useModal } from '../../hooks/useModal'
// modal components 
import ModalShowOtorgacion from './ModalShowOtorgacion';
import ModalRegistroFinalOtorgacion from './ModalRegistroFinalOtorgacion';
import ModalPersonaOtorgacion from './ModalPersonaOtorgacion';
import ModalSeguimientoOtorgacion from './ModalSeguimientoOtorgacion';
import ModalInformeOtorgacion from './ModalInformeOtorgacion';

const IndexOtorgacion = () => {
    
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // para el modal show Otorgacion
    const [modalOtorgacion, openOtorgacion, closeOtorgacion] = useModal(false);
    const [otorgacionShow, setotorgacionShow] = useState({});

    //para registro persona colectiva
    const [personaModal, openPersonaModal, closePersonaModal] = useModal(false);
    const [personaCol, setPersonaCol] = useState({ otorgacion_id: 1 });

    //para el seguimiento
    const [segumientoModal, openSeguimientoModal, closeSeguimientoModal] = useModal(false);
    const [seguimiento, setSeguimiento] = useState({ otorgacion_id: 1, seguimiento: '', fecha: '' });

    // para el informe
    const [informeModal, openInformeModal, closeInformeModal] = useModal(false);
    const [informe, setInforme] = useState({ otorgacion_id: 1, informe: '', fecha: '' });

    // para el registro final 
    const [registrorModal, openRegistrorModal, closeRegistrorModal] = useModal(false);
    const [registroFinal, setRegistroFinal] = useState({
        otorgacion_id: 1,
        alfanumerico: '',
        nota_interna_final: '',
        numero_informe_final: '',
        fecha_envio: '',
    })

    const { isLoading, data: registros, isError, error } = useQuery({
        queryKey: ['otorgaciones'],
        queryFn: getOtorgaciones,
        select: otorgaciones => otorgaciones.sort((a, b) => b.id - a.id)
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
                    registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.codigo_otorgacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.ci_rep.toLowerCase().includes(search.toLowerCase())
                ) {
                    return registro;
                }
            } else {
                if (
                    registro.personalidad_juridica.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.representante.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.naturaleza.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                    registro.codigo_otorgacion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
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

    const handleShow = (e, row) => {
        console.log(row)
        e.preventDefault();
        openOtorgacion();
        const prueba = row;
        setotorgacionShow({ ...otorgacionShow, ...prueba })

    }

    const handleRegistroFinal = (e, row) => {
        e.preventDefault();
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
    };

    const handlePersonaModal = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
        }
        setPersonaCol({ ...personaCol, ...auxiliar })
        openPersonaModal();
    }

    const handleSeguimiento = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
            seguimiento: '',
            fecha: '',
        }
        setSeguimiento({ ...seguimiento, ...auxiliar })
        openSeguimientoModal();
    }

    const handleInforme = (e, row) => {
        e.preventDefault();
        const auxiliar = {
            otorgacion_id: row.id,
            informe: '',
            fecha: '',
        }
        setInforme({ ...informe, ...auxiliar })
        openInformeModal();
    }


    const handleInputChange = ({ target }) => {
        setRegistroFinal({
            ...registroFinal,
            [target.name]: target.value
        });
    };

    const handleInputSeguimiento = ({ target }) => {
        setSeguimiento({
            ...seguimiento,
            [target.name]: target.value
        });
    };

    const handleInputInforme = ({ target }) => {
        setInforme({
            ...informe,
            [target.name]: target.value
        });
    };

    const columns = [
        {
            name: 'Acciones',
            cell: (row) => (
                <div className='container-fluid d-flex flex-row'>
                    <button onClick={(e) => handleShow(e, row)} className="button_show"><i className="fa-solid fa-eye"></i><span>Ver</span></button>
                    <div className='dropdown'>
                        <button className="button_dropdown_table dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                           <li>
                                <button onClick={(e) => handleInforme(e, row)} className="button_download_table">
                                    <i className="fa-solid fa-file-pen"></i>
                                    <span className='mx-2'>Informe Preliminar</span>
                                </button>
                            </li>
                             <li>
                                <button onClick={(e) => handleSeguimiento(e, row)} className="button_show_table">
                                    <i className="fa-solid fa-pen"></i>
                                    <span className='mx-2'>Seguimiento</span>
                                </button>
                            </li>
                            <li>
                                {!row.miembros_fundador
                                    ? <Link to={`/otorgaciones/${row.id}/fundadores`} className="button_edit_table">
                                        <i className="fa-solid fa-users"></i>
                                        <span className='mx-2'>fundadores</span>
                                    </Link>
                                    : ''
                                }
                            </li>
                            <li>
                                {row.miembros_fundador && !row.alfanumerico
                                    ? <button onClick={(e) => handleRegistroFinal(e, row)} className="button_print_table">
                                        <i className="fa-regular fa-registered"></i>
                                        <span className='mx-2'>Etapa Final</span>
                                    </button>
                                    : ''
                                }
                            </li>
                            <li>
                                {row.miembros_fundador && row.alfanumerico
                                    ? <button onClick={(e) => handlePersonaModal(e, row)} className="button_delete_table">
                                        <i className="fa-solid fa-file-pdf"></i>
                                        <span className='mx-2'>Persona Colectiva

                                        </span>
                                    </button>
                                    : ''
                                }
                            </li>
                        </ul>
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
            name: 'Persona Juridica',
            selector: row => row.personalidad_juridica,
            sortable: true,
            grow: 3,
        },
        {
            name: 'Miembros',
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
            {/* para le modal show adecuacion  */}
            <ModalShowOtorgacion showRegistro={otorgacionShow} modalRegistro={modalOtorgacion} closeRegistro={closeOtorgacion} />
            {/* par el modal de seguimiento  */}
            <ModalSeguimientoOtorgacion registrorModal={segumientoModal} closeRegistrorModal={closeSeguimientoModal} openRegistrorModal={openSeguimientoModal}
                registro={seguimiento} handleInputChange={handleInputSeguimiento} />

            {/* par el modal de citeinforme  */}
            <ModalInformeOtorgacion registrorModal={informeModal} closeRegistrorModal={closeInformeModal} openRegistrorModal={openInformeModal}
                registro={informe} handleInputChange={handleInputInforme} />

            {/* par el modal de etapa final  */}
            <ModalRegistroFinalOtorgacion registrorModal={registrorModal} closeRegistrorModal={closeRegistrorModal} openRegistrorModal={openRegistrorModal}
                registroFinal={registroFinal} handleInputChange={handleInputChange} />

            {/* para el modal de persona colectiva  */}
            <ModalPersonaOtorgacion persona={personaCol} modalRegistro={personaModal} openRegistrorModal={openPersonaModal} closeRegistrorModal={closePersonaModal} />

            <Banner text="PROCESO DE OTORGACION" />
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
                    <Link to="/adecuacion/crear" className='btn button_green'>
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

export default IndexOtorgacion
