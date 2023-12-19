export const getEntidadesGlobal = async () => {
    const response = await axios.get('/api/entidades')
    return response.data;
}

export const createHomonimia= async (reserva) => {
    const res = await axios.post('/api/reserva/homonimo', reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}

export const createRegistro= async (reserva) => {
    const res = await axios.post('/api/reserva/reservar', reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return res;
}