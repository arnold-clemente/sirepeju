import React from 'react'
import propTypes from 'prop-types'
import UserCard from './components/UserCard'
import SidebarLinks from './components/SidebarLinks'
import { links } from './Links'

const Sidebar = ({ sidebar, handleProfile }) => {

    return (
        <div className={'sidebar_container ' + sidebar + ' scroll_style'}>
            <UserCard sidebar={sidebar} handleProfile={handleProfile}/>
            {/* <div className='sidebar_input_search'>
                <InputSearch placeholder='BUSQUEDA RAPIDA' sidebar={sidebar} />
            </div> */}
            <SidebarLinks links={links} sidebar={sidebar} />
        </div>
    )
}

Sidebar.defaultProps = {
    sidebar: propTypes.string.isRequired,
    handleProfile: propTypes.func.isRequired,
}

export default Sidebar
