import React, { useState } from 'react'
import propTypes from 'prop-types'
import SidebarDropdowLink from './SidebarDropdowLink'
import { useSelector } from 'react-redux'

const SidebarButtonLink = ({ icon, texto, sublinks, sidebar }) => {

    const [sublink, setsublink] = useState(false)
    const [dropdown, setdropdown] = useState('')
    const permisos = useSelector(state => state.userStore.permisos);

    const sublinkAdd = () => {
        setsublink(!sublink);
        if (sublink) {
            setdropdown('')
        } else {
            setdropdown('dropdown')
        }
    }
    return (
        <div className={'sidebar_button_link ' + sidebar}>
            <button onClick={sublinkAdd} className={'button_link ' + sidebar}>
                <div className='button_text'>
                    <i className={icon}></i>
                    <span>{texto}</span>
                </div>
                <div className={'button_dropdown ' + dropdown}>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </button>

            {sublink === false
                ? ''
                : <div className='button_link_dropdown animate__animated animate__fadeIn'>
                    {sublinks.map((link, index) => (
                        permisos.includes(link.permission)
                            ? <SidebarDropdowLink
                                key={index}
                                icon={link.icon}
                                texto={link.texto}
                                path={link.path}
                            />
                            : null
                    ))
                    }
                </div>
            }
        </div>
    )
}

SidebarButtonLink.defaultProps = {
    icon: propTypes.string.isRequired,
    texto: propTypes.string.isRequired,
    sublinks: propTypes.array.isRequired,
    sidebar: propTypes.string.isRequired,
}
export default SidebarButtonLink
