import React from 'react';
import "../assets/css/SkeletonLoader.css";

const SkeletonLoader = () => {
    return (
        <div className="skeleton-loader">
            <div className="overlay"></div>
            <div className="loader"></div>
            <div className="skeleton-item" style={{ height: '20vh', width: '100%' }}></div>
            <div className="skeleton-item" style={{ height: '15vh', width: '100%' }}></div>
            <div className="skeleton-item" style={{ height: '50vh', width: '90%' }}></div>
            <div className="skeleton-item" style={{ height: '15', width: '100%' }}></div>
        </div>
    );
};

export default SkeletonLoader;