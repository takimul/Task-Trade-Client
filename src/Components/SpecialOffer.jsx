import React from "react";
import { motion } from "framer-motion";

const SpecialOffer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg p-6 md:p-10 text-white">
      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3.8 }}
      >
        <img
          src={
            "https://i.ibb.co.com/mS87xwk/sale-offer-label-banner-discount-offer-promotion-157027-1250.jpg"
          }
          alt="Special Offer"
          className="rounded-lg shadow-md object-cover w-full h-64 md:h-full"
        />
      </motion.div>

      {/* Offer Description Section */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center mt-6 md:mt-0 md:pl-8"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 3.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Book Your First Service Now
        </h2>
        <p className="text-lg md:text-xl mb-6">
          {" "}
          50% Discount on Cash on Delivery
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-purple-700 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-purple-100 transition"
        >
          Grab This Deal
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SpecialOffer;
