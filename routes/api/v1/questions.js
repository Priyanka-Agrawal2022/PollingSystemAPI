const express = require("express");
const router = express.Router();
const questionsController = require("../../../controllers/questions_controller");

router.get("/:id", questionsController.view);
router.post("/create", questionsController.create);
router.delete("/delete/:id", questionsController.delete);
router.use("/options", require("./options"));

module.exports = router;
