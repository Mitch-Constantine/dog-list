import React from 'react';
import './App.css';
import DogList from './DogList';
import DogEdit from './DogEdit';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  items: [],
		  selected: -1
		};
		
		this.onSelectedChange = this.onSelectedChange.bind(this);
		this.onDogChange = this.onDogChange.bind(this);
	}
	
	onSelectedChange(index) {
		this.setState({selected:index});
	}
	
	onDogChange(dog) {
		let newItems = [...this.state.items];
		newItems[this.state.selected] = dog;
		this.setState({items: newItems});
	}
	
	componentDidMount() {
		fetch("dogs.json")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				isLoaded: true,
				items: result,
				selected: 0
			  });
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		)
	}

	render() {
		return (
			<>
				
				<div className="container">
					<div className="page-header mt-3">
						<h1>
							<p className="lead">Dog List - React toy app </p>
						</h1>
					</div>

					<div className="mt-5 row">
						<DogList dogs={this.state.items} selected={this.state.selected} onSelectedChange={this.onSelectedChange}>
						</DogList>
					</div>

					<div className="mt-5 row">
						{ this.state.items && this.state.selected >= 0 && 
							<DogEdit 
								key={this.state.selected} 
								dog={this.state.items[this.state.selected]} 
								onChange={this.onDogChange}>
							</DogEdit> }
					</div>

					<div className="mt-5 row">
						<p>Click on the dog name to edit</p>
					</div>
					<div className="row">
						<p>List of dogs is read from a static JSON file via AJAX. Save is just an alert as there is no backend code.</p>
					</div>
					<div className="row">
						<p>Validation: name and breed are mandatory, alias is not. Implemented using Formik and Yup.</p>
					</div>
					<div className="row">
						<p>This is the Heroes app from angular, adapted for react</p>
					</div>
				</div>
			</>
		);
	}
}


