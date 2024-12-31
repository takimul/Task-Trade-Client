import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        loading ? "block" : "hidden"
      }`}
    >
      <ClipLoader color="#00bfff" size={50} loading={loading} />
    </div>
  );
};

export default Loader;
