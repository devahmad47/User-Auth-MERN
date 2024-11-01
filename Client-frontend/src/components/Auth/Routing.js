import { Navigate } from "react-router-dom";
import { FulllayoutMain } from "./Layout";
import SignIn from "../authPages/SingIn";
import SignUp from "../authPages/SignUp";
import Error from "../Error";
import Otp from "../authPages/Otp";

export const ThemeRoutes=[ //array of objects auth pages routes:
    {
      path:"/",
      element:<FulllayoutMain />,
      children:[
        {path:"/", exact:true, element:<Navigate to="Login"/>},
        {path:"login", exact:true, element:<SignIn/>},
        {path:"otp",  element:<Otp/>},
        {path:"signup", element:<SignUp />},
        {path:"*", element:<Error />}
      ],
    },
];

