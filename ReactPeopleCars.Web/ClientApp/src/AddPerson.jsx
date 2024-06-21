import React from 'react';
import withRouter from './withRouter';
import { produce } from 'immer';
import axios from 'axios';

class AddPerson extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    componentDidMount = async () => {
     
    }


    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddClick = async () => {
        const { people, person } = this.state;
        const {id, firstName, lastName, age } = this.state.person;
        await axios.post("/api/people/addperson", { id, firstName, lastName, age }).then(response => {
            this.setState({ people: [...people, person], person: { firstName: '', lastName: '', age: '' } });
        });
        console.log(people);
        this.props.navigate('/');
    }

    render() {
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-light p-4" style={{ marginTop: 200 }}>
                    <h3>Add a new person!</h3>
                    <input type="text" value={firstName} name='firstName' onChange={this.onTextChange} className="form-control" placeholder="First Name" />
                    <br />
                    <input type="text" value={lastName} name='lastName' onChange={this.onTextChange} className="form-control" placeholder="Last Name" />
                    <br />
                    <input type="text" value={age} name='age' onChange={this.onTextChange} className="form-control" placeholder="Age" />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-primary btn-block">Add</button>
                </div>
            </div>
        )
    }
}

//you need this on components/pages where you need
//access to the router parameters (e.g. /editperson/:id)
//or you need to do a redirect....
export default withRouter(AddPerson);

