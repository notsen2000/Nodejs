const http = require('http')
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res)=>{
    //console.log('request made')
    console.log('**********START************');
    console.log('url:'+req.url+'\n');
    console.log('request Method:'+req.method+'\n');
    console.log('**********END************');

    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(
        ()=>{
            console.log('Hello');
        }

    )

    greet();
    greet();
    

    //res.setHeader('Content-Type', 'text/plain');
   /*  res.setHeader('Content-Type', 'text/html');
    res.write('<head><link rel="stylesheet" href="#" ></head>');
     res.write('<head><link rel="stylesheet" href="#" ></head>');
    res.write('<h1>Hi from Senthil</h1>');
    res.end(); */

    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-mepage':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err,data) =>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    })
    

})

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000')
})