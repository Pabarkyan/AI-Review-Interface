import { useEffect } from "react";
import { useState } from "react";
import { useInput } from "./hooks/useInput";

export default function App() {
    const [message, setMessage] = useState('');
    const { review, setReview, error } = useInput()

    useEffect(() => {
        fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setMessage(data.probability))
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, [review]);

    const handleSubmit = (event) => {
        event.preventDefault()
        const newReview = event.target.value
        setReview(newReview)
    }

    console.log(message)

    return (
        <div>
            <h1>Data probability</h1>
            <div>
                <form action="">
                    <input type="text" placeholder="Introduzca su reseña en español" onClick={handleSubmit}/>
                    <button type="submit">Analizar</button>    
                </form>
            </div>
            <p>{message}</p>
        </div>
    );
}