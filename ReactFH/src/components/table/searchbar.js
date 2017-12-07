import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }

    handleFilterTextInputChange=(e)=>{
        this.props.onFilterTextInput(e.target.value)
    };

    handleInStockInputChange=(e)=>{
        this.props.onInStockInput(e.target.checked)
    };

    render(){
        return(
            <form>
                <input type="text"
                       placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input type="checkbox"
                           value={this.props.inStockOnly}
                           onChange={this.handleInStockInputChange}
                    />
                    {''}
                    Only Show
                </p>
            </form>
        )
    }
}

export default SearchBar;