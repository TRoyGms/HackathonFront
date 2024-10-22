
function Button({ onClick, type = 'button', children, className }) {
  return (
    <button onClick={onClick} type={type} className={`py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
}

export default Button;