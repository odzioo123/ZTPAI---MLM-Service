import React from 'react';

const TopBar: React.FC<{ title: string }> = ({ title }) => (
    <div className="bg-green-600 text-white p-6 rounded-md mb-4">
        <h1 className="text-3xl">{title}</h1>
    </div>
);

export default TopBar;