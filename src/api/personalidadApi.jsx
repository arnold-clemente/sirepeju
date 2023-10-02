export const getPersonalidadesJuridicas = async () => {
    const response = await axios.get('/api/personalidades-juridicas')
    return response.data;
}