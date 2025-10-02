import React from 'react'
import Topbar from '../layout/Topbar';
import Navbar from './Navbar';

const header = () => {
return (
    <header className="border-b border-gray-200 ">
        {/* {Topbar} */}
        <Topbar />
        {/* {navbar} */}
        <Navbar />
        {/* {cart drawer} */}
    </header>
    );
};

export default header;