const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt');
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log('________NEW CHUNK___________')
//     console.log(chunk.toString()) //we can put encoding:utf8 instead
//     writeStream.write('\nNew Chunk\n');
//     writeStream.write(chunk);
// })

//piping does the exact smae thing above
readStream.pipe(writeStream);