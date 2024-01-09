import React from "react";

const Button = ({ label }: { label: string }) => {
  return (
    <button className="bg-primary-moderateBlue hover:bg-primary-lightGrayishBlue text-neutral-White rounded-lg w-32 h-12">
      {label}
    </button>
  );
};

export default Button;
