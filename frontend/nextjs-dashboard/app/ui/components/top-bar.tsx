import React from 'react';

const TopBar: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-green-600 text-white p-4 rounded-md mb-4 shadow-md hidden md:block">
        <h1 className="text-2xl">{title}</h1>
    </div>
);

export default TopBar;