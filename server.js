const express = require('express');
const app = express();
// port

var port = process.env.PORT || 8080

// routes

app.get("/", (req, res) => {
    res.send({message: "Im deployed!"});
});

app.listen(port, () => {
    console.log('App listening!');
});