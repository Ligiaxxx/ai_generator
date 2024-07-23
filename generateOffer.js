const axios = require('axios');

// Funcție pentru analiza cerințelor clientului
function analyzeClientRequest(clientRequest) {
    let requirements = {
        description: clientRequest,
        technologies: [],
        tasks: []
    };

    if (clientRequest.includes("Glovo")) {
        requirements.technologies.push("React", "Ionic", "NestJS", "MongoDB", "Firebase");
        requirements.tasks.push(
            "Dezvoltare interfață utilizator (React, Ionic)",
            "Dezvoltare back-end (NestJS)",
            "Configurare baza de date (MongoDB, Firebase)",
            "Implementare autentificare",
            "Implementare procesare plăți",
            "Integrare API Google Maps pentru navigație",
            "Testare și validare"
        );
    }

    return requirements;
}

// Funcție pentru generarea ofertei folosind un model AI
async function generateOffer(clientRequest) {
    let requirements = analyzeClientRequest(clientRequest);

    let prompt = `Client request: ${clientRequest}\n\nGenerate a detailed offer that includes:\n- Description of the requested application\n- Technologies used\n- Concrete and detailed tasks for developing the application\n`;

    try {
        let aiResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo-instruct", // Schimbă modelul după cum este necesar
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY', // Înlocuiește YOUR_API_KEY cu cheia ta API
                'Content-Type': 'application/json'
            }
        });

        let offer = aiResponse.data.choices[0].text.trim();
        return offer;
    } catch (error) {
        console.error("Eroare la generarea ofertei:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Funcție pentru validarea ofertei
function validateOffer(offer) {
    if (offer.includes("Description") && offer.includes("Technologies") && offer.includes("Tasks")) {
        return true;
    }
    return false;
}

// Exemplu de utilizare a scriptului
(async function main() {
    let clientRequest = "Clientul solicită dezvoltarea unei aplicații de tip Glovo...";

    try {
        let offer = await generateOffer(clientRequest);
        let isValid = validateOffer(offer);

        if (isValid) {
            console.log("Oferta generată este validă:", offer);
        } else {
            console.log("Oferta generată nu este validă. Necesită revizuire.");
        }
    } catch (error) {
        console.error("Eroare la generarea ofertei:", error);
    }
})();
