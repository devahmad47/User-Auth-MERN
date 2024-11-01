import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/loader";
const Users = () => {
  const [myusers, setmyusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const storeAllUsers = useSelector((state) => state.admin.alladmins);
  console.log("Users Page", storeAllUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    setmyusers(storeAllUsers);
  }, [storeAllUsers, dispatch]);
  return (
    <>
      <div className="min-w-full overflow-x-auto">
        <h2 className="mr-3 font-bold text-2xl text-center mb-4 text-purple-700">
          All Users <span className="bg-purple-500 px-2 rounded-sm text-white">{myusers.length}</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-purple-500 text-center min-w-[200px] text-md font-bold uppercase tracking-wider"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-purple-500 text-center min-w-[150px] text-md font-bold uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-purple-500 text-center min-w-[100px] text-md font-bold uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-purple-500 text-center min-w-[100px] text-md font-bold uppercase tracking-wider"
                >
                  Email
                </th>
               
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myusers && myusers.length > 0 ? (
                myusers.map((user, index) => (
                  <tr key={index} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user._id}
                    </td> 
                    <td className="px-6 py-4 capitalize whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>                  
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-2 font-semibold text-center">
                    No user found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
};

export default Users;
