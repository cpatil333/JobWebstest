import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-500 cursor-pointer">
      <div className="flex items-cente gap-2 my-2">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="p-6"
          variant="outline"
          size="icon"
        >
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
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
      </div>
    </div>
  );
};

export default LatestJobCards;
