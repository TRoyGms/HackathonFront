
function Logo({ src, alt, className }) {
    return (
        <img src={src} alt={alt} className={`w-14 ${className}`} />
    );
}

export default Logo;
