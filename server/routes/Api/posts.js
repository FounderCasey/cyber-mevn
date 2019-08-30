const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date() // need to edit
  });
  res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://admin_01:admin_01@cyber-rceaf.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  return client.db("cyber-jobs").collection('posts');
}

module.exports = router;