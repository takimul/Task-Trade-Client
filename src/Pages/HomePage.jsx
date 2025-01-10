import React from "react";
import PopularServices from "../Components/PopularServices";
import SpecialOffer from "../Components/SpecialOffer";

import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import ReviewList from "../Components/ReviewList";
import ReviewForm from "../Components/ReviewForm";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home - TaskTrade</title>
      </Helmet>{" "}
      <div>
        <div
          className="relative h-96 lg:h-[480px] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/wzd5YG7/repairman-working-on-radiator-wrench-260nw-1712669488.webp')",
          }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white bg-opacity-50 backdrop-blur-sm p-16 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome to TaskTrade
              </h1>
              <p className="text-gray-700">
                Your one-stop platform for seamless service exchanges.
              </p>
            </div>
          </div>
        </div>

        <motion.h1
          className="text-center mt-6 text-2xl font-bold"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to Home
        </motion.h1>
        <div className="px-6">
          <PopularServices></PopularServices>
        </div>
        <div>
          <SpecialOffer></SpecialOffer>
        </div>

        <div>
          <ReviewList></ReviewList>
        </div>
        <div>
          <ReviewForm></ReviewForm>
        </div>
      </div>
    </>
  );
};

export default HomePage;
