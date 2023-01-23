import React, { PropsWithChildren } from "react";

interface ButtonProps {
  lightness: "0" | "50" | "100" | "200" | "300" | "400" | "500" | "600";
  circle: boolean;
  type?: "button" | "submit" | "reset";
  handleOnClick?: () => void;
  customClass?: string;
  disabled?: boolean;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={props.handleOnClick}
      className={`flex justify-center items-center rounded-full h-10 ${
        props.circle ? "w-10" : "px-4"
      } shadow-md active:shadow-inner bg-violet-${props.lightness} ${
        props.customClass
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
