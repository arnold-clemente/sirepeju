import React, { useEffect, useState } from 'react'
import ModalDiv from 'components/ModalDiv';

// para el modal 
import { useModal } from 'hooks/useModal'

import { useMutation } from 'react-query';
import { getAdecuacion } from 'api/adecuacionApi';
import ViewPdf from 'components/ViewPdf';

import Spiner from 'components/Spiner';

const ShowModificacionAdecuacion = ({ modificacion, modal, close }) => {

    const { adecuacion_id } = modificacion;

    // para el modal de reporte de
    const [modalEstatuto, openEstatuto, closeEstatuto] = useModal(false);
    const [modalReglamento, openReglamento, closeReglamento] = useModal(false);
    const [modalInforme, openInforme, closeInforme] = useModal(false);
    const [modalNota, openNota, closeNota] = useModal(false);

    const [cargando, setCargando] = useState(true);
    const [adecuacion, setAdecuacion] = useState({
        id: 0,
        personalidad_juridica: '',
        sigla: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: '',
        naturaleza: '',
        persona_colectiva: '',
        fecha_ingreso_tramite: '',
        codigo_adecuacion: '',
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
    const [personalidad, setPersonalidad] = useState({});
    const [fundadores, setFundadores] = useState([]);

    useEffect(() => {
        if (adecuacion_id != 0) {
            setCargando(true);
            showAdecuacion.mutate(adecuacion_id);
        }
    }, [adecuacion_id])

    const showAdecuacion = useMutation({
        mutationFn: getAdecuacion,
        onSuccess: (response) => {
            const adecuacionResp = response.adecuacion;
            const personalidadResp = response.personalidad;
            const fundadoresResp = response.fundadores;
            setAdecuacion({ ...adecuacion, ...adecuacionResp });
            setPersonalidad(personalidadResp);
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
            <ModalDiv isOpen={modal} closeModal={close} title={'Detalle de la Adecuación'}>
                {cargando
                    ? <Spiner />
                    : <>
                        <div className="container-fluid">
                            <h2 className='text-center fs-4'>{adecuacion.personalidad_juridica} </h2>

                            <h2 className="fs-6"><b>Código: </b>{adecuacion.codigo_adecuacion} &emsp;&emsp;&emsp; <b>Naturaleza:</b> {adecuacion.naturaleza}</h2> <hr />
                            <h2 className="fs-6"><b>Tipo de persona colectiva:</b> &nbsp;{adecuacion.persona_colectiva}&emsp;&emsp;&emsp; <b>Sigla:</b> {adecuacion.sigla}</h2> <hr />
                            <h2 className="fs-6"><b>Domicilio Legal: </b>&nbsp;{adecuacion.domicilio_legal}</h2> <hr />
                            <h2 className="fs-6"><b>Objeto: <p><mark>{adecuacion.objeto}</mark></p></b></h2><hr />

                            {adecuacion.estado == 0
                                ? (<div className='container-fluid '>
                                    <div className='row'>
                                        <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                                        <div className='col-md-9'><span>{adecuacion.observacion}</span></div>
                                    </div>
                                </div>)
                                : ''
                            }

                            {personalidad
                                ? <>
                                    <div className='container-fluid d-flex justify-content-between my-4'>
                                        <button className='btn btn-success' onClick={openEstatuto} >
                                            Estatuto Organico
                                        </button>
                                        <button className='btn btn-success' onClick={openReglamento} >
                                            Reglamento Interno
                                        </button>
                                        <button className='btn btn-success' onClick={openInforme} >
                                            Informe Final
                                        </button>
                                        <button className='btn btn-success' onClick={openNota} >
                                            Nota FInal
                                        </button>
                                    </div>
                                    <ViewPdf resource={personalidad.estatuto_organico} modal={modalEstatuto} close={closeEstatuto} />
                                    <ViewPdf resource={personalidad.reglamento_interno} modal={modalReglamento} close={closeReglamento} />
                                    <ViewPdf resource={personalidad.informe_final} modal={modalInforme} close={closeInforme} />
                                    <ViewPdf resource={personalidad.nota_final} modal={modalNota} close={closeNota} />
                                </>
                                : null
                            }

                            {fundadores.length > 0
                                ? <div>
                                    <h2 className="fs-6"><b><center>Miembros Fundadores:</center></b>
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

                                                                    <td><>{fundador.nombre_completo}</></td>
                                                                    <td><>{fundador.ci}</></td>
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
                    </>

                }
            </ModalDiv>
        </>
    )
}

export default ShowModificacionAdecuacion
