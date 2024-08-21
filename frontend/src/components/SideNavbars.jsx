import { useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Review } from "./Review";

export function SideNavbars ({ kept, setkept }) {
    const [openSidebar, setOpenSidebar] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [popup, setPopup] = useState({})

    const buildingPopup = ({ review }) => {
        const newPopup = {
            description: review.reseña,
            probability: review.porcentaje
        }
        setPopup(newPopup)
        setIsOpen(true)
    }

    return (
        <>
            <nav className="text-white fixed top-0 w-full h-12 bg-black border-b border-white p-2 flex flex-row justify-between">
                <div>
                    <IoIosMenu className="text-3xl cursor-pointer" onClick={() => setOpenSidebar(true)}/>
                </div>
                <div className="text-lg">AI detector</div>
                <div></div>
            </nav>
            {
                openSidebar && (
                    <nav className={`fixed left-0 h-full bg-black w-48 transition-transform duration-300 ease-in-out
                        p-2 border-r border-white ${openSidebar ? 'transform -translate-x-0' : 'transform-translate-x-full'}`}>
                        <div className="w-full h-full flex flex-col gap-24 transition-all">
                            <IoMdClose className="text-3xl cursor-pointer" onClick={() => setOpenSidebar(false)}/>
                            <div className="flex flex-col gap-6 p-2">
                                <div>
                                    Guardados
                                </div>
                                <ul>
                                    {
                                        kept.map((review, index) => (
                                            <li key={index} className="flex justify-between px-1 py-2 cursor-pointer 
                                                rounded-lg hover:bg-gray-800" onClick={() => buildingPopup({ review })}>
                                                <div className="flex gap-2">
                                                    <span>{index + 1}.</span>
                                                    <span className="text-gray-400">{review.reseña.slice(0, 6) + '...'}</span>
                                                </div>
                                                <span>{review.porcentaje}%</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                )
            }
            {
                isOpen && (
                    <Review isOpen={isOpen} setIsOpen={setIsOpen} review={popup} setkept={setkept}/>
                )
            }
        </>
    )
}