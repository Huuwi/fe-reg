const express = require("express");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv").config();

const app = express();

// Kiểm tra biến môi trường
if (!process.env.VITE_BACKEND_URL) {
    console.error("VITE_BACKEND_URL is not set in .env file");
    process.exit(1); // Thoát nếu biến môi trường không được thiết lập
}

// Sử dụng thư mục dist để phục vụ tệp tĩnh
app.use(express.static(path.join(__dirname, '../dist')));

// Định tuyến cho yêu cầu đến /scanModule
app.get("/ping", (req, res) => {
    try {
        res.status(200).json({
            message: "ok from fontEnd!"
        });
    } catch (error) {
        console.error("Error in /scanModule:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Định tuyến cho mọi yêu cầu đến tệp index.html của React
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    } catch (error) {
        console.error("Error serving index.html:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Gửi yêu cầu GET đến backend mỗi 3 giây
setInterval(async () => {
    try {
        const response = await axios.get(process.env.VITE_BACKEND_URL + "/ping");
        console.log("backend response:", response.data);
    } catch (error) {
        console.error("Error fetching from backend:", error.message);
    }
}, Math.floor(Math.random() * 500000) + 300000);

// Khởi động máy chủ
app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});
