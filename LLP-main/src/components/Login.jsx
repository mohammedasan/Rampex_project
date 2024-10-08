
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("username", data);
        alert("Login successful!");
        navigate('/');
        window.location.reload();
        console.log(data)
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again.');
    }
  };
  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-row justify-center items-center">
      <form onSubmit={handleLogin} className="h-[26rem] w-[24rem] md:w-[26rem] border-2 border-gray-700 rounded-2xl bg-white flex flex-col gap-6 justify-center items-center">
        <h1 className="text-2xl text-black font-bold hover:text-yellow-400">
          Lo<span className="text-yellow-400 font-serif">G</span>iN
        </h1>
        <input
          className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50"
          type="email"
          name="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="px-9 py-4 border-b-2 border-yellow-300 outline-none hover:border-2 hover:border-yellow-400 hover:bg-yellow-50"
          type="password"
          name="pass"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <p className="font-semibold text-yellow-400">
            New? <Link to="/signup" className="text-black">Register</Link>
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
export default Login;