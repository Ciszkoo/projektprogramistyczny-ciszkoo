import React, { PropsWithChildren } from "react";

interface CardProps {
  customClass?: string;
  onHover?: () => void;
  onBlur?: () => void;
}

const Card = (props: PropsWithChildren<CardProps>) => {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-lg ${props.customClass}`} onPointerOver={props.onHover} onPointerLeave={props.onBlur} >{props.children}</div>
  );
};

export default Card;
