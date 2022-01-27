const express = require("express");
const path = require('path');
const fs = require("fs");
const { json } = require("express/lib/response");
const { uuid } = require('uuidv4');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '/db/db.json'), "utf8", () => {})

    return res.json( JSON.parse( data ));
});

app.post('/api/notes', (req, res) => {

    let data =  fs.readFileSync(path.join(__dirname, '/db/db.json'), "utf8" , () => {});    
    

    data = JSON.parse(data);
    
    req.body.id = uuid()

    data.push(req.body);
    

    data = JSON.stringify(data);
    
    
    fs.writeFile(path.join(__dirname, '/db/db.json'), data, ()=>{});
    

    return res.send("POST recieved")
});

app.delete('/api/notes/:id', (req, res) => {

    let data =  fs.readFileSync(path.join(__dirname, '/db/db.json'), "utf8" , () => {});    
    

    data = JSON.parse(data);
    
    data = data.filter(datum => datum.id != req.params.id)
    

    data = JSON.stringify(data);
    
    
    fs.writeFile(path.join(__dirname, '/db/db.json'), data, ()=>{});
    

    return res.send("POST recieved")
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);