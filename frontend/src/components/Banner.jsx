import React from 'react'
import propTypes from 'prop-types'

const Banner = ({ text }) => {
    return (
        <div className="container">
            <h4 className="text-uppercase">{text}</h4>
        </div>
    )
}

Banner.defaultProps = {
    text: propTypes.string.isRequired,
}
export default Banner
