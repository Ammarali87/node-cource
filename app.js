









// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
//    }
//  const json_book = JSON.stringify(book) 
//  const obj_book = JSON.parse(json_book)
//  console.log(obj_book.title)


// const yargs = require("yargs");

// // Define a command using yargs
// yargs.command({
//   command: "add", // Command name
//   describe: "Add a new item", // Command description
//   builder: {
//     title: {
//       describe: "The title here",
//       demandOption: true,
//       type: "string",
//     },
//     body: {
//       describe: "My body is here",
//       demandOption: true,
//       type: "string",
//     },
//   },  // can make fn: fun() or just make fun
//   handler(argv) {
//     console.log("My title: " + argv.title);
//     console.log("My body: " + argv.body);
//   },
// });
  
// // Parse the arguments
// yargs.parse();

  
// const command = process.argv[2]
// if (command === 'add') {
//  console.log('Adding note!')
// } else if (command === 'remove') {
//  console.log('Removing note!')
// }