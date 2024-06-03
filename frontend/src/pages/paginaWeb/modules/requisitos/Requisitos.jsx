import React, { Suspense, lazy, useState } from 'react'
const Reglamentos = lazy(() => delayForDemo(import('./Reglamentos')));
const Normativas = lazy(() => delayForDemo(import('./Normativas')));

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    }).then(() => promise);
}

const Requisitos = () => {


    return (
        <>
            <Suspense>
                <Reglamentos />
            </Suspense>
            <Suspense>
                <Normativas />
            </Suspense>
        </>
    )
}

export default Requisitos