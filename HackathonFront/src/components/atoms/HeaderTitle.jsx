
function HeaderTitle({ children, className }) {
    return (
        <h1 className={`text-3xl md:text-4xl font-serif ${className}`}>
            {children}
        </h1>
    );
}

export default HeaderTitle;
