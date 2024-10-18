import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import DashBoard from "./pages/auth/DashBoard.jsx";
import PingHaui from "./pages/auth/PingHaui.jsx";
import DashBoardRecharge from "./pages/auth/DashBoardRecharge.jsx";
import PaymentSuccess from "./pages/auth/PaymentSuccess.jsx";
import LoginHaui from "./pages/auth/LoginHaui.jsx";
import LoggedHaui from "./pages/auth/LoggedHaui.jsx";
import RegisterModuleHaui from "./pages/auth/RegisterModulePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HistoryPayment from "./pages/auth/HistoryPayment.jsx";


import ERSA from "./helper/ERSA.js"
import sha256 from "./helper/ESHA256.js";

function App() {
  console.log("render-app");

  const url = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();  // Lấy URL hiện tại

  useEffect(() => {

    async function fetchData() {

      try {
        let response0 = await axios.get(`${url}/auth/getInforUser`, { withCredentials: true });
        setUserData(response0.data?.userData);
        localStorage.setItem("userData", JSON.stringify(response0.data?.userData));
        navigate(location.pathname)
        return
      } catch (error) {
        console.log(error);
      }


      try {
        let rdn = Date.now() + Math.random();
        let verifyCode = await sha256(rdn + "9ea41530dc5940d2d81f862fd5ecc7b75018d213f792782473fc30658859263e");
        let rsn = Date.now() + Math.random();
        let rsne = await ERSA(rsn);
        let payLoad = { rdn, verifyCode, rsn, rsne };

        await axios.post(`${url}/getNewAccessToken`, payLoad, { withCredentials: true });
        try {
          const response = await axios.get(`${url}/auth/getInforUser`, { withCredentials: true });
          setUserData(response.data?.userData);
          localStorage.setItem("userData", JSON.stringify(response.data?.userData));
          navigate(location.pathname);  // Điều hướng lại trang hiện tại sau khi lấy dữ liệu user thành công
        } catch (error) {
          console.log(error?.response?.data?.message);
          navigate("/loginPage");
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
        navigate("/loginPage");
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="registerPage" element={<RegisterPage />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/PingHaui" element={<PingHaui userData={userData} />} />
        <Route path="/dashBoardRecharge" element={<DashBoardRecharge userData={userData} />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/loginHaui" element={<LoginHaui />} />
        <Route path="/loggedHaui" element={<LoggedHaui />} />
        <Route path="/registerModule" element={<RegisterModuleHaui />} />
        <Route path="/historyPayment" element={<HistoryPayment />} />
      </Routes>
    </>
  );
}

export default App;