import React from "react";

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

    const handleDelete = (productId: number) => {
        if (isAdmin) {
            onDelete(productId);
        }
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
                    {isAdmin && <th className="border border-gray-300 px-4 py-2">Actions</th>}
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
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
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
