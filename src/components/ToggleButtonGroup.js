export default function ToggleButtonGroup({ label, options, selected, onToggle }) {
    return (
        <div className="mb-4">
            <label className="block text-white mb-1">{label}</label>
            <div className="flex gap-4">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button" // Ensures this button doesn't submit the form
                        onClick={(event) => {
                            event.preventDefault(); // Prevents page reload
                            onToggle(option);
                        }}
                        className={`px-4 py-2 w-32 h-12 rounded ${
                            selected.includes(option)
                                ? 'bg-yellow-300 text-black' // Selected style
                                : 'bg-blue-900 text-white' // Unselected style
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
