export default function TextInput({ id, label, value, onChange, placeholder, type = "text", required = true }) {
    return (
        <div className="mb-4">
            <label className="block text-white mb-1" htmlFor={id}>{label}</label>
            <input
                className="w-full p-2 rounded bg-blue-200 bg-opacity-20 text-white"
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
