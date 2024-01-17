import React from 'react'

const LoaderBuscando = () => {
  return (
    <div className='d-flex flex-column align-items-center py-4 my-4'>
      <section className='my-1'>
        <span className='text-primary fs-4'>Buscando</span>
      </section>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  )
}

export default LoaderBuscando
