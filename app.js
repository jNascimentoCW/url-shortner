const express = require("express");

const app = express();
const port = 3000;

//Utiliza todos os arquivos estáticos na web
app.use(express.static(`${__dirname}/public`));

app.get("/hi", (req, res) => {
    console.log("Hi from the server");
});

app.listen(port, () => {
    console.log(`Server listeing on port ${port}`);
});
