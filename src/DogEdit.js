import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default class DogEdit extends React.Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		
		this.state = {dog: props.dog  ? {...props.dog} : { name: "", alias: "", breed: "" }};
		
		this.onChange = this.onChange.bind(this);
	}	
	
	onChange(dog) {
		if (this.props.onChange)
			this.props.onChange(dog);
	}
	
	render() {
		return (
			<Formik
				initialValues={{ name: this.state.dog.name, alias: this.state.dog.alias, breed: this.state.dog.breed }}
				validationSchema={Yup.object({
					name: Yup.string()
					  .required('*'),
					alias: Yup.string(),
					breed: Yup.string()
					  .required('*')
				})}
				onSubmit={(values, { setSubmitting }) => {
					this.onChange(values);
					setTimeout(() => {
					  alert("Call window.fetch with method: POST and pass:\n" + JSON.stringify(values, null, 2));
					  setSubmitting(false);
					}, 400);
				}}
			>
				<Form>
					<div className="form-group">
						<label style={{display:'inline-block', width:'50px'}} htmlFor="name">Name:</label>
						<Field name="name" type="text" />
						<span className="text-danger"><ErrorMessage name="name"/></span>
					</div>
					<div className="form-group">
						<label style={{display:'inline-block', width:'50px'}} htmlFor="alias">Alias:</label>
						<Field name="alias" type="text"/>				
						<span className="text-danger"><ErrorMessage name="alias"/></span>
					</div>
					<div className="form-group">
						<label style={{display:'inline-block', width:'50px'}} htmlFor="breed">Breed:</label>
						<Field name="breed" type="text" />
						<span className="text-danger"><ErrorMessage name="breed"/></span>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</Form>
			</Formik>
		);
	}
}