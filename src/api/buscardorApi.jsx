export const getEntidadesGlobal = async () => {
    const response = await axios.get('/api/verificacion/entidades')
    return response.data;
}

export const createHonimia= async (reserva) => {
    const res = await axios.post(`/api/verificacion/homonimia/${reserva.reserva_id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}


export const createRegistro= async (reserva) => {
    const res = await axios.post(`/api/verificacion/registro/${reserva.reserva_id}`, reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}