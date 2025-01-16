import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudnary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const userData = await User.findOne({ email: email });

    if (userData) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    ///cloudinary call
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "User Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Something went wrong ", error);
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "incorrect email or password", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "incorrect email or password", success: false });
    }
    if (role !== userData.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }
    //for token key
    const tokenData = {
      userId: userData._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const users = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      profile: userData.profile,
      resumeOriginalName: userData.profile.resumeOriginalName,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: `strict`,
      })
      .json({
        message: `Welcome back ${userData.fullName}`,
        users,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "logged our successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const udpateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills, resume } = req.body;

    const file = req.file;

    ///cloudinary call
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let userData = await User.findById(userId);

    if (!userData) {
      return res.status(400).json({
        Message: "User not found",
        success: false,
      });
    }

    if (fullName) {
      userData.fullName = fullName;
    }
    if (email) {
      userData.email = email;
    }
    if (phoneNumber) {
      userData.phoneNumber = phoneNumber;
    }
    if (bio) {
      userData.profile.bio = bio;
    }
    if (skills) {
      userData.profile.skills = skillsArray;
    }

    if (cloudResponse) {
      userData.profile.resume = cloudResponse.secure_url; ///save the cloudnary net
      userData.profile.resumeOriginalName = file.originalname;
    }

    await userData.save();

    userData = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.profile.bio,
      phoneNumber: userData.phoneNumber,
      role: userData.role,
      proile: userData.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      userData,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
