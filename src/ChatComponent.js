import React, { useState } from 'react';
import axios from 'axios';

function ChatComponent() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // State to track loading status

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);  // Start loading
        try {
            const result = await axios.post('http://localhost:8080/call-openai', {
                content: userInput
            });
            setResponse(result.data);
        } catch (error) {
            console.error('Error calling the OpenAI API:', error);
            setResponse('Failed to get response from API');
        } finally {
            setIsLoading(false);  // Stop loading regardless of success or failure
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h1>Chat Completion</h1>
            <textarea
                rows="4"
                cols="50"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Say something..."
                style={{ padding: '10px', fontSize: '16px' }}
                disabled={isLoading}  // Disable input during loading
            />
            <button onClick={handleSubmit} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Send'}  
            </button>
            <div style={{
            whiteSpace: 'pre-wrap',
            textAlign: 'left', // Aligns text to the left
            background: '#f4f4f4',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
        }}>
            {isLoading ? 'Awaiting response...' : response}
        </div>
        </div>
    );
}

export default ChatComponent;
