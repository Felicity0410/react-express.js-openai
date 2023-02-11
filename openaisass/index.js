require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const cors = require('cors')



const app = express()
const PORT = 8000

const configuration = new Configuration({
    organization: "org-xQeaamyinqgmauk0KoSTe2tS",
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)



app.use(express.json())
app.use(cors())

app.post('/', async (req, res) => {

const { message } = req.body

const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are Steve Jobs. Answer with suggestions regarding job application and motivational content.
Steve: How can I help you today?
Person: ${message}`,
    temperature: 0,
    max_tokens: 100,
});
  
    if(response.data.choices[0].text){
        res.json({
            message: response.data.choices[0].text
        })
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})