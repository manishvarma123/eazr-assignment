'use client'
import UserProfileWrapper from "@/app/components/UserProfileWrapper";
import { generateStaticParams } from "@/app/utils/constants";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";




const UserPage = ({ params }) => {
    // useEffect(()=>{
    //     generateStaticParams();
    // },[])
    const { id } = React.use(params);
    return <UserProfileWrapper id={id} />;
};

export default UserPage;
