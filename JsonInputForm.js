import React, { useState } from 'react';
import axios from 'axios';
import Ajv from 'ajv';

const ajv = new Ajv();

const JsonInputForm = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showCharacters, setShowCharacters] = useState(true);
  const [showNumbers, setShowNumbers] = useState(true);
  const [showHighestAlphabet, setShowHighestAlphabet] = useState(true);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      // Validate JSON format here if needed
      const valid = ajv.validate({ type: 'object', properties: { data: { type: 'array' } }, required: ['data'] }, parsedJson);
      if (!valid) {
        throw new Error('Invalid JSON format');
      }
      const response = await axios.post('YOUR_BACKEND_API_URL', parsedJson);
      setResponse(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMultiselectChange = (e) => {
    const { value, checked } = e.target;
    if (value === 'characters') setShowCharacters(checked);
    if (value === 'numbers') setShowNumbers(checked);
    if (value === 'highestAlphabet') setShowHighestAlphabet(checked);
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea value={jsonInput} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <label>
            <input
              type="checkbox"
              value="characters"
              checked={showCharacters}
              onChange={handleMultiselectChange}
            />
            Characters
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              checked={showNumbers}
              onChange={handleMultiselectChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highestAlphabet"
              checked={showHighestAlphabet}
              onChange={handleMultiselectChange}
            />
            Highest Alphabet
          </label>
          <div>
            {showCharacters && <p>Characters: {response.characters}</p>}
            {showNumbers && <p>Numbers: {response.numbers}</p>}
            {showHighestAlphabet && <p>Highest Alphabet: {response.highestAlphabet}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonInputForm;
