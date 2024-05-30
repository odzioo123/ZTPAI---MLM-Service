'use client'

import React, { useEffect, useState } from "react";
import Table, { Client } from "../../ui/clients/table";
import AddClientForm from "../../ui/clients/add-client-form";
import TopBar from "../../ui/components/top-bar";

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:8080/clients', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setClients(data);
                } else {
                    console.error('Failed to fetch clients data');
                }
            } catch (error) {
                console.error('Error fetching clients data:', error);
            }
        };

        fetchClients();
    }, []);

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
        </div>
    );
};

export default ClientsPage;