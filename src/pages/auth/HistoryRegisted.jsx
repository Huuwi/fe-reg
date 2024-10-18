import { useEffect, useRef, useState } from "react"
import SkeletonLoader from "../../componet/SkeletonLoader"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import HeaderDashBoard from "../../componet/HeaderDashBoard"


function HistoryRegisted() {
    let navigate = useNavigate()

    let data = useRef([])

    let [dataHistoryRegisted, setDataHistoryRegisted] = useState(false)

    let [studentCode, setStudentCode] = useState("")

    let [passWordHaui, setPassWordHaui] = useState("")

    let [id, setId] = useState("")

    function handleOnChangeStudentCode(e) {
        setStudentCode(e.target.value);
    }

    function handleOnChangePassWordHaui(e) {
        setPassWordHaui(e.target.value);
    }

    function handleOnChangeId(e) {
        setId(e.target.value);
    }


    async function handleClick() {

        let dataReg = data.current.find((e) => {
            return e?.id == id
        })

        if (!dataReg) {
            alert("id nhập vào không tồn tại!")
            return
        }

        if (dataReg?.isrefund) {
            alert("id này đã yêu hoàn xu trước đó rồi!")
            return
        }


    }

    let htmlData = useRef(null)

    useEffect(() => {

        const fetchData = async () => {

            try {
                let dataRegisted = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getHistoryRegisted", {}, { withCredentials: true })

                let dataArray = dataRegisted.data.historyRegisted

                data.current = dataArray


                htmlData.current =
                    <table style={{ backgroundColor: "greenYellow", margin: "20px", padding: "30px", borderRadius: "10px", boxShadow: "5px 5px 5px red" }}>

                        <thead style={{}}>
                            <tr>
                                <th>id</th>
                                <th>Họ và tên HAUI</th>
                                <th>Tên học phần</th>
                                <th>Mã</th>
                                <th>Mã lớp</th>
                                <th>Tên lớp</th>
                                <th>Tên giáo viên</th>
                                <th>Thời gian đã đăng ký</th>
                                <th>Đã gửi yêu cầu hoàn xu chưa?  </th>

                            </tr>
                        </thead>

                        <tbody>

                            {dataArray?.map((e, i) => {

                                return <tr key={i}>
                                    <td>{e?.id || "chưa có dữ liệu"}</td>
                                    <td>{e?.nameHaui || "chưa có dữ liệu"}</td>
                                    <td>{e?.moduleName || "chưa có dữ liệu"}</td>
                                    <td>{e?.classCode || "chưa có dữ liệu"}</td>
                                    <td>{e?.classId || "chưa có dữ liệu"}</td>
                                    <td>{e?.className || "chưa có dữ liệu"}</td>
                                    <td>{e?.teacherName || "chưa có dữ liệu"}</td>
                                    <td>{e?.timeRegisted || "chưa có dữ liệu"}</td>
                                    <td>{e?.isrefund ? "Rồi" : "Chưa"}</td>

                                </tr>
                            })}


                        </tbody>

                    </table>
                setDataHistoryRegisted(true)
            } catch (error) {
                console.log(error);
                alert("lấy thông tin lịch sử đăng ký thất bại")
                navigate("/")
            }

        }

        fetchData()


    }, [])


    return (
        <>

            {
                !dataHistoryRegisted

                    ? <SkeletonLoader />

                    :


                    <>
                        <HeaderDashBoard />

                        <div style={{ minHeight: "100vh", minWidth: "100vw", display: "flex", flexDirection: "column", alignItems: "center", padding: "30px", backgroundColor: "#e3dcdc" }}>

                            <h2 style={{ color: "green" }}>Hoàn xu (khi đăng ký chưa thành công , một số lỗi như : không đủ tiền , trùng lịch học ,...)</h2>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px", backgroundColor: "#80808024", borderRadius: "10px", boxShadow: "3px 3px 3px black", margin: "10px" }}>
                                <h3>Form thông tin hoàn xu</h3>
                                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập mã sinh viên vào đây để refund" value={studentCode} onChange={handleOnChangeStudentCode} />
                                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập mật khẩu sinh viên vào đây để refund" value={passWordHaui} onChange={handleOnChangePassWordHaui} />
                                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập id để refund" value={id} onChange={handleOnChangeId} />
                                <button style={{ maxHeight: "60px", margin: "10px" }} onClick={handleClick} >  Xác nhận </button>

                            </div>

                            <h2>Bảng lịch sử đăng ký môn học bằng web (Copy thông tin dưới đây để điền vào form) : </h2>
                            {htmlData.current}

                        </div>
                    </>


            }


        </>
    )
}


export default HistoryRegisted

