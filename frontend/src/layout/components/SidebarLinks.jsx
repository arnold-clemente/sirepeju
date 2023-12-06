import React from 'react'
import propTypes from 'prop-types'

import SidebarLink from './SidebarLink'
import SidebarButtonLink from './SidebarButtonLink'

const SidebarLinks = ({ links, sidebar }) => {
    return (
        <div className='sidebar_links'>
            {
                links.map((link, index) => (
                    !link.sublinks
                        ? <SidebarLink
                            sidebar={sidebar}
                            key={index}
                            icon={link.icon}
                            texto={link.texto}
                            path={link.path}
                        />
                        : <SidebarButtonLink
                            sidebar={sidebar}
                            key={index}
                            icon={link.icon}
                            texto={link.texto}
                            sublinks={link.sublinks}
                        />

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
