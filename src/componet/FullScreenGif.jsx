import React, { useEffect, useState } from 'react';
import "../assets/css/FullScreenGif.css"

const FullScreenGif = ({ gifUrl, ms }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
        // Sau 2.5 giây, bắt đầu hiệu ứng chớp
        const flashTimer = setTimeout(() => {
            setIsFlashing(true);
        }, ms - 100);

        // Sau 3 giây (3000ms), GIF sẽ biến mất
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, ms);

        // Dọn dẹp bộ đếm thời gian khi component bị hủy
        return () => {
            clearTimeout(flashTimer);
            clearTimeout(timer);
        };
    }, []);

    if (!gifUrl) return null; // Nếu không có URL thì không render gì

    return (
        <div className={`fullscreen-gif ${isVisible ? 'visible' : 'hidden'} ${isFlashing ? 'flashing' : ''}`}>
            <img src={gifUrl} alt="GIF" />
        </div>
    );
};

export default FullScreenGif;
