
function Image({ src, alt, className }) {
    return <img src={src} alt={alt} className={`w-24 h-24  ${className}`} />;
}

export default Image;
