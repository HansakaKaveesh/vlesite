import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from 'prop-types';

export default function PasswordInput({
    id,
    label,
    value,
    onChange,
    placeholder = "Enter your password", // Default value directly in the function signature
    required = true // Default value directly in the function signature
}) {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="mb-4">
            <label className="block text-white mb-1" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <input
                    className="w-full p-2 rounded bg-blue-200 bg-opacity-20 text-white"
                    type={showPassword ? "text" : "password"}
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}  // Ensure the value is passed back to parent
                    placeholder={placeholder}
                    required={required}
                />
                <span
                    onClick={handlePasswordToggle}
                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
            </div>
        </div>
    );
}

PasswordInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

// No need for defaultProps now, defaults are handled in the function signature.
    