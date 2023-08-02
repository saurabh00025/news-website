//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Are you looking for a place to dive deep into fascinating topics, gain valuable insights, and be inspired? Look no further! Our blog is your gateway to a world of knowledge and a wellspring of ideas that will enrich your life.";
const aboutContent = "Welcome to our blog! We are a passionate team of writers, creators, and adventurers who believe in the power of knowledge, inspiration, and personal growth. Our mission is to curate a diverse collection of content that captivates, educates, and empowers our readers.";
const contactContent = "We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us using any of the methods below. We value every interaction with our readers and are committed to providing excellent support and assistance.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
app.get("/",function(req,res){  // by this you can send anyone who is requesting you to home router
  res.render("home",{
    content:homeStartingContent,
    posts:posts
  });   // by this you can send the result whoever is requesting for it 
});


app.get("/contact",function(req,res){
  
  res.render("contact",{contact:contactContent});
})

app.get("/compose",function(req,res){
  
  res.render("compose");
})

app.get("/about",function(req,res){
  
  res.render("about",{about:aboutContent});
})

app.get("/posts/:postName",function(req,res){
  const requestedTitle = req.params.postName;

  posts.forEach(function(post){
    const storedTitle = post.title;
    if(storedTitle === requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      });
    }
  });
});
app.post("/compose",function(req,res){  // It will post whatever we get from compose 
  const post = {
    title : req.body.postTitle, // It will request and post whatever we get from place of postTitle 
    content : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
