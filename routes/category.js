const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();
const Category = require("../models/Category");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CATEGORY
router.get("/find/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
