import HeaderDashBoard from "../../componet/HeaderDashBoard";
import styles from "../../assets/css/DashBoard.module.css"
import { useNavigate } from "react-router-dom";
function DashBoard() {
    let navigate = useNavigate()
    let jsonData = localStorage.getItem("userData")
    let userData = JSON.parse(jsonData)

    function handleClickLogOut() {
        localStorage.removeItem("userData");
        localStorage.removeItem("rt")
        navigate("/loginPage")
    }

    function handleClickRegMoudle() {
        navigate("/regModule")
    }
    function handleClickDashBoardRecharge() {
        navigate("/dashBoardRecharge")
    }



    return (
        <>
            <HeaderDashBoard
                userData={userData || {}}
            />
            <div className={styles.content} >
                <div className={styles.wrapper}>
                    <h1 className={styles.option}>Mời bạn lựa chọn chức năng</h1>
                    <div className={styles.wrapBtn}>
                        <button className={styles.rechargeBtn} onClick={handleClickDashBoardRecharge}>nạp tiền 💎</button>
                        <button onClick={handleClickRegMoudle} > đăng ký học phần </button>
                        <button onClick={handleClickLogOut}> đăng xuất </button>
                        <button onClick={handleClickLogOut}>lịch sử nạp tiền </button>
                        <button onClick={handleClickLogOut}>lịch sử đăng ký HP </button>
                        <button onClick={handleClickLogOut}> liên hệ admin </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
