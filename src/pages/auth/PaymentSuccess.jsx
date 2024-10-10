import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ERSA from "../../helper/ERSA";
function PaymentSuccess() {
    let navigate = useNavigate();

    useEffect(() => {
        let transId = localStorage.getItem("transId");
        let username = localStorage.getItem("username");
        let Referral = localStorage.getItem("Referral");
        // Xóa dữ liệu khỏi localStorage
        localStorage.removeItem("transId");
        localStorage.removeItem("username");
        localStorage.removeItem("Referral");

        // Kiểm tra điều kiện
        if (!transId || !username) {
            localStorage.removeItem("userData");
            localStorage.removeItem("rt");
            alert("Có lỗi trong quá trình xác nhận thanh toán!");
            navigate("/loginPage");
            return
        }


        const fetchData = async () => {
            let edt = await ERSA(JSON.stringify({ transId, username, Referral }))
            try {
                let response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/checkPayMent", { edt }, { withCredentials: true })
                console.log(response);

            } catch (error) {
                alert("Có lỗi trong quá trình xác nhận thanh toán!!!");
                navigate("/loginPage");
                return
            }

        }

        fetchData()



    }, [navigate]); // Thêm navigate vào dependency array

    return
}

export default PaymentSuccess;
