import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// recursos
import noticias_1 from 'assets/images/pagina_web/noticias_1.jpg';
import logovic from 'assets/images/logovic.jpg';

const SliderPortada = ({ sliders }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplaySpeed: 2000,
        autoplay: true,
    };

    const direction = import.meta.env.VITE_BACKEND_URL;
    return (
        <div className="main_slide">

            <div className="slide__content">
                <div className="slide__content__items">
                    <Slider {...settings}>
                        {sliders.map((slider) => {
                            return (
                                <div className="slider__item container-fluid" key={slider.id}>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="slider_item_image col-md-6">
                                            <img src={direction + '/storage/' + slider.imagen} alt="image" />
                                        </div>
                                        <div className="slider_item_text col-md-6">
                                            <div className="slider_item_text_image">
                                                <img src={logovic} alt="image" />
                                            </div>
                                            <h1>{slider.titulo}</h1>
                                            <p className="d-flex align-items-center gap-2">
                                                <i className="fa-regular fa-clock text-primary"></i>
                                                <span>{slider.fecha}</span>
                                            </p>
                                            <p>{slider.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default SliderPortada
