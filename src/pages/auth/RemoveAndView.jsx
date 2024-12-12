import { useEffect, useState } from "react"
import styles from "../../assets/css/RemoveAndView.module.css"
import HeaderDashBoard from "../../componet/HeaderDashBoard"
import axios from "axios"

function RemoveAndView() {

    let [dataOrdered, setDataOrdered] = useState([])
    let [classCode, setClassCode] = useState("")

    let nameHaui = localStorage.getItem("nameHaui")

    function handleOnchange(e) {
        setClassCode(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {

            let responseGetData
            try {
                responseGetData = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getListOfThisHaui", {}, { withCredentials: true })
            } catch (error) {
                alert(error.response.data.message)
                return
            }
            setDataOrdered(responseGetData.data.data_ordered)
        }

        fetchData()

    }, [])

    async function handleClick() {

        alert("Đã xác nhận hủy , vui lòng đợi gửi đơn!")
        let responeRemove
        try {
            responeRemove = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/removeClassOfThisHaui", { classCode }, { withCredentials: true })
        } catch (error) {
            alert(error.response.data.message)
            return
        }
        alert(responeRemove.data.result.Message)

    }

    return (
        <div className={styles.wrapper} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <HeaderDashBoard />
            <h2>Xin chào , {nameHaui}</h2>
            <div style={{ display: "flex", maxWidth: "800px", flexDirection: "column", alignItems: "center", padding: "30px", backgroundColor: "yellowGreen", borderRadius: "10px", boxShadow: "3px 3px 3px red", margin: "10px", marginTop: "20px" }}>
                <h3>Form hủy lớp học</h3>
                <input type="text" style={{ minWidth: "400px" }} value={classCode} onChange={handleOnchange} placeholder="Nhập mã lớp muốn hủy đăng ký" />
                <button style={{ maxHeight: "60px", margin: "10px" }} onClick={handleClick} >  Xác nhận hủy </button>
            </div>

            {
                !dataOrdered?.length
                    ? <h1>Không tìm thấy dữ liệu đăng ký</h1>
                    : <div>
                        <table style={{ backgroundColor: "greenYellow", margin: "20px", padding: "30px", borderRadius: "10px", boxShadow: "5px 5px 5px red" }}>

                            <thead style={{}}>
                                <tr>
                                    <th>Số thứ tự đăng ký</th>
                                    <th>Họ và tên HAUI</th>
                                    <th>Tên học phần</th>
                                    <th>Mã học phần</th>
                                    <th>Tên lớp</th>
                                    <th>Thời gian đã đăng ký</th>
                                    <th>Trạng thái </th>
                                    <th>Thông tin </th>

                                </tr>
                            </thead>

                            <tbody>

                                {dataOrdered?.map((e, i) => {

                                    return <tr key={i}>
                                        <td>{e?.sttdk || "chưa có dữ liệu"}</td>
                                        <td>{dataOrdered?.nameHaui || "chưa có dữ liệu"}</td>
                                        <td>{e?.mn || "chưa có dữ liệu"}</td>
                                        <td>{e?.mc || "chưa có dữ liệu"}</td>
                                        <td>{e?.cc || "chưa có dữ liệu"}</td>
                                        <td>{e?.tm || "chưa có dữ liệu"}</td>
                                        <td>{e?.st || "chưa có dữ liệu"}</td>
                                        <td>{e?.msg || "chưa có dữ liệu"}</td>
                                    </tr>
                                })}


                            </tbody>

                        </table>
                    </div>
            }
        </div>
    )
}

export default RemoveAndView

