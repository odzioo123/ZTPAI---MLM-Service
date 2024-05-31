'use client';

import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "../../ui/sales/table";
import AddSaleForm, { SaleInput } from "../../ui/sales/add-sale-form";
import TopBar from "../../ui/components/top-bar";

const SalesPage = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [showAddSaleForm, setShowAddSaleForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:8080/sales', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSales(data);
                } else {
                    console.error('Failed to fetch sales data');
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSales();
    }, []);

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
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            console.error('Error adding sale:', error);
        }
    };

    return (
        <div className="p-6">
            <TopBar title="Sales Management" />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <button className="btn-green mb-4" onClick={() => setShowAddSaleForm(true)}>Add Sale</button>
            <SalesTable sales={sales} onDelete={deleteSale} />
            {showAddSaleForm && <AddSaleForm onAddSale={addSale} onCancel={() => setShowAddSaleForm(false)} />}
        </div>
    );
};

export default SalesPage;
