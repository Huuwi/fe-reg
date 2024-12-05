import React, { useState } from 'react';
import styles from '../assets/css/ClassSelection.module.css'; // Import CSS module
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClassSelection = () => {
    let navigate = useNavigate()
    const [ModuleId, setModuleId] = useState('');
    let [userModuleId, setUserModuleId] = useState('')
    const [registeredId, setRegisteredId] = useState('');

    let [dataClasses, setDataClasses] = useState({})

    const handleUserModuleIdChange = (e) => setUserModuleId(e.target.value);
    const handleModuleIdChange = (e) => setModuleId(e.target.value);
    const handleRegisteredIdChange = (e) => setRegisteredId(e.target.value);

    const handleConfirm = async () => {
        try {
            let respone = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/getInforClass", { id: ModuleId }, { withCredentials: true })
            let data = respone.data

            if (!data?.result?.data?.length) {
                setDataClasses([{}])
                return
            }

            setDataClasses(data?.result?.data)
        } catch (error) {
            console.log(error);
            alert("có lỗi trong quá trình tìm thông tin các lớp học phần");
            return
        }
    };

    const handleRegister = async () => {
        try {
            let respone = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/registerClass", { classCode: registeredId.trim(), moduleId: userModuleId.trim() }, { withCredentials: true })
            let data = respone.data
            localStorage.removeItem("userData")
            localStorage.setItem("userData", JSON.stringify(data.userData))
            alert(data.result.Message)
            window.location.reload()

        } catch (error) {
            console.log(error);
            alert("có lỗi trong quá trình đăng ký lớp học");
            return
        }
    };


    const getDays = (listDate) => {
        if (!listDate) {
            return null
        }

        const days = new Set(JSON.parse(listDate).map((e) => e.DayStudy));
        return Array.from(days).map((day) => `Thứ ${day}`).join(' ');
    };

    // Hàm để lấy danh sách tiết học
    const getTimes = (listDate) => {
        if (!listDate) {
            return null
        }
        const times = new Set(JSON.parse(listDate).map((e) => e.StudyTime));
        return Array.from(times).map((time) => `Tiết ${time}`).join(' ');
    };

    // Hàm để lấy tên giáo viên
    const getTeacherName = (teacherData) => {
        if (!teacherData) {
            return null;
        }
        const teachers = JSON.parse(teacherData);
        return teachers?.length ? teachers.map((e) => { return e.Fullname }).join(" - ") : null;
    };



    return (
        <div className={styles.container} style={{}}>
            <h3 style={{ color: "red", fontSize: "21px" }} >Chú ý ! nếu không nhập id học phần hoặc nhập id học phần không khớp với mã lớp, hệ thống sẽ không thể refund xu !</h3>
            <h3 style={{ color: "red", fontSize: "21px" }} >Ae có thể đăng ký thành công mọi học phần (kể cả ngoài dự kiến , yêu cầu tiên quyết , và ngoài thgian đăng ký chính thức)</h3>
            <div className={styles.section}>
                <input
                    type="text"
                    placeholder="Nhập id học phần vào đây để chọn mã lớp"
                    value={ModuleId}
                    onChange={handleModuleIdChange}
                    className={styles.input}
                />
                <button onClick={handleConfirm} className={styles.button}>
                    Xác nhận
                </button>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Tên môn</th>
                            <th>Tên GV</th>
                            <th>Ngày học</th>
                            <th>Tiết học</th>
                            <th>Số lượng</th>
                            <th>Cơ sở</th>
                            <th>Mã lớp</th>
                        </tr>
                    </thead>

                    <tbody>

                        {dataClasses?.length > 0 ? dataClasses.map((cls, index) => (
                            <tr key={index}>
                                <td>{cls?.ModulesName || "chưa có dữ liệu"}</td>
                                <td>{getTeacherName(cls?.GiaoVien) || "chưa có dữ liệu"}</td>
                                <td>{getDays(cls?.ListDate) || "chưa có dữ liệu"}</td>
                                <td>{getTimes(cls?.ListDate) || "chưa có dữ liệu"}</td>
                                <td>{`${cls?.CountS ?? "chưa có dữ liệu"}/${cls?.MaxStudent || "chưa có dữ liệu"}`}</td>
                                <td>{cls?.BranchName || "chưa có dữ liệu"}</td>
                                <td>{cls?.IndependentClassID || "chưa có dữ liệu"}</td>
                            </tr>
                        )) : console.log("không có dữ liệu trả về")}

                    </tbody>
                </table>
            </div>

            <div className={styles.section}>
                <h3>Copy mã lớp muốn đăng ký</h3>
                <input
                    type="text"
                    placeholder="Nhập id học phần vào đây"
                    value={userModuleId}
                    onChange={handleUserModuleIdChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Nhập mã lớp vào đây"
                    value={registeredId}
                    onChange={handleRegisteredIdChange}
                    className={styles.input}
                />
                <button onClick={handleRegister} className={styles.button}>
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default ClassSelection;