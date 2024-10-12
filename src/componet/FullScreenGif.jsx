import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/css/FullScreenGif.css";

const FullScreenGif = ({ gifUrl, ms }) => {
    const navigate = useNavigate(); // Sử dụng useNavigate
    const [isVisible, setIsVisible] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
        // Sau ms - 100 ms, bắt đầu hiệu ứng chớp
        const flashTimer = setTimeout(() => {
            setIsFlashing(true);
        }, ms - 100);

        // Sau ms ms, GIF sẽ biến mất
        const timer = setTimeout(() => {
            setIsVisible(false);
            navigate("/dashBoard"); // Di chuyển điều hướng vào đây
        }, ms);

        // Dọn dẹp bộ đếm thời gian khi component bị hủy
        return () => {
            clearTimeout(flashTimer);
            clearTimeout(timer);
        };
    }, [ms, navigate]); // Thêm ms và navigate vào dependency array

    if (!gifUrl) return null; // Nếu không có URL thì không render gì

    return (
        <div className={`fullscreen-gif ${isVisible ? 'visible' : 'hidden'} ${isFlashing ? 'flashing' : ''}`}>
            <img src={gifUrl} alt="GIF" />
        </div>
    );
};

export default FullScreenGif;
