import React, { useState } from "react";

export interface Sale {
    id: number;
    quantity: number;
    date: string;
    note: string | null;
    product: {
        id: number;
        name: string;
        price: number;
    };
    client: {
        id: number;
        name: string;
        surname: string;
        discount: number;
    };
}

interface TableProps {
    sales: Sale[];
    onDelete: (saleId: number) => void;
}

const SalesTable: React.FC<TableProps> = ({ sales, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    const handleDeleteConfirm = (saleId: number) => {
        onDelete(saleId);
        setConfirmDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-xs md:text-lg">
                <thead>
                <tr className="bg-green-200 md:bg-gray-200">
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Client Name</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Product</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Quantity</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Date</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Note</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Price</th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale) => {
                    // Calculate price with discount
                    const totalPrice = (sale.quantity * sale.product.price * (1 - sale.client.discount / 100)).toFixed(2);
                    return (
                        <tr key={sale.id}>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{sale.client.name} {sale.client.surname}</td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{sale.product.name}</td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{sale.quantity}</td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{sale.date}</td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{sale.note}</td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{totalPrice}</td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                <div className="flex justify-center">
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => setConfirmDelete(sale.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                {confirmDelete === sale.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-4 rounded-md">
                                            <p>Are you sure you want to delete this sale?</p>
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md mr-4 ml-2 hover:bg-red-600"
                                                    onClick={() => handleDeleteConfirm(sale.id)}
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
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
