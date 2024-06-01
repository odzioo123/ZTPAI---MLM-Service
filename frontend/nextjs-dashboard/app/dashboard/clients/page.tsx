'use client'

import React, { useEffect, useState } from "react";
import Table, { Client } from "../../ui/clients/table";
import AddClientForm from "../../ui/clients/add-client-form";
import TopBar from "../../ui/components/top-bar";

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/clients?page=${page}&size=${size}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setClients(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    console.error('Failed to fetch clients data');
                }
            } catch (error) {
                console.error('Error fetching clients data:', error);
            }
        };

        fetchClients();
    }, [page, size]);

    const deleteClient = async (clientId: number) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/clients/${clientId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setClients(clients.filter(client => client.id !== clientId));
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const addClient = async (newClient: Omit<Client, 'id'>): Promise<void> =>  {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/clients-add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });
            if (response.ok) {
                const createdClient = await response.json();
                if ('id' in createdClient) {
                    setClients([...clients, createdClient]);
                } else {
                    console.error('Error: The id property is missing in the created client');
                }
                setShowAddClientForm(false);
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSizeChange = (newSize: number) => {
        setSize(newSize);
        setPage(0); // reset to first page whenever page size changes
    };

    return (
        <div className="p-6">
            <TopBar title="Client Management" />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <button className="btn-green mb-4" onClick={() => setShowAddClientForm(true)}>Add Client</button>
            <Table clients={clients} onDelete={deleteClient} />
            {showAddClientForm && <AddClientForm onAddClient={addClient} onCancel={() => setShowAddClientForm(false)} />}
            <div className="flex justify-between items-center mt-4">
                <div>
                    <label htmlFor="pageSize" className="mr-2">Page size:</label>
                    <select id="pageSize" value={size} onChange={e => handleSizeChange(Number(e.target.value))}>
                        <option value={2}>2</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div>
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

export default ClientsPage;