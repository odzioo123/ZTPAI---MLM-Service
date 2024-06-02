'use client'

import React, { useState, useEffect } from 'react';
import TopBar from '../../ui/components/top-bar';

const StatisticsPage = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const fetchData = async (endpoint: string) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/statistics/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const result = await response.json();
            setData(result);
        }
    };

    useEffect(() => {
        if (selectedOption) {
            fetchData(selectedOption);
        }
    }, [selectedOption]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setData(null);
    };

    return (
        <div className="p-6">
            <TopBar title="Statistics" />
            <div className="flex space-x-4 mb-6">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleOptionClick('best-clients')}
                >
                    Best Clients
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleOptionClick('clients-points')}
                >
                    Clients Points
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleOptionClick('monthly-profit')}
                >
                    Monthly Profit
                </button>
            </div>
            <div>
                {selectedOption === 'best-clients' && data && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Best Clients</h2>
                        <ul>
                            {data.map((clientData: any, index: number) => (
                                <li key={index}>
                                    {clientData.client.name} {clientData.client.surname} - Spent: ${clientData.totalSpent}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedOption === 'clients-points' && data && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Clients Points</h2>
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Points</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((clientData: any, index: number) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{clientData.client.name} {clientData.client.surname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{clientData.totalPoints}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {selectedOption === 'monthly-profit' && data && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Monthly Profit</h2>
                        <p>Total Profit: ${data.totalProfit}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatisticsPage;
