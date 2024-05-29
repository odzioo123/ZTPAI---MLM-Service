'use client';

import React, { useEffect, useState } from "react";
import ProductsTable, { Product } from "../../ui/products/table";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.role);
        }

        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:8080/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products data');
                }
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        };

        fetchProducts();
    }, []);

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
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return <ProductsTable products={products} onDelete={deleteProduct} userRole={userRole} />;
};

export default ProductsPage;
