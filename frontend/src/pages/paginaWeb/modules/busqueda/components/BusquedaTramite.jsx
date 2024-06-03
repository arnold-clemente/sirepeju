import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import ReactPaginate from 'react-paginate';

import { getTramites } from 'api/pagina/tramitesApi';

import Loader from 'components/Loader'
import LoaderBuscando from 'components/LoaderBuscando';
import CardTramite from './CardTramite';
import ModalTramite from './ModalTramite';
import { useModal } from 'hooks/useModal';

const BusquedaTramite = () => {
    // para la paginacion
    const [currentpage, setCurrentpage] = useState(0);
    const [range, setRange] = useState(5);
    const [registros, setRegistros] = useState([]);
    const [avanzado, setAvanzado] = useState(true);
    const [buscando, setBuscando] = useState(false);
    const [modal, openModal, closeModal] = useModal(false);
    const [mostrar, setMostrar] = useState({});

    const [parameters, setParameters] = useState({
        search: '',
        entidad: '',
        sigla: '',
        codigo: '',
    });

    const { search, entidad, codigo, sigla } = parameters;

    const { isLoading, data: consulta, isError, error } = useQuery({
        queryKey: ['busqueda_tramites'],
        queryFn: getTramites,
    })

    useEffect(() => {
        if (consulta) {
            setRegistros(consulta);
        }
    }, [isLoading])


    const filterBasic = (e) => {
        e.preventDefault();
        setBuscando(true);
        const filtered = consulta.filter(registro => {
            if (
                registro.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.codigo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase()) ||
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase())
            ) {
                return registro;
            }
        });
        setTimeout(() => {
            setRegistros(filtered);
            setBuscando(false);
        }, 1000)
    }

    const filterAvanzado = (e) => {
        e.preventDefault();
        setBuscando(true);
        const filtered = consulta.filter(registro => {
            if (
                registro.entidad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(entidad.toLowerCase()) &&
                registro.codigo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(codigo.toLowerCase()) &&
                registro.sigla.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(sigla.toLowerCase())
            ) {
                return registro;
            }
        });
        setTimeout(() => {
            setRegistros(filtered);
            setBuscando(false);
        }, 1000)
    }

    const filterRegister = () => {
        return registros.slice(currentpage, (currentpage + range))
    }

    const next = () => {
        if ((currentpage + range) < registros.length) {
            setCurrentpage(currentpage + range)
        }
    }

    const handlePageClick = (e) => {
        const position = e.selected + 1;
        if (position == 1) {
            setCurrentpage(0)
        } else {
            const salt = position * range;
            setCurrentpage(salt - range)
        }
    }

    const prev = () => {
        if (currentpage > 0) {
            setCurrentpage(currentpage - range)
        }
    }

    const handleInputChange = ({ target }) => {
        setParameters({
            ...parameters,
            [target.name]: target.value
        })
    }

    const showRegistro = (e, sRegistro) => {
        e.preventDefault();
        setMostrar({ ...mostrar, ...sRegistro });
        openModal();
    }


    if (isLoading) return <Loader />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            <ModalTramite registro={mostrar} modal={modal} closeModal={closeModal} />
            <div className="animate__animated animate__fadeInRight py-4">
                <div className='my-2 d-flex flex-column align-items-center gap-2'>
                    <div className='d-flex'>
                        <button onClick={(e) => setAvanzado(false)} type='button'
                            className={`mx-2 button_page_search ${!avanzado ? 'type_active' : ''}`}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <span>BÚSQUEDA SIMPLE</span>
                        </button>
                        <button onClick={(e) => setAvanzado(true)} type='button'
                            className={`mx-2 button_page_search ${avanzado ? 'type_active' : ''}`}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <span>BÚSQUEDA AVANZADA</span>
                        </button>
                    </div>
                    {avanzado
                        ? <form className='mt-4 d-flex flex-column align-items-center gap-2 container-fluid' onSubmit={filterAvanzado}>
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="search" className="form-control" id="codigo" placeholder="Codigo de Tramite"
                                            name='codigo' value={codigo} onChange={handleInputChange} minLength='3' maxLength='100' />
                                        <label>Codigo de Trámite</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="search" className="form-control" id="entidad" placeholder="Nombre Persona juridica"
                                            name='entidad' value={entidad} onChange={handleInputChange} minLength='3' maxLength='250' />
                                        <label >Nombre Entidad</label>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='button_page_search_submit'>
                                <span>BUSCAR</span>
                            </button>
                        </form>
                        : <form className='mt-4 container' onSubmit={filterBasic}>
                            <div className="d-flex flex-column align-items-center gap-2">
                                <div className='container-fluid row '>
                                    <div className='col-md-12'>
                                        <div className="form-floating">
                                            <input type="search" id='search' className="form-control w-full" placeholder="Ingrese:Personalidad júridica o sigla o naturaleza o numero de tramite"
                                                name='search' value={search} onChange={handleInputChange} minLength='3' maxLength='250' />
                                            <label>Ingrese: Personalidad júridica</label>
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='col-md-3 button_page_search_submit'>
                                    <span>BUSCAR</span>
                                </button>
                            </div>
                        </form>
                    }

                </div>
                {buscando
                    ? <LoaderBuscando />
                    : <>
                        <div>
                            <div className="card">
                                <div className="card-body opacity-75 d-flex justify-content-center">
                                    <div className='text-primary'>
                                        <i className="fa-solid fa-circle-exclamation mx-2"></i>
                                        <span>{'Resultados para la busqueda:' + ' ' + registros.length + ' Coincidencia(s)'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='page_main_cards'>
                                {registros.length > 0
                                    ? filterRegister().map((registro, index) => {
                                        return (
                                            <button key={index} onClick={(e) => showRegistro(e, registro)}>
                                                <CardTramite registro={registro} />
                                            </button>
                                        )
                                    })
                                    : <p className='text-danger'>No se Encontraron Coincidencia(s)</p>
                                }
                            </div>
                        </div>
                        <ReactPaginate
                            className='pagination flex align-items-center gap-md-2 justify-content-center flex-wrap'
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            activeClassName='active'
                            previousClassName='page-link'
                            disabledClassName='disabled'
                            nextClassName='page-link'
                            breakLabel="..."
                            nextLabel="Siguiente"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            pageCount={Math.ceil((registros.length / range))}
                            previousLabel="Anterior"
                            renderOnZeroPageCount={null}
                        />
                    </>
                }

            </div>
        </>
    )
}

export default BusquedaTramite
