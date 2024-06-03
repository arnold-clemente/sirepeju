export const getFooter = async () => {
    const response = await axios.get('/api/footer')
        .then((response) => { return response.data })
        .catch((error) => {
            return error
        })

    return response;
}