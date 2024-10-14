import React from 'react';
import { useState } from 'react';
import styles from '../assets/css/ModuleTable.module.css'; // Đường dẫn đến file CSS module

const ModuleTable = ({ moduleData }) => {

    let [dataFound, setDataFound] = useState([])

    function findModuleByName(nameModule, moduleData) {
        let res = [];

        nameModule = nameModule.normalize("NFKD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(" ", '')

        if (nameModule.length < 3) {
            return
        }

        for (let e of moduleData) {
            if (e.module_name.normalize("NFKD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(" ", '').includes(nameModule)) {
                res.push(e)
            }
        }
        return res
    }



    function handleChange(e) {
        setDataFound(findModuleByName(e.target.value, moduleData))
    }


    return (<>

        <div className={styles.tableContainer}>
            <input type="text" placeholder='Nhập vào tên học phần cần tìm...' onChange={handleChange} />
            {dataFound?.length > 0 ? dataFound.map((e) => {
                return <h4 style={{ marginTop: "10px" }} >Tên học phần : <span style={{ color: "greenyellow", fontSize: "15px" }}>{e.module_name}</span> , id học phần : <span style={{ color: "greenyellow", fontSize: "15px" }}>{e.module_id}</span> , mã học phần : <span style={{ color: "greenyellow", fontSize: "15px" }}>{e.module_code}</span> </h4>
            }) : <h1></h1>}
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
    </>
    );
};

export default ModuleTable;
