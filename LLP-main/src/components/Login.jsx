// import React from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <>
        <div className="h-screen w-screen bg-slate-50 flex flex-row justify-center items-center">
            <form className="h-[26rem] w-[24rem] md:w-[26rem] border-2 border-gray-700 rounded-2xl bg-white box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); flex flex-col gap-6 justify-center items-center">
                <h1 className="text-2xl  text-black font-bold hover:text-yellow-400">Lo<span className="text-yellow-400 font-serif" >G</span>iN</h1>
                <input className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50" type="email" name="email" id="em" placeholder="E-Mail" required/>
                <input className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50" type="password" name="pass" id="ps" placeholder="Password" required/>
                <div>
                <p className="font-semibold text-yellow-400">New? <Link to="/signup" className="text-black">Register</Link></p>
                </div>
                <input type="submit" value="Submit" className="px-10 py-3 bg-yellow-300 hover:text-white text-black font-semibold hover:bg-yellow-500 border-4 border-yellow-300 hover:border-yellow-500 rounded-md"/>
            </form>
        </div>   
    </>
  )
}

export default Login