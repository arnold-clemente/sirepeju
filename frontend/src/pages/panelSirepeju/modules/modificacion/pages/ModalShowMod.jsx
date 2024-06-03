import React, { useEffect, useState } from 'react'
import ModalDiv from 'components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from 'hooks/useModal'
import ViewPdf from 'components/ViewPdf';
import { useMutation } from 'react-query';
import { getOtorgacionMod } from 'api/modificacionApi';

const ModalShowMod = ({ showRegistro, modalRegistro, closeRegistro }) => {  

    return (
        <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'LISTA DE PERSONERIAS JURIDICAS CON RESOLUCION MINISTERIAL'}>
           
           <div>

           </div>
        </ModalDiv >
    )
}

export default ModalShowMod
