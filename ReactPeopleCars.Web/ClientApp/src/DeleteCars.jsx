import React from 'react';
import CarRow from './CarRow';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withRouter from './withRouter';

class DeleteCars extends React.Component {
    state = {
        cars: []
    }

    componentDidMount = async () => {
        const id = this.props.params.id;
        const { data } = await axios.get(`/api/people/getcars?id=${id}`);
        this.setState({ cars: data });
    }

    onYesClick = async () => {
        const id = this.props.params.id
        await axios.post(`/api/people/deletecars?id=${id}`);
        this.props.navigate('/');
    }

    render() {
        const { cars } = this.state;
        console.log('in render');
        return (
            <div className="container" >

                <div className="row mt-5">
                    <div className="col-md-12">
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map(c => <CarRow
                                    key={c.id}
                                    car={c}
                                />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Are you sure you want to delete all of these cars?</h3>
                    </div>
                    <div className="col-md-6" >
                        <a href="/">
                            <button className="btn btn-primary btn-lg w-100">No</button>
                        </a>
                    </div>
                    <div className="col-md-6" >
                        <button className="btn btn-danger btn-lg w-100" onClick={this.onYesClick}>Yes</button>
                    </div>
                </div>
            </div>


        )
    }
}
export default withRouter(DeleteCars);
