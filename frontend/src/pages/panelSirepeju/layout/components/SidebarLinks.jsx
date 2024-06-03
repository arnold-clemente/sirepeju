import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'

import SidebarLink from './SidebarLink'
import SidebarButtonLink from './SidebarButtonLink'

const SidebarLinks = ({ links, sidebar }) => {

    const permisos = useSelector(state => state.userStore.permisos);
    return (
        <div className='sidebar_links'>
            {
                links.map((link, index) => (
                    !link.sublinks
                        ? permisos.includes(link.permission)
                            ? <SidebarLink
                                sidebar={sidebar}
                                key={index}
                                icon={link.icon}
                                texto={link.texto}
                                path={link.path}
                            />
                            : null

                        : permisos.includes(link.permission)
                            ? <SidebarButtonLink
                                sidebar={sidebar}
                                key={index}
                                icon={link.icon}
                                texto={link.texto}
                                sublinks={link.sublinks}
                            />
                            : null



                ))
            }
        </div>
    )
}

SidebarLinks.defaultProps = {
    links: propTypes.array.isRequired,
    sidebar: propTypes.string.isRequired,
}

export default SidebarLinks
