const express = require('express');
const shortid = require('shortid');

//creates server
const server = express();

//middleware
server.use(express.json());

//creating users
let users = [
    {
        id: shortid.generate(),
        name: 'John Doe',
        bio: 'some random joe shmoe'
    },
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "John Doe's wife"
    },
]
//endpoints

//adds a new user
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = shortid.generate();

    if(!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    else{
        users.push(newUser);
        res.status(201).json(newUser);
    }
})

//gets all users that are in the users array
server.get('/api/users', (req, res) => {
    try{
        res.status(200).json(users);
    }
    catch{
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

//gets a specific user back
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    filteredUsers = users.filter(user => user.id === id);

    if(filteredUsers.length === 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else{
        try{
            res.status(200).json(filteredUsers[0]);
        }
        catch{
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        }
    }
    
    
})

//deletes a specific user
server.delete('/api/users/:id', (req, res) => {
    const id  = req.params.id;

    const deleted = users.find(user => user.id === id);
    users = users.filter(user => user.id !== id);

    res.json(deleted);
    
})

//updates a specific user
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    if(!update.name || !update.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else{
        const found = users.find(user => user.id === id);
        if(found){
            // found
            try{
                Object.assign(found, update)
                res.status(200).json(found);
            } 
            catch {
                res.status(500).json({ errorMessage: "The user information could not be modified." })
            }
        } else{
            // not found
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }
})

//port 
const port = 8001;

//port listen
server.listen(port, () => console.log(`\n === API on port ${port} == \n`));