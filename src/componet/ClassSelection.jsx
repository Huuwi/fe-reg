import React, { useState } from 'react';
import styles from '../assets/css/ClassSelection.module.css'; // Import CSS module

const ClassSelection = () => {
    const [classId, setClassId] = useState('');
    const [registeredId, setRegisteredId] = useState('');

    let [dataClasses, setDataClasses] = useState({})


    const handleClassIdChange = (e) => setClassId(e.target.value);
    const handleRegisteredIdChange = (e) => setRegisteredId(e.target.value);

    const handleConfirm = () => {
        alert(`Xác nhận mã lớp: ${classId}`);
    };

    const handleRegister = () => {
        alert(`Đăng ký lớp với mã: ${registeredId}`);
    };


    const getDays = (listDate) => {
        const days = new Set(JSON.parse(listDate).map((e) => e.DayStudy));
        return Array.from(days).map((day) => `Thứ ${day}`).join(' ');
    };

    // Hàm để lấy danh sách tiết học
    const getTimes = (listDate) => {
        const times = new Set(JSON.parse(listDate).map((e) => e.StudyTime));
        return Array.from(times).map((time) => `Tiết ${time}`).join(' ');
    };

    // Hàm để lấy tên giáo viên
    const getTeacherName = (teacherData) => {
        const teachers = JSON.parse(teacherData);
        return teachers[0] ? teachers[0].Fullname : 'Chưa có dữ liệu về giáo viên';
    };



    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <input
                    type="text"
                    placeholder="Nhập id học phần vào đây để chọn mã lớp"
                    value={classId}
                    onChange={handleClassIdChange}
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

                        {dataClasses && dataClasses.map((cls, index) => (
                            <tr key={index}>
                                <td>{cls?.ModulesName || "chưa có dữ liệu"}</td>
                                <td>{getTeacherName(cls?.GiaoVien)}</td>
                                <td>{getDays(cls?.ListDate)}</td>
                                <td>{getTimes(cls?.ListDate)}</td>
                                <td>{`${cls?.CountS || "chưa có dữ liệu"}/${cls?.MaxStudent}`}</td>
                                <td>{cls?.BranchName || "chưa có dữ liệu"}</td>
                                <td>{cls?.IndependentClassID || "chưa có dữ liệu"}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className={styles.section}>
                <h3>Copy mã lớp muốn đăng ký</h3>
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