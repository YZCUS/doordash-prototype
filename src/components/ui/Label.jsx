import React from 'react';

// Label component placeholder
export const Label = ({ children, className = "", htmlFor, ...props }) => (
    // Added mb-1 for margin below label
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1 ${className}`} {...props}>
        {children}
    </label>
); 