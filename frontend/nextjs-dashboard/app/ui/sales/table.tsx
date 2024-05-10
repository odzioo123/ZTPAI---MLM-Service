import React from "react";

export interface Sale {
    id: number;
    quantity: number;
    date: string;
    note: string | null;
    product: {
        id: number;
        name: string;
        // Include other product properties as needed
    };
    client: {
        id: number;
        name: string;
        // Include other client properties as needed
    };
    // Include any other properties related to sales
}

interface TableProps {
    sales: Sale[];
    onDelete: (saleId: number) => void;
}

const SalesTable: React.FC<TableProps> = ({ sales, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Note</th>
                    <th className="border border-gray-300 px-4 py-2">Product</th>
                    <th className="border border-gray-300 px-4 py-2">Client</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale) => (
                    <tr key={sale.id}>
                        <td className="border border-gray-300 px-4 py-2">{sale.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{sale.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2">{sale.date}</td>
                        <td className="border border-gray-300 px-4 py-2">{sale.note}</td>
                        <td className="border border-gray-300 px-4 py-2">{sale.product.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{sale.client.name}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button onClick={() => onDelete(sale.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
