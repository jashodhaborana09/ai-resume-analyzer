const axios = require("axios");
require("dotenv").config();

async function test() {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "Say hello",
              },
            ],
          },
        ],
      }
    );

    console.log(res.data);
  } catch (err) {
    console.log(err.response?.status);
    console.log(err.response?.data);
  }
}

test();