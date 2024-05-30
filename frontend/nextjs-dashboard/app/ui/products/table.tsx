import React, { useState } from "react";

export interface Product {
    id: number;
    code: number;
    name: string;
    price: number;
    points: number;
}

interface TableProps {
    products: Product[];
    onDelete: (productId: number) => void;
    userRole: string | null;
}

const ProductsTable: React.FC<TableProps> = ({ products, onDelete, userRole }) => {
    const isAdmin = userRole === "Admin";
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    const handleDeleteConfirm = (productId: number) => {
        onDelete(productId);
        setConfirmDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Code</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Points</th>
                    {isAdmin && <th className="border border-gray-300 px-4 py-2 w-24 text-center">Actions</th>}
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className="border border-gray-300 px-4 py-2">{product.code}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                        <td className="border border-gray-300 px-4 py-2">{product.points}</td>
                        {isAdmin && (
                            <td className="border border-gray-300 px-2 py-2 w-24 text-center">
                                <div className="flex justify-center">
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => setConfirmDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                {confirmDelete === product.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                        <div className="bg-white p-4 rounded-md">
                                            <p>Are you sure you want to delete this product?</p>
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md mr-4 ml-2 hover:bg-red-600"
                                                    onClick={() => handleDeleteConfirm(product.id)}
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
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
