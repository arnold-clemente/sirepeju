import React, { Suspense, lazy, useState } from 'react'

const BusquedaFinalizados = lazy(() => delayForDemo(import('./BusquedaFinalizados')));
const BusquedaTramite = lazy(() => delayForDemo(import('./BusquedaTramite')));

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    }).then(() => promise);
}

const Busqueda = () => {

    const [tipo, setTipo] = useState('finalizado');
    const [finalizado, setFinalizado] = useState(true);

    return (
        <div className="animate__animated animate__fadeIn px-4">
            <>
                <div className='page_tipo_busquedas'>
                    <button onClick={(e) => setFinalizado(true)}
                        className={`tipo_busqueda ${(finalizado ? 'tipos' : '')}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>BÚSQUEDA FINALIZADOS</span>
                    </button>
                    <button onClick={(e) => setFinalizado(false)}
                        className={`tipo_busqueda ${(finalizado ? '' : 'tipos')}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>BÚSQUEDA TRÁMITES</span>
                    </button>
                </div>
                <div className='my-2'>
                    {finalizado
                        ? <Suspense>
                            <BusquedaFinalizados />
                        </Suspense>
                        : <Suspense>
                            <BusquedaTramite />
                        </Suspense>
                    }
                </div>
            </>
        </div>
    )
}

export default Busqueda

