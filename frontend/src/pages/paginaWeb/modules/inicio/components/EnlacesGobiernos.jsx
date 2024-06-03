
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/enlaces_gobiernos.css';
import { gobiernos } from '../../data/enlaces';

const EnlacesGobiernos = ({ gobiernos }) => {

    const url = import.meta.env.VITE_BACKEND_URL;

    var settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 2000,
        autoplay: true,        
        speed: 500,
        responsive: [
            {
                breakpoint: 2560,
                settings: {
                    slidesToShow: 8,
                }
            },
            {
                breakpoint: 2300,
                settings: {
                    slidesToShow: 7,
                }
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    return (
        <>
            <div className='enlaces_gobiernos py-4'>
                <div className='enlaces_gobiernos_content'>
                    <div className='enlaces_gobiernos_content_titulo'>
                        <h1>Enlaces de los Gobiernos Aútonomos de Bolivia</h1>
                    </div>
                    <div className='enlaces_gobiernos_sliders py-4'>
                        <Slider {...settings}>

                            {gobiernos.map((enlace) => {
                                if(enlace.tipo == 2)
                                    return (
                                        <a href={enlace.enlace} target="_blank" key={enlace.id} className="enlaces_gobiernos_slider__item">
                                            <div className="gobierno_slider">
                                                <div className="gobierno_slider_imagen">
                                                    <img src={url + '/storage/' + enlace.imagen} alt="imagen" />
                                                </div>
                                            </div>
                                        </a>
    
                                    )
                            })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnlacesGobiernos
