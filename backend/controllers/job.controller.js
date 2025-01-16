import express from "express";
import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(401)
        .json({ message: "Somethng is missing", success: false });
    }

    const userId = req.id;
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res
      .status(201)
      .json({ message: "New Job created successfully", job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    //write query
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ created_at: -1 });

    if (!jobs) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobsId = req.params.id;
    const job = await Job.findById(jobsId).populate({
      path: "application",
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: true });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});

    if (!jobs) {
      return res.status(404).json({ message: "job not found", success: true });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {}
};
