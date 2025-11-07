const express = require('express')
const app = express()
const port = 3000
const users = require('./persons.json')
const fs = require('fs')

app.use(express.json())


// app.use(express.urlencoded({ extended: false }))
// if data is comming from form data

app.get('/users', (req,res)=>{

    const html = `
    <h1>Users</h1>
    <ul>
    ${users.map(users => `<li>${users.first_name} ${users.last_name}</li>`).join('')}
    </ul>`
    res.send(html)

})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {

    const id = Number(req.params.id)
    const user = users.find(user => user.id === id);
    res.send(user)
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push(body);
    fs.writeFile('./persons.json', JSON.stringify(users),()=>{
        return res.send( `User added `);

    })


  })

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body;
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).send('User not found');
    }
    Object.assign(user, body);

    fs.writeFile('./persons.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send('User updated successfully');
    });

  })

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id);
    const index = users.indexOf(user)
    users.splice(index,1)


    fs.writeFile('./persons.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send('User deleted and JSON file updated');
    });

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

