import { Route } from "react-router-dom";
import styles from "../assets/css/HeaderDashBoard.module.css"
import getInforFromTotal from "../helper/getInforFromTotal";
import TextRunning from "./TextRunning";

function HeaderDashBoard(props) {

    let {
        username = "none",
        referralCode = "none",
        userId = "none",
        balance = "none",
        totalCoinGot = "none",
    } = props.userData;

    let arrValue = [
        { toTal: 0, curBonus: 0, text: "lên lv3 bạn sẽ được bonus giá trị thẻ nạp" },
        { toTal: 50, curBonus: 0, text: "lên lv3 bạn sẽ được bonus giá trị thẻ nạp" },
        { toTal: 80, curBonus: 0, text: "lên lv3 bạn sẽ được bonus giá trị thẻ nạp" },
        { toTal: 100, curBonus: .1, text: "lên lv kế tiếp (lv4) bạn sẽ được bonus 15% giá trị thẻ nạp" },
        { toTal: 130, curBonus: .15, text: "lên lv kế tiếp (lv5) bạn sẽ được bonus 20% giá trị thẻ nạp" },
        { toTal: 160, curBonus: .2, text: "lên lv kế tiếp (lv6) bạn sẽ được bonus 25% giá trị thẻ nạp" },
        { toTal: 200, curBonus: .25, text: "lên lv kế tiếp (lv7) bạn sẽ được bonus 30% giá trị thẻ nạp" },
        { toTal: 250, curBonus: .30, text: "lên lv kế tiếp (lv8) bạn sẽ được bonus 35% giá trị thẻ nạp" },
        { toTal: 300, curBonus: .35, text: "lên lv kế tiếp (lv9) bạn sẽ được bonus 40% giá trị thẻ nạp" },
        { toTal: 350, curBonus: .4, text: "lên lv kế tiếp (lv10) bạn sẽ được bonus 45% giá trị thẻ nạp" },
        { toTal: 500, curBonus: .45, text: "lên lv kế tiếp (lv11) bạn sẽ được bonus 50% giá trị thẻ nạp" },
        { toTal: 1000, curBonus: .50, text: "lên lv kế tiếp (lv12) bạn sẽ được bonus 100% giá trị thẻ nạp" },
        { toTal: 151010, curBonus: 1, text: "lên lv kế tiếp (lv13) bạn sẽ được quy đổi số dư ra tiền mặt" }
    ]

    let infor = getInforFromTotal(totalCoinGot, arrValue)




    const avatarStyle = {
        backgroundImage: `url("../assets/avatar/${infor.curentLevel}.png")`,
        height: '120px',
        width: '120px',
        backgroundSize: '120px 120px',
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        borderRadius: '15px'
    };



    const curExp = {
        height: "30px",
        width: `${totalCoinGot / arrValue[Number(infor.nextLevel.replaceAll("lv", ""))]?.toTal * 100}%`
    }

    let textCss = {
        fontSize: "20px",
        whiteSpace: "normal", // Cho phép xuống dòng
        overflowWrap: "break-word",
        marginBottom: "10px"
    }

    return (
        <>
            <div className={styles.wrapper} >
                <div className={styles.div_left}>
                    <p> {`xin chào, ${username} 👨🏻‍💻 `}</p>
                    <p>{`số dư của bạn là : ${balance} xu 💎`}</p>
                    <p>{`mã giới thiệu của bạn là : ${referralCode} 📓`}</p>
                </div>


                <div className={styles.div_right} >
                    <div style={{ ...avatarStyle, margin: "15px 30px 10px 25px" }} className={styles.avatar} ></div>
                    <div className={styles.div_right_infor}>
                        <TextRunning textCss={{ ...textCss, color: "greenyellow" }} ms={40} text={`level hiện tại : ${infor.curentLevel} , bonus bạn được nhận mỗi giao dịch là : ${infor.curBonus * 100}%`} />
                        <div className={styles.exp}>
                            <div style={{ ...curExp, backgroundColor: "greenyellow", borderRadius: "20px" }}></div>

                            <span style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'black',
                                // fontWeight: 'bold',
                                pointerEvents: 'none',
                                backgroundColor: " rgba(255, 255, 255, 0.7)",
                                fontSize: "15px"
                            }}>
                                {`${totalCoinGot}💎 / ${arrValue[Number(infor.nextLevel.replaceAll("lv", ""))]?.toTal}💎`}
                            </span>
                        </div>
                        <TextRunning textCss={{ ...textCss, color: "rgb(43, 43, 189)" }} ms={40} text={infor.text} />
                        <TextRunning textCss={{ ...textCss, color: "pink" }} text={`bạn cần thêm ${arrValue[Number(infor.nextLevel.replaceAll("lv", ""))]?.toTal - totalCoinGot} xu 💎 để dạt đến lv tiếp theo!!`} ms={50} />
                    </div>
                </div>
            </div>
        </>
    )

}


export default HeaderDashBoard