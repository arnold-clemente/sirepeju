import React from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

const ModalShow = ({ showRegistro, modalRegistro, closeRegistro }) => {

  const url = 'http://sirepeju.test/storage/';

  return (
    <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
      <div className="modal-dialog modal-lg">
        <h2 className='text-center fs-4'>{showRegistro.personalidad_juridica} </h2>
        <h2 className="fs-6"><b>Codigo: {showRegistro.codigo_adecuacion}</b> &nbsp;&nbsp; <b>Naturaleza: {showRegistro.naturaleza}</b></h2> <hr />
        <h2 className="fs-6"><b>Institucion Sin Fin de Lucro:</b> &nbsp;&nbsp; <b>Sigla: {showRegistro.sigla}</b></h2> <hr />
        <h2 className="fs-6"><b>Domicilio Legal: {showRegistro.domicilio_legal}</b></h2> <hr />
        <h2 className="fs-6"><b>Objeto: <p className='fs-6'>{showRegistro.objeto}</p></b></h2><hr />

        {showRegistro.registro_persona_adecuacion
          ? (<div>
            <h2 className="fs-6"><b>Resolucion Ministerial: {showRegistro.registro_persona_adecuacion.resolucion_ministerial}</b></h2> <hr />
            <h2 className="fs-6"><b>Fecha de Resolucion Ministerial: {showRegistro.registro_persona_adecuacion.fecha_resolucion}</b></h2> <hr />
            {/* <p>{showRegistro.registro_persona_adecuacion.estatuto_organico}</p> */}
            <object data={url + showRegistro.registro_persona_adecuacion.estatuto_organico} type="application/pdf" width="100%" height="900px"/>
            {/* <embed src={url + showRegistro.registro_persona_adecuacion.estatuto_organico} type="application/pdf" height="20px" width="500"></embed> */}
            {/* <iframe src={url+showRegistro.registro_persona_adecuacion.estatuto_organico} /> */}
          </div>)
          : ''}

        <h2 className="fs-6"><b>Miembros Fundadores:</b>
          <center>
            <div className='d-flex'>
              {showRegistro.fundadores
                ? (<table className='table'>
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
                )
                : ''
              }
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
