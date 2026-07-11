// import {user} from "../redux/userSlice";
import {useSelector} from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";
import Navbar from "../components/Navbar";

function  Home() {
    const userData = useSelector(state=>state.user?.userData);
    return(
        <div className="w-full h-full bg-[#fff9f6]s">
        <Navbar/>
        {userData.role == "user" && <UserDashboard/>}
        {userData.role == "owner" && <OwnerDashboard/>}
        {userData.role == "deliveryBoy" && <DeliveryBoyDashboard/>}
        </div>
    )
}

export default Home;