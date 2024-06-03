import React from 'react'
import { useModal } from 'hooks/useModal'
import ModalDiv from 'components/ModalDiv'; //contendoresto hay importar siempre
import RepGob from './reporte/RepGob';

const ShowGob = ({ modal, close, registro }) => {
    const [imprimir, openImprimir, closeImprimir] = useModal(false);

    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'Datos del Responsable Departamental'}>
                <RepGob registro={registro} modal={imprimir} close={closeImprimir} />
                <div className="container-fluid">
                    <h5><center></center></h5>
                    <div className='container-fluid d-flex justify-content-end'>
                        <button onClick={openImprimir} className='button_print_show'>
                            <i className="fa-solid fa-print"></i>
                            <span>Imprimir reporte </span>
                        </button>
                    </div>
                    <div className="card m-2">
                        <div className="card-header">
                            <h5 className="fw-bold text-center">{registro.institucion}</h5>
                        </div>
                        <div className="card-body">
                             <div className="row">
                                <div className="col-md-4 my-1 fw-bold">Responsable Departamental:</div>
                                <div className="col-md-8 my-1 ">{registro.nombres + ' ' + registro.paterno + ' ' + registro.materno}</div>
                                <div className="col-md-4 my-1 fw-bold">Cargo Departamental:</div>
                                <div className="col-md-8 my-1">{registro.cargo}</div>
                                <div className="col-md-4 my-1 fw-bold">Cédula de Identidad:</div>
                                <div className="col-md-8 my-1">{registro.ci + ' ' + registro.ext_ci}</div>
                                <div className="col-md-4 my-1 fw-bold">Correo Institucional:</div>
                                <div className="col-md-8 my-1">{registro.email}</div>
                             </div>
                        </div>
                    </div>
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
