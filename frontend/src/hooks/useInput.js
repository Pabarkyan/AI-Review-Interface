// boundaries on the input

import { useEffect, useRef, useState } from "react"

export function useInput() {
    const [review, setReview] = useState('')
    const [inputError, setInputError] = useState(null)
    const isInitialInput = useRef(true)

    useEffect(() => {
        if (isInitialInput.current) {
            isInitialInput.current = review === ''
            return
        }

        if (review.length > 1375) {
            const newError = 'Reseña demasiado larga, debe ser menor de 1375 caracteres'
            setInputError(newError)
            return
        }

        if (review.length < 38) {
            const newError = 'Reseña demasiado corta, debe ser mayor de 38 caracteres'
            setInputError(newError)
            return
        }

        if (review === '') {    
            const newError = 'No se puede analizar una cadena de texto vacía'
            setInputError(newError)
            return
        }

        setInputError(null)
    }, [review])

    return { review, setReview, inputError }
}