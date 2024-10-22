import Label from '../atoms/Label';
import Image from '../atoms/Image';

function ActionButton({ imageSrc, label, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`border p-10 flex flex-col items-center border-black rounded-3xl transform transition-transform duration-300 hover:scale-110  ${className}`}
        >
            <Image src={imageSrc} alt={label} className="w-24 h-24" />
            <Label className=" mt-2 text-xl ">{label}</Label>
        </button>
    );
}

export default ActionButton;
