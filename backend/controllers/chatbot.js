const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Load and parse rules from PDF (Hindi) once at startup
let rulesText = "ASCT योजना के नियम लोड नहीं हो सके।";

(async () => {
  try {
    const pdfPath = path.join(__dirname, "..", "data", "rules.pdf");
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    rulesText = pdfData.text;
    console.log("✅ ASCT rules loaded from PDF.");
  } catch (err) {
    console.error("❌ Failed to load ASCT rules PDF:", err);
  }
})();

exports.chatbot = async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "कृपया एक मान्य प्रश्न भेजें।" });
  }

  try {
    // Create the final prompt in Hindi
    const prompt = `
आप एक सहायक हैं जो ASCT (Advocate Self Care Team) योजना के नियमों और प्रक्रियाओं के आधार पर उत्तर देता है।

नियम:
${rulesText}

प्रश्न: ${query}
उत्तर (संक्षेप में, स्पष्टता के साथ और हिंदी में दें):
    `;

    // Call Gemini API (v1 REST)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "कोई उत्तर प्राप्त नहीं हुआ।";
    res.json({ response: output });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API से उत्तर प्राप्त करने में त्रुटि हुई।" });
  }
};
