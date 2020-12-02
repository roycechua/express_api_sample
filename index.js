const express = require('express')
const app = express()

let data = [
    { id: 1, message: "Hello World" },
]

let errorMessage = {
    message: "Record not found"
}

app.get('/', (req, res) => res.send(data))

app.get('/search/', (req, res) => {
    let result = data.filter(d => d.id == req.query.id);
    if (result.length > 0) {
        return res.status(200).send(result);
    }
    return res.status(404).send(errorMessage);
})

app.listen(3000, () => console.log('Server ready'))