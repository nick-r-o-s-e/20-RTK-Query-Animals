import express from "express";
const router = express.Router();
import animalModel from "../models/animalModel";

router.get("/animals", async (req, res) => {
  try {
    const data = await animalModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/animals/:group", async (req, res) => {
  try {
    const group = req.params.group;
    const data = await animalModel.find({ group: group });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/animals/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await animalModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        message: `Document with task (${data.content}) has been deleted..`,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/new-animal", async (req, res) => {
  const animal = new animalModel({
    name: req.body.name,
    group: req.body.group,
    image: req.body.image,
  });

  try {
    const dataToSave = await animal.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
