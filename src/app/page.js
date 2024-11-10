'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Home({children}) {
  const router = useRouter();

  const token = localStorage.getItem('eazr-token');
  const {empDetails} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(!token || !empDetails){
      router.push('/admin/login')
    }
    router.push('/admin/dashboard')

  })
  return (
    <>
      {children}
      <div>
        
      </div>
      <h1>Manish</h1>
    </>
      
      
  );
}
