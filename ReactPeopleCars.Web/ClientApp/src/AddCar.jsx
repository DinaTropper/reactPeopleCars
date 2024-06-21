import React from 'react';
import withRouter from './withRouter';
import { produce } from 'immer';
import axios from 'axios';
import PersonRow from './PersonRow';

class AddCar extends React.Component {
    state = {

        car: {
            make: '',
            model: '',
            year: '',
            personId: ''
        }
    };


    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }
    onAddClick = async () => {
        const { make, model, year, personId } = this.state.car;
        await axios.post('/api/people/addcar', { personId: this.props.params.id, make: make, model: model, year: year });
        this.setState({
            car: { make: '', model: '', year: '' }
        });
        this.props.navigate('/');
    }
    render() {
        const { make, model, year } = this.state.car;

        return (
            <div className="container" >
                <div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 card bg-light p-4">
                            <h2>Add a car</h2>
                            <input type="text" className="form-control" name="make" placeholder="Make" value={make} onChange={this.onTextChange} />
                            <br />
                            <input type="text" className="form-control" name="model" placeholder="Model" value={model} onChange={this.onTextChange} />
                            <br />
                            <input type="text" className="form-control" name="year" placeholder="Year" value={year} onChange={this.onTextChange} />
                            <br />
                            <button className="btn btn-primary btn-lg btn-block" onClick={this.onAddClick}>Add car</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AddCar);
