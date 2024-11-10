"use client"
import { setEmpDetails } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const page = () => {

    const [contact,setContact] = useState('');
    const [step, setStep] = useState('two');
    const inputRefs = useRef([]);
    const router = useRouter();
    const dispatch = useDispatch();


    // sendOtp function
    const sendOtp = async() => {
        try {
            if (!contact) {
                throw new Error("Contact number is required.");
            }
            const res = await fetch('https://eazrdaily.eazr.in/auth/admin/sendOtp',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    contactNumber : contact
                })
            });

            const json = await res.json();
            if(!res.ok){
                throw new Error(json?.error || 'Failed to send OTP')
            }

            if(json?.error){
                throw new Error(json?.error || 'Failed to send OTP')
            }

            setStep('two')
            
        } catch (error) {
            toast.error(error.message || error)
        }
    }



    const handleChange = (e, index) => {
        const { value } = e.target;

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (value.length === 0 && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Function to clear all inputs
    const handleCancel = () => {
        inputRefs.current.forEach(input => {
            if (input) input.value = ''; // Set each input's value to an empty string
        });
        inputRefs.current[0]?.focus(); // Optionally, focus the first input after clearing
    };


    const verifyOtp = async() =>{
        try {

            const getOtp = inputRefs.current.map(input => input?.value || '').join('');
            console.log(getOtp)
            if(!getOtp){
                throw new Error("Otp required")
            }

            const data = {
                contactNumber : contact,
                otp : getOtp
            }
            console.log(data)

            const res = await fetch('https://eazrdaily.eazr.in/auth/admin/verifyOtp',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data)
            })

            const json = await res.json();

            if(!res.ok || json?.error){
                throw new Error(json?.error || "Invalid Otp")
            }

            if(json?.data?.employee){
                handleCancel();
                toast.success(json?.data?.message);
                setContact('');
                dispatch(setEmpDetails(json?.data?.employee))
                // console.log(json?.data?.employee);
                localStorage.setItem('eazr-token',json?.data?.employee?.token);
                router.push('/admin/dashboard')
            }


        } catch (error) {
            toast.error(error.message || error)
        }
    }




    return (
        <>
            {step === 'one' ? (
                <div className='w-screen h-screen bg-slate-200 flex justify-center items-center p-3'>
                    <div className='w-full max-w-[450px] bg-white rounded-lg p-10 flex flex-col gap-6'>
                        <h4 className='text-lg font-bold'>Sign in with One Time Password (OTP)</h4>
                        <div className='border-2 border-slate-400 flex items-center rounded-lg overflow-hidden'>
                            <span className='px-4 py-2 bg-slate-200'>+91</span>
                            <input type='text' value={contact} onChange={(e)=>setContact(e.target.value)} className='px-3 outline-none' />
                        </div>
                        <button onClick={sendOtp} className='px-3 py-2 bg-[#24c062] text-white font-bold rounded-md'>Request OTP on Mobile</button>
                    </div>

                </div>
            ) : (
                <div className='w-screen h-screen bg-slate-200 flex justify-center items-center p-3'>
                    <div className='w-full max-w-[450px] bg-white rounded-lg p-10 flex flex-col gap-6'>
                        <h4 className='text-lg font-bold'>Sign in with One Time Password (OTP)</h4>
                        <div className="flex justify-center gap-4 p-4">
                            {[0, 1, 2, 3].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="otp-input w-14 h-14 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={(e) => handleChange(e, index)}
                                />
                            ))}
                        </div>

                        <div className='w-full flex justify-between gap-8'>
                            <button onClick={handleCancel} className='w-full px-3 py-2 bg-white text-black font-bold rounded-md border-2 border-slate-400'>Cancel</button>
                            <button onClick={verifyOtp} className='w-full px-3 py-2 bg-[#24c062] text-white font-bold rounded-md'>Verify</button>
                        </div>

                    </div>

                </div>
            )}

        </>

    )
}

export default page