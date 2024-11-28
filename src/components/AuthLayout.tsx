import React from "react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
