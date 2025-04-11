import React from 'react';
import { Label } from './Label'; // Import Label for use within Checkbox

// Checkbox component placeholder (basic implementation)
export const Checkbox = ({ id, checked, onCheckedChange, children, className = "", ...props }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
        <button
            id={id}
            role="checkbox"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={`peer h-4 w-4 shrink-0 rounded-sm border border-red-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-red-500 text-white flex items-center justify-center' : 'bg-white'}`}
            {...props}
        >
            {/* Basic checkmark appearance */}
            {checked && <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </button>
        {children && <Label htmlFor={id} className="mb-0">{children}</Label>} {/* Removed bottom margin for checkbox label */}
    </div>
); 