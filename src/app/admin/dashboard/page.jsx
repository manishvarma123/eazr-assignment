"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";

const Page = () => {
    const router = useRouter();
    const [users, setUser] = useState(null);

    const { empDetails } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('eazr-token');
            if (!empDetails || !token) {
                router.push('/admin/login');
                return;
            }

            try {
                const res = await fetch('https://eazrdaily.eazr.in/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const json = await res.json();
                setUser(json?.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [router]);

    if (!users) {
        return <span className='text-2xl'>Loading...</span>
    }

    return (
        <div className="w-screen h-screen bg-gray-100">
            <div className='w-full h-full rounded-md overflow-hidden flex flex-col gap-3 p-2'>
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center py-4 lg:py-6 rounded-t-md border-b border-gray-200 bg-blue-500 text-white">
                    User Directory
                </h1>
                <div className="w-full max-w-[1140px] m-auto bg-white shadow-lg rounded-lg overflow-auto">

                    <table className="w-full text-center text-sm md:text-base">
                        <thead className="bg-gray-200 sticky top-0 z-50">
                            <tr>
                                <th className="sticky left-0 bg-gray-200 pl-4 py-4 text-base md:text-lg font-medium text-gray-700">Profile</th>
                                <th className="py-4 text-base md:text-lg font-medium text-gray-700">Name</th>
                                <th className="py-4 text-base md:text-lg font-medium text-gray-700">Email</th>
                                <th className="py-4 text-base md:text-lg font-medium text-gray-700">Phone</th>
                                <th className="pr-4 py-4 text-base md:text-lg font-medium text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100 group">
                                    <td className="py-3 px-2 md:py-4 sticky left-0 bg-white group-hover:bg-gray-100">
                                        <div className="w-12 h-12 rounded-full overflow-hidden mx-auto border border-gray-300 shadow-sm">
                                            {user?.profile?
                                            <img src={user?.profile || '/default-profile.png'} className="w-full h-full object-cover" alt="Profile" />
                                            :
                                            <FaUserCircle className='w-full h-full'/>}
                                        </div>
                                    </td>
                                    <td className="py-3 px-2 md:py-4 text-gray-800 font-medium">{user?.name || 'N/A'}</td>
                                    <td className="py-3 px-2 md:py-4 text-gray-600">{user?.email || 'N/A'}</td>
                                    <td className="py-3 px-2 md:py-4 text-gray-600">{user?.phoneNumber || '8691821302'}</td>
                                    <td className="py-3 px-2 md:py-4 text-gray-600">
                                        <button onClick={() => {

                                            router.push(`/admin/users/${user.id}`)
                                        }} className='bg-green-500 text-white px-4 py-1.5 rounded-md'>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Page;
