import React, { PropsWithChildren } from "react";

interface CardProps {
  customClass?: string;
}

const Card = (props: PropsWithChildren<CardProps>) => {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-lg ${props.customClass}`}>{props.children}</div>
  );
};

export default Card;
