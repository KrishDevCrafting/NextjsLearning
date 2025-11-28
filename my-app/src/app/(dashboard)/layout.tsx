import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">Logo</h1>
          </div>
          <div>
            <ul className="flex space-x-8">
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium transition">
                Logo
              </li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium transition">
                FAQ
              </li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium transition">
                Service
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default layout;
