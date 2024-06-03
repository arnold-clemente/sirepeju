import '../css/noticias.css'

const Noticias = ({ noticias }) => {

    const url = import.meta.env.VITE_BACKEND_URL;

    return (
        <>
            <div className="noticias_main">
                <div className="noticias_cards">
                    {noticias.map((noticia) => {
                        return (
                            <div key={noticia.id} className="noticia_card">
                                <div className="noticia_card_image">
                                    <img src={url + '/storage/' + noticia.imagen} alt="image" />
                                </div>
                                <div className="noticia_card_text">
                                    <h1>{noticia.titulo}</h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="noticia_card_link">
                    <a href="#" className="link_noticias">
                        <span>VER MÁS NOTICIAS</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Noticias
