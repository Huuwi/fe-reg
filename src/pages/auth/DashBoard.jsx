import HeaderDashBoard from "../../componet/HeaderDashBoard";
import styles from "../../assets/css/DashBoard.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoard() {


    let navigate = useNavigate()
    let jsonData = localStorage.getItem("userData")
    let userData = JSON.parse(jsonData)

    async function handleClickLogOut() {
        localStorage.removeItem("userData");
        localStorage.removeItem("rt")
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/logoutAccount", {}, { withCredentials: true })
        } catch (error) {
            alert("logout thất bại")
            console.log(error);
        }

        navigate("/loginPage")
    }

    function handleCLickHistoryRegisted() {

        navigate("/historyRegisted")

    }


    async function handleClickHistoryPayment() {

        navigate("/historyPayment")

    }


    function handleClickRegMoudle() {
        navigate("/PingHaui")
    }
    function handleClickDashBoardRecharge() {
        navigate("/dashBoardRecharge")
    }

    function handleClickSearchRemoveTrans() {
        navigate("/searchRemoveTrans")
    }





    return (
        <>
            <HeaderDashBoard
                userData={userData || {}}
            />
            <div className={styles.content} >
                <div className={styles.wrapper}>
                    <h2 className={styles.option} style={{ margin: "10px" }}>Ae có thể đăng ký thành công mọi học phần (kể cả ngoài dự kiến , yêu cầu tiên quyết , và ngoài thgian đăng ký chính thức)</h2>
                    <h1 className={styles.option}>Mời bạn lựa chọn chức năng</h1>
                    <div className={styles.wrapBtn}>
                        <button className={styles.rechargeBtn} onClick={handleClickDashBoardRecharge}>nạp tiền 💎</button>
                        <button onClick={handleClickRegMoudle} > đăng ký học phần </button>
                        <button onClick={handleClickLogOut}> đăng xuất </button>
                        <button onClick={handleClickHistoryPayment}>lịch sử nạp tiền </button>
                        <button onClick={handleCLickHistoryRegisted}>lịch sử đăng ký HP </button>
                        <button onClick={handleClickSearchRemoveTrans}>Tra cứu,hủy,chuyển tiền</button>
                    </div>
                    <h2 style={{ color: "red", backgroundColor: "white", margin: "10px" }}>Ae có thể xem hướng dẫn sử dụng website trên youtube tại đây : </h2>
                    <h2 style={{ color: "red", backgroundColor: "white", margin: "10px" }}> <a href="https://www.youtube.com/watch?v=lGIiLFzl0pQ" style={{ color: "green" }} target="_blank">video hướng dẫn 1 : (hướng dẫn nạp tiền dùng mã giới thiệu)</a></h2>
                    <h2 style={{ color: "red", backgroundColor: "white" }}> <a href="https://youtu.be/zs4LVHfs6cA" style={{ color: "green" }} target="_blank">video hướng dẫn 2 : (hướng dẫn chức năng đăng ký học phần , refund xu nếu đăng ký không thành công) </a></h2>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
