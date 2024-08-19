import { useInput } from "./hooks/useInput";
import { useProbability } from "./hooks/useProbability";

export default function App() {
    const { review, setReview, inputError } = useInput()
    const { loading, error, result, getReviewResult } = useProbability({ review })

    const handleSubmit = (event) => {
        event.preventDefault() // evita que la pagina se recarge
        getReviewResult({ review })
    }

    const handleInput = (event) => {
        const newReview = event.target.value
        setReview(newReview)
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-black to-blue-800">
            <main className="flex flex-col p-24 pt-16 h-full justify-center items-center gap-16">
                <div className="flex flex-col gap-12">
                    <h1 className="text-center text-4xl font-semibold">
                        AI REVIEW DETECTOR
                    </h1>
                    <p className="text-center text-md text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                        officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-10 px-12 w-full items-center"
                >
                    <textarea
                        className={`border rounded-lg p-4 
                            placeholder:text-center w-full ${inputError 
                                ? 'border-red-800'
                                : 'border-white'}
                        `}
                        type="text" 
                        placeholder="Introduzca su reseña" 
                        onChange={handleInput} 
                        value={review}
                        rows={8} // Puedes ajustar el número de líneas visibles
                    />
                    {
                        inputError
                            ? <span className="text-red-800 font-semibold text-lg">{inputError}</span>
                            : (
                                <button type="submit"
                                    className="rounded-lg border inline-block w-24 font-semibold p-2"
                                >
                                    Analizar
                                </button>    
                            )
                    }
                </form>
            </main>
        </div>
    );
}
