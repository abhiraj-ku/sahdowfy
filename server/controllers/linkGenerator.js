// import User from "../models/userModel.js";
// import { nanoid } from "nanoid";
// import joi from "joi";

// const generateUniqueLinkFromName = async (req, res, next) => {
//   try {
//     // Input validation using joi
//     const schema = joi.object({
//       username: joi.string().required().max(5),
//     });
//     const { error } = schema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // unique user
//     const existingUser = await User.findOne({ username: req.body.username });
//     if (existingUser) {
//       return res.status(400).json({ error: "Username already exist" });
//     }

//     //unique link
//     const uniqueLink = req.body.username + nanoid(4);

//     const newUser = new User({
//       username: req.body.username,
//       uniqueLink,
//     });

//     await newUser.save();
//     next();

//     res.status(201).json({
//       success: "User created successfully",
//       username: newUser.username,
//       uniqueLink: newUser.uniqueLink,
//     });
//   } catch (error) {
//     console.log("Error generating unique link", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export default generateUniqueLinkFromName;

import User from "../models/userModel.js";
import { nanoid } from "nanoid";
import joi from "joi";
import path from "path";

const generateUniqueLinkFromName = async (req, res, next) => {
  try {
    // Input validation using joi
    const schema = joi.object({
      username: joi.string().required().max(5),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // unique user
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exist" });
    }

    //unique link
    const uniqueLink = req.body.username + nanoid(4);

    const newUser = new User({
      username: req.body.username,
      uniqueLink,
    });

    await newUser.save();

    res.status(201).json({
      success: "User created successfully",
      username: newUser.username,
      uniqueLink: newUser.uniqueLink,
    });
  } catch (error) {
    console.log("Error generating unique link", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default generateUniqueLinkFromName;
