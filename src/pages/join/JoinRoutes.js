// routes/JoinRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Join from "./Join";
import JoinThree from "./JoinThree";
import JoinTwo from "./JoinTwo";

const JoinRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Join />} /> {/* 기본 경로 */}
            <Route path="two" element={<JoinTwo/>} />
            <Route path="three" element={<JoinThree />} />
        </Routes>
    );
};

export default JoinRoutes;
