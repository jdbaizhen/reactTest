import React from 'react';

class ProductCategoryRow extends React.Component{
    render(){
        return (<tr>{this.props.category}</tr>)
    }
}

export default ProductCategoryRow;