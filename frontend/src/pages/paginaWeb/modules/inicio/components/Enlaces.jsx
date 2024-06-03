
import '../css/enlaces.css';

const Enlaces = ({ enlaces }) => {

    const url = import.meta.env.VITE_BACKEND_URL;

    return (
        <>
            <div className="enlaces_main">
                <div className="enlaces_content">
                    <div className="enlaces_content_titulo">
                        <h1>Enlaces de Interes</h1>
                    </div>
                    <div className='enlaces_main_cards'>
                        {enlaces.map((enlace) => {
                            if (enlace.tipo == 1)
                                return (
                                    <div key={enlace.id} className="enlaces_content_slider">
                                        <a href={enlace.enlace} target='_blank' className="enlaces_content_slider_card">
                                            <div className='enlaces_content_slider_card_image'>
                                                <img src={url + '/storage/' + enlace.imagen} alt="image" />
                                            </div>
                                            <div className='enlaces_content_slider_card_text'>
                                                <h1>{enlace.nombre}</h1>
                                                <i className="fa-solid fa-hand-pointer"></i>
                                            </div>
                                        </a>
                                    </div>
                                )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Enlaces
