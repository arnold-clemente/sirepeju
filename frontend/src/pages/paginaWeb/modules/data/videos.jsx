import icon_jusiticia from '../../assets/image/icon_jusiticia.png';
import icon_editar from '../../assets/image/icon_editar.png';
import icon_medalla from '../../assets/image/icon_medalla.png';

import personalidad_video from '../../assets/video/personeria_juridica.mp4';
import tutorial_sirepeju from '../../assets/video/tutorial_sirepeju.mp4';
import natural_colectiva from '../../assets/video/natural_colectiva.mp4';

export const videos = [
    {
        id: 1,
        descripcion: 'que es una personeria juridica',
        imagen: icon_jusiticia,
        video: personalidad_video,
    },
    {
        id: 2,
        descripcion: 'cual es la diferencia entre persona natural y persona colectiva',
        imagen: icon_editar,
        video: natural_colectiva,
    },
    {
        id: 3,
        descripcion: 'video tutorila para realizar el seguimiento',
        imagen: icon_medalla,
        video: tutorial_sirepeju,
    },
]