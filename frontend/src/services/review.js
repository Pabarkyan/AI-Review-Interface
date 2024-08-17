export const modelResult = async ({ review }) => {
    try {
        const response = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review })
        })
        const json = await response.json()
        const result = json.probability

        return result

    } catch (e) {
        throw new Error('Error al analizar la reseña', e)
    }
}