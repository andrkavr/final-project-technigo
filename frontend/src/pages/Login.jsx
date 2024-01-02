import { useState } from "react";
import { userStore } from "../stores/userStore";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeHandleLogin = userStore((state) => state.handleLogin);

  const onLoginClick = async () => {
    console.log("first");
    try {
      await storeHandleLogin(email, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      if (isLoggedIn) {
        alert("You have been successfully logged in!");
      }
    } catch (error) {
      alert("An error has occurred: " + error);
    }
  };

  return (
    <div className="bg-blue-200 flex flex-col items-center w-[50%] mx-auto">
      <h1 className="text-2xl font-bold mt-10">Login</h1>
      <div className="grid grid-cols-1 items-center mt-5 justify-center gap-y-1">
        <label>Email:</label>
        <input
          type="email"
          required
          placeholder="Enter email..."
          className="px-3 py-1 rounded-sm text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          required
          placeholder="Enter password..."
          className="px-3 py-1 rounded-sm text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-x-4 mt-4">
          <button className=" bg-gray-500 rounded-md py-2 px-3 hover:bg-gray-400 cursor-pointer">
            Forgot Password?
          </button>
          <button
            onClick={onLoginClick}
            className="bg-green-600 rounded-md py-2 px-3 hover:bg-green-500 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
