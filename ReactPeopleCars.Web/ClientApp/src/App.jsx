import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PeopleTable from './PeopleTable';
import AddPerson from './AddPerson';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<PeopleTable />} />
                <Route path='/addperson' element={<AddPerson />} />
                <Route path='/addcar/:id' element={<AddCar />} />
                <Route path='/deletecars/:id' element={<DeleteCars />} />
            </Routes>
        </Layout>
    );
}

export default App;