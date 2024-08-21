// hook to communicate with backend

import { useCallback, useRef, useState } from "react";
import { modelResult } from "../services/review";

export function useProbability({ review }) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(0)
    const [error, setError] = useState(null)

    const previousReview = useRef(review)

    const getReviewResult = useCallback(async ({ review }) => {

        if (previousReview.current === review) return

        try {
            setLoading(true)
            previousReview.current = review === ''
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
    }, [])
    
    return { loading, getReviewResult, error, result, setResult }

}