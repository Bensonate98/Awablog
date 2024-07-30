const express = require("express");
const router = express.Router();
const blogRoutesController = require("../controllers/blogRoutesController")


router.get("/", blogRoutesController.get_all_blogs)
router.post("/", blogRoutesController.addBlog)
router.get("/create", blogRoutesController.createBlog)
router.get("/:id", blogRoutesController.viewBlog)
router.delete("/:id", blogRoutesController.deleteBlog)

module.exports = router;