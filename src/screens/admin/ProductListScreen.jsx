import React, { useState, useEffect } from "react";
import { Button, Row, Col } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, deleteProducts, showProductData } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import AddProductPopup from './AddProductPopup';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';

const ProductListScreen = () =>
{
    const dispatch = useDispatch();
    const [showAddProductForm, setShowAddProductFrom] = useState(false);

    const data = useSelector((state) => state.product.products);

    console.log("data=========>", data?.products);



    const deleteHandler = async (id) =>
    {
        if (window.confirm('Are you sure')) {
            try {
                await dispatch(deleteProducts(id));
                dispatch(fetchProducts());
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async (data) =>
    {
        try {
            dispatch(createProduct(data));
            await dispatch(fetchProducts());
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };




    const showProductDataHandler = async (product) =>
    {

        try {
            dispatch(showProductData(product));
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    };

    useEffect(() =>
    {
        dispatch(fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {showAddProductForm && <AddProductPopup setShowAddProductFrom={setShowAddProductFrom} createProductHandler={createProductHandler} />}

            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={() => setShowAddProductFrom(true)}>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>

            {data.loading ? (
                <Loader />
            ) : data.error ? (
                <Message variant='danger'>{data.error.data.message}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data?.products && data?.products.length > 0 && data?.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2' onClick={() =>
                                            {
                                                showProductDataHandler(product)
                                            }}>
                                                {/* <FaEdit /> */}EDIT
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default ProductListScreen;
