import React from 'react';
import { Navigate ,Outlet} from 'react-router-dom';


const useAuth =()=> {
    const user ={loggedIn:false};
    return user.loggedIn;
};

const Protectedroute =({element})=>{
const isAuthentificated=useAuth();
return isAuthentificated? <Outlet /> :<Navigate to="/UserProfile" replace />
};

    



export default Protectedroute;

