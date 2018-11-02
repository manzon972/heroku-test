const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
//Temporal array
let cats = [
    {
        id: 1,
        name: 'Lucifer',
        sound: 'Meow >:v'
    },
    {
        id: 2,
        name: 'Beelzebub',
        sound: 'Meow >:3'
    },
    {
        id: 3,
        name: 'Mephistopheles',
        sound: 'Meow >:c'
    }];
//Server startup
app.listen(3000, () => {
    console.log('Server started!')
});
//GET all cats
app.route('/api/cats').get((req, res) => {
    res.send(cats);
});
//GET Cat by Id
app.route('/api/cats/:id').get((req, res) => {
    const catId = Number(req.params['id']);
    let found = false;
    cats.forEach(cat => {
        if (cat.id === catId) {
            res.send(cat);
            found = true;
        }
    });
    if (!found) {
        res.status(404).send({message: 'Cat not found'});
    }
});
//CREATE CAT
app.route('/api/cats').post((req, res) => {
    let exists = false;
    let catId = Number(req.body.id);
    let catName = req.body.name;
    let catSound = req.body.sound;
    cats.forEach(cat => {
        if (cat.id === catId) {
            exists = true;
        }
    });
    if (!exists) {
        cats.push({id: catId, name: catName, sound: catSound});
        res.status(201).send({message: 'Cat Created!'});
    } else {
        res.status(409).send({message: 'Cat already exist'});
    }
});

//UPDATE Cat
app.route('/api/cats/:id').put((req, res) => {
    let found = false;
    const catId = Number(req.params['id']);
    let catName = req.body.name;
    cats.forEach(cat => {
        if (cat.id === catId) {
            cat.name = catName;
            found = true;
            res.status(201).send({message: 'Cat updated!'});
        }
    });
    if (!found) {
        res.status(404).send({message: 'Cat not found'});
    }
});

//DELETE Cat
app.route('/api/cats/:id').delete((req, res) => {
    let found = false;
    const catId = Number(req.params['id']);
    cats.forEach(cat => {
        if (cat.id === catId) {
            found = true;
        }
    });
    if (found) {
        let index = cats.map(x => {
            return x.id;
        }).indexOf(catId);
        cats.splice(index, 1);
        res.status(201).send({message: 'Cat deleted'});
    } else {
        res.status(404).send({message: 'Cat not found'});
    }
});