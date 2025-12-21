/* const name = "sms";
console.log("Name :" + name);

const greet = (namearg) =>{
    console.log(`name is :${namearg}`)
}

greet("SMS")
greet("hu") */

//console.log(global);

setTimeout( 
    () =>{
        console.log('in the timeout');
        clearInterval(int)
        },3000);

const int = setInterval(() => {
    console.log('in the intervel')
}, 1000);

console.log(__dirname);
console.log(__filename);