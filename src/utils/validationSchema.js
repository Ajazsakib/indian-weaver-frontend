import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const authSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const shippingSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.number().required('postal code is required'),
    country: yup.string().required("Country is required")
});