import React, { useState } from 'react';
import styles from '../../assets/css/LoginHaui.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const LoginHaui = () => {
    let navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/loginHaui`,
                { userNameHaui: username, passWordHaui: password },
                { withCredentials: true }
            );
            localStorage.setItem('nameHaui', data?.data?.nameHaui);
            navigate("/loggedHaui")

        } catch (error) {
            alert('Tài khoản hoặc mật khẩu chưa chính xác');
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div
                className={`${styles.loginContainer} ${isHovered ? styles.loginContainerHover : ''
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <h2 className={styles.loginFormTitle}>Đăng Nhập (HAUI)</h2>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="username">
                            Mã Sinh Viên
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập mã sinh viên (Tài Khoản HAUI)"
                            required
                            className={styles.inputField}
                            onFocus={(e) => e.target.classList.add(styles.inputFieldFocus)}
                            onBlur={(e) => e.target.classList.remove(styles.inputFieldFocus)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="password">
                            Mật Khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu (Mật Khẩu HAUI)"
                            required
                            className={styles.inputField}
                            onFocus={(e) => e.target.classList.add(styles.inputFieldFocus)}
                            onBlur={(e) => e.target.classList.remove(styles.inputFieldFocus)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        onMouseEnter={(e) => e.target.classList.add(styles.submitButtonHover)}
                        onMouseLeave={(e) => e.target.classList.remove(styles.submitButtonHover)}
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginHaui;
