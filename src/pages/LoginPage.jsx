import styles from "../assets/css/LoginPage.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

    const navigate = useNavigate();
    let [userName, setUserName] = useState("")
    let [passWord, setPassWord] = useState("")
    let [error, setError] = useState("")

    function handleOnChangeUserName(e) {
        setUserName(e.target.value)
        setError("")
    }
    function handleOnChangePassWord(e) {
        setPassWord(e.target.value)
        setError("")
    }

    async function handleClickLogin() {
        try {
            let data = await axios.post(import.meta.env.VITE_BACKEND_URL + "/login", { userName, passWord }, {
                withCredentials: true
            })
                .then((res) => {
                    return res.data
                })

            localStorage.setItem("userData", JSON.stringify(data.userData))
            localStorage.setItem("rt", JSON.stringify(data.rt))

            navigate("/dashBoard")
            // window.location.href = "/"

        } catch (error) {
            console.log(error?.response?.data?.message);
            setError(error?.response?.data?.message || "lỗi không xác định")
        }

    }


    return (
        <>
            <div className={styles.wrapper} >
                <div className={styles.div_loginForm}>
                    <span className={styles.span_login} >login form</span>
                    <input className={styles.input} type="text" placeholder="tài khoản" name="userName" onChange={handleOnChangeUserName} />
                    <input className={styles.input} type="password" placeholder="mật khẩu" name="passWord" onChange={handleOnChangePassWord} />
                    <button className={styles.btn_login} onClick={handleClickLogin} ><span className={styles.btn_span}>đăng nhập</span></button>
                    <div className={styles.div_reg} >
                        <span className={styles.div_reg_span} >chưa có tài khoản?</span>
                        <span onClick={() => { navigate("/registerPage") }} className={styles.div_reg_link} style={{ textDecoration: "true", fontSize: "15px" }}  >đăng ký</span>
                    </div>
                    <span className={styles.errorSpan}>{error}</span>
                    <h3 className={styles.notification} >chú ý !! tài khoản và mật khẩu không chứa các ký tự đặc biệt , chỉ chứa các ký tự từ 0-9,a-z,A-Z</h3>
                </div>

                <h2 style={{ color: "red", backgroundColor: "white", margin: "10px" }}>Ae có thể xem hướng dẫn sử dụng website trên youtube tại đây : </h2>
                <h2 style={{ color: "red", backgroundColor: "white", margin: "10px" }}> <a href="https://www.youtube.com/watch?v=lGIiLFzl0pQ" style={{ color: "green" }} target="_blank">video hướng dẫn 1 : (hướng dẫn nạp tiền dùng mã giới thiệu)</a></h2>
                <h2 style={{ color: "red", backgroundColor: "white" }}> <a href="https://youtu.be/zs4LVHfs6cA" style={{ color: "green" }} target="_blank">video hướng dẫn 2 : (hướng dẫn chức năng đăng ký học phần , refund xu nếu đăng ký không thành công) </a></h2>

            </div>
        </>
    )

}


export default LoginPage