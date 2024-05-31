import React, { useState } from "react";

export interface Client {
    name: string;
    surname: string;
    discount: number;
    phone_number: string | null;
    email: string | null;
    date: string;
    note: string | null;
}

interface AddClientFormProps {
    onAddClient: (newClient: Omit<Client, 'id'>) => Promise<void>;
    onCancel: () => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onAddClient, onCancel }) => {
    const [newClient, setNewClient] = useState<Client>({
        name: '',
        surname: '',
        discount: 0,
        phone_number: null,
        email: null,
        date: '',
        note: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (newClient.discount < 0 || newClient.discount > 49) {
            newErrors.discount = "Discount must be between 1 and 49";
        }

        if (newClient.phone_number && !/^\d{9}$/.test(newClient.phone_number)) {
            newErrors.phone_number = "Phone number must be a 9-digit number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewClient(prevClient => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            onAddClient(newClient);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCancel}>&times;</span>
                <h2>Add Client</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={newClient.name} onChange={handleChange} required />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Surname:</label>
                        <input type="text" name="surname" value={newClient.surname} onChange={handleChange} />
                        {errors.surname && <span className="error">{errors.surname}</span>}
                    </div>
                    <div className="form-group">
                        <label>Discount:</label>
                        <input type="number" name="discount" value={newClient.discount} onChange={handleChange} />
                        {errors.discount && <span className="error">{errors.discount}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={newClient.email || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="tel" name="phone_number" value={newClient.phone_number || ''} onChange={handleChange} />
                        {errors.phone_number && <span className="error">{errors.phone_number}</span>}
                    </div>
                    <div className="form-group">
                        <label>Note:</label>
                        <textarea name="note" value={newClient.note || ''} onChange={handleChange} />
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

export default AddClientForm;
