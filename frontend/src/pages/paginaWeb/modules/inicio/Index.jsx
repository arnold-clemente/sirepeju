import SliderPortada from "./components/SliderPortada";
import Videos from "./components/Videos";
import Titulo from "../../components/Titulo";
import Enlaces from "./components/Enlaces";
import EnlacesGobiernos from "./components/EnlacesGobiernos";
import Noticias from "./components/Noticias";
import Loader from 'components/Loader'

import { useQuery } from 'react-query'
import { getIndex } from "api/pagina/indexApi"; 

import './css/inicio.css';
import { useState } from "react";

const Index = () => {

    const { isLoading, data: consulta, isError, error } = useQuery({
        queryKey: ['inicio'],
        queryFn: getIndex,
    })


    if (isLoading) return <Loader />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <div className="animate__animated animate__fadeIn">
            <SliderPortada sliders={consulta.sliders}/>
            <Videos videos={consulta.videos} />
            <Titulo titulo={'ENTIDADES RELACIONADAS CON LA UPJ'} />
            <Enlaces enlaces={consulta.enlaces} />
            <EnlacesGobiernos gobiernos={consulta.enlaces} />
            <Titulo titulo={'NOTICIAS'} />
            <Noticias noticias={consulta.noticias} />

        </div>
    )
}

export default Index
