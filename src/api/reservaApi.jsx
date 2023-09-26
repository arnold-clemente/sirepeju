
export const getReservas = async () => {
    const response = await axios.get('/api/reserva-nombres')
    return response.data;
}

export const createReserva = async (reserva) => {
    const response = await axios.post('/api/reserva-nombres', reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const getReserva = async (reervaId) => {
    const response = await axios.get(`/api/reserva-nombres/${reervaId}`)
    return response.data;
}

export const updateReserva = async (reserva) => {
    const response = await axios.put(`/api/reserva-nombres/${reserva.id}`, reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const entregarReserva = async (reserva) => {
    const response = await axios.post(`/api/reserva-nombres/entregar/${reserva.id}`)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}
