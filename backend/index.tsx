/// <reference types="node" />
const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 8000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors());
app.use(express.json());

const employees = [
  {
    id: 1,
    name: 'John',
    status: 'Working',
    img: 'example1',
  },
  {
    id: 2,
    name: 'Jack',
    status: 'Working',
    img: 'example2',
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    img: 'example3',
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
    img: 'example4',
  },
];

app.get('/users', (req, res) => {
  res.send(employees);
});

app.post('/users/:id', (req, res) => {
  const index = employees.findIndex((obj) => obj.id === +req.params.id);
  employees[index].status = req.body.status;
  res.send(employees);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
