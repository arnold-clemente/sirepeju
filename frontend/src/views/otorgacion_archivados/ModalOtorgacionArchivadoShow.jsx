import React, { useEffect, useState } from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from '../../hooks/useModal'
import Alfanumerico from '../otorgaciones/reporte/Alfanumerico';

import { useMutation } from 'react-query';
import { getOtorgacion } from '../../api/otorgacionesApi';
import RepArchivadoOtorgacion from './reporte/RepArchivadoOtorgacion';

const ModalOtorgacionArchivadoShow = ({ registro, modalRegistro, closeRegistro }) => {
    // para el modal de reporte de
    const [modalAlfanumerico, openAlfanumerico, closeAlfanumerico] = useModal(false);
    const [modalpdf, openModalpdf, closeModalpdf] = useModal(false);
    const [cargando, setCargando] = useState(false);
    const [otorgacion, setOtorgacion] = useState({
        id: 0,
        personalidad_juridica: '',
        sigla: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: '',
        naturaleza: '',
        persona_colectiva: '',
        fecha_ingreso_tramite: '',
        codigo_otorgacion: '',
        domicilio_legal: '',
        objeto: '',
        seguimiento: '',
        cite_informe_preliminar: '',
        miembros_fundador: '',
        nota_interna_final: '',
        numero_informe_final: '',
        fecha_envio: '',
        alfanumerico: '',
        nota_revocatorio: null,
        fecha_revocatoria: null,
        observacion: null,
        estado: 0,
        registro_id: 0,
        administrativo_id: 0,
        created_at: '',
        updated_at: '',
    });
    const [personalidad, setPersonalidad] = useState({
        id: 0,
        estatuto_organico: '',
        reglamento_interno: '',
        informe_final: '',
        nota_final: '',
        resolucion_ministerial: '',
        fecha_resolucion: '',
        otorgacion_id: 0,
        created_at: '',
        updated_at: '',
    });
    const [fundadores, setFundadores] = useState([]);

    const { id } = registro;

    useEffect(() => {
        if (id != 0) {
            setCargando(true);
            showOtorgacion.mutate(id);
        }
    }, [id])

    const showOtorgacion = useMutation({
        mutationFn: getOtorgacion,
        onSuccess: (response) => {
            const otorgacionResp = response.otorgacion;
            const personalidadResp = response.personalidad;
            const fundadoresResp = response.fundadores;
            setOtorgacion({ ...otorgacion, ...otorgacionResp });
            setPersonalidad({ ...personalidad, ...personalidadResp });
            setFundadores(fundadoresResp);
            setCargando(false);
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });
    return (
        <>
            <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
                {!cargando
                    ? (<div className="container-fluid">
                        <h2 className='text-center fs-4'>{otorgacion.personalidad_juridica} </h2>
                        {/* para el modal de pdf de alfanumerico  */}
                        {otorgacion.alfanumerico
                            ? <>
                                <div className='container-fluid d-flex justify-content-end gap-1'>
                                    <button className='btn btn-danger' onClick={openAlfanumerico} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Alfanumerico</span>
                                    </button>
                                    <button className='btn btn-success' onClick={openModalpdf} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Imprimir</span>
                                    </button>
                                </div>
                                <Alfanumerico registro={otorgacion} modal={modalAlfanumerico} close={closeAlfanumerico} />
                                <RepArchivadoOtorgacion modal={modalpdf} close={closeModalpdf}
                                    otorgacion={otorgacion} personalidad={personalidad} fundadores={fundadores} />
                            </>
                            : null
                        }

                        <h2 className="fs-6"><b>Codigo: {otorgacion.codigo_adecuacion}</b> &nbsp;&nbsp; <b>Naturaleza: {otorgacion.naturaleza}</b></h2> <hr />
                        <h2 className="fs-6"><b>Institucion Sin Fin de Lucro:</b> &nbsp;&nbsp; <b>Sigla: {otorgacion.sigla}</b></h2> <hr />
                        <h2 className="fs-6"><b>Domicilio Legal: {otorgacion.domicilio_legal}</b></h2> <hr />
                        <h2 className="fs-6"><b>Objeto: <p className='fs-6'>{otorgacion.objeto}</p></b></h2><hr />


                        {otorgacion.estado == 0
                            ? (<div className='container-fluid '>
                                <div className='row'>
                                    <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                                    <div className='col-md-9'><span>{otorgacion.observacion}</span></div>
                                </div>
                            </div>)
                            : ''
                        }

                        {fundadores.length > 0
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
                                                                <td>{fundador.id}</td>
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


                    </div>)
                    : <div className='spiner_content'><span className='loader_spiner'></span></div>
                }

            </ModalDiv >
        </>
    )
}

export default ModalOtorgacionArchivadoShow
