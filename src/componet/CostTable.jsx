import { useState } from "react"
import styles from "../assets/css/CostTable.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function CostTable(props) {
    let navigate = useNavigate()
    let { costTable } = props
    let [idSelected, setIdSelected] = useState(costTable[costTable.length - 1].id)
    let [Referral, setReferral] = useState('')

    function handleOnchage(e) {
        setIdSelected(e.target.value)
    }
    function handleOnClick(e) {
        setIdSelected(e.target.id)

    }

    function handleOnchageReferral(e) {
        setReferral(e.target.value)
    }

    let textCss = {
        fontSize: "25px",
        whiteSpace: "normal",
        overflowWrap: "break-word",
        marginBottom: "10px"
    }

    let divsTypeCost = costTable.map((e) => {
        return <div className={styles.costType} key={e.id} onClick={handleOnClick} id={e.id} >
            <input type="radio" value={e.id} onChange={handleOnchage} checked={e.id == idSelected} ></input>
            <span id={e.id} onClick={handleOnClick} style={{ ...textCss }} >{`số tiền nạp Là : ${e.amount}k, ưu đãi : ${e.salesReferral * 100}%`} </span>
        </div>
    })
    async function handleSubmit() {
        let userData = localStorage.getItem("userData");
        if (!userData) {
            navigate("/loginPage")
            return
        }
        userData = JSON.parse(userData)
        let dataPostCreatePaymentLink = {
            amount: costTable[idSelected].amount * 1000,
            description: userData.username
        }

        try {
            let data = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/createPaymentLink', dataPostCreatePaymentLink, { withCredentials: true })

            data = data.data.dataFromCreatePaymentLink
            console.log(data.data);

            if (data.data?.checkoutUrl) {

                localStorage.setItem("username", userData.username)
                localStorage.setItem("transId", data.data?.paymentLinkId)
                localStorage.setItem("Referral", Referral)
                window.location.href = data.data?.checkoutUrl
            } else {
                alert("khởi tạo giao dịch chưa thành công! thử lại.")
            }
            return

        } catch (error) {
            alert("khởi tạo giao dịch chưa thành công! thử lại.")
            console.log(error);

        }

    }


    return (
        <>
            <div className={styles.wrapper} >
                <div>
                    <span style={{ backgroundColor: "white", fontSize: "25px", margin: "20px 0px 20px 20px", color: "red" }} >chú ý!! Ưu đãi chuyển qua account có mã giới thiệu được nhập bên dưới với ưu đãi = {costTable[idSelected]?.salesReferral * 100}% giá trị nạp ({`chỉ ưu đãi cho account khác`.toUpperCase()}) </span>
                    {divsTypeCost}
                    <input type="text" placeholder="nhập mã giới thiệu ở đây để nhận ưu đãi" style={{ maxWidth: "500px" }} onChange={handleOnchageReferral} />
                </div>
                <button onClick={handleSubmit}  > xác nhận</button>
            </div>
        </>
    )

}


export default CostTable