import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';
import { shippingSchema } from '../utils/validationSchema';
const ShippingScreen = () =>
{
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const [formErrors, setFormErrors] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) =>
  {
    e.preventDefault();
    shippingSchema.validate({ address, city, postalCode, country }, { abortEarly: false }).then(() =>
    {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate('/payment');
    }).catch((error) =>
    {
      const newFormErrors = {};
      error.inner.forEach((validationError) =>
      {
        newFormErrors[validationError.path] = validationError.message;
      });
      setFormErrors(newFormErrors);
    })

  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            name="address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
          {formErrors.address && <span className="error-color" variant="danger">{formErrors.address}</span>}
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            name="city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
          {formErrors.city && <span className="error-color" variant="danger">{formErrors.city}</span>}
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            name="postalCode"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
          {formErrors.postalCode && <span className="error-color" variant="danger">{formErrors.postalCode}</span>}
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            name="country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
          {formErrors.country && <span className="error-color" variant="danger">{formErrors.country}</span>}
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
