import React, { useEffect, useState } from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from '../../hooks/useModal'
import ViewPdf from '../../components/ViewPdf';
import { useMutation } from 'react-query';
import { getOtorgacionMod } from '../../api/modificacionApi';
import RepModificaciones from './reporte/RepModificaciones';

const ModalShowMod = ({ showRegistro, modalRegistro, closeRegistro }) => {
    // para el modal de reporte de
    const [modalpdf, openModalpdf, closeModalpdf] = useModal(false);
    const [modalEstatuto, openEstatuto, closeEstatuto] = useModal(false);
    const [modalReglamento, openReglamento, closeReglamento] = useModal(false);

    const [registro, setRegistro] = useState({});
    const [fundadores, setFundadores] = useState([]);
    const [cargando, setCargando] = useState(false);

    const {
        id,
        estatuto_organico,
        reglamento_interno,
        codigo_modificacion,
        tipo,
        personalidad_juridica,
        miembros_fundador,
        domicilio_legal,
        seguimiento,
        cite_informe_preliminar,
        otorgacion_id,
        adecuacion_id,
    } = showRegistro;

    useEffect(() => {
        if (id != 0) {
            if (tipo == 'otorgacion') {
                setCargando(true);
                const otorgacion = { otorgacion_id: otorgacion_id, modificacion_id: id }
                getOtorgacion.mutate(otorgacion);
            }
        }
    }, [id])

    const getOtorgacion = useMutation({
        mutationFn: getOtorgacionMod,
        onSuccess: (response) => {
            const otorgacion = response.otorgacion;
            const fundadores = response.fundadores;
            setRegistro(otorgacion);
            setFundadores(fundadores);
            setCargando(false);
        },
        onError: (error) => {
            console.log(error)
            setCargando(false);
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    return (
        <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
            {cargando === false
                ? <div className="container-fluid">
                    <h2 className='text-center fs-4'>{registro.personalidad_juridica} </h2>

                    {id != 0
                        ? (<>
                            <div className='container-fluid d-flex justify-content-end py-4'>
                                <button className='btn btn-success' onClick={openModalpdf} >
                                    <i className="fa-solid fa-print"></i>
                                    <span className='mx-1'>Imprimir</span>
                                </button>
                            </div>
                            <div className='absolute'>
                                <RepModificaciones modal={modalpdf} close={closeModalpdf} registro={showRegistro} />
                            </div>
                        </>)
                        : null
                    }

                    {otorgacion_id != 0 && registro.codigo_otorgacion
                        ? (<><h2 className="fs-6"><b>Codigo: {registro.codigo_otorgacion}</b> &nbsp;&nbsp; <b>Naturaleza: {registro.naturaleza}</b></h2> <hr /></>)
                        : null
                    }
                    {adecuacion_id != 0 && registro.codigo_adecuacion
                        ? <><h2 className="fs-6"><b>Codigo: {registro.codigo_adecuacion}</b> &nbsp;&nbsp; <b>Naturaleza: {registro.naturaleza}</b></h2> <hr /></>
                        : null
                    }
                    <h2 className="fs-6"><b>Institucion Sin Fin de Lucro:</b> &nbsp;&nbsp; <b>Sigla: {registro.sigla}</b></h2> <hr />
                    <h1 className='fs-5 text-center '>Modificación</h1>
                    <h2 className="fs-6"><b>Codigo Modificacion: {codigo_modificacion}</b></h2> <hr />
                    <h2 className="fs-6"><b>Personalidad Juridica: {personalidad_juridica}</b></h2> <hr />
                    <h2 className="fs-6"><b>Mienbros Fundadores: {miembros_fundador}</b></h2> <hr />
                    <h2 className="fs-6"><b>Domicilio Legal: <p className='fs-6'>{domicilio_legal}</p></b></h2><hr />
                    <h2 className="fs-6"><b>Estatuto Organico: <p className='fs-6'>{estatuto_organico}</p></b></h2><hr />
                    <h2 className="fs-6"><b>Reglamento Interno: <p className='fs-6'>{reglamento_interno}</p></b></h2><hr />
                    <h2 className="fs-6"><b>Seguimiento: <p className='fs-6'>{seguimiento}</p></b></h2><hr />
                    <h2 className="fs-6"><b>Informes: <p className='fs-6'>{cite_informe_preliminar}</p></b></h2><hr />

                    <div className='container-fluid d-flex justify-content-center gap-2'>
                        {estatuto_organico != 'En modificacion'
                            ? (<>
                                <button className='btn btn-danger' onClick={openEstatuto} >
                                    Estatuto Organico
                                </button>
                                <div className='absolute'>
                                    <ViewPdf resource={registro.estatuto_organico} modal={modalEstatuto} close={closeEstatuto} />
                                </div>
                            </>)
                            : null
                        }
                        {reglamento_interno != 'En modificacion'
                            ? (<>
                                <button className='btn btn-danger' onClick={openReglamento} >
                                    Reglamento Interno
                                </button>
                                <div className='absolute'>
                                    <ViewPdf resource={registro.reglamento_interno} modal={modalReglamento} close={closeReglamento} />
                                </div>
                            </>)
                            : null
                        }
                    </div>

                    {fundadores
                        ? <div>
                            <h2 className="fs-6"><b>Miembros Fundadores:</b>
                                <center>
                                    <div className='d-flex'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th className='col'>Nombres</th>
                                                    <th className='col'>Cedula Indentidad</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                                                    return (
                                                        <tr key={fundador.id}>
                                                            <td>{fundador.nombre_completo}</td>
                                                            <td>{fundador.ci}</td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </center>
                            </h2>
                        </div>
                        : null
                    }


                </div>
                : <div className='spiner_content'><span className='loader_spiner'></span></div>
            }
        </ModalDiv >
    )
}

export default ModalShowMod
