import React, { useEffect, useState } from 'react'
import ModalDiv from '../components/ModalDiv'
import { useModal } from '../hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearch } from '../store/slices/searchSlice'


const Dashboard = () => {

  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userStore.user)
  const busqueda = useSelector(state => state.searchStore.busqueda)



  const [isOpenModal1, openModal1, closeModal] = useModal(false);

  const handleModificar = () => {
    dispatch(updateSearch('Buscando'));
  }

  return (
    <div>
      Bienvendio a sirepeju
      <h1>{busqueda}</h1>
      <ModalDiv isOpen={isOpenModal1} closeModal={closeModal} title={'REGISTRO DE OTORGACION'}>
        <div className=''>
          <h1>hola munod</h1>
        </div>
      </ModalDiv>

      <button onClick={openModal1}><i className="fa-solid fa-eye"></i></button>

      <button onClick={handleModificar} className='btn btn-danger'>Modificar</button>
    </div>
  )
}

export default Dashboard
