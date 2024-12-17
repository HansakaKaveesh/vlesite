export default function SelectInput({
    id,
    label,
    value,
    onChange = () => {},
    options,
    name,
    required = true,
}) {
    return (
        <div className="mb-4">
            <label className="block text-white mb-1" htmlFor={id}>
                {label}
            </label>
            <select
                className="w-full p-2 rounded bg-blue-400 text-white"
                id={id}
                name={name || id} // Default to id if name is not provided
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
