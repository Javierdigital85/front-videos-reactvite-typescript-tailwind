import { ChangeEvent, FormEvent, useState } from "react";
import image from "../assets/repeatpassword.avif";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const URL = import.meta.env.VITE_BACKEND_URL;
const RepeatPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
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
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center text-white bg-slate-900 w-full h-screen items-center">
        <img src={image} alt="astronauts playing guitar" />
      </div>

      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="border flex flex-col max-w-xl w-full p-4 rounded-md "
        >
          <h1 className="text-white text-center mb-2 text-3xl">
            Reset your password
          </h1>
          <input
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            type="password"
            placeholder="password"
            className="mb-3 p-2 rounded-md"
            autoFocus
          />
          <input
            name="newPassword"
            onChange={handleInputChange}
            value={formData.newPassword}
            type="password"
            placeholder="newPassword"
            className="p-2 rounded-md"
          />
          <button className="text-white mt-2 bg-blue-500 hover:bg-blue-600 p-3 rounded-md">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default RepeatPassword;
