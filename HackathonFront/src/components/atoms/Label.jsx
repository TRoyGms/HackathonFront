
function Label({ text, htmlFor, children, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      <span className={` ${className}`} >{text || children}</span>
    </label>
  );
}

export default Label;

