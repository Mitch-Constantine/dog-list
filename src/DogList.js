import React from 'react';

export default class DogList extends React.Component {
	
	constructor(props) {
		super(props);
		this.props = props;
	}
	
	handleClick(index) {
		if (this.props.onSelectedChange) {
			this.props.onSelectedChange(index);
		}	
	}
	
	render() {
					
		let dogItems = this.props.dogs.map( (dog,index)=>
			<button 
				type="button" 
				className={"list-group-item list-group-item-action " + ((+this.props.selected === index) ? " active" : "")} 
				key={index}					
				onClick={()=>this.handleClick(index)}
			>
				{dog.name} ({dog.alias || ("just " + dog.name)}), {dog.breed}
			</button>
		);
		
		return (
			<div className="list-group">
				{dogItems}
			</div>
		);
	}
}
