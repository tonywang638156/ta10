import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => setInput(e.target.value);

  const getPrediction = async () => {
    if (!input) {
      setError('Please enter a number');
      return;
    }

    setError('');
    setPrediction(null);

    try {
      // Replace with the GKE external IP and endpoint
      const response = await axios.get(`http://35.224.15.99/predict?x=${input}`);
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Error fetching prediction. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>ML Model Prediction</h1>
      <input
        type="number"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
      <button onClick={getPrediction}>Get Prediction</button>
      {error && <div className="error">{error}</div>}
      {prediction !== null && (
        <div className="result">Prediction: {prediction}</div>
      )}
    </div>
  );
}
