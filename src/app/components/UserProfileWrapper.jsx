"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserCircle } from "react-icons/fa";


const UserProfileWrapper = ({ id }) => {
    const [userData, setUserData] = useState(null);
    const { empDetails } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchUserData = async () => {
                const token = localStorage.getItem('eazr-token');
                if (!token || !empDetails) {
                    router.push('/admin/login');
                }
                try {
                    const res = await fetch(`https://eazrdaily.eazr.in/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = await res.json();

                    if (data?.error) {
                        throw new Error(data?.message);
                    }

                    setUserData(data?.data);
                } catch (error) {
                    toast.error(error.message || error);
                }
            };

            fetchUserData();
        }
    }, []);

    if (!userData) return <div>Loading...</div>;

    return (
        <div className='w-screen h-screen bg-slate-200 px-3'>
            <div className='w-full flex justify-center pt-[150px]'>
                <div className='w-full max-w-[550px] px-4 pt-[100px] pb-9 bg-white shadow-lg rounded-lg relative'>
                    <div className='absolute left-0 right-0 -top-[70px] w-[140px] h-[140px] m-auto rounded-full overflow-hidden bg-slate-400 text-gray-500 shadow-md shadow-slate-600'>
                        {userData?.profile ?
                            <img src={userData?.profile} className='w-full h-full object-cover' />
                            :
                            <FaUserCircle className='w-full h-full' />}
                    </div>
                    <span onClick={() => router.push('/admin/dashboard')} className='absolute top-2 right-2 px-3 py-1.5 text-white bg-green-500 rounded-md cursor-pointer'>Back</span>
                    <div className='flex flex-col gap-2'>
                        <div className='grid grid-cols-3 gap-3'>
                            <span className='col-span-1 flex justify-between'>
                                <span className='font-bold text-base'>Name</span>
                                <span>-</span>
                            </span>
                            <span className='col-span-2'>{userData?.name ? userData?.name : 'NA'}</span>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <span className='col-span-1 flex justify-between'>
                                <span className='font-bold text-base'>Gender</span>
                                <span>-</span>
                            </span>
                            <span className='col-span-2'>{userData?.gender ? userData?.gender : 'NA'}</span>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <span className='col-span-1 flex justify-between'>
                                <span className='font-bold text-base'>DOB</span>
                                <span>-</span>
                            </span>
                            <span className='col-span-2'>{userData?.dob ? userData?.dob : 'NA'}</span>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <span className='col-span-1 flex justify-between'>
                                <span className='font-bold text-base'>Email</span>
                                <span>-</span>
                            </span>
                            <span className='col-span-2'>{userData?.email ? userData?.email : 'NA'}</span>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <span className='col-span-1 flex justify-between'>
                                <span className='font-bold text-base'>Contact</span>
                                <span>-</span>
                            </span>
                            <span className='col-span-2'>{userData?.phoneNumber ? userData?.phoneNumber : 'NA'}</span>
                        </div>
                        <div className='grid grid-cols-3 gap-3'>
                            <span className='col-span-1 flex justify-between'>
                                <span className='font-bold text-base'>Company</span>
                                <span>-</span>
                            </span>
                            <span className='col-span-2'>{userData?.employeeDetails[0]?.companyName ? userData?.employeeDetails[0]?.companyName : 'NA'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileWrapper;
