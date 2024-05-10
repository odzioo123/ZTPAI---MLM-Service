'use client';

import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "../../ui/sales/table";

const SalesPage = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('http://localhost:8080/sales');
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
            const response = await fetch(`http://localhost:8080/sales/${saleId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // If the deletion was successful, update the sales state
                setSales(sales.filter(sale => sale.id !== saleId));
            } else {
                console.error('Failed to delete sale');
            }
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    return <SalesTable sales={sales} onDelete={deleteSale} />;
};

export default SalesPage;
