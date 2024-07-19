"use client";

import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ClipLoader color="#2f9e44" />
    </div>
  );
};
export default Spinner;
