// boundaries on the input

import { useEffect, useState } from "react"

export function useInput() {
    const [review, setReview] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (review.length > 1375) {
            const newError = 'Reseña demasiado larga, debe ser menor de 1375 caracteres'
            setError(newError)
            return
        }

        if (review.length < 38) {
            const newError = 'Reseña demasiado corta, debe ser mayor de 38 caracteres'
            setError(newError)
            return
        }

        if (review === '') {
            const newError = 'No se puede analizar una cadena de texto vacía'
            setError(newError)
            return
        }

        setError(null)
    }, [review])

    return { review, setReview, error }
}