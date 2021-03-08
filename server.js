const express = require('express')
const app = express()
const port = 3333

// this is an example of middleware - something that intercepts the request
// and can perform checks / computation on the request
const requireJSON = () => {
    return (req, res, next) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(400).send('Server requires application/json')
        } else {
            next()
        }
    }
}

app.get('/', (req, res) => {
    res.send('Hello World! - this website is being served to you from a node app running express.js, which is then being sent through an NGINX reverse proxy')
})

app.get('/api', (req, res) => {
    res.send('This is the API')
})

app.get('/backend', (req, res) => {
    res.send('This is the Backend')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/', requireJSON(), (req, res, next) => {
    res.send('You sent a JSON')
})