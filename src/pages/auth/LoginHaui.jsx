import React, { useState } from 'react';
import '../../assets/css/LoginHaui.css'; // Đảm bảo bạn tạo tệp này
import axios from 'axios';

const LoginHaui = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


        let data = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/loginHaui", { userNameHaui: username, passWordHaui: password }, { withCredentials: true })

        console.log(data);



    };

    return (
        <div >
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Đăng Nhập</h2>
                    <div className="input-group">
                        <label htmlFor="username">Mã Sinh Viên</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập mã sinh viên(Tài Khoản HAUI)"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mật Khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu (Mật Khẩu HAUI)"
                            required
                        />
                    </div>
                    <button type="submit">Đăng Nhập</button>
                </form>
            </div>

        </div>
    );
};

export default LoginHaui;
