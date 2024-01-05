import { useState } from 'react';

import { useApi, useCategory } from './hooks';
import { Product, Accordion, Error } from './components';
import { PRODUCT_URI } from './constants';

function App() {
    const [ index, setIndex ] = useState(-1);
    const { isLoading, data, error } = useApi(PRODUCT_URI);
    const categories = useCategory(data?.products);

    return isLoading ? (
        <h1>Loading........</h1>
    ) : error ? (
        <Error
            message={error.message}
            statusCode={error.statusCode}
        />
    ) : (
        <>
            {categories?.map((category ,productIndex) => (
                <Accordion
                    title = { category }
                    show = { (index === productIndex) }
                    key = { category }
                    height={ 230 }
                    onClick = {() => {
                        setIndex(!(index === productIndex) ? productIndex : -1)
                    }}
                >
                {data?.products?.map((product = {}) => (
                    (category === product.category && typeof product === 'object') &&
                    <Product { ...product } key={ category + product.id }/>
                )).filter(isProduct => isProduct)}
                </Accordion>
            ))}
        </>
    )
}

export default App;