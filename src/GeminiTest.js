import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiTest() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  let genAI; // Declare genAI outside useEffect

  const generateText = async (genAI) => {
    if (!genAI) return; // Exit if genAI is undefined

    try {
      const result = await genAI.generateContent(prompt);
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const apiKey = 'AIzaSyDOTovjPlINp3oouLnwrhqn5j2xHNhlunc'; // Replace with your actual API key

    if (!apiKey) {
      setError('Please set the REACT_APP_GEMINI_API_KEY environment variable.');
      return;
    }

    genAI = new GoogleGenerativeAI(apiKey);

  }, []); // Empty dependency array to run only once

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <h1>Test Your Gemini API Key</h1>
      <input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt here"
      />
      <button onClick={() => generateText(genAI)}>Generate Text</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <p>{response}</p>}
    </div>
  );
}

export default GeminiTest;
