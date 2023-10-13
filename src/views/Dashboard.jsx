import React, { useEffect, useState } from 'react'
import ModalDiv from '../components/ModalDiv'
import { useModal } from '../hooks/useModal'


const Dashboard = () => {

  const [isOpenModal1, openModal1, closeModal] = useModal(false);
  return (
    <div>
      Bienvendio a sirepeju
      <ModalDiv isOpen={isOpenModal1} closeModal={closeModal} title={'REGISTRO DE OTORGACION'}>
       <div className=''>
          <h1>hola munod</h1>
       </div>
      </ModalDiv>
     
      <button onClick={openModal1}><i className="fa-solid fa-eye"></i></button>
    </div>
  )
}

export default Dashboard
