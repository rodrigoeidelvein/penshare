import React from "react";

interface IComponentProps {
  children: React.ReactNode;
}

const HomeContainer: React.FC<IComponentProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="mx-auto pt-9">{children}</div>
    </div>
  );
};

export default HomeContainer;
