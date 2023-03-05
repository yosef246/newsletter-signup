
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});



app.post("/", function(req, res){
  const firstname = req.body.fname
  const lastname = req.body.lname
  const email = req.body.Email

  const data = {
     members: [
       {
         email_address: 'email',
         status: "subscribed",
         merge_fields: {
           FNAME: firstname,
           LNAME: lastname
         }
       }
     ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/ed450423b2"

  const options =  {
    method: "POST" ,
    auth: "yosef palas:e7c36517b4b3fe1f9b1034b91b5849a2-us14"
  };

  const request = https.request(url, options, function(response){

    if(response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});



// הפניה מחדש לעמוד הבית
app.post("/failure", function(req, res){
  res.redirect("/");
});


// הפניה מחדש לעמוד הבית
app.post("/success", function(req, res){
  res.redirect("/")
});


app.listen(3000, function(){
  console.log("Server is running in port 3000");
});


// list ID
// ed450423b2
//auth:-ב object-מכניס ב

// api key
// e7c36517b4b3fe1f9b1034b91b5849a2-us14
// url-מכניס בסוף ה
