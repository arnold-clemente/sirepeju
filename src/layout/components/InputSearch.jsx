import React from 'react'
import propTypes from 'prop-types'

const InputSearch = ({placeholder, sidebar}) => {
    return (
        <div className={'input_search '+sidebar}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder={placeholder}/>
        </div>
    )
}

InputSearch.defaultProps = {
    placeholder: propTypes.string.isRequired,
    sidebar: propTypes.string.isRequired,
}
export default InputSearch
