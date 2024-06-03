import React from 'react'
// Oswald 
import OswaldBold from './fonts/Oswald/Oswald-Bold.ttf';
import OswaldRegular from './fonts/Oswald/Oswald-Regular.ttf';
import OswaldLigth from './fonts/Oswald/Oswald-Light.ttf';


export const fuentes = {
    family: 'Oswald',
    fonts: [
        {
            src: OswaldRegular,
            fontWeight: 'normal',
        },
        {
            src: OswaldBold,
            fontWeight: 'bold',
        },
        {
            src: OswaldLigth,
            fontWeight: '200',
        },
    ],
};

