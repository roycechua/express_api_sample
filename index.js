const express = require('express')
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded())

let data = [
    { id: 1, message: "Hello World" },
]

let successMessage = (message, data) => ({
    message,
    data
}) 

let errorMessage = (message) => ({
    message
})

// Fetch all
app.get('/', (req, res) => res.send(data))

// Search for a specific message
app.get('/search/', (req, res) => {
    let result = data.filter(d => d.id == req.query.id);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json(errorMessage("Record not found"));
})

// Add a message object to the list
app.post('/message', (req, res) => {
    if(req.body.data && req.body.data.id && req.body.data.message) {
        data.push(req.body.data)
        return res.status(200).json(successMessage("Add message successful", req.body.data))
    } 
    
    return res.status(422).send(errorMessage('Unprocessable Entity'))
})

// delete a message object to the list
app.delete('/message/:id', (req, res) => {
    if(req.params.id) {
        let new_data = data.filter(d => d.id != req.params.id)
        if(new_data.length != data.length) {
            data = new_data;
            return res.status(200).send(successMessage('Delete message success'))
        } 

        return res.status(404).send(errorMessage('Message record was not found'))
    } 
    
    return res.status(422).send(errorMessage('Unprocessable Entity'))
})

app.listen(3000, () => console.log('Server ready'))