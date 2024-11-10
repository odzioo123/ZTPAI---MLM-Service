import React, { useState } from "react";

export interface Client {
    id: number;
    name: string;
    surname: string;
    discount: number;
    phone_number: string | null;
    email: string | null;
    date: string;
    note: string | null;
}

interface TableProps {
    clients: Client[];
    onDelete: (clientId: number) => void;
}

type SortConfig = {
    key: keyof Client;
    direction: 'asc' | 'desc';
};

const Table: React.FC<TableProps> = ({ clients, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const sortedClients = React.useMemo(() => {
        if (!sortConfig) return clients;

        const sorted = [...clients];
        sorted.sort((a, b) => {
            let aValue: any = a[sortConfig.key];
            let bValue: any = b[sortConfig.key];

            // Handle sorting for string and number
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [clients, sortConfig]);

    const handleSort = (key: keyof Client) => {
        setSortConfig((prev) => {
            if (prev && prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const getSortIndicator = (key: keyof Client) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    const handleDeleteConfirm = (clientId: number) => {
        onDelete(clientId);
        setConfirmDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-xs md:text-lg">
                <thead>
                <tr className="bg-green-200 md:bg-gray-200">
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('name')}
                    >
                        Name {getSortIndicator('name')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('surname')}
                    >
                        Surname {getSortIndicator('surname')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('discount')}
                    >
                        Discount {getSortIndicator('discount')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('phone_number')}
                    >
                        Phone Number {getSortIndicator('phone_number')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('email')}
                    >
                        Email {getSortIndicator('email')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('date')}
                    >
                        Date {getSortIndicator('date')}
                    </th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Note</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 w-20 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedClients.map((client) => (
                    <tr key={client.id}>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.name}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.surname}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.discount}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.phone_number}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.email}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                            {(new Date(client.date)).toLocaleString()}
                        </td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.note}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 w-20 text-center">
                            <div className="flex justify-center">
                                <button
                                    className="px-2 py-1 md:px-3 md:py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => setConfirmDelete(client.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            {confirmDelete === client.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white p-4 rounded-md">
                                        <p>Are you sure you want to delete this client?</p>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded-md mr-4 ml-2 hover:bg-red-600"
                                                onClick={() => handleDeleteConfirm(client.id)}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-4 hover:bg-gray-400"
                                                onClick={() => setConfirmDelete(null)}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;