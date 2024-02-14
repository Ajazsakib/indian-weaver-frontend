import React, { useState } from 'react';
import { Form } from 'react-bootstrap';


const AddProductPopup = ({ setShowAddProductFrom, createProductHandler }) =>
{



    const [formState, setFormState] = useState({
        name: "",
        image: "",
        description: "",
        brand: "",
        category: "",
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0
    })





    const handleChange = (e) =>
    {
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        console.log(formState)
        createProductHandler(formState)

        setShowAddProductFrom(false)
    }


    return (
        <div className='add-product-popup'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Product Title" name="name" value={formState.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>image</Form.Label>
                    <Form.Control type="text" placeholder="Product Price" name="image" value={formState.image} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>description</Form.Label>
                    <Form.Control as="textarea" placeholder="descriptionL" name="description" value={formState.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Brand Name" name="brand" value={formState.brand} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Category" name="category" value={formState.category} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="">
                    <Form.Label>price</Form.Label>
                    <Form.Control typw="number" placeholder="price" name="price" value={formState.price} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="">
                    <Form.Label>countInStock</Form.Label>
                    <Form.Control type="number" placeholder="countInStock" name="countInStock" value={formState.countInStock} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="">
                    <Form.Label>rating</Form.Label>
                    <Form.Control type="number" placeholder="rating" name="rating" value={formState.rating} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="">
                    <Form.Label>numReviews</Form.Label>
                    <Form.Control type="number" placeholder="numReviews" name="numReviews" value={formState.numReviews} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="">
                    <input type="submit" className="btn btn-primary btn-add-product" value="Submit" />
                </Form.Group>
            </Form>
            <span className="material-symbols-outlined close-icon" onClick={(e) =>
            {
                setShowAddProductFrom(false)
            }}>
                close
            </span>
        </div>
    )
}

export default AddProductPopup
