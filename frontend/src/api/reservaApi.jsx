import { token_expired, permission_denied } from "../components/AxiosError"

export const getReservas = async () => {
    const response = await axios.get('/api/reservas/solicitudes')
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const getHomonimias = async () => {
    const response = await axios.get('/api/reservas/homonimias')
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const getReservados = async () => {
    const response = await axios.get('/api/reservas/reservados')
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const getCaducados = async () => {
    const response = await axios.get('/api/reservas/caducados')
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const getReserva = async (reervaId) => {
    const response = await axios.get(`/api/reserva/show/${reervaId}`)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const createReserva = async (reserva) => {
    const response = await axios.post('/api/reserva/store', reserva)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const updateReserva = async (reserva) => {
    const response = await axios.put(`/api/reserva/update/${reserva.id}`, reserva)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const entregarReserva = async (reserva) => {
    const response = await axios.post('/api/reserva/entregar', reserva)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}

export const caducarReserva = async (reserva) => {
    const response = await axios.post('/api/reserva/caducar', reserva)
        .then((response) => { return response.data })
        .catch((error) => {
            switch (error.toJSON().status) {
                case 401:
                    token_expired();
                    break;
                case 403:
                    permission_denied();
                    break;
                default:
                    return error
            }
        })
    return response;
}
