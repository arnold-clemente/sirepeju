import React from 'react'
import propTypes from 'prop-types'

const ValidationError = ({ text }) => {
  return (
    <div className="text-danger animate__animated animate__fadeInDown">
      <i className='fa-solid fa-circle-exclamation px-2'></i>
      <span>{text}</span>
    </div>
  )
}

ValidationError.defaultProps = {
  text: propTypes.string.isRequired
}

export default ValidationError
