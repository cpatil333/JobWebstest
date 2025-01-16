import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [user, setUser] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-600">Portal</span>{" "}
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies </Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Job </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home </Link>
                </li>
                <li>
                  <Link to="/jobs">Job </Link>
                </li>
                <li>
                  <Link to="/browser">Browser </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="rounded-full h-10"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-4 border-none">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.resumeOriginalName}
                      className="rounded-full h-10"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-forground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
