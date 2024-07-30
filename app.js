const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 3000;
const app = express();
dotenv.config();
const blogRoutes = require("./routes/blogRoutes");


//connnect to db
const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.skucxh1.mongodb.net/bensonate?retryWrites=true&w=majority&appName=Cluster0"`;
mongoose.connect(dburi)
.then(result=>{
  app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
  })
})
.catch(err=>{
  console.log("an error occured: ", err)
})

//register view engine
app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))


/* Nav routes */
app.get("/", (req, res)=>{
  res.redirect("/blogs")
})
app.get("/about", (req, res)=>{
  console.log(req.path)
  res.render("about", {title: "About"});
})

/*Blogs route */
app.use("/blogs/", blogRoutes);

//404 page
app.use((req, res)=>{
  res.status(404).render("404", {title: "404"});
})

