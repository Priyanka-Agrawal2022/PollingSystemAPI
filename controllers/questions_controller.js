const Question = require("../models/question");
const Option = require("../models/option");

// view a question based on id
module.exports.view = async (req, res) => {
  try {
    const questId = req.params.id;
    const question = await Question.findById(questId).populate("options");

    if (question) {
      return res.send(question);
    } else {
      return res.send("id does not exist!");
    }
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      error: err,
    });
  }
};

// create a question
module.exports.create = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    return res.send(question);
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      error: err,
    });
  }
};

// delete a question based on id
module.exports.delete = async (req, res) => {
  try {
    const questId = req.params.id;
    const question = await Question.findById(questId).populate("options");

    // if question does not exist
    if (!question) {
      return res.send("id does not exist!");
    }

    const options = question.options;

    // if question exists & any option has atleast 1 vote
    for (let option of options) {
      if (option.votes > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete the question as one of its options has votes!",
        });
      }
    }

    // if question exists & none of its options has votes
    // delete the question
    await Question.deleteOne(question);

    // delete all options of that question
    await Option.deleteMany({ question: questId });

    return res.status(200).json({
      message: "Question deleted successfully!",
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      error: err,
    });
  }
};
