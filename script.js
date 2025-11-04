const API_KEY = 'AIzaSyD8ZJS3IYiYLhJb4wrkMqOnffdjYE89W7w'

async function getGeminiAnswer() {
    const prompt = document.getElementById('user_Prompt').value;
    const responseDiv = document.getElementById('geminiResponse');

    if (!prompt.trim()) {
        responseDiv.innerHTML = 'Please enter a prompt.';
        return;
    }

    responseDiv.innerHTML = 'Loading...';

    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY;

    const body = JSON.stringify({
        contents: [{
            parts: [{ text: prompt }]
        }]
    });

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            const parts = data.candidates[0].content?.parts;
            const geminiText = parts && parts.length > 0 ? parts.map(p => p.text).join(' ') : '(no text)';
            responseDiv.innerHTML = `<strong>Chatbot:</strong> ${geminiText}`;
        } else {
            responseDiv.innerHTML = 'No response received.';
        }

    } catch (error) {
        responseDiv.innerHTML = 'Error: ' + error.message;
    }
}