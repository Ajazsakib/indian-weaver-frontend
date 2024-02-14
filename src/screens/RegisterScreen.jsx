import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../slices/usersApiSlice';
import { registrationSchema } from '../utils/validationSchema';
import * as yup from 'yup';
const RegisterScreen = () =>
{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [register, { isLoading }] = useRegisterMutation();

  const userInfo = useSelector((state) => state.user);


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
      await yup.reach(registrationSchema, name).validate(value);
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        await registrationSchema.validate(
          { name, email, password, confirmPassword },
          { abortEarly: false }
        );

        const resultAction = await dispatch(registerUser({ name, email, password }));

        console.log(resultAction, "resultAction>>>>>>")
        console.log(registerUser.fulfilled.match(resultAction), ">>>>>>>>>>>>>>>>>")

        if (registerUser.fulfilled.match(resultAction) && resultAction.payload) {
          // Only execute this block if registration was successful
          toast.success('Successfully Registered!!!');
          navigate('/login');
        } else {
          // Registration failed, handle accordingly
          console.error('Registration failed:', resultAction.error.message);
        }
      } catch (error) {
        if (error.message !== 'Registration error') {
          // Handle other validation errors
          const newFormErrors = {};
          error.inner.forEach((validationError) =>
          {
            newFormErrors[validationError.path] = validationError.message;
          });
          setFormErrors(newFormErrors);
        }
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
          ></Form.Control>
          {formErrors.name && <span className="error-color" variant="danger">{formErrors.name}</span>}
        </Form.Group>

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
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleBlur}
          ></Form.Control>
          {formErrors.confirmPassword && <span className="error-color" variant="danger">{formErrors.confirmPassword}</span>}

        </Form.Group>

        <Button disabled={false} type='submit' variant='primary'>
          Register
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
