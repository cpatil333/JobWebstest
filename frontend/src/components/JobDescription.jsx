import { Badge } from "./ui/badge";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const isInitiallyApplied =
    (Array.isArray(singleJob?.application) &&
      singleJob.application.some(
        (application) => application.applicant === user?._id
      )) ||
    false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsApplied(
          Array.isArray(response.data.job.application) &&
            response.data.job.application.some(
              (application) => application.applicant === user?._id
            )
        );
        dispatch(setSingleJob(response.data.job));
      }
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const response = axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.success) {
        setIsApplied(true);
        const udpateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(udpateSingleJob));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-red-700 font-bold"} variant={"ghost"}>
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-purple-600 font-bold"} variant={"ghost"}>
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disable={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div>
        <h1 className="font-bold my1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my1">
          Total Applicant:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.application?.length}
          </span>
        </h1>
        <h1 className="font-bold my1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {new Date(singleJob.createdAt).toLocaleDateString("en-gb")}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
