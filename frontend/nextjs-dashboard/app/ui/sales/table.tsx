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

type SortConfig = {
    key: keyof Sale | 'product.name' | 'client.name' | 'price';
    direction: 'asc' | 'desc';
};

const SalesTable: React.FC<TableProps> = ({ sales, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const sortedSales = React.useMemo(() => {
        if (!sortConfig) return sales;

        const sorted = [...sales];
        sorted.sort((a, b) => {
            let aValue: any = a;
            let bValue: any = b;

            if (sortConfig.key.includes('.')) {
                const keys = sortConfig.key.split('.');
                keys.forEach(key => {
                    aValue = aValue[key];
                    bValue = bValue[key];
                });
            } else if (sortConfig.key === 'price') {
                aValue = a.quantity * a.product.price * (1 - a.client.discount / 100);
                bValue = b.quantity * b.product.price * (1 - b.client.discount / 100);
            } else {
                aValue = a[sortConfig.key as keyof Sale];
                bValue = b[sortConfig.key as keyof Sale];
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [sales, sortConfig]);

    const handleSort = (key: SortConfig['key']) => {
        setSortConfig((prev) => {
            if (prev && prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const handleDeleteConfirm = (saleId: number) => {
        onDelete(saleId);
        setConfirmDelete(null);
    };

    // Sort direction indicators
    const getSortIndicator = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-xs md:text-lg">
                <thead>
                <tr className="bg-green-200 md:bg-gray-200">
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('client.name')}
                    >
                        Client Name {getSortIndicator('client.name')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('product.name')}
                    >
                        Product {getSortIndicator('product.name')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('quantity')}
                    >
                        Quantity {getSortIndicator('quantity')}
                    </th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('date')}
                    >
                        Date {getSortIndicator('date')}
                    </th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Note</th>
                    <th
                        className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 cursor-pointer"
                        onClick={() => handleSort('price')}
                    >
                        Price {getSortIndicator('price')}
                    </th>
                    <th className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedSales.map((sale) => {
                    const totalPrice = (
                        sale.quantity * sale.product.price * (1 - sale.client.discount / 100)
                    ).toFixed(2);
                    return (
                        <tr key={sale.id}>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                {sale.client.name} {sale.client.surname}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                {sale.product.name}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                {sale.quantity}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                {new Date(sale.date).toLocaleString()}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                {sale.note}
                            </td>
                            <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">
                                {totalPrice}
                            </td>
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
