import { IoIosRefresh } from "react-icons/io";
import ResultBar from "./components/ResultBar";
import { SideNavbars } from "./components/SideNavbars";
import { useInput } from "./hooks/useInput";
import { useProbability } from "./hooks/useProbability";
import { ArchiveIcon } from "lucide-react";
import { useState } from "react";

export default function App() {
    const { review, setReview, inputError, handleRefresh } = useInput()
    const { loading, error, result, getReviewResult, setResult } = useProbability({ review })
    const [kept, setkept] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault() // evita que la pagina se recarge
        getReviewResult({ review })
    }

    const hanldeUpdateRefresh = () => {
        handleRefresh()
        setResult(0)
    }

    const addReview = ({ review , result }) => {
        if (review === '') return
        if (result === '') return

        const newReview = {
            reseña: review,
            porcentaje: result
        }
        setkept([...kept, newReview])
        hanldeUpdateRefresh()
    }

    const handleInput = (event) => {
        const newReview = event.target.value
        setReview(newReview)
    }

    return (
        <>
        <SideNavbars kept={kept} setkept={setkept}/>
        <div className="w-full min-h-screen bg-gradient-to-r from-black to-blue-800 justify-center flex items-center">
            <div className="rounded-lg border border-white bg-black w-2/3 h-[400px] flex">
                <form onSubmit={handleSubmit}
                    className="flex flex-col w-full h-full"
                >
                        <textarea
                            className={`p-4 
                                placeholder:text-center h-4/5 w-full ${inputError 
                                    ? 'border-red-800'
                                    : 'border-white'}
                            `}
                            type="text" 
                            placeholder="Introduzca su reseña" 
                            onChange={handleInput} 
                            value={review}
                            rows={8} // Puedes ajustar el número de líneas visibles
                        />
                        <div className="py-2 px-4 border-t h-1/5 flex items-center justify-between border-white">
                            {
                                inputError
                                    ? <span className="text-red-800 font-semibold text-lg">{inputError}</span>
                                    : (
                                        <button type="submit"
                                            className="rounded-lg border inline-block w-24 font-semibold p-2 hover:bg-slate-100 transition-all hover:text-black"
                                        >
                                            Analizar
                                        </button>    
                                    )
                            }
                            
                        </div>
                    
                </form>
                <div className="border-l p-4 w-1/3 h-full flex flex-col border-white justify-between">
                    <div className="flex flex-col gap-8">
                        <div className="p-2 gap-2 flex flex-col text-gray-400">
                            <span className="text-4xl text-center">{result}%</span>
                            <div className="text-center text-sm">
                                de ser escrito por una IA
                            </div>
                        </div>
                        {
                            loading 
                                ? <div>Cargando...</div>
                                : <ResultBar percentage={result} error={error}/>
                        } 
                    </div>
                    <div className="p-2 flex justify-evenly">
                        <div className="text-2xl p-2 cursor-pointer hover:bg-slate-100 hover:rounded-full transition-all hover:text-black" onClick={hanldeUpdateRefresh}>
                            <IoIosRefresh />
                        </div>
                        <div className="text-2xl cursor-pointer p-2 hover:bg-slate-100 hover:rounded-full transition-all hover:text-black" onClick={() => addReview({ review, result })}>
                            <ArchiveIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </>
    
    )


    /* <div className="w-full min-h-screen bg-gradient-to-r from-black to-blue-800">
            <div className="flex flex-row p-24 pt-16 w-full h-full justify-center items-center gap-16">
                
                <form onSubmit={handleSubmit}
                    className="flex flex-col gap-10 px-12 w-full items-center"
                >
                    <div>
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
                    </div>
                </form>
                {
                    loading 
                        ? <div>Cargando...</div>
                        : <ResultBar percentage={result} error={error}/>
                }
            </div>
        </div> */
}