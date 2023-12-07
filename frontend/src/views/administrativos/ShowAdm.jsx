import React from 'react'
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal'
import RepAdm from './reporte/RepAdm';

const ShowAdm = ({ modal, close, registro }) => {

    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'LISTA DEL PERSONAL ADMINISTRATIVO DE LA UNIDAD - UPJ'}>
                <div className='container-fluid d-flex justify-content-end'>
                    <button onClick={openImprimir} className='button_print_show'>
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir</span>
                    </button>
                </div>
                

                <RepAdm registro={registro} modal={imprimir} close={closeImprimir} />

                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Nombre Completo:</b> &nbsp;&nbsp;{registro.nombres + ' ' + registro.paterno + ' ' + registro.materno} </h2>&nbsp;&nbsp;<b>CI:</b> {registro.ci + ' ' + registro.ext_ci}<hr />
                    <h2 className="fs-6"><b>Cargo:</b> &nbsp;{registro.cargo}</h2> <hr />
                    {registro.user
                        ? <div><h2 className="fs-6"><b>Correo Electronico:</b> &nbsp;{registro.user.email}</h2><hr />
                            <h2 className="fs-6"><b>Rol:</b> &nbsp;{registro.user.rol}</h2> <hr />
                        </div>
                        : ''}
                </div>
                <hr />
                <div className='d-flex'>
                    <button className="btn btn-secondary" onClick={close}>cerrar</button>
                </div>
            </ModalDiv>
        </>
    )
}

export default ShowAdm
