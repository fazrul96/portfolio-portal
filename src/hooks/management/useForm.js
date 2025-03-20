import {useState} from 'react';
import useCookieStorage from "../useCookieStorage";

// Define your form validation schema (you can make this dynamic or more complex)
// const validationSchema = {
//     nric: (value) => {
//         return value && !/^\d{9}[A-Z]$/.test(value) ? 'Invalid NRIC format' : '';
//     },
//     name: (value) => {
//         return value && value.length < 3 ? 'Name must be at least 3 characters' : '';
//     },
// };
//
// // Using the useForm hook
// const { formData, formError, handleInputChange, clearForm, setFormError } = useForm({
//     initialValues,
//     validationSchema,
//     t: (key) => key,  // Assuming translation is a simple pass-through for now
//     formKey: 'myFormKey'  // Unique key for cookie storage (use a unique identifier for each form)
// });

const useForm = ({ initialValues, fields, validationSchema, t, formKey }) => {
    const [formData, setFormData] = useCookieStorage(formKey, initialValues);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Apply field-specific validations
        if (validationSchema[name]) {
            const errorMessage = validationSchema[name](value);
            setFormError(errorMessage || '');
        }
    };

    const clearForm = () => {
        setFormData(initialValues);
        setFormError('');
    };

    return { formData, formError, handleInputChange, clearForm, setFormError };
};

export default useForm;