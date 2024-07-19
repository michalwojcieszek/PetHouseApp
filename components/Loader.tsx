"use client";

import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <ClipLoader color="#2f9e44" size={100} />
    </div>
  );
};
export default Loader;
