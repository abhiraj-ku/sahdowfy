import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const messageGenerator = async (req, res) => {
  const { uniqueLink } = req.params;
  console.log(uniqueLink);
  const { message } = req.body;
  try {
    if (!uniqueLink) {
      return res.status(400).json({
        message: "User id is missing",
      });
    }
    if (!message) {
      return res.status(400).json({
        message: "Please Enter some message",
      });
    }
    const findUserId = await User.findOne({ uniqueLink }, "_id");
    if (!findUserId) {
      return res.status(404).json({
        err: "User not found",
      });
    }
    const user = new Message({
      message: message,
      createdBy: findUserId._id,
    });

    await user.save();

    res.status(201).json({
      success: "Message Created succesfully",
      user,
    });
  } catch (error) {
    console.error("Error Saving message", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

const getAllMessage = async (req, res) => {
  const { uniqueLink } = req.params;
  try {
    if (!uniqueLink) {
      return res.status(400).json({
        message: "uniqueLink is missing",
      });
    }

    // Find the user based on the uniqueLink
    const user = await User.findOne({ uniqueLink });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Find all messages associated with the user's _id
    const messages = await Message.find({ createdBy: user._id });

    return res.status(200).json({
      messages: messages,
    });
  } catch (error) {
    console.error("Error Fetching Messages", error);
    res.status(500).json({ error: "Internal server Error while fetching" });
  }
};

// export { messageGenerator, getAllMessage };

export { messageGenerator, getAllMessage };
