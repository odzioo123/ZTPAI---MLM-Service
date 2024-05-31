import React, { useState, useEffect } from "react";

export interface SaleInput {
    quantity: number;
    note: string | null;
    product: { id: number };
    client: { id: number };
}

interface AddSaleFormProps {
    onAddSale: (newSale: SaleInput) => Promise<void>;
    onCancel: () => void;
}

const AddSaleForm: React.FC<AddSaleFormProps> = ({ onAddSale, onCancel }) => {
    const [newSale, setNewSale] = useState<SaleInput>({
        quantity: 0,
        note: null,
        product: { id: 0 },
        client: { id: 0 },
    });

    const [products, setProducts] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const productResponse = await fetch('http://localhost:8080/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const clientResponse = await fetch('http://localhost:8080/clients', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const productData = await productResponse.json();
            const clientData = await clientResponse.json();
            setProducts(productData);
            setClients(clientData);
        };

        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSale(prevSale => ({
            ...prevSale,
            [name]: name === "quantity" ? Number(value) : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSale(prevSale => ({
            ...prevSale,
            [name]: { id: Number(value) },
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddSale(newSale);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCancel}>&times;</span>
                <h2>Add Sale</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product:</label>
                        <select name="product" value={newSale.product.id} onChange={handleSelectChange} required>
                            <option value="" disabled>Select Product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Client:</label>
                        <select name="client" value={newSale.client.id} onChange={handleSelectChange} required>
                            <option value="" disabled>Select Client</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name} {client.surname}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input type="number" name="quantity" value={newSale.quantity} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Note:</label>
                        <textarea name="note" value={newSale.note || ''} onChange={handleChange} />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="btn-green">Submit</button>
                        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSaleForm;