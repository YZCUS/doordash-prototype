import React from 'react';

export const Switch = ({ checked, onCheckedChange, ...props }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${checked ? 'bg-red-500' : 'bg-gray-300'
            }`}
        {...props}
    >
        <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                }`}
        />
    </button>
); 