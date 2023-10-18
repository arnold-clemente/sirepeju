import React from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

const ModalShow = ({showRegistro, modalRegistro, closeRegistro} ) => {
  return (
    <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
      <div className="modal-dialog modal-lg">
        <h2 className="fs-6"><b>Codigo: {showRegistro.sigla}</b> &nbsp;&nbsp; <b>Naturaleza:</b></h2> <hr />
        <h2 className="fs-6"><b>Institucion Sin Fin de Lucro:</b> &nbsp;&nbsp; <b>Sigla:</b></h2> <hr />
        <h2 className="fs-6"><b>Resolucion Ministerial:</b></h2> <hr />
        <h2 className="fs-6"><b>Fecha de Resolucion Ministerial:</b></h2> <hr />
        <h2 className="fs-6"><b>Domicilio Legal:</b></h2> <hr />
        <h2 className="fs-6"><b>Objeto:</b></h2><hr />
        <h2 className="fs-6"><b>Miembros Fundadores:</b>
          <center>
            <div className='d-flex'>
              <button className="btn btn-secondary" title="Visualizar Miembros">Visualizar lista de fundadores</button>
            </div>
          </center>
        </h2>
      </div>
      <hr />
      <div className='d-flex'>
        <button className="btn btn-secondary" onClick={closeRegistro}>cerrar</button>
      </div>
    </ModalDiv>
  )
}

export default ModalShow
