import { backendUrl } from "../config"

export const modelResult = async ({ review }) => {
    try {
        const response = await fetch(backendUrl, {
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