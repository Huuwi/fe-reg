import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SkeletonLoader from "../../componet/SkeletonLoader";
import axios from "axios";
import HeaderDashBoard from "../../componet/HeaderDashBoard";
import styles from "../../assets/css/LoggedHaui.module.css";
import ModuleTable from "../../componet/ModuleTable.jsx";

function LoggedHaui() {
    let navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    let jsonData = localStorage.getItem("userData");
    let userData = JSON.parse(jsonData);
    let nameHaui = localStorage.getItem("nameHaui") || "none";
    let moduleData = useRef([]);



    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ping = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/pingHaui", {}, { withCredentials: true });
                nameHaui = ping.data.nameHaui;
                localStorage.setItem("nameHaui", nameHaui);

                try {
                    moduleData.current = JSON.parse(localStorage.getItem("module")) || [];
                } catch (error) {
                    console.log(error);
                }

                if (moduleData.current.length <= 10) {
                    const response = await axios.get("/module.txt");
                    moduleData.current = response.data;
                }

                setIsLogged(true);
            } catch (error) {
                localStorage.removeItem("nameHaui");
                console.log(error);
                alert("Phiên đăng nhập HAUI của bạn đã hết hạn!!");
                navigate("/loginHaui");
            }
        };

        fetchData();


        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [navigate]);

    return (
        <>
            {!isLogged ? (
                <SkeletonLoader />
            ) : (
                <div className={styles.wrapperLoggedHaui}>
                    <div className={styles.bodyLoggedHaui}>
                        <HeaderDashBoard userData={userData} />
                        <h1 style={{ color: "blue" }} >Account Haui: {nameHaui}</h1>
                        <div className={styles.divBtn}>
                            <button className={styles.btn} onClick={() => { navigate("/registerModule") }} >Đăng ký học phần</button>
                            <button className={styles.btn}>Quét học phần mới (nếu có)</button>
                        </div>
                        <button className={styles.btn} onClick={() => { navigate("/loginHaui") }} >Đăng nhập acc sinh viên khác</button>
                        <h2 style={{ margin: "10px" }}>Mỗi lần quét học phần sẽ mất 3 xu</h2>
                        <h2 style={{ margin: "10px", color: "red" }}>Copy id học phần muốn đăng ký !!</h2>
                        <h2 style={{ margin: "10px" }}>Bảng học phần:</h2>
                        <ModuleTable moduleData={moduleData.current} />
                    </div>

                    {isVisible && (
                        <button className={styles.scrollToTop} onClick={scrollToTop}>
                            Lên đầu trang
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default LoggedHaui;
