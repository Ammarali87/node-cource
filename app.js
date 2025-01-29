import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import amarRouter from './router/amarRouter.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Apply middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from root directory
app.use(amarRouter);

// Define route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});











// //   no speak i'm sad 

// // JSON.parse == objectify the string 
// app.use(express.json());  //make string to obj  to make req.body this will make erorr caus this sting 
// app.use(express.urlencoded({ extended: true })); 
//  // 2 this for form submit URL مشفرة encoded  ex true for nested obj

//  //  patch to update

















// //  pass fun in second param

// const path = require('path')
// const express = require('express')
// const app = express()
// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))
// app.get('/weather', (req, res) => {
//  res.send({
//  forecast: 'It is snowing',
//  location: 'Philadelphia'
//  })
// })
// app.listen(3000, () => {
//  console.log('Server is up on port 3000.')
// })







// //  just for explian 

//    const https = require('https')
//    const url = "" ;
//    const request = https.request(url, (response) => {
//     let data = ''
//     response.on('data', (chunk) => {
//     data = data + chunk.toString()
//     })
//     response.on('end', () => {
//     const body = JSON.parse(data)
//     console.log(body)
//     })
//    })
//    request.on('error', (error) => {
//     console.log('An error', error)
//    })
//    request.end()
// //   rename use :{}  normal use data: Kofta

// const name = " ali "

//    const obj = {
//       name : myname,
//       age, 
//       location:"Cairo"
//    }
//    // destrucher when pass params 
//    const product = {
//       label: 'Red notebook',
//       price: 3,
//       stock: 201,
//       salePrice: undefined,
//       rating: 4.2
//      }
//      const transaction = (type, { label, stock }) => {
//       console.log(type, label, stock)
//      }
//      transaction('order', product)







// //   callback hell  make trigger the second param is fun
//  geocode(address,(error,data)=>{
//    if (error) {
//       return console.log(error);
//    } 
//     forcast(data.latitude,data.longiude, (error,weather)=>{
//      if (error) {
//       return console.log(error);
//      }
//       console.log(weather);
//       console.log(data.location);
//     })            
//  })



// // const axios = require('axios');

// // const geocode = async (address, callback) => {
// //   const url = `https://api.mapbox.com/geocoding/v5/mapbox
// //   // .places/${address}.json?access_token=pk.eyJ1Ij
// //   // oiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJ
// //   // lOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1`;

// //   try {
// //    const data = (await axios.get(url)).data

// //     if (data.features.length === 0) {
// //       callback('Unable to find location. Try another search.', undefined);
// //     } else {
// //       callback(undefined, {
// //         latitude: data.features[0].center[1], // Note: Mapbox has [longitude, latitude]
// //         longitude: data.features[0].center[0],
// //         location: data.features[0].place_name,
// //       });
// //     }
// //   } catch (error) {
// //     callback('Unable to connect to location services!', undefined);
// //   }
// // };

// // module.exports = geocode;





// //   // usage 
// // const geocode = require('./geocode');
// //    //  ths second para is fun 
// // geocode('Cairo', (error, data) => {
// //   if (error) {
// //     return console.log('Error:', error);
// //   }

// //   console.log('Data:', data);
// // });
  
// //  this normal fetch  axios.get(`http://wreaapp${address}`).then(()).catch()
 



// // function performMathOperation(a, b, callback) {
// //   const result = callback(a, b);
// //   console.log(`The result is: ${result}`);
// // }   // we not trigger call back we make parent trigger with another fun as callback
// //   // fun basicfun(a,s,call)
// // //   const reslut = call(a,b)
// // // log  result     

// // // Callback functions for addition and multiplication
// // function add(x, y) {
// //   return x + y;
// // }

// // function multiply(x, y) {
// //   return x * y;
// // }
// //    // fun add
// // // Using the callbacks
// // performMathOperation(5, 3, add);       // Output: The result is: 8
// // performMathOperation(5, 3, multiply); // Output: The result is: 15
// //  // trigger pass anyfun as para  myfun(2,5, add)

//     // inConcusion
//    // (a,b, call)
//    //  call(a,b)
//    // (2,4, add)
//    // (2,4, multi)


// // ask Gbt how to use 
// //  node inspect app.js
//  // debugger write  use  c , s 

// //  setTimeout is async by default
// //  console.log("one")

// //   setTimeout(()=>{
// //     console.log("wait 2 sec")
// //   },2000)  // no arr []
// //     console.log("two")





//    //  how to fetch data in node 
   
// // const axios = require('axios');
// // require('dotenv').config(); // For environment variables

// // const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY; // Store your API key in a .env file
// // const latitude = 37.8267;
// // const longitude = -122.4233;
// // const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}`;

// // axios
// //   .get(url)
// //   .then((response) => {
// //     // Access the temperature data
// //     const temperature = response.data.currently.temperature;
// //     console.log(`Current temperature: ${temperature}°F`);
// //   })
// //   .catch((error) => {
// //     // Handle errors
// //     if (error.response) {
// //       console.log('API Error:', error.response.data);
// //     } else if (error.request) {
// //       console.log('No response from API:', error.request);
// //     } else {
// //       console.log('Error:', error.message);
// //     }
// //   });









//      // not = but ==
// //  const user =  userS.find((user)=> user.name ==="john ")
// //   console.log(user)
 



//    // use this if you make action inside obj 
//    // use arrow fn this change this value 

// //    const w = {
// //     name: 'Birthday Party',
// //     guestList: ['Andrew', 'Jen', 'Mike'],
// //     printGuestList() {
// //     console.log('Guest list for ' + this.name)
    
// //     this.guestList.forEach((guest) => {
// //     console.log(guest + ' is attending ' +guest.name)
// //     })
// //     } 
// // } //     this.name not list.name
// //    w.printGuestList()




// //  const  multi = (x) => {
// //     return  x*x
// //  }
// //   console.log(multi(3))





// // const book = {
// //     title: 'Ego is the Enemy',
// //     author: 'Ryan Holiday'
// //    }
// //  const json_book = JSON.stringify(book) 
// //  const obj_book = JSON.parse(json_book)
// //  console.log(obj_book.title)


// // const yargs = require("yargs");

// // // Define a command using yargs
// // yargs.command({
// //   command: "add", // Command name
// //   describe: "Add a new item", // Command description
// //   builder: {
// //     title: {
// //       describe: "The title here",
// //       demandOption: true,
// //       type: "string",
// //     },
// //     body: {
// //       describe: "My body is here",
// //       demandOption: true,
// //       type: "string",
// //     },
// //   },  // can make fn: fun() or just make fun
// //   handler(argv) {
// //     console.log("My title: " + argv.title);
// //     console.log("My body: " + argv.body);
// //   },
// // });
  
// // // Parse the arguments
// // yargs.parse();

  
// // const command = process.argv[2]
// // if (command === 'add') {
// //  console.log('Adding note!')
// // } else if (command === 'remove') {
// //  console.log('Removing note!')
// // }