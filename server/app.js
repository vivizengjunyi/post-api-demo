import express from 'express'
import {create, get, remove, update, getAll} from './db.js'
import bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = 3005
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/post', async function (req, res) {
    req.body.id = req.body.id || new Date().valueOf();
    const post = await create(req.body);
    res.json(post);
})
app.get('/post', async function (req, res) {
    const posts = await getAll();
    res.json(posts);
})
app.get('/post/:id', async function (req, res) {
    const post = await get(req.params.id - 0);
    console.log(req.params.id)
    res.json(post);
})
app.patch('/post', async function (req, res) {
    const post = await update(req.body);
    res.json(post);
})
app.delete('/post/:id', async function (req, res) {
    const post = await remove(req.params.id);
    res.json(post);
})