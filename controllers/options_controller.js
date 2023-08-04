const Question = require("../models/question");
const Option = require("../models/option");

module.exports.create = async (req, res) => {
  // extract the question id from params of which an option needs to be created
  const questId = req.params.id;

  // create options for that question
  try {
    const option = await Option.create({
      text: req.body.text,
      question: questId,
    });

    // add link_to_vote to the option created above dynamically
    const updatedOption = await Option.findByIdAndUpdate(option._id, {
      link_to_vote: `https://polling-system-api-184l.onrender.com/api/v1/options/${option._id}/add_vote`,
    });

    updatedOption.save();

    // push this option to it's parent question's options array
    const ques = await Question.findById(questId);

    if (ques) {
      ques.options.push(updatedOption);
      ques.save();
      return res.send(ques);
    } else {
      return res.send("Question does not exist!");
    }
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const optionId = req.params.id;
    const option = await Option.findById(optionId);

    // if option does not exist
    if (!option) {
      return res.send("id does not exist!");
    }
    // if option exists & has atleast 1 vote
    if (option.votes > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete the option as it has votes!",
      });
    }

    // if option exists & has no votes
    // find the question of this option & remove the option from the question's options array
    const questId = option.question;
    await Question.findByIdAndUpdate(questId, {
      $pull: { options: optionId },
    });

    // now delete the option
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({
      message: "Option deleted successfully!",
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports.addVote = async (req, res) => {
  try {
    // extract option id from params
    const optionId = req.params.id;

    // find the option & increment votes field by 1
    const option = await Option.findByIdAndUpdate(
      optionId,
      {
        $inc: { votes: 1 },
      },
      {
        new: true,
      }
    );

    if (option) {
      option.save();
      return res.send(option);
    } else {
      return res.send("Option does not exist!");
    }
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({
      error: err,
    });
  }
};
