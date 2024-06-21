import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';
import { Link } from 'react-router-dom';
import { produce } from 'immer';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            cars: []
       
        },
        searchText: ''
    }
    componentDidMount = async () => {

        this.refreshPeople();
    }

    refreshPeople = async () => {
        const response = await axios.get('/api/people/getallpeople');
        console.log(response.data);
        this.setState({ people: response.data });

    }

    //getCarCount = () => {
    //    const { person, people } = this.state;
    //    const { cars, carCount } = this.state.person;
    //    const PersonById = people.find(p => p.id !== person.id);
    //    this.setState({ person: PersonById });
    //    const count = person.cars.length;
    //    this.setState({ carCount: count });
    //    console.log(carCount);

    //}
    render() {
        const { people, person } = this.state;
        const { firstName, lastName, age, cars } = this.state.person;
        return (
            <div>
                <div className="container">
                    <div style={{ backgroundColor: "white" }}>

                        <div className="row mt-5">
                            <Link to='/addperson'>
                                <button className="btn btn-success btn-lg w-100 mt-15">Add Person</button>
                            </Link>
                        </div>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Car Count</th>
                                    <th>Add Car</th>
                                    <th>Delete Cars</th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map(p => <PersonRow
                                    key={p.id}
                                    person={p}
                                    carCount={() => this.getCarCount}

                                />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        )
    }

}
export default PeopleTable;
