import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudnary.js";

//registered new company
export const registerdCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }

    let company = await Company.findOne({ name: name });

    if (company) {
      return res
        .status(400)
        .json({ message: "You can't same registered company", success: false });
    }

    company = await Company.create({
      name: name,
      userId: req.id,
      success: true,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//gets all company
export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find();
    if (!companies) {
      return res
        .status(404)
        .json({ message: "Companies not found", success: false });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
  }
};

//get company by Id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
  }
};

//update company
export const updatedCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    //cloudordinar
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        Message: "company not found",
        success: false,
      });
    }
    // if (cloudResponse) {
    //   userData.profile.resume = cloudResponse.secure_url; ///save the cloudnary net
    //   userData.profile.resumeOriginalName = file.originalname;
    // }

    return res.status(200).json({
      Message: "company information udpated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
