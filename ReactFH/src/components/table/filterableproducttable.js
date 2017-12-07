import React from 'react';
import ProductTable from './producttable';
import SearchBar from './searchbar';


class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText : '',
            inStockOnly : false
        }
    }

    handleFilterTextInput=(filterText)=>{
        console.log(this.state.filterText);
        this.setState({
            filterText : filterText
        })
    }

    handleInStockInput=(inStockOnly)=>{
        this.setState({
            inStockOnly : inStockOnly
        })
    }

    render(){
        return(
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    products={this.props.products}
                />
            </div>
        )
    }
}

export default FilterableProductTable;