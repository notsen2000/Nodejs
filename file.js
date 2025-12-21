const fs = require('fs');

/* fs.readFile('./docs/blog1.txt',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log(data.toString());
}) */


    /* fs.writeFile("./docs/blog.txt","hello from blog1", ()=>{
        console.log("blog file writtern done");
    })


    fs.writeFile("./docs/blog2.txt","hello from blog2", ()=>{
        console.log("blog file writtern done");
    }) */

   /*  if(!fs.existsSync('./assests')){
        
        fs.mkdir('./assests',(err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log('folder created')

        })

        
    }else{
        fs.rmdir('./assests',(err) =>{
            if(err){
                console.log("from else blog: "+err);
                return;
            }
        })
        console.log("Folder deleted");
    } */

        if(fs.existsSync('./docs/deleteme.txt')){
            fs.unlink('./docs/deleteme.txt', (err)=>{
                if(err){
                    console.log(err)
                }
                console.log('file deleted')
            })
        }