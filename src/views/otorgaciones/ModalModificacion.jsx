import React from 'react'
import ModalDiv from '../../components/ModalDiv';

const ModalModificacion = ({regsitro, modal, open, close}) => {
  return (
    <>
      <ModalDiv isOpen={modal} closeModal={close} title={'MODIFICACIÓN OTORGACION'}>
        <form>
        </form>
      </ModalDiv>
    </>
  )
}

export default ModalModificacion;
