import React from 'react';

export const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none";
  let variantStyle = "";
  let sizeStyle = "";

  switch (variant) {
    case "outline":
      variantStyle = "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500";
      break;
    case "ghost":
      variantStyle = "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-indigo-500";
      break;
    case "destructive":
      variantStyle = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case "link":
      variantStyle = "text-red-600 underline-offset-4 hover:underline focus:ring-red-500 p-0"; // Adjusted padding for link
      break;
    case "success": // Added success variant
      variantStyle = "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500";
      break;
    default: // default
      variantStyle = "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";
  }

  switch (size) {
    case "sm":
      sizeStyle = "h-9 px-3";
      break;
    case "xs":
      sizeStyle = "h-8 px-2 text-xs";
      break;
    case "lg":
      sizeStyle = "h-11 px-8";
      break;
    case "icon":
      sizeStyle = "h-10 w-10";
      break;
    default: // default
      sizeStyle = "h-10 px-4 py-2";
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
