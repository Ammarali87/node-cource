import express from 'express';

const router = express.Router();
// 201 sign up success 400 bad request not sign up

// GET request example
router.get('/amar', (req, res) => {
  res.send('Hello, amar');
  console.log("amar");
});

// POST request for Sign Up
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // هنا ممكن تضيف الكود لحفظ البيانات في قاعدة البيانات
  console.log(`New user: ${name}, Email: ${email}`);


  res.status(201).json({ message: 'User registered successfully!' });

   
});

export default router;






// import express from 'express';
// const router = express.Router();
// // note you can make req res inside get 

// // Define a route for '/amar'
// router.get('/amar', (req, res) => {
//   res.send('Hello, amar');
//   console.log("amar")
// });

// export default router;