import { useState } from "react";
import { ArrowButton } from "../components";

export function Product({ title, description, category, price, images }) {
    const [translate, setTranslate] = useState(0);

    return (
        <div className="m-3 flex align-center">
            <div className="relative w-52 h-52 mr-5 overflow-hidden">
                <ArrowButton
                    disabled={translate <= 0}
                    onClick={setTranslate.bind(null, translate - 210)}
                    className={`rotate-0 absolute top-2/4 -translate-y-2/4 left-1 active:translate-x-1 transition-transform`}
                />
                {images?.map((image, i) => {
                    const imgConfig = {
                        right: `${i * 210}px`,
                        transform: `translate(${translate}px, -50%)`,
                    };

                    return (
                        <img
                            src={image}
                            alt={title}
                            key={image + i}
                            style={imgConfig}
                            className="object-contain h-full w-full absolute top-2/4 transition-transform"
                        />
                    );
                })}
                <ArrowButton
                    disabled={translate >= (images?.length - 1) * 210}
                    onClick={setTranslate.bind(null, translate + 210)}
                    className={`rotate-180 absolute top-2/4 -translate-y-2/4 right-1 active:-translate-x-1 transition-transform`}
                />
            </div>
            <div className="flex align-center justify-center flex-col">
                <h2>Title: {title}</h2>
                <h2>Description: {description}</h2>
                <h2>Category: {category}</h2>
                <h2>Price: {price}</h2>
            </div>
        </div>
    );
}

export default Product;
