
export const getReservas = async () => {
    const response = await axios.get('/api/reservas/solicitudes')
    return response.data;
}

export const getHomonimias = async () => {
    const response = await axios.get('/api/reservas/homonimias')
    return response.data;
}

export const getReservados= async () => {
    const response = await axios.get('/api/reservas/reservados')
    return response.data;
}

export const getCaducados= async () => {
    const response = await axios.get('/api/reservas/caducados')
    return response.data;
}

export const getReserva = async (reervaId) => {
    const response = await axios.get(`/api/reserva/show/${reervaId}`)
    return response.data;
}

export const createReserva = async (reserva) => {
    const response = await axios.post('/api/reserva/store', reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const updateReserva = async (reserva) => {
    const response = await axios.put(`/api/reserva/update/${reserva.id}`, reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const entregarReserva = async (reserva) => {
    const response = await axios.post('/api/reserva/entregar', reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}

export const caducarReserva = async (reserva) => {
    const response = await axios.post('/api/reserva/caducar', reserva)
        .then((response) => { return response.data })
        .catch((error) => { return error.data });
    return response;
}
