// hook to communicate with backend

import { useCallback, useState } from "react";
import { modelResult } from "../services/review";

export function useProbability({ review }) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState('')
    const [error, setError] = useState(null)

    const getReviewResult = useCallback(async ({ review }) => {
        try {
            setLoading(true)
            const newResults = await modelResult({ review })
            setResult(newResults)
            setError(null)
        } catch (e) {
            const newError = 'Error al analizar la reseña'
            setError(newError)
            console.log(e)
        } finally {
            setLoading(false)
        }
    })
    
    return { loading, getReviewResult, error }

}