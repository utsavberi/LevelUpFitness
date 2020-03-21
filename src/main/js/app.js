const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/users'}).done(response => {
      console.log(response)
			this.setState({employees: response.entity._embedded.users});
		});
	}

	render() {
		return (
      <div>
      hello
			<EmployeeList employees={this.state.employees}/>
      done
      </div>
		)
	}
}
class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}

class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.name}</td>
				<td>{this.props.employee.email}</td>
				{/* <td>{this.props.employee.description}</td> */}
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)