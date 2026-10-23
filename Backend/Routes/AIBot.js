const express = require('express');
const { isLoggedin } = require('../middlewares/Authorization');
const router = express.Router();


const { GoogleGenAI } = require('@google/genai')
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })


router.route("/")
    .get((req, res) => {
        res.send('yes ai route');
    })

    .post(async (req, res) => {
        try {
            let { message } = req.body;
            console.log("message", message, "req, body", req.body);
            if (!message) {
                return res.status(400).json({ msg: 'Please enter something to ask you query' });
            }

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                config: {
                    systemInstruction: `You are FERS Assistant, a helpful chatbot for FERS (Farm Equipment Rental System) — an online platform where farmers can rent farm equipment from equipment owners in India.

Your job is to help users with:
- Searching and finding equipment (Tractors, Harvesters, Tillers, Sprayers, Seeders, Irrigation tools)
- Understanding how to book equipment (search → select date → send request → owner approves)
- Checking booking status (Pending, Approved, Rejected)
- Rental pricing guidance
- Equipment categories and brands (Mahindra, John Deere, Sonalika, etc.)
- How the approval workflow works (farmer requests → owner approves/rejects)
- Location-based equipment search
- General farming equipment advice

Rules:
- Keep answers short, simple and friendly
- Use Indian context (₹ for prices, Indian brands, Indian farming seasons)
- If asked something unrelated to farming or equipment rental, politely redirect
- Never make up equipment listings or prices — guide users to browse the platform`
                },

                contents: `${message}`,
            });

            console.log("res", response.text);
            return res.status(200).json({ reply: response.text });
        } catch (error) {
            console.log("error at text ai ", error);
            return res.status(500).json({ msg: `internal server error ${error}` });
        }
    })

module.exports = router;