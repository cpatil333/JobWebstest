import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = "ffafdaf";
  const dayAgoApplied = (mongodbTime) => {
    try {
      const createdAt = new Date(mongodbTime);
      const currentDate = new Date();
      const dayDifference = currentDate - createdAt;
      return Math.floor(dayDifference / (1000 * 24 * 60 * 60));
    } catch (error) {
      console.log("something went wrong ", error);
    }
  };
  return (
    <div className="p-5 rounded-md shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{dayAgoApplied(job?.createdAt) === 0 ? "Today" : `${dayAgoApplied(job?.createdAt)}`} day ago</p>
        <Button variant="outline" className="roudded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-cente gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.position} Positions
        </Badge>
        <Badge className={"text-red-700 font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-purple-600 font-bold"} variant={"ghost"}>
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-purple-600 ml-4">Save for Leter</Button>
      </div>
    </div>
  );
};

export default Job;
