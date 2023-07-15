import { AiOutlineEye } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../constant/api";
import { useUser } from "../context/userContext/userContext";
const Register = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDispatch } = useUser();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${api}auth/register`, {
        name,
        email,
        password,
      });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));

        userDispatch({ type: "REGISTER", payload: data });
        setLoading(false);
        navigate("/");
      }
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-8 mt-40 max-w-lg">
      <div className="  bg-white shadow-xl rounded-sm  py-2 flex flex-col justify-start items-center">
        <h1 className="uppercase text-2xl font-bold">register</h1>
        <form className=" w-3/4 my-2" onSubmit={submitHandler}>
          <div className=" py-2">
            <label className="block font-semibold uppercase text-sm text-slate-400 mb-1 ">
              name
            </label>
            <input
              value={name}
              type="text"
              className="border-2 py-1 block w-full rounded-md outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" py-2">
            <label className="block uppercase font-semibold text-sm text-slate-400 mb-1 ">
              email
            </label>
            <input
              value={email}
              type="email"
              className="border-2 py-1 block w-full rounded-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" py-2">
            <label className="block uppercase text-sm text-slate-400 mb-1 font-semibold  ">
              password
            </label>
            <div className="flex justify-center items-center border-2 rounded-md">
              <input
                value={password}
                type={open ? "text" : "password"}
                className="py-1 block w-full rounded-md outline-none "
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEye
                className="text-2xl mx-2 "
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="bg-red-600 w-full py-1 uppercase text-white font-semibold text-xl rounded-md"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                </div>
              ) : (
                "submit"
              )}
            </button>
            <button onClick={() => navigate("/login")}>
              Already have an account ?{" "}
              <span className="text-red-600 font-semibold">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
