import React from 'react'

const CardRequisito = ({ requisito }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
      <div className='card_requisito_main'>
        <div className='card_requisito'>
          <div className='card_requisito_content'>
            <p>{requisito.nombre}</p>
          </div>
          <div className='card_requisito_image'>
            <img src={url + 'storage/' + requisito.imagen} alt="image" />
          </div>
        </div>
        <div className='card_requisito_button'>
          <p>VER MÁS +</p>
        </div>
      </div>
    </>
  )
}

export default CardRequisito
