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
                Home
              </li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium transition">
                General
              </li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer font-medium transition">
                Feedback!
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

// gpu