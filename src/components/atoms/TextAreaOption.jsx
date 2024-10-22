
export default function TextAreaOption({ name, value, onChange, required = false, className }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`mt-1 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
    ></textarea>
  );
}
