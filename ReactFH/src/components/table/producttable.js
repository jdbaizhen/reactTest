import React from 'react';
import ProductCategoryRow from './productcategoryrow';
import ProductRow from './productrow';

class ProductTable extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let rows = [];
        let lastCategory = null;

        /*for(let product of this.props.products){
           if(product.category!==lastCategory){
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
           }
           rows.push(<ProductRow category={product} key={product.name}/>);
           lastCategory = product.category;
        }*/

        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}

export default ProductTable;