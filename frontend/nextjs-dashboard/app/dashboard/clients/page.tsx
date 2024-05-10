'use client';

import React, { useEffect, useState } from "react";
import Table, {Client} from "../../ui/clients/table";

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);

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
            const response = await fetch(`http://localhost:8080/clients/${clientId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setClients(clients.filter(client => client.id !== clientId));
            } else {
                console.error('Failed to delete client');
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    return <Table clients={clients} onDelete={deleteClient} />;
};

export default ClientsPage;
