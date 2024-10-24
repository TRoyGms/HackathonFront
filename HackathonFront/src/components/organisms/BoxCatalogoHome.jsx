import ActionButton from '../molecules/ActionButton';

function BoxCatologoHome({ onCatalogClick }) {
    return (
        <div className="flex justify-center items-center mt-5 font-bold text-2xl">
            <ActionButton
                imageSrc="/catalogo.gif"
                label="VER CATÁLOGO"
                onClick={onCatalogClick}
                className="bg-white text-black"
            />
        </div>
    );
}

export default BoxCatologoHome;
