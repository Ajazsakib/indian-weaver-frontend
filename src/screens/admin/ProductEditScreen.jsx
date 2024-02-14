import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateProduct } from '../../slices/productsApiSlice';
const ProductEditScreen = () =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productData = useSelector((state) =>
    {
        return state.product.productToUpdate
    })

    console.log("productData>>>>>>>>>", productData)

    const { id: productId } = useParams();
    console.log("productId>>>>>>>>>", productId)

    const [name, setName] = useState(productData.name || "");
    const [price, setPrice] = useState(productData.price || 0);
    const [image, setImage] = useState(productData.image || "");
    const [brand, setBrand] = useState(productData.brand || "");
    const [category, setCategory] = useState(productData.category || "");
    const [countInStock, setCountInStock] = useState(productData.countInStock || 0);
    const [description, setDescription] = useState(productData.description || "");



    const updateProductHandler = (e) =>
    {
        e.preventDefault();
        let dataToUpdate = { productId, name, price, image, brand, category, countInStock, description };
        try {
            dispatch(updateProduct(dataToUpdate, { productId }));
            navigate("/admin/productlist");
        } catch (err) {
            console.log(err);
        }
    };

    // const uploadFileHandler = async (e) =>
    // {
    //     const formData = new FormData();
    //     formData.append('image', e.target.files[0]);
    //     try {
    //         const res = await uploadProductImage(formData).unwrap();
    //         toast.success(res.message);
    //         setImage(res.image);
    //     } catch (err) {
    //         toast.error(err?.data?.message || err.error);
    //     }
    // };

    let isLoading = false;
    let error = false

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {/* {loadingUpdate && <Loader />} */}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error.data.message}</Message>
                ) : (
                    <Form onSubmit={updateProductHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                label='Choose File'
                                // onChange={uploadFileHandler}
                                type='file'
                            ></Form.Control>
                            {/* {loadingUpload && <Loader />} */}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='primary'
                            style={{ marginTop: '1rem' }}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
