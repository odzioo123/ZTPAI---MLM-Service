import React, { useState } from "react";

export interface ProductInput {
    name: string;
    code: string;
    price: number;
    points: number;
}

interface AddProductFormProps {
    onAddProduct: (newProduct: ProductInput) => Promise<void>;
    onCancel: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, onCancel }) => {
    const [newProduct, setNewProduct] = useState<ProductInput>({
        name: '',
        code: '',
        price: 0,
        points: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === "price" || name === "points" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddProduct(newProduct);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCancel}>&times;</span>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Code:</label>
                        <input type="text" name="code" value={newProduct.code} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" name="price" value={newProduct.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Points:</label>
                        <input type="number" name="points" value={newProduct.points} onChange={handleChange} required />
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

export default AddProductForm;