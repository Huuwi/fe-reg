import { useState } from "react"
import axios from "axios"
import HeaderDashBoard from "../../componet/HeaderDashBoard"
// import styles from "../../assets/css/SearchRemoveTrans.css"

function SearchRemoveTrans() {

    let [dataOrdered, setDataOrdered] = useState({})

    let [studentCodeRemove, setStudentCodeRemove] = useState("")

    let [passWordHauiRemove, setPassWordHauiRemove] = useState("")

    let [classCodeRemove, setClassCodeRemove] = useState("")

    let [isClickedRemove, setIsClickedRemove] = useState(false)
    let [isClickedGetList, setIsClickedGetList] = useState(false)

    function handleOnChangeStudentCodeRemove(e) {
        setStudentCodeRemove(e.target.value);
    }

    function handleOnChangePassWordHauiRemove(e) {
        setPassWordHauiRemove(e.target.value);
    }

    function handleOnChangeClassCodeRemove(e) {
        setClassCodeRemove(e.target.value);
    }



    let [studentCodeSearch, setStudentCodeSearch] = useState("")

    let [passWordHauiSearch, setPassWordHauiSearch] = useState("")

    let [referralCode, setReferralCode] = useState("")

    let [amount, setAmount] = useState(0)



    function handleOnChangeReferralCode(e) {
        setReferralCode(e.target.value);
    }

    function handleOnChangeAmout(e) {
        setAmount(e.target.value);
    }



    function handleOnChangeStudentCodeSearch(e) {
        setStudentCodeSearch(e.target.value);
    }

    function handleOnChangePassWordHauiSearch(e) {
        setPassWordHauiSearch(e.target.value);
    }

    async function handleClickSearch() {
        if (isClickedGetList) {
            alert("Vui lòng đợi!")
            return
        }
        setIsClickedGetList(true)

        alert("Đã yêu cầu tra cứu vui lòng đợi kết quả!")

        let responseSearch
        try {
            responseSearch = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getListordered", { studentCodeSearch, passWordHauiSearch }, { withCredentials: true })

        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message)
            setIsClickedGetList(true)
            return
        }

        let dataSearch = responseSearch.data;

        setDataOrdered({
            nameHaui: responseSearch.data.nameHaui,
            dataOrder: dataSearch.data_ordered
        })
        setIsClickedGetList(false)


    }

    async function handleClickTrans() {

        alert("Đang tiến hành chuyển tiền , vui lòng đợi!")

        let responseTrans
        try {
            responseTrans = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/transAmount", { referralCode, amount }, { withCredentials: true })

        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message)
            return
        }

        window.location.reload()
    }






    async function handleClickRemove() {
        if (isClickedRemove) {
            alert("Vui lòng đợi!")
            return
        }
        alert("Đã xác nhận hủy , vui lòng đợi gửi đơn!")
        setIsClickedRemove(true)
        let responeRemove
        try {
            responeRemove = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/removeClass", { studentCodeRemove, passWordHauiRemove, classCodeRemove }, { withCredentials: true })

        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message)
            setIsClickedRemove(false)
            return
        }
        setIsClickedRemove(false)
        alert(responeRemove.data.result.Message)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <HeaderDashBoard />

            <h2 style={{ color: "red", marginTop: "70px" }}>Chuyển xu cho account khác dựa trên mã giới thiệu(lv3 trở lên mới được chuyển , khi chuyển sẽ mất 30% giá trị xu) </h2>
            <div style={{ display: "flex", maxWidth: "800px", flexDirection: "column", alignItems: "center", padding: "30px", backgroundColor: "orange", borderRadius: "10px", boxShadow: "3px 3px 3px red", margin: "10px", marginTop: "20px" }}>
                <h3>Form chuyển xu</h3>
                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập mã giới thiệu để chuyển xu" value={referralCode} onChange={handleOnChangeReferralCode} />
                <input type="number" style={{ minWidth: "515px", minHeight: "37px", margin: "10px", borderRadius: "10px" }} placeholder="Nhập số xu muốn chuyển" value={amount} onChange={handleOnChangeAmout} />
                <button style={{ maxHeight: "60px", margin: "10px" }} onClick={handleClickTrans} >  Xác nhận chuyển </button>
            </div>

            <div></div>

            <h2 style={{ color: "red", marginTop: "70px" }}>Hủy đăng ký lớp học (Không được hoàn xu)</h2>

            <div style={{ display: "flex", maxWidth: "800px", flexDirection: "column", alignItems: "center", padding: "30px", backgroundColor: "greenYellow", borderRadius: "10px", boxShadow: "3px 3px 3px red", margin: "10px", marginTop: "20px" }}>
                <h3>Form hủy đăng ký lớp học</h3>
                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập mã sinh viên vào đây để hủy đăng ký lớp học" value={studentCodeRemove} onChange={handleOnChangeStudentCodeRemove} />
                <input type="password" style={{ minWidth: "510px", minHeight: "39px", borderRadius: "10px", marginTop: "22px" }} placeholder="Nhập mật khẩu sinh viên vào đây để hủy đăng ký lớp học" value={passWordHauiRemove} onChange={handleOnChangePassWordHauiRemove} />
                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập classCode để hủy đăng ký lớp học" value={classCodeRemove} onChange={handleOnChangeClassCodeRemove} />
                <button style={{ maxHeight: "60px", margin: "10px" }} onClick={handleClickRemove} >  Xác nhận hủy </button>
            </div>

            <h2 style={{ color: "green", marginTop: "70px" }}>Tra cứu danh sách đã đăng ký và hủy đăng ký</h2>

            <div style={{ display: "flex", maxWidth: "800px", flexDirection: "column", alignItems: "center", padding: "30px", backgroundColor: "pink", borderRadius: "10px", boxShadow: "3px 3px 3px red", margin: "10px", marginTop: "20px" }}>
                <h3>Form Tra Cứu</h3>
                <input type="text" style={{ minWidth: "400px" }} placeholder="Nhập mã sinh viên vào đây để tra cứu" value={studentCodeSearch} onChange={handleOnChangeStudentCodeSearch} />
                <input type="password" style={{ minWidth: "510px", minHeight: "39px", borderRadius: "10px", marginTop: "22px" }} placeholder="Nhập mật khẩu sinh viên vào đây để tra cứu" value={passWordHauiSearch} onChange={handleOnChangePassWordHauiSearch} />
                <button style={{ maxHeight: "60px", margin: "10px" }} onClick={handleClickSearch} >  Tra cứu </button>
            </div>

            {
                !dataOrdered?.dataOrder?.length
                    ? <div></div>
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

                                {dataOrdered?.dataOrder?.map((e, i) => {

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


export default SearchRemoveTrans
