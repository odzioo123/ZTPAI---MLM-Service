import React, { useState, useEffect } from "react";

export interface ProductInput {
    name: string;
    code: string;
    price: number;
    points: number;
    productTypeId: number;
}

export interface ProductType {
    id: number;
    type: string;
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
        productTypeId: 0,
    });

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/product-types`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProductTypes(data);
                } else {
                    console.error('Failed to fetch product types data');
                }
            } catch (error) {
                console.error('Error fetching product types data:', error);
            }
        };

        fetchProductTypes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
            ...prevProduct,
            [name]: name === "price" || name === "points" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedProductTypeId = Number(newProduct.productTypeId);
        const selectedProductType = productTypes.find(productType => productType.id === selectedProductTypeId);
        if (selectedProductType) {
            const updatedProduct = { ...newProduct, productType: [selectedProductType] };
            onAddProduct(updatedProduct);
        } else {
            console.error("Selected product type not found");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onCancel}>&times;</span>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit} style={{ fontSize: "0.8rem" }}>
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
                    <div className="form-group">
                        <label>Product Type:</label>
                        <select name="productTypeId" value={newProduct.productTypeId} onChange={handleChange} required>
                            <option value="">Select a product type</option>
                            {productTypes.map(productType => (
                                <option key={productType.id} value={productType.id}>{productType.type}</option>
                            ))}
                        </select>
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
