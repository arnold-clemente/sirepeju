import { token_expired, permission_denied } from "../components/AxiosError"

export const getAdministrativoDashboard = async (consulta) => {
    const response = await axios.get(`/api/dashboard/${consulta}`)
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

export const getGobernacionDashboard = async (consulta) => {
    const response = await axios.get(`/api/dashboard/gobernacion/${consulta}`)
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