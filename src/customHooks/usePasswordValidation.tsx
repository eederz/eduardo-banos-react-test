import { useState, useEffect } from 'react';

const usePasswordValidation = (password: string) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const validatePassword = (password: string): { [key: string]: string } => {
            const errors: { [key: string]: string } = {};
            const minLength = 6;
            const maxLength = 12;
            const uppercase = /[A-Z]/;
            const lowercase = /[a-z]/;
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
            const number = /\d/;

            if (password.length < minLength) {
                errors.length = `La contraseña debe tener al menos ${minLength} caracteres.`;
            }
            if (password.length > maxLength) {
                errors.length = `La contraseña no debe tener más de ${maxLength} caracteres.`;
            }
            if (!uppercase.test(password)) {
                errors.uppercase = "La contraseña debe contener al menos una letra mayúscula.";
            }
            if (!lowercase.test(password)) {
                errors.lowercase = "La contraseña debe contener al menos una letra minúscula.";
            }
            if (!specialChar.test(password)) {
                errors.specialChar = "La contraseña debe contener al menos un carácter especial.";
            }
            if (!number.test(password)) {
                errors.number = "La contraseña debe contener al menos un número.";
            }

            return errors;
        };

        const validationErrors = validatePassword(password);
        setErrors(validationErrors);
    }, [password]); // Se ejecuta cada vez que cambia la contraseña

    return errors;
};

export default usePasswordValidation;
