/* eslint-disable flowtype/require-valid-file-annotation */
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, selectAllAdmins } from "../../StoreRedux/adminSlice";
import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar Pages/SideBar";
import {serverUrl} from "../../config"
export const AdminLayout = () => {
  const [loader, setLoader] = useState(true); // Ensure loader starts as true
  const dispatch = useDispatch();
  const storeAllUsers = useSelector(selectAllAdmins);
  //admins 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/auth/users`);
        console.log("Allusers response", response)
        if (response.status === 200 && response.data) {
          dispatch(getAllAdmins(response.data.users));
          toast.success("Users fetched successfully");
        } else {
          toast.error("Failed to fetch Users");
        }
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      } finally {
        setLoader(false); // Loader stops once request completes
      }
    };
    if (!storeAllUsers || storeAllUsers.length === 0) {
      fetchUsers();
    } else {
      setLoader(false);
    }
  }, [dispatch, storeAllUsers]);
  console.log("Admin-Layout Users", storeAllUsers)
  return (
    <div className="antialiased bg-gray-100 dark:bg-white-600">
      <Sidebar />
      <main className="p-4 md:ml-64 h-auto pt-20">
        <Outlet />
      </main>
      <Loader loading={loader} />
    </div>
  );
};
