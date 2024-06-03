import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import panel_pagina from '../../../assets/images/panel_pagina.png'
import panel_sirepeju from '../../../assets/images/panel_sirepeju.png'
import '../../../assets/css/seleccion.css'

const Selection = () => {

    return (
        <>
            <div className='selecion_main'>
                <div className='selecion_image'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='selecion_buttons'>
                    <Link to='/admin/dashboard'
                        className="selecion_card"
                    >
                        <div className='selecion_card_image'>
                            <img src={panel_sirepeju} alt="image" />
                        </div>
                        <span>ADMINISTRACIÓN</span>
                        <span>SIREPEJU</span>
                    </Link>
                    <Link to='/panel/sliders'
                        className="selecion_card"
                    >
                        <div className='selecion_card_image'>
                            <img src={panel_pagina} alt="image" />
                        </div>
                        <span>ADMINISTRACIÓN</span>
                        <span>PAGINA WEB</span>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Selection
