import React from 'react';
import styles from '../assets/css/ModuleTable.module.css'; // Đường dẫn đến file CSS module

const ModuleTable = ({ moduleData }) => {


    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tên học phần</th>
                        <th>id học phần (copy cột này) </th>
                        <th>Mã học phần</th>
                    </tr>
                </thead>
                <tbody>
                    {moduleData.map((module) => (
                        <tr key={module.module_id}>
                            <td>{module.module_name}</td>
                            <td>{module.module_id}</td>
                            <td>{module.module_code.trim()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModuleTable;
