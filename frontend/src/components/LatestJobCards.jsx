import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-500 cursor-pointer">
      <div>
        <h1 className="font-bold my-2 text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
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
