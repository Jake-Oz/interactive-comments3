import React from "react";

const Button = ({ label }: { label: string }) => {
  return (
    <button className="bg-primary-moderateBlue hover:bg-primary-lightGrayishBlue text-neutral-White rounded-lg min-w-24 h-10 sm:min-w-32 sm:h-12">
      {label}
    </button>
  );
};

export default Button;
