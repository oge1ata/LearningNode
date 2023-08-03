const fs = require('fs')

//reading files

// fs.readFile('./docs/blog.txt', (err, data)=>{
//     if (err) {
//         console.log(err)
//     }
//     console.log(data.toString())
// })

//writing files

// fs.writeFile('./docs/blog.txt', 'BYE GIRLLSSS',()=>{
    
//     console.log("File is written")
// })

// fs.writeFile('./docs/blog2.txt', 'HEYYYLLSSS',()=>{
    
//     console.log("File is written")
// })

//directories
// if (!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log("folder created");
//     });
// } else{
//     fs.rmdir('./assets', (err) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log('folder deleted');
//     })
// }

//deleting files
if (fs.existsSync('./docs/delete.txt')){
    fs.unlink('./docs/delete.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log("delete!")
    })
}