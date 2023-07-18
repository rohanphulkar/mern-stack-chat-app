import React from "react";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { error, success } from "../components/toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setCookie("jwt", data.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      success("Logged In Successfully");
      navigate("/");
    } else {
      error("something went wrong");
    }
  };
  return (
    <div>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Login</h1>
            </div>
            <div className="mt-5">
              {/* Form */}
              <form method="POST" onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email address
                    </label>
                    <div className="">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}
                  {/* Form Group */}
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                    <div className="">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  {/* End Form Group */}

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Login;
