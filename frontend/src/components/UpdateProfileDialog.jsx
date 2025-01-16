import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../../redux/authSlice.js";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile.bio || "",
    skills: user?.profile.skills?.map((skill) => skill) || "",
    file: user?.profile.resume || "",
  });
  const dispatch = useDispatch();

  //getting to change value
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: [e.target.value] });
  };

  //get file name and value
  const fileEventHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  //on form submit
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formsData = new FormData();
      formsData.append("fullName", input.fullName);
      formsData.append("email", input.email);
      formsData.append("phoneNumer", input.phoneNumber);
      formsData.append("bio", input.bio);
      formsData.append("skills", input.skills);
      if (input.file) {
        formsData.append("file", input.file);
      }

      const response = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log("Something went wrong ", error.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutSide={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="col-span-4"
                  value={input.fullName}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="col-span-4"
                  value={input.email}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="col-span-4"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  type="text"
                  id="bio"
                  name="bio"
                  className="col-span-4"
                  value={input.bio}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  type="text"
                  id="skills"
                  name="skills"
                  className="col-span-4"
                  value={input.skills}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  type="file"
                  id="file"
                  className="col-span-4"
                  onChange={fileEventHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button type="submit">Update</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
