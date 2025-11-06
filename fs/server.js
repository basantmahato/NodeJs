const fs = require('fs')

// fs.writeFileSync('./test.txt', "Demo text")
fs.writeFile("./test.txt", "Demo text", (err)=>{

})

fs.readFile("./test.txt", "utf-8", (err, result)=>{

    if(err){
        console.log(err)
    } else{
        console.log(result)
    }
    
})


fs.appendFile("./test.txt", "hehehe" )


// fs.readFile("./test.txt", "utf-8", (err, result)=>{

//     if(err){
//         console.log(err)
//     } else{
//         console.log(result)
//     }
    
// })



