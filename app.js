//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Embark on a quest for intellectual nourishment and boundless inspiration! Our blog beckons you to a haven where curiosity flourishes and creativity knows no limits. Within these digital pages, we offer you access to a vast expanse of knowledge, where each post is a unique gem waiting to be unearthed. Immerse yourself in a rich collection of thought-provoking topics that not only provide valuable insights but also serve as a perpetual source of ideas to enhance your life's journey. Our commitment is to kindle the flame of discovery, fostering a joy for learning that resonates in every piece. Let the currents of inspiration guide you through the enchanting landscape of our blog, where the pursuit of knowledge is a delightful adventure. Feel the pulse of discovery, embrace the joy of learning, and let inspiration be your compass through the captivating world we've crafted within our digital sanctuary.";
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
