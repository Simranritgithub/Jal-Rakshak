import React, { useState } from 'react'
import Glasscard from '../components/Glasscard'
import InputField from '../components/InputField'
import instance from '../utils/axiosInstance'
import { Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const HandleonChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const HandleonLogin = async (e) => {
    e.preventDefault()
    console.log("login clicked")

    try {
      const res = await instance.post("/auth/login", form)
      //  localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.success) {
        const user = res.data.user;
        console.log("user",user);

        if (user.role === "Admin") navigate("/admin/dashboard")
        else if (user.role === "Asha worker"){
          if(user.hasprofile){
      navigate("/asha/dashboard")
      }
      else{
        navigate("/Asha/profile")
      }}
         
        else navigate("/user/dashboard")
      }

    } catch (error) {
      console.log(error.response?.data?.message || "login failed")
    }
  }

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-end px-12 overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url('https://www.worldbank.org/content/dam/photos/780x439/2016/sep-3/Oct---Mahmud-MapBGD-MR-2006-0006429.JPG')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br 
          from-[#6AECE1]/60
          via-[#26CCC2]/55
          to-[#FFB76C]/80
        " />

        {/* Glass Card */}
        <Glasscard className="relative z-10 w-full max-w-md">

          <main className="w-full flex flex-col items-center p-8">

            <div className="flex flex-col gap-2 items-center">

              <h1 className="text-3xl font-extrabold text-[#010c0c]">
                JalRakshak
              </h1>

              <p className="text-sm text-gray-700 text-center max-w-md">
                Login to access your Jalrakshak account.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={HandleonLogin}
              className="space-y-5 w-full mt-6"
            >

              <InputField
                
                label="Email"
                name="email"
                type="email"

                value={form.email}
                onChange={HandleonChange}
                icon={<Mail size={18} />}
                placeholder="Enter your email"
              />
              {/* <p className='invisible peer-invalid:visible text-red-500 font-semibold'>Please provide vaild email</p> */}


              <InputField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={HandleonChange}
                icon={<Lock size={18} />}
                placeholder="Enter password"
              />

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
                Login
              </button>

            </form>

            {/* Register Redirect */}
            <p className="mt-5 text-sm text-gray-700">
              Not registered yet?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#26CCC2] font-semibold cursor-pointer hover:underline"
              >
                Create account
              </span>
            </p>

          </main>

        </Glasscard>

      </div>
    </>
  )
}

export default Login
