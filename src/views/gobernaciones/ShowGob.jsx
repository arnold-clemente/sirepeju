import React from 'react'
import { useModal } from '../../hooks/useModal'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre
import RepGob from './reporte/RepGob';

const ShowGob = ({ modal, close, registro }) => {
    const [imprimir, openImprimir, closeImprimir] = useModal(false);

    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'Responsable Gobernacion'}>
                <RepGob registro={registro} modal={imprimir} close={closeImprimir} />
                <div className="container-fluid">
                    <h2><center>
                        {
                            registro.departamento
                                ? registro.departamento.institucion
                                : null
                        }
                    </center>
                    </h2>
                    <div className='container-fluid d-flex justify-content-end'>
                        <button onClick={openImprimir} className='button_print_show'>
                            <i class="fa-solid fa-print"></i>
                            <span>Imprimir</span>
                        </button>
                    </div>
                    <h2 className="fs-6"><b>Responsable departamental:</b>&nbsp;&nbsp;{registro.nombres + ' ' + registro.paterno + ' ' + registro.materno} </h2><hr />
                    <h2 className="fs-6"><b>Cargo departamental: </b>{registro.cargo}</h2> <hr />

                    <h2 className="fs-6"><b>Cedula de Indentidad: </b>{registro.ci + ' ' + registro.ext_ci}</h2> <hr />
                    <h2 className="fs-6"><b>Correo Institucional: </b> {registro.user ? registro.user.email : ''} &nbsp;&nbsp;</h2>
                </div>
                <hr />
                <div className='d-flex'>
                    <button className="btn btn-secondary" title="cerrar" onClick={close}>cerrar</button>
                </div>
            </ModalDiv>
        </>
    )
}

export default ShowGob
