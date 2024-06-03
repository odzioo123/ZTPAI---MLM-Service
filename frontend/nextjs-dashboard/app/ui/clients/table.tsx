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

const Table: React.FC<TableProps> = ({ clients, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    const handleDeleteConfirm = (clientId: number) => {
        onDelete(clientId);
        setConfirmDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-xs md:text-lg">
                <thead>
                <tr className="bg-green-200 md:bg-gray-200">
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Name</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Surname</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Discount</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Phone Number</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Email</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Date</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Note</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 w-20 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.name}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.surname}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.discount}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.phone_number}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.email}</td>
                        <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{client.date}</td>
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
                                                onClick={() => handleDeleteConfirm(client.id)}>
                                                Yes
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-4 hover:bg-gray-400"
                                                onClick={() => setConfirmDelete(null)}>
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