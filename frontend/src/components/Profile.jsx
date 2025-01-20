import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

// const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"];
const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white border border-gray-500 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-company-logo-design-template-f02206903dcc70505736cca7fd9c5104_screen.jpg?ts=1638867492" />
            </Avatar>
            <h1 className="font-medium text-xl">{user?.fullName}</h1>
            <p>{user?.profile?.bio}</p>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span>No Skills available</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <Label className="text-medium font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resumeOriginalName}
              className="text-bllue-500, hover:underline cursor-pointer"
            >
              {user?.profile.resumeOriginalName}
            </a>
          ) : (
            <span>No Resume</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white roundex-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
