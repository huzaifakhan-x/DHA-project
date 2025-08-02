require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes')
const auth = require('./mw/auth')
const {usvali} = require("./joi/joi")
// const { db } = require('./database')
const bcrypt = require("bcrypt");
const jwt=  require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const {signin2} = require('./src/controller/auth/signin2');
const {signin3} = require('./src/controller/auth/signin3');
const {signin4} = require('./src/controller/auth/signin4');
const multer = require("multer");
const fs = require("fs");



const { db, bucket } = require('./fire');

console.log(db);
console.log(bucket);

const upload = multer({ dest: "uploads/" }); // temp upload directory


app.get("/test", async (req, res) => {
  const snapshot = await db.collection("your-collection").get();
  const data = snapshot.docs.map(doc => doc.data());
  res.json(data);
});


console.log(db);
console.log(bucket);



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'))



app.get('/' , async(req, res,) => {
  
  res.render('pages/index.ejs');
  
})

app.get('/multer' ,  signin4)

app.post("/upload", async (req, res) => {

console.log("i am here in upload.......................")
console.log(req.body);
console.log("Received:", req.body);

console.log("end*********************************..")
})

// app.post("/upload", upload.single("photo"), async (req, res) => {
//   console.log("i am herer11111111111111111111111111111111111");
//  try {
//     const localFilePath = req.file.path;
//     const destination = `/${req.file.originalname}`; // destination in database bucket
// console.log(localFilePath);
//     // Upload to database Storage
//     await bucket.upload(localFilePath, {
//       destination: destination,
//       public: true, // optional: makes file publicly accessible
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });

//     // Get public URL
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

//     // Delete local file
//     fs.unlinkSync(localFilePath);

//     res.status(200).json({ message: "File uploaded", url: publicUrl });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });



;

app.get('/home' , async(req, res,) => {
 
  res.render('pages/index.ejs');

})

app.get('/CF' , async(req, res,) => {
 
  res.render('pages/CF');

})

app.get('/DPP' , async(req, res,) => {
 
  res.render('pages/DPP');

})

app.get('/NDC' , async(req, res,) => {
 
  res.render('pages/NDC');

})
app.post('/NDC' , signin3 );

app.get('/CA' , async(req, res,) => {
 
  res.render('pages/CA');

})

app.get('/Al' , async(req, res,) => {
 
  res.render('pages/AL');

})

app.get('/BI' , async(req, res,) => {
 
  res.render('pages/BI');

})

app.get('/contact' , async(req, res,) => {
 
  res.render('pages/contact' );
  
})

app.get('/wellcome' ,auth , async(req, res,) => {
  console.log("sdafasfasdf")
  res.render('pages/wellcome' );
  
})

app.post('/wellcome'  , signin2)
app.post('/prices'  , signin2)

app.get('/prices' ,auth , async(req, res,) => {
  
  db.collection("roznamcha").doc("accBal").get().then((doc)=>{
    console.log("Db connected")
    console.log(doc.data().balance)
        balance=doc.data().balance;
          
     db.collection("roznamcha").doc("prices").get().then((doc)=>{
    mapleLeaf= doc.data().mapleLeaf;
     poineer=doc.data().poineer;
     prime=doc.data().prime;
     sand=doc.data().sand;
     res.render('pages/prices' );
    })
  })
  
})



app.use('/api', routes);

const port = process.env.Port || 5000;
app.listen(port, ()=> console.log(`listening on port :${port}`));


  // db.collection("DHA").doc("test").get().then((doc)=>{
  //   console.log("Db connected")
  //   console.log(doc);
          

  //   })
