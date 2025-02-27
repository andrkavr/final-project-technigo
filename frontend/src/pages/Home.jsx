import Lottie from "lottie-react";
import HomePicture from "../assets/HomePicture.json";
import { Hero } from "../components/Hero";
import { FAQ } from "../components/FAQ";
import { userStore } from "../stores/userStore";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setUsername, setLoggedInUserId } = userStore();
  const vite_backend = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const getUserDataFromMongo = async () => {
      try {
        await fetch(`${vite_backend}/user/${user.sub}`)
          .then((res) => res.json())
          .then((data) => {
            setUsername(data.username);
            setLoggedInUserId(data._id);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getUserDataFromMongo();
  }, [isAuthenticated]);

  return (
    <>
      <div className="text-center font-bold text-4xl tracking-tight text-primary bg-secondary sm:text-5xl md:text-6xl p-6">
        <span className="text-quinary mx-1 font-extrabold text-4x1 relative inline-block stroke-current">
          simple
          <svg
            className="absolute -bottom-0.5 w-full max-h-1.5"
            viewBox="0 0 55 5"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
              strokeWidth="2"
            ></path>
          </svg>
        </span>
        <p>and</p>
        <span className="text-quinary mx-1 font-extrabold text-4x1 relative inline-block stroke-current">
          safe
          <svg
            className="absolute -bottom-0.5 w-full max-h-1.5"
            viewBox="0 0 55 5"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
              strokeWidth="2"
            ></path>
          </svg>
        </span>
        <p>carpool near you</p>
      </div>
      <Lottie
        className="bg-secondary"
        animationData={HomePicture}
        loop={false}
      />
      <Hero />
      <FAQ />
    </>
  );
};
