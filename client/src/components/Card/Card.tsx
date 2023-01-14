import React, { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-[80%] bg-white rounded-xl p-5 shadow-lg">{children}</div>
  );
};

export default Card;
