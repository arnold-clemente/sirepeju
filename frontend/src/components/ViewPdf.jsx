import React from 'react'
import ModalPdf from './ModalPdf'
import { url } from '../conection/env'


const ViewPdf = ({ resource, modal, close }) => {
    return (
        <>
            <ModalPdf isOpen={modal} closeModal={close}>
                <div className='iframe_pdf'>
                    <embed src={url + '/storage/' + resource}
                        type="application/pdf" >
                    </embed>
                </div>
            </ModalPdf>
        </>
    )
}

export default ViewPdf
