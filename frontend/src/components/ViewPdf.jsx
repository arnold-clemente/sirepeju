import React from 'react'
import ModalPdf from './ModalPdf'

const ViewPdf = ({ resource, modal, close }) => {

    const url = import.meta.env.VITE_BACKEND_URL;

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
