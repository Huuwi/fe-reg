import React, { useState } from 'react';
import styles from '../assets/css/RegisterPage.module.css'; // Import CSS module
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
    let navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [rePassWord, setRePassWord] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passWord !== rePassWord) {
            setError('Mật khẩu không khớp!');
            setSuccess(false);
            return;
        }

        try {
            console.log("call api...");

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/register`,
                { userName, passWord, rePassWord }, { withCredentials: true }
            );
            console.log(response.data);
            setError('');
            setSuccess(true);
        } catch (error) {
            setError('Đã xảy ra lỗi. Vui lòng thử lại!');
            console.log(error);

            alert('Lỗi đăng ký:' + error.response.data.message);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Đăng Ký</h2>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Tài khoản"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={passWord}
                        onChange={(e) => setPassWord(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={rePassWord}
                        onChange={(e) => setRePassWord(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>Đăng ký thành công!</p>}

                <button type="submit" className={styles.submitButton}>
                    Đăng ký
                </button>
                <span className={styles.spanLogin} onClick={() => { navigate("/loginPage") }} >Đăng nhập</span>
            </form>
        </div>
    );
};

export default RegisterPage;
