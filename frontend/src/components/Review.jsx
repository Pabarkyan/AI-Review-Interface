import { IoIosTrash } from 'react-icons/io';

export function Review({ review, isOpen, setIsOpen, setkept }) {

    const probability = review.probability
    const description = review.description

    const togglePopup = () => {
        setIsOpen(false);
    };

    const removeReview = (probability, description) => {
        setkept(prevReviews => 
          prevReviews.filter(reseña => 
            reseña.probability !== probability && reseña.description !== description
          )
        )
        setIsOpen(false)
      }


    return (
        <div className="relative">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
                    onClick={togglePopup}
                ></div>
            )}
            <div
                className={`fixed inset-0 flex items-center justify-center z-50 transition-transform transform duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'
                    }`}
            >
                <div className="bg-black border border-white p-6 rounded-lg shadow-lg flex flex-col mx-12 my-12">
                    <h2 className="text-lg font-semibold mb-4">{probability}% de haber sido escrito por una ia</h2>
                    <p className="mb-4">{description}</p>
                    <div className='flex justify-end gap-2 p-2'>
                        <div className='p-2 flex items-center border border-black rounded-lg hover:border-white hover:transition-all'
                            onClick={() => removeReview({ probability, description })}
                        >
                            <IoIosTrash className='text-2xl' />
                        </div>
                        <button
                            onClick={togglePopup}
                            className="px-1 bg-blue-black border border-black hover:border-white hover:transition-all text-white rounded-lg"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

