import React from 'react';

export const Card = ({ children, className = "", ...props }) => (
    <div className={`border rounded-lg shadow-sm bg-white ${className}`} {...props}>
        {children}
    </div>
);

export const CardContent = ({ children, className = "", ...props }) => (
    <div className={`p-6 ${className}`} {...props}> {/* Increased padding for forms */}
        {children}
    </div>
);

// Placeholder for other Card components if needed (e.g., CardHeader, CardFooter)
export const CardHeader = ({ children, className = "", ...props }) => (
    <div className={`p-6 pb-0 ${className}`} {...props}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = "", ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

export const CardDescription = ({ children, className = "", ...props }) => (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
        {children}
    </p>
); 