import express from 'express';
const app = express();

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    return console.log(`Server listening on port ${PORT}...`);
});
