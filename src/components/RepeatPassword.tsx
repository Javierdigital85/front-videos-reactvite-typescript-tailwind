import { ChangeEvent, FormEvent, useState } from "react";
import image from "../assets/repeatpassword.avif";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import openEye from "../assets/OpenEye.svg";
import closeEye from "../assets/Eye.svg";

const URL = import.meta.env.VITE_BACKEND_URL;
const RepeatPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });

  const [eye, setEye] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);

  const handleEye = () => {
    setEye(!eye);
  };
  function handleEyeTwo() {
    setEyeTwo(!eyeTwo);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.newPassword) {
      toast.warning("Passwords must be the same");
      return;
    }
    if (formData.password.length === 0 || formData.newPassword.length === 0) {
      toast.warning("Password cannot be null");
      return;
    }

    try {
      await axios.get(`${URL}/api/users/validate-token/${token}`);
      await axios.post(
        `${URL}/api/users/overwrite-password/${token}`,
        { password: formData.password },
        { withCredentials: true }
      );
      toast.success("Password has been reset successfully!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data;
        toast.warning(errorMessage);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center h-screen">
      <div className="flex justify-center w-full items-center">
        <img
          className="rounded-full"
          src={image}
          alt="astronauts playing guitar"
        />
      </div>

      <div className="flex justify-center  w-full">
        <form
          onSubmit={handleSubmit}
          className="border flex flex-col  max-w-2xl w-full p-4 rounded-md md:ml-5"
        >
          <h1 className="text-white text-center mb-2 text-3xl">
            Reset your password
          </h1>

          <div className="relative">
            <input
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              type={eye ? "text" : "password"}
              placeholder="password"
              className="mb-3 p-2 rounded-lg w-full px-3"
              autoFocus
            />
            <div
              className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center"
              onClick={handleEye}
            >
              {eye ? <img src={openEye} /> : <img src={closeEye} />}
            </div>
          </div>

          <div className="relative">
            <input
              name="newPassword"
              onChange={handleInputChange}
              value={formData.newPassword}
              type={eyeTwo ? "text" : "password"}
              placeholder="newPassword"
              className="mb-3 p-2 rounded-lg w-full px-3"
            />
            <div
              className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center"
              onClick={handleEyeTwo}
            >
              {eyeTwo ? <img src={openEye} /> : <img src={closeEye} />}
            </div>
          </div>

          <button className="text-white mt-2 bg-blue-500 hover:bg-blue-600 p-3 rounded-md">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default RepeatPassword;
