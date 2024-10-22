import ActionButton from "../molecules/ActionButton";

function BoxGestionAdmin({onAddProductClick}){
    return (
        <div className="mt-2 mx-4">
            <ActionButton
                imageSrc="/AddIcon.png"
                alt="Imagen"
                label="AGREGAR"
                className="bg-white text-black"
                onClick={onAddProductClick}
            ></ActionButton>
        </div>
    )
}

export default BoxGestionAdmin;