const express = require('express');

const app = express();
const PORT = 3000
const knex = require('knex')(require ('./knexfile.js')['development']);
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Application is up and running")
})

app.get('/movies', function(req, res) {
  knex('movies_table')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'Data not found.'
      })
    );
})

app.get('/movies/:id', (req, res) => {
  let getId = req.params.id
  knex('movies_table')
    .select('*')
    .where({'id': parseInt(getId)})
    .then(movies => {
      res.json(movies)
    })
})

app.patch('/movies/:id', (req, res) =>{
  let getId = req.params.id
  const {title} = req.body;
  knex('movies_table')
    .where({"id": getId})
    .update({title})
    .then(() =>{
      res.json({success: true, message: 'updated'})
    })
    .catch(err => {
      res.json(err)
})
})

app.post('/movies', (req, res) => {
  const {title} = req.body
  knex('movies_table')
    .insert({title})
    .then(() => {
      res.json({success: true, message: 'created'})
    })
})

app.delete('/movies/:id', (req, res) => {
  let getId = req.params.id
  knex('movies_table')
    .where({'id': getId})
    .del()
    .then(() => {
      res.json({success: true, message: 'deleted'})
    })
})


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);

});