import HeaderDashBoard from "../../componet/HeaderDashBoard"
import styles from "../../assets/css/RegisterModuleHaui.module.css"
import ClassSelection from "../../componet/ClassSelection";

function RegisterModuleHaui() {
    let jsonData = localStorage.getItem("userData");
    let userData = JSON.parse(jsonData);


    return (
        <>
            <div className={styles.wrapper} >
                <HeaderDashBoard userData={userData} />
                <ClassSelection />
            </div>

        </>
    )

}


export default RegisterModuleHaui