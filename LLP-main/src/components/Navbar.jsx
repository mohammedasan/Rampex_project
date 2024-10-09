// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// const Navbar = () => {
//   const [username, setUsername] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
      
//     } 
//   }, []);
  
//   const handleLogout = () => {
//     localStorage.removeItem('username');
//     setUsername(null);  
//     navigate('/login');
//   };

//   return (
//     <header className="h-16 shadow-sm">
//       <nav className="flex items-center justify-between w-9/12 h-full mx-auto">
//         <Link to="/" className="flex items-center ">
//           <h1 className="text-3xl">
//             <strong>
//               Learn<span className="text-primary">ENG</span>
//             </strong>
//           </h1>
//         </Link>

//         <div className="flex items-center space-x-5">
//           <ul className="items-center hidden space-x-8 md:flex">
//             <li>
//               <Link
//                 to="/howitworks"
//                 className="transition-colors hover:text-primary"
//               >
//                 How it works?
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/aboutus"
//                 className="transition-colors hover:text-primary"
//               >
//                 About us
//               </Link>
//             </li>
//           </ul>

//           {username ? (
//             <div className="flex items-center space-x-4">
//               <span className="font-medium text-primary">Hello, {username}</span>
//               <button 
//                 onClick={handleLogout} 
//                 className="px-5 py-1 mt-2 font-medium transition-all border rounded border-primary hover:bg-primary hover:text-white md:mt-0"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button className="px-5 py-1 mt-2 font-medium transition-all border rounded border-primary hover:bg-primary hover:text-white md:mt-0">
//               <Link to="/login">Login</Link>
//             </button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); 
      console.log('Username from localStorage:', storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    <header className="h-16 shadow-sm">
      <nav className="flex items-center justify-between w-9/12 h-full mx-auto">
        <Link to="/" className="flex items-center ">
          <h1 className="text-3xl">
            <strong>
              Learn<span className="text-primary">ENG</span>
            </strong>
          </h1>
        </Link>

        <div className="flex items-center space-x-5">
          <ul className="items-center hidden space-x-8 md:flex">
            <li>
              <Link to="/howitworks" className="transition-colors hover:text-primary">
                How it works?
              </Link>
            </li>

            <li>
              <Link to="/aboutus" className="transition-colors hover:text-primary">
                About us
              </Link>
            </li>
          </ul>

          {username ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium text-primary">Welcome, Learner</span>
              <button
                onClick={handleLogout}
                className="px-5 py-1 mt-2 font-medium transition-all border rounded border-primary hover:bg-primary hover:text-white md:mt-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="px-5 py-1 mt-2 font-medium transition-all border rounded border-primary hover:bg-primary hover:text-white md:mt-0">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
