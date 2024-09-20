import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_BACKEND_URL;
const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const [sendemail, sendSetEmail] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user.email) {
        toast.warning("Please enter a email!");
      }
      await axios.put(`${URL}/api/users/forgotpassword`, {
        email: user.email,
      });
      toast.success("Please ,check your email folder");
      sendSetEmail(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-md flex flex-col w-full max-w-md"
      >
        <h1 className="mb-2 text-white">Recover your password!</h1>
        <input
          type="email"
          placeholder="email"
          name="email"
          className="w-full px-3 p-2 mb-4 rounded-md"
          onChange={handleChange}
          value={user.email}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 mt-2 p-2 rounded-md"
        >
          Send
        </button>
        {sendemail ? (
          <p className="text-green-600">Email submitted</p>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
