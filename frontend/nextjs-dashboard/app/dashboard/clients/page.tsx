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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem("token");

                const url = new URL(`http://localhost:8080/clients`);
                url.searchParams.append('page', String(page));
                url.searchParams.append('size', String(size));

                if (searchTerm) {
                    url.searchParams.append('searchTerm', searchTerm);
                }

                if (startDate) {
                    const fromDateObj = new Date(startDate);
                    url.searchParams.append('startDate', fromDateObj.toISOString().split('T')[0]);
                }
                if (endDate) {
                    const toDateObj = new Date(endDate);
                    url.searchParams.append('endDate', toDateObj.toISOString().split('T')[0]);
                }

                const response = await fetch(url.toString(), {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setClients(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    console.error('Failed to fetch clients data', response.status);
                }
            } catch (error) {
                console.error('Error fetching clients data:', error);
            }
        };

        fetchClients();
    }, [page, size, searchTerm, startDate, endDate]);

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
        setPage(0);
    };

    return (
        <div className="p-2 md: p-5">
            <TopBar title="Client Management" />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <button className="btn-green mb-4" onClick={() => setShowAddClientForm(true)}>Add Client</button>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, surname, phone, email, or note"
                    className="input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor="startDate" className="ml-4 mr-2">From:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate || ""}
                    onChange={e => setStartDate(e.target.value || null)}
                    className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <label htmlFor="endDate" className="ml-4 mr-2">To:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate || ""}
                    onChange={e => setEndDate(e.target.value || null)}
                    className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
            </div>

            <Table clients={clients} onDelete={deleteClient} />
            {showAddClientForm && <AddClientForm onAddClient={addClient} onCancel={() => setShowAddClientForm(false)} />}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <label htmlFor="pageSize" className="mr-2">Page size:</label>
                    <select id="pageSize" value={size} onChange={e => handleSizeChange(Number(e.target.value))}>
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

export default ClientsPage;
