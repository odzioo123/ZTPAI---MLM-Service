'use client';

import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "../../ui/sales/table";
import TopBar from "../../ui/components/top-bar";

const SalesPage = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.role);
        }

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

    return (
        <div className="p-6">
            <TopBar title="Sales Management" />
            <SalesTable sales={sales} onDelete={deleteSale}/>
        </div>
    );
};

export default SalesPage;
