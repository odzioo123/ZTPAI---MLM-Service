'use client';

import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "../../ui/sales/table";
import AddSaleForm, { SaleInput } from "../../ui/sales/add-sale-form";
import TopBar from "../../ui/components/top-bar";

const SalesPage = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [showAddSaleForm, setShowAddSaleForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [productName, setProductName] = useState("");
    const [clientName, setClientName] = useState("");

    const fetchSales = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = new URL(`http://localhost:8080/sales`);
            url.searchParams.append('page', String(page));
            url.searchParams.append('size', String(size));
            if (productName) url.searchParams.append('productName', productName);
            if (clientName) url.searchParams.append('clientName', clientName);
            const response = await fetch(url.toString(), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSales(data.content);
                setTotalPages(data.totalPages);
            } else {
                console.error('Failed to fetch sales data');
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };


    useEffect(() => {
        fetchSales();
    }, [page, size, productName, clientName]);

    const deleteSale = async (saleId: number) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/sales/${saleId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setSales(sales.filter(sale => sale.id !== saleId));
            } else {
                console.error('Failed to delete sale');
            }
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    const addSale = async (newSale: SaleInput): Promise<void> => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/sales-add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSale),
            });
            if (response.ok) {
                const createdSale = await response.json();
                setSales([...sales, createdSale]);
                setShowAddSaleForm(false);
                fetchSales();
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            console.error('Error adding sale:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSizeChange = (newSize: number) => {
        setSize(newSize);
        setPage(0);
    };

    return (
        <div className="p-2 md:p-5">
            <TopBar title="Sales Management" />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <button className="btn-green mb-4" onClick={() => setShowAddSaleForm(true)}>Add Sale</button>
            <div className="flex flex-wrap items-center mb-4">
                <div className="flex items-center mr-4">
                    <label htmlFor="clientName" className="mr-2">Client:</label>
                    <input
                        type="text"
                        id="clientName"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Search by client name"
                    />
                </div>
                <div className="flex items-center mr-4">
                    <label htmlFor="productName" className="mr-2">Product:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Search by product name"
                    />
                </div>
            </div>

            <SalesTable sales={sales} onDelete={deleteSale} />
            {showAddSaleForm && <AddSaleForm onAddSale={addSale} onCancel={() => setShowAddSaleForm(false)} />}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                <div className="flex items-center">
                    <label htmlFor="pageSize" className="mr-2">Page size:</label>
                    <select
                        id="pageSize"
                        value={size}
                        onChange={e => handleSizeChange(Number(e.target.value))}
                    >
                        <option value={2}>2</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 0}
                        className="btn"
                    >
                        Previous
                    </button>
                    <span className="mx-2">Page {page + 1} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;
