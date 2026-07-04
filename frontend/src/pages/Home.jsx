// import {user} from "../redux/userSlice";
import {useSelector} from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";



function  Home() {
    const userData = useSelector(state=>state.user);
    return(
        <>
        <h1>Welcome to the Home Page</h1>
        {userData.role == "user" && <UserDashboard/>}
        {userData.role == "owner" && <OwnerDashboard/>}
        {userData.role == "deliveryBoy" && <DeliveryBoyDashboard/>}
        </>
    )
}

export default Home;