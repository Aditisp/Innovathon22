var express = require('express');
var app = express();
var cors = require('cors');
// const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt");
const saltRounds = 10;

var db = require('./config/db');
var port = process.env.PORT || 3005;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const multer = require('multer');
const { response } = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload')
db.connect((err)=>{
 if(err) throw err;
});

app.use(express.json());
app.use(express.urlencoded({
 extended: true
}));
app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`);
});
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST","PUT"],
      credentials: true,
    })
  );

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
    session({
        key: "userId",
        secret: "jdbfjbduivufiagavgugdbkjHHgdsugufsgzbdjf",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60*60 * 60 * 24,
        },
    })
);


app.post('/insert', (req, res) =>{
     
    const name = req.body.name;
    const status = req.body.status;
    const email  = req.body.email;
    const branch = req.body.branch;
    const year = req.body.year;
    const linkedIn= req.body.linkedIn ;
    const phone = req.body.phone;
    const interests = req.body.interests;
    const city = req.body.city;
    const password = req.body.password;
    console.log(name,email,branch,year)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }
    
    const sqlinsert =
    "INSERT INTO user ( name,status,linkedIn, year, branch, email, phone, city, interests, password) VALUES (?,?,?,?,?,?,?,?,?,?)";
    
    db.query(sqlinsert, [name,status,linkedIn,year,branch,email,phone,city,interests,hash], (err, result)=>{
        if (err) {
            console.log(err);
        }
    })});
  

});
app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    db.query(
      "SELECT * FROM user WHERE email = ?;",
      email,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
        //  console.log(result[0].password)
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
            req.session.user =result[0];
            //   console.log('success');
            //   console.log(result);
            //   console.log(req.session);
              res.send(result);
            } else {
                console.log(response)
              res.send({ message: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
  });
  app.get('/user/:id', (req, res) =>{
    //res.send("hey");
    let sql = `SELECT * FROM user where id =${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        if(result.length) res.json(result);
        else res.json({});
    })
});

app.get('/topics/:id', (req, res) =>{
    //res.send("hey");
    let sqldetail = `SELECT * FROM uploads where userid=${req.params.id}`;
    db.query(sqldetail, (err, result)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        if(result.length) res.json(result);
        else res.json([]);
    })
});

const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {   
      // null as first argument means no error
      cb(null,file.fieldname+"-"+ Date.now() + '-' + path.extname(file.originalname) )  
      
  }
})
let upload = multer({ storage: storage}); 
app.use('/', express.static(__dirname + '/'));
app.post('/imageupload/:id',upload.single('upload_file'), async (req, res) => {	
    try {
        // 'avatar' is the name of our file input field in the HTML form


        // upload(req, res, function(err) {
        //     // req.file contains information of uploaded file
        //     // req.body contains information of text fields

        //     if (!req.file) {
        //         return res.send('Please select an image to upload');
        //     }
        //     else if (err instanceof multer.MulterError) {
        //         return res.send(err);
        //     }
        //     else if (err) {
        //         return res.send(err);
        //     }
            const title = req.body.title;
            const description  = req.body.description;
            const github = req.body.github;
            const others = req.body.others;
            const category = req.body.category;
            const classifiedsadd=`http://localhost:3005//public/images/${req.file.filename}`;
            // INSERT INTO uploads ( title, description, github, others, img) VALUES (?,?,?,?,?)
            // const sql = "INSERT INTO uploads (img) VALUES (?) ";
            const sql_ui = "INSERT INTO uploads ( title,category, description, github, others, img, userid) VALUES (?,?,?,?,?,?,?)";
            db.query(sql_ui,   [title,category, description, github, others, classifiedsadd, req.params.id], (err, results) => {  if (err) throw err;
				res.json({ success: 1 })      

			});  
        
       

    }catch (err) {console.log(err)}
})
app.get('/posts/',  (req,res)=>{
  const sql = `select * from uploads `
  db.query(sql,(err,result)=>{
      if(err){
          res.status(400).send(err)
      }
      if(result.length) res.json(result); 
      else res.json();
  })
})


app.get('/getc/:category',  (req,res)=>{
  const sql = `select * from uploads where category='${req.params.category}' `
  db.query(sql,(err,result)=>{
      if(err){
          res.status(400).send(err)
      }
      if(result.length) res.json(result); 
      else res.json();
  })
})
app.get('/details/:id', (req, res) =>{
  //res.send("hey");
  // let sqldetail = `SELECT uploads.id, uploads.title,uploads.description, 
  // uploads.github,uploads.others,uploads.img,uploads.userid, user.email,
  // mentor.email as memail,mentor.name FROM uploads,user, mentor 
  // where uploads.id =${req.params.id} And user.id = 1 AND mentor.id=${req.params.mid}`;
  let sqldetail =`select * from uploads where id=${req.params.id}`
  db.query(sqldetail, (err, result)=>{
      if(err){
          res.status(400).send(err);
          return;
      }
      if(result.length) res.json(result);
      else res.json({});
  })
});
app.get('/collaborators/:id', (req, res) =>{
  //res.send("hey");
  let sqlmentor = `select user.name as uname, user.linkedin as ulid from user,collab_request WHERE user.id = collab_request.u_id AND collab_request.status=1 And collab_request.i_id=${req.params.id}`;
  
  db.query(sqlmentor, (err, result)=>{
      if(err){
          res.status(400).send(err);
          return;
      }
      if(result.length) res.json(result);
      else res.json([]);
  })
});
app.post('/collab_request',(req,res) =>{
  const u_id = req.body.u_id;
  const i_id  = req.body.i_id;
  const sql_cr =
  `Insert into collab_request (u_id, i_id) values (?,?)`;
  db.query(sql_cr,[u_id, i_id],(err, result)=>{
      if (err) console.log(err);
  });
})
app.get('/fetchcollab/:id', (req, res) =>{
  //res.send("hey");
  let sqlmentor = `select user.name as uname, user.linkedin as ulid from user,collab_request WHERE user.id = collab_request.u_id AND collab_request.status=1 And collab_request.i_id=${req.params.id}`;
  
  db.query(sqlmentor, (err, result)=>{
      if(err){
          res.status(400).send(err);
          return;
      }
      if(result.length) res.json(result);
      else res.json([]);
  })
});
app.get('/getcollab/:id', (req, res) =>{
   
  let sqlgc = `SELECT user.name as uname, user.linkedin as ulid,user.email as uemail, collab_request.c_id as cid, uploads.title as iname, uploads.id as iid,collab_request.u_id as uid from user, collab_request, uploads where collab_request.u_id=user.id AND collab_request.i_id=uploads.id And uploads.userid=${req.params.id} And collab_request.status=0`
   db.query(sqlgc, (err, result)=>{
       if(err){
           res.status(400).send(err);
           return;
       }
       if(result.length) res.json(result);
       else res.json([]);
   })
});
app.put('/approvecollab/:id', (req, res) =>{
  //const mid = req.body.mid;
  let sqlam = `UPDATE collab_request SET status = 1 where c_id= ${req.params.id} `;
  db.query(sqlam, (err, result)=>{
      if (err) console.log(err); 
  else{console.log("updated")}})
});

app.put('/rejectcollab/:id', (req, res) =>{
  //const mid = req.body.mid;
  let sqlrm = `UPDATE collab_request SET status = 2 where c_id= ${req.params.id} `;
  db.query(sqlrm, (err, result)=>{
      if (err) console.log(err); })
});
app.post('/mailc/:uemail/:iname/:uname',(req,res)=>{
 
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'collaborationportal.kjsieit@gmail.com',
        pass: 'cpmaps$22'
      }
  });

  var mailOptions = {
      from: 'Collaboration Portal',// sender address
      to: req.params.uemail , // list of receivers
      subject: 'Regarding Collaboration Request', // Subject line
      text:'Congratulations!! Your request for collaboration is accepted.',
      html: `
      <div style="padding:10px;border-style: ridge">
      <p> Hello ${req.params.uname},</p>
      <p>Your request for collaboration for the topic '${req.params.iname}' is accepted.</p>
      <p>Kindly login to the portal for further details</p>
      <p>Thank You!</p>
      
      `
  };
   
  transporter.sendMail(mailOptions, function(error, info){
      if (error)
      {
        console.log(error)
      } 
      else
      {
        console.log('success')
      }
   
    });
});
app.get('/getmail/:id', (req, res) =>{
  //res.send("hey");
  let sqlmentor = `select email from user where id = ${req.params.id}`;
  
  db.query(sqlmentor, (err, result)=>{
      if(err){
          res.status(400).send(err);
          return;
      }
      if(result.length) res.json(result);
      else res.json([]);
  })
});

app.post('/mail/:email/:title/:memail/:name',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'collaborationportal.kjsieit@gmail.com',
          pass: 'cpmaps$22'
        }
    });
 
    var mailOptions = {
        from: 'Collaboration Portal',// sender address
        to: req.params.email , // list of receivers
        subject: 'Regarding Mentorship Request', // Subject line
        text:'Regarding Mentorship Request',
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>Ms.${req.params.name} is interested for mentoring your project '${req.params.title}'.<p/>
        <p> Please contact him/her for further details.<p/>
        <p>Email id of mentor:  ${req.params.memail}<p/>
        <p>Thank You!<p/>
        
        
        `
    };
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          console.log(error)
        } 
        else
        {
          console.log('success')
        }
     
      });
});
module.exports = app;