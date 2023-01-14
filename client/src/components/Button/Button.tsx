import React from "react";

interface ButtonProps {
  filling: string;
  lightness: "200";
  type?: "button" | "submit" | "reset";
  handleOnClick?: () => void;
  customClass?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      onClick={props.handleOnClick}
      className={`flex items-center rounded-full h-10 px-4 shadow-md active:shadow-inner bg-violet-${props.lightness} ${props.customClass}`}
    >
      {props.filling}
    </button>
  );
};

export default Button;
