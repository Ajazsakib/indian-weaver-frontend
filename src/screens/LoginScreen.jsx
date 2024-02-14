import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';

import { toast } from 'react-toastify';
import { loginUser } from '../slices/usersApiSlice';
import { authSchema } from '../utils/validationSchema';
import * as yup from "yup";
const LoginScreen = () =>
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user)



  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() =>
  {
    if (userInfo.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, redirect, userInfo]);


  const handleBlur = async (e) =>
  {
    const { name, value } = e.target;

    try {
      await yup.reach(authSchema, name).validate(value);
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    } catch (error) {
      setFormErrors({
        ...formErrors,
        [name]: error.message,
      });
    }
  };


  const submitHandler = async (e) =>
  {
    e.preventDefault();
    setLoading(true)
    setTimeout(() =>
    {
      try {
        authSchema.validate({ email, password }, { abortEarly: false }).then(() =>
        {
          dispatch(loginUser({ email, password }))
          navigate(redirect);
        }).catch((error) =>
        {
          const newFormErrors = {};
          error.inner.forEach((validationError) =>
          {
            newFormErrors[validationError.path] = validationError.message;
          });
          setFormErrors(newFormErrors);
        })
        setLoading(false)

      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }, 1500)

  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
          ></Form.Control>
          {formErrors.email && <span className="error-color" variant="danger">{formErrors.email}</span>}
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlur}
          ></Form.Control>
          {formErrors.password && <span className="error-color" variant="danger">{formErrors.password}</span>}
        </Form.Group>

        <Button className="w-100px" disabled={false} type='submit' variant='primary'>
          {loading ? <Spinner animation="border" size="sm" ></Spinner> : "Sign In"}
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
