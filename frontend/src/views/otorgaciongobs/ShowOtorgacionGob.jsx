import React from 'react'
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal';
import RepOtoGob from './reporte/RepOtoGob';

const ShowOtorgacionGob = ({ registro, modal, close }) => {

  const [imprimir, openImprimir, closeImprimir] = useModal();

  return (
    <>
      <ModalDiv isOpen={modal} closeModal={close} title={'Otorgacion Gobernacion'}>
        <div className='container-fluid d-flex justify-content-end'>
          <RepOtoGob registro={registro} modal={imprimir} close={closeImprimir}/>
          <button onClick={openImprimir} className='button_print_show'>
            <i className="fa-solid fa-print"></i>
            <span>Imprimir</span>
          </button>
        </div>
        <div className='container-fluid'>
          <h1 className='fs-2 text-center text-uppercase'>{registro.nombre_persona_colectiva}</h1><div className='d-flex align-items-center'>
            <h2 className='font-weight-bold fs-3'>Sigla:</h2>
            <h2 className='px-2 fs-3'>{registro.sigla}</h2>
          </div>
        </div>

      </ModalDiv>
    </>
  )
}

export default ShowOtorgacionGob
