import { useEffect } from "react";
import { useState } from "react";

export default function App() {
      const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/test') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setMessage(data.message))
        .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  console.log(message)

  return (
      <div>
          <h1>Test Connection</h1>
          <p>{message}</p>
      </div>
  );
}