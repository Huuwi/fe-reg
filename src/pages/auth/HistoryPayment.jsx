import { useEffect, useRef, useState } from "react"
import SkeletonLoader from "../../componet/SkeletonLoader"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import HeaderDashBoard from "../../componet/HeaderDashBoard"

function HistoryPayment() {

    let navigate = useNavigate()

    let [dataHistoryPayment, setDataHistoryPayment] = useState(false)

    let htmlData = useRef(null)


    useEffect(() => {

        const fetchData = async () => {

            try {
                let response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getHistoryPayment", {}, { withCredentials: true })

                htmlData.current = response.data.dataPayment.map((e, i) => {
                    return <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }} >
                        <span style={{ fontSize: "20px", color: "green", padding: "30px", boxShadow: "5px 2.5px 5px 5px red" }} >Số tiền : {e.amount / 1000}k</span>
                        <span style={{ fontSize: "20px", color: "green", padding: "30px", boxShadow: "5px 2.5px 5px 5px red" }}> Thời gian : {e.time} </span>
                        <span style={{ fontSize: "20px", color: "green", padding: "30px", boxShadow: "5px 2.5px 5px 5px green" }}> Trạng thái : Thành công</span>

                    </div>
                })

                setDataHistoryPayment(response.data)


            } catch (error) {
                console.log(error);
                alert("lấy thông tin lịch sử giao dịch thất bại")
                navigate("/")
            }



        }
        fetchData()



    }, [])



    return (
        <>
            {
                !dataHistoryPayment ? <SkeletonLoader />

                    :

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffc0cb52", minHeight: "100vh", width: "100vw" }}>
                        <HeaderDashBoard />
                        <h2>Lịch sử giao dịch :</h2>
                        <div style={{ backgroundColor: "rgb(218 189 189 / 46%)", padding: "20px", borderRadius: "10px", margin: "20px" }}> {htmlData.current} </div>
                    </div>


            }
        </>
    )
}


export default HistoryPayment