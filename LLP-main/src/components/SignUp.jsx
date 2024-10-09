// // import React from 'react'
// import { Link } from 'react-router-dom';
// const SignUp = () => {
//   return (
//     <div className="h-screen w-screen bg-slate-50 flex flex-row justify-center items-center">
//             <form className="h-[29rem] w-[25rem] md:w-[26rem] border-2 border-gray-700 rounded-2xl bg-white box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); flex flex-col gap-6 justify-center items-center">
//                 <h1 className="text-2xl  text-black font-bold hover:text-yellow-400">Si<span className="text-yellow-400 font-serif" >G</span>nup</h1>
//                 <input className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50" type="text" name="user" id="user" placeholder="UserName" required/>
//                 <input className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50" type="email" name="email" id="em" placeholder="E-Mail" required/>
//                 <input className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50" type="password" name="pass" id="ps" placeholder="Password" required/>
//                 <div>
//                 <p className="font-semibold text-yellow-400">Already Registered?<Link to="/Login" className="text-black"> Login</Link></p>
//                 </div>
//                 <input type="submit" value="Submit" className="px-10 py-3 bg-yellow-300 hover:text-white text-black font-semibold hover:bg-yellow-500 border-4 border-yellow-300 hover:border-yellow-500 rounded-md"/>
//             </form>
//         </div>
//   )
// }

// export default SignUp
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-row justify-center items-center">
      <form
        className="h-[29rem] w-[25rem] md:w-[26rem] border-2 border-gray-700 rounded-2xl bg-white box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); flex flex-col gap-6 justify-center items-center"
        onSubmit={handleSubmit} 
      >
        <h1 className="text-2xl text-black font-bold hover:text-yellow-400">Si<span className="text-yellow-400 font-serif">G</span>nup</h1>
        <input
          className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50"
          type="text"
          name="user"
          id="user"
          placeholder="UserName"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input
          className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50"
          type="email"
          name="email"
          id="em"
          placeholder="E-Mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input
          className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50"
          type="password"
          name="pass"
          id="ps"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <div>
          <p className="font-semibold text-yellow-400">
            Already Registered?
            <Link to="/Login" className="text-black"> Login</Link>
          </p>
        </div>
        <input
          type="submit"
          value="Submit"
          className="px-10 py-3 bg-yellow-300 hover:text-white text-black font-semibold hover:bg-yellow-500 border-4 border-yellow-300 hover:border-yellow-500 rounded-md"
        />
      </form>
    </div>
  );
};

export default SignUp;
