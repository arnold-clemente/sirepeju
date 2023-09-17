import React from 'react'

const Loading = () => {
    return (
        <div className="fondo_cristal z-50">
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
            <div className="text-blue-400 font-bold text-lg py-2">
                <span>Cargando...</span>
            </div>
        </div>
    )
}

export default Loading
