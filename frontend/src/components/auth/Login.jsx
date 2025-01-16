import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const formsData = new FormData();
      formsData.append("email", input.email);
      formsData.append("password", input.password);
      formsData.append("role", input.role);

      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.data.success) {
        dispatch(setUser(response.data.users));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
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
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-2 w-2 animate-spin" /> Please wait..
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm font-bold">
            Don't have an Account ?{" "}
            <Link to="/signup" className="text-blue-500 font-bold text-sm">
              SignUp
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
