const Blog = require("../models/blog")

//all blogs
const get_all_blogs = (req,res)=>{
  Blog.find().sort({createdAt: -1})
  .then((result)=>{
    res.render("index", {title: "All Blogs", blogs: result})
  })
  .catch(err=>{
    console.log("could not fetch blogs", err)
  })
}

//add a blog
const addBlog = (req,res)=>{
  const blogData = req.body;
  const blog = new Blog(blogData)
  blog.save()
  .then(result=>{
    res.redirect("/blogs/")
  })
  .catch(err=>{
    console.log("Could not add blog data", err)
  })
}

//create blog
const createBlog = (req,res)=>{
  res.render("create", {title: "Create blog"})
  console.log(req.path)
}

//view a blog
const viewBlog = (req, res)=>{
  let id = req.params.id
  Blog.findById(id)
  .then(result=>{
    res.render("details", {title: "Blog details", blog: result})
  })
  .catch(err=>{
    console.log("could not fetch blog with that id", err)
  })
}

//Delete a blog
const deleteBlog = (req, res)=>{
  Blog.findByIdAndDelete(req.params.id)
  .then(data=>{
    res.json({"redirect": "/"})
  })
  .catch(err=>console.log("Could not delete data with that id", err))
}

module.exports = {
 get_all_blogs,
 addBlog,
 createBlog,
 viewBlog,
 deleteBlog
}