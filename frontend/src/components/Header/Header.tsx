// Header

import { Link } from "react-router-dom";

const Header = () => {
    return (

        <>
            <header>
                <nav>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/mytasks'> My Created Tasks</Link>
                    <Link to='/create-task'>Create New Task</Link>
                    <Link to='/signin'>Sign Out</Link>
                </nav>
                
            </header>
        </>
    );
}

export default Header;