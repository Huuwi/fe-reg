import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ERSA from "../../helper/ERSA";
import SkeletonLoader from "../../componet/SkeletonLoader";
import FullScreenGif from "../../componet/FullScreenGif";
function PaymentSuccess() {
    let navigate = useNavigate();
    let [lvUp, setLvUp] = useState(false)
    let inforLvUp = useRef({ url: "../assets/transform/tranformationlv1.gif", ms: 2000, lv: 1 })

    useEffect(() => {

        let transId = localStorage.getItem("transId");
        let username = localStorage.getItem("username");
        let Referral = localStorage.getItem("Referral")?.trim();
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

                let gifTranforms = [
                    { url: "../assets/transform/tranformationlv1.gif", ms: 2000, lv: 1 },
                    { url: "../assets/transform/tranformationlv2.gif", ms: 2000, lv: 2 },
                    { url: "../assets/transform/tranformationlv3.gif", ms: 3050, lv: 3 },
                    { url: "../assets/transform/tranformationlv4.gif", ms: 2300, lv: 4 },
                    { url: "../assets/transform/tranformationlv5.gif", ms: 5400, lv: 5 },
                    { url: "../assets/transform/tranformationlv6.gif", ms: 2800, lv: 6 },
                    { url: "../assets/transform/tranformationlv7.gif", ms: 2000, lv: 7 },
                    { url: "../assets/transform/tranformationlv8.gif", ms: 2000, lv: 8 },
                    { url: "../assets/transform/tranformationlv9.gif", ms: 5000, lv: 9 },
                    { url: "../assets/transform/tranformationlv10.gif", ms: 5000, lv: 10 },
                    { url: "../assets/transform/tranformationlv11.gif", ms: 5000, lv: 11 },

                ]

                let response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/checkPayMent", { edt }, { withCredentials: true })
                let data = response.data
                localStorage.removeItem("userData");
                localStorage.setItem("userData", JSON.stringify(data.userData))

                let { newLv, upLv } = data
                if (!upLv) {
                    navigate('/dashBoard')
                    return
                }
                inforLvUp.current = gifTranforms.find((e) => {
                    return e.lv == newLv
                })
                setLvUp(upLv)
                return



            } catch (error) {
                alert("Có lỗi trong quá trình xác nhận thanh toán!!!");
                navigate("/loginPage");
                return
            }

        }

        fetchData()



    }, [navigate]); // Thêm navigate vào dependency array

    return (
        <>
            {lvUp ? <FullScreenGif ms={inforLvUp.current.ms} gifUrl={inforLvUp.current.url} /> : <SkeletonLoader />}
        </>
    )
}

export default PaymentSuccess;
