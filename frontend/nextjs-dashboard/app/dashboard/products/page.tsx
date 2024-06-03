'use client';

import React, { useEffect, useState } from "react";
import ProductsTable, { Product } from "../../ui/products/table";
import AddProductForm, { ProductInput } from "../../ui/products/add-product-form";
import TopBar from "../../ui/components/top-bar";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/products?page=${page}&size=${size}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    console.error('Failed to fetch products data');
                }
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        };

        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.role);
        }

        fetchProducts();
    }, [page, size]);

    const deleteProduct = async (productId: number) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setProducts(products.filter(product => product.id !== productId));
                setErrorMessage(null);
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const addProduct = async (newProduct: ProductInput): Promise<void> => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/products-add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (response.ok) {
                const createdProduct = await response.json();
                setProducts([...products, createdProduct]);
                setShowAddProductForm(false);
                setErrorMessage(null);
            } else {
                const errorData = await response.text();
                setErrorMessage(errorData);
            }
        } catch (error) {
            console.error('Error adding product:', error);
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
            <TopBar title="Product Management" />
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            {userRole === 'Admin' && (
                <button className="btn-green mb-4" onClick={() => setShowAddProductForm(true)}>Add Product</button>
            )}
            <ProductsTable products={products} onDelete={deleteProduct} userRole={userRole} />
            {showAddProductForm && <AddProductForm onAddProduct={addProduct} onCancel={() => setShowAddProductForm(false)} />}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <label htmlFor="pageSize" className="mr-2">Page size:</label>
                    <select id="pageSize" value={size} onChange={e => handleSizeChange(Number(e.target.value))}>
                        <option value={5}>5</option>
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

export default ProductsPage;
