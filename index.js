const express =require('express');
const app = express();
const port =5000;
const path = require('path');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})


app.use('/p',require('./routs/project'));





//start
app.listen(port,()=>{console.log(`http://localhost:${port}`)});