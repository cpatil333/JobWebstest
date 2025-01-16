import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const fromsData = new FormData();
      fromsData.append("fullName", input.fullName);
      fromsData.append("email", input.email);
      fromsData.append("phoneNumber", input.phoneNumber);
      fromsData.append("password", input.password);
      fromsData.append("role", input.role);
      if (input.file) {
        fromsData.append("file", input.file);
      }
      console.log(fromsData);
      //get pair of formdata
      for (let pair of fromsData.entries()) {
        console.log(`${pair[0]} : ${pair[1]}`);
      }
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        fromsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div>
            <Label>FullName</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={input.fullName}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Phone Numner</Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="999999900"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-2 w-2 animate-spin" /> Please wait..
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm font-bold">
            Already have an Account ?{" "}
            <Link to="/login" className="text-blue-500 font-bold text-sm">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
