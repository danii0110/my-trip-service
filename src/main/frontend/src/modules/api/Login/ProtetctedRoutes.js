import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {KAKAO_AUTH_URL} from "./OAuth";

const ProtectedRoute = () => {
    const userData = localStorage.getItem("user");

    if (!userData) {
        alert("로그인이 필요한 페이지입니다.");
        return <Navigate to="/login" />;
    }

    const user = JSON.parse(userData);
    if (!user.id) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
