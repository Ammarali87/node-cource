import express from 'express';
const router = express.Router();
// note you can make req res inside get 

// Define a route for '/amar'
router.get('/amar', (req, res) => {
  res.send('Hello, amar');
});

export default router;