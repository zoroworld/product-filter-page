import { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/products");
    } else alert("Invalid credentials");
  };

  return (
    <div className="auth-main relative">
      <div className="auth-wrapper v1 flex items-center w-full h-full min-h-screen">
        <div className="auth-form flex items-center justify-center grow flex-col min-h-screen relative p-6 ">
          <div className="w-full max-w-[350px] relative">
            <div className="auth-bg ">
              <span className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] block rounded-full bg-theme-bg-1 animate-[floating_7s_infinite]"></span>
              <span className="absolute top-[150px] right-[-150px] w-5 h-5 block rounded-full bg-primary-500 animate-[floating_9s_infinite]"></span>
              <span className="absolute left-[-150px] bottom-[150px] w-5 h-5 block rounded-full bg-theme-bg-1 animate-[floating_7s_infinite]"></span>
              <span className="absolute left-[-100px] bottom-[-100px] w-[300px] h-[300px] block rounded-full bg-theme-bg-2 animate-[floating_9s_infinite]"></span>
            </div>
            <div className="card sm:my-12  w-full shadow-none">
              <div className="card-body !p-10">
                <h2 className="text-center font-medium mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="name"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="floatingInput1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mx-auto shadow-2xl"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="flex justify-between items-end flex-wrap mt-4">
                  <h6 className="font-medium mb-0">Don't have an Account?</h6>
                  <a href="register-v1.html" className="text-primary-500">
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
