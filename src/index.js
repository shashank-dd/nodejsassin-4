const express = require('express')
const multer = require("multer");
const app = express()
// const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.set('views', './views');
// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// app.use(bodyParser.json())
app.use(express.static("css"));
// to upload a file
const Imagestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './css')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

// upload middleware 
const upload = multer({ storage: Imagestorage })
// your code goes here
users=[]
users.push({
    name:"ramesh",
    email: "ramesh@gmail.com",
    image: "1669273360080Screenshot (20).png"
})

app.get("/ad",(req,res)=>{
    res.render("form.ejs")
})
app.get("/minus",(req,res)=>{
    users.pop()
    res.redirect("/")
})
app.post("/sdd", upload.single("image"),(req,res)=>{
    console.log(req.body,req.file)
  const v=  {
        name : req.body.name,
        email : req.body.email,
        image : req.file.filename
    }
    users.push(v)
  
    res.redirect("/")
   
})
app.get("/",(req,res)=>{
    
    res.render("hello.ejs",{users})
})
app.post("/add",(req,res)=>{
    if(isNaN(req.body.num2) ||isNaN(req.body.num3)){
        return res.json({
            "status": "Failure"
        })
    }
    if(Number(req.body.num2) ==0 && Number(req.body.num3 ==0)){
      return res.json({
        status: "error"
      })
    }
    // console.log(req.body,req.body.num,req.body.num2,req.body.num3)
    let sum = Number(req.body.num2) + Number(req.body.num3);
  
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status1: "succes",
        "message": `the sum of given two numbers ${sum}`
    })
})
app.post("/sub",(req,res)=>{
    if(isNaN(req.body.num2) ||isNaN(req.body.num3)){
        return res.json({
            "status": "Failure"
        })
    }
    if(Number(req.body.num2) ==0 && Number(req.body.num3 ==0)){
        return res.json({
          status: "error"
        })
    }
    // console.log(req.body,req.body.num,req.body.num2,req.body.num3)
    let sub = Number(req.body.num2) - Number(req.body.num3);
  
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status1: "succes",
        "message": `the subtraction  of given two numbers ${sub}`
    })
})
app.post("/mul",(req,res)=>{
    if(isNaN(req.body.num2) ||isNaN(req.body.num3)){
        return res.json({
            "status": "Failure"
        })
    }
    if(Number(req.body.num2) ==0 || Number(req.body.num3 ==0)){
        return res.json({
          status: "error"
        })
    }
    // console.log(req.body,req.body.num,req.body.num2,req.body.num3)
    let mul= Number(req.body.num2) * Number(req.body.num3);
  
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status1: "succes",
        "message": `the multiplication  of given two numbers ${mul}`
    })
})
app.post("/div",(req,res)=>{
    if(isNaN(req.body.num2) ||isNaN(req.body.num3)){
        return res.json({
            "status": "Failure"
        })
    }
    if(Number(req.body.num3 ==0)){
        return res.json({
          status: "error"
        })}
    // console.log(req.body,req.body.num,req.body.num2,req.body.num3)
    let div= parseInt(req.body.num2) / parseInt(req.body.num3);
  
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status1: "succes",
        "message": `the division of given two numbers ${div}`
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;