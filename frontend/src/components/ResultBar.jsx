import { useState, useEffect } from 'react';

const ProgressBar = ({ percentage, error }) => {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFillPercentage((prev) => {
        if (prev < percentage) {
          return prev + 1; // Incrementa el porcentaje en 1% por intervalo
        } else {
          clearInterval(interval);
          return percentage;
        }
      });
    }, 10); // Intervalo de tiempo en milisegundos, ajustable para controlar la velocidad

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    error 
      ? <div className='text-red-800 font-semibold text-lg'>{error}</div>
      : (
          <div className="w-full bg-gray-300 rounded-lg h-14">
            <div
              className="bg-gradient-to-r from-green-800 to-green-500 h-14 rounded-lg transition-all duration-75 ease-out"
              style={{ width: `${fillPercentage}%` }}
            ></div>
          </div>
        )
  )  
}

export default ProgressBar;
