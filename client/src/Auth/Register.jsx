import React from 'react'
import Glasscard from '../components/Glasscard'
import InputField from '../components/InputField';
import { useState } from 'react';
import instance from '../utils/axiosInstance';
import {User,Mail,Lock} from 'lucide-react'
const Register = () => {
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
    role:"",

  });
  const HandleonChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  

  const HandleonRegister=async()=>{
    try {
      const res = await instance.post("/auth/register",form)
      if(res.data.success){
        setForm(res.data.register)
      }
    } 
    catch (error) {
      console.log(error.response?.data?.message||"register failed")
    }
  }
  return (
    <>
    <div className="min-h-screen relative flex items-center justify-end px-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage:
            "url('https://www.worldbank.org/content/dam/photos/780x439/2016/sep-3/Oct---Mahmud-MapBGD-MR-2006-0006429.JPG')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br 
from-[#6AECE1]/60
via-[#26CCC2]/55
to-[#FFB76C]/80
" />

     <Glasscard className="relative z-10 w-full max-w-md flex justify-end">
        <main className="
w-full max-w-2xl
flex flex-col items-center
p-8 
">

          <div className='flex flex-col gap-2  justify-center items-center'>
           <h1 className="
text-3xl font-bold
bg-gradient-to-r from-[#26CCC2] to-[#6AECE1]
bg-clip-text text-transparent
">
JalRakshak
</h1>

           <p className="text-sm text-gray-700 text-center max-w-md">
Register to join the Jalrakshak platform and help protect and conserve our water resources.
</p>
     </div>
          <form 
onSubmit={HandleonRegister}
className="space-y-5 w-full mt-6"
>

            <InputField label="Name" name="name" value={form.name} onChange={HandleonChange}icon={<User size={18}></User>} placeholder="Enter your name" />
 <InputField label="Email" name="email" value={form.email} onChange={HandleonChange} icon={<Mail size={18} />}placeholder="Enter your email" />
 <InputField label="password" name="password" value={form.password} onChange={HandleonChange} icon={<Lock size={18}/>} placeholder="Enter password"/>
 <InputField label="Role" name="role" value={form.role} onChange={HandleonChange} icon={<User size={18}/>} placeholder="Admin AshaWorker"/>
 <button
type="submit"
className="
w-full
py-3
rounded-xl
text-white
font-semibold
bg-gradient-to-r from-[#26CCC2] to-[#6AECE1]
hover:from-[#FFB76C] hover:to-[#FFF57E]
transition-all
shadow-lg
"
>
Register
</button>

          </form>
        </main>
      </Glasscard>
    </div>
    </>
  )
}

export default Register