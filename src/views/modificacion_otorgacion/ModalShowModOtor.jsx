import React, { useState } from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre
import { url } from '../../conection/env';

// para el modal 
import { useModal } from '../../hooks/useModal'
import Estatuto from './reporte/EstatutoMod';

const ModalShowModOtor = ({ showRegistro, modalRegistro, closeRegistro }) => {
    
    // para el modal de reporte de
    const [modalAlfanumerico, openAlfanumerico, closeAlfanumerico] = useModal(false);
    const [modalEstatuto, openEstatuto, closeEstatuto] = useModal(false);

    return (
        <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
            <div className="container-fluid">
                <h2 className='text-center fs-4'>{showRegistro.personalidad_juridica} </h2>


                <h2 className="fs-6"><b>Codigo: {showRegistro.codigo_adecuacion}</b> &nbsp;&nbsp; <b>Naturaleza: {showRegistro.naturaleza}</b></h2> <hr />
                <h2 className="fs-6"><b>Institucion Sin Fin de Lucro:</b> &nbsp;&nbsp; <b>Sigla: {showRegistro.sigla}</b></h2> <hr />
                <h2 className="fs-6"><b>Domicilio Legal: {showRegistro.domicilio_legal}</b></h2> <hr />
                <h2 className="fs-6"><b>Objeto: <p className='fs-6'>{showRegistro.objeto}</p></b></h2><hr />

                {showRegistro.registro_persona_colectiva
                    ? (<>
                        <div className='container-fluid d-flex justify-content-center'>
                            <button className='btn btn-danger' onClick={openEstatuto} >
                                Estatuto
                            </button>
                        </div>
                        <Estatuto registro={showRegistro} modal={modalEstatuto} close={closeEstatuto} src={url} />
                    </>)
                    : ''}



                {showRegistro.estado == 0
                    ? (<div className='container-fluid '>
                        <div className='row'>
                            <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                            <div className='col-md-9'><span>{showRegistro.observacion}</span></div>
                        </div>
                    </div>)
                    : ''
                }

                {showRegistro.fundadores && showRegistro.miembros_fundador
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
                                            {showRegistro.fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
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
        </ModalDiv >
    )
}

export default ModalShowModOtor
