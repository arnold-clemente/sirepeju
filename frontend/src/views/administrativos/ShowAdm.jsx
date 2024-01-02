import React from 'react'
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal'
import RepAdm from './reporte/RepAdm';

const ShowAdm = ({ modal, close, registro }) => {

    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'LISTA DEL PERSONAL ADMINISTRATIVO UPJ - VA'}>


                <div className='container-fluid d-flex justify-content-end'>
                    <button onClick={openImprimir} className='button_print_show'>
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir Reporte</span>
                    </button>
                </div>


                <RepAdm registro={registro} modal={imprimir} close={closeImprimir} />

<<<<<<< Updated upstream
                <div className="modal-dialog">
                    <div className="card m-2">
                        <div className="card-header">
                             <h5 className='fw-bold'>Datos del Administrativo</h5>
                        </div>
                        <div className="card-body">
                           <div className="row">
                            <div className="col-md-4 fw-bold my-1">
                              Nombre Completo :
                            </div>
                            <div className="col-md-8 my-1">
                            {registro.nombres + ' ' + registro.paterno + ' ' + registro.materno}
                            </div>

                            <div className="col-md-4 fw-bold my-1">
                              C.I. :
                            </div>
                            <div className="col-md-8 my-1">
                            {registro.ci + ' ' + registro.ext_ci}
                            </div>

                            <div className="col-md-4 fw-bold my-1">
                              Cargo :
                            </div>
                            <div className="col-md-8 my-1">
                            {registro.cargo}
                            </div>

                            <div className="col-md-4 fw-bold my-1">
                              Correo Electrónico :
                            </div>
                            <div className="col-md-8 my-1">
                            {registro.email}
                            </div>

                            <div className="col-md-4 fw-bold my-1">
                              Rol :
                            </div>
                            <div className="col-md-8 my-1 text-uppercase">
                            {registro.usuario}
                            </div>

                           </div>
                        </div>
                    </div> 
=======
                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Nombre Completo:</b> &nbsp;&nbsp;{registro.nombres + ' ' + registro.paterno + ' ' + registro.materno} </h2>&nbsp;&nbsp;<b>CI:</b> {registro.ci + ' ' + registro.ext_ci}<hr />
                    <h2 className="fs-6"><b>Cargo:</b> &nbsp;{registro.cargo}</h2> <hr />
                    <div
                    ><h2 className="fs-6"><b>Correo Electronico:</b> &nbsp;{registro.email}</h2><hr />

                        <h2 className="fs-6"><b>Rol:</b> &nbsp;{registro.usuario}</h2> <hr />
                    </div>

>>>>>>> Stashed changes
                </div>

                <div className='d-flex'>
                    <button className="btn btn-secondary" onClick={close}>cerrar</button>
                </div>
            </ModalDiv>
        </>
    )
}

export default ShowAdm
