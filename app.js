const express = require("express");
const ejs = require("ejs");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const blogRoutes = require("./routes/blogRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const { verifyUser } = require("./middleware/auth");


//Start server
const startServer = async ()=>{
  try{
    await connectDB();
    app.listen(PORT, ()=>{;
      console.log(`app running on port ${PORT}`)
    })
  }
  catch(err){
    console.log(err, "unable to start server");
  }
}
startServer();

//register view engine
app.set("view engine", "ejs")

// middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


/* Nav routes */
// app.get("/", verifyUser, (req, res)=>{
//   res.redirect("/blogs/")
// })
// app.get("/about", (req, res)=>{
//   console.log(req.path)
//   res.render("about", {title: "About"});
// })
/*Blogs route */
// app.use("/blogs/", verifyUser, blogRoutes);
// /*auth routes*/
// app.use(authRoutes);

//404 page
// app.use((req, res)=>{
//   res.status(404).render("404", {title: "404"});
// })

app.use(htmlRoutes);