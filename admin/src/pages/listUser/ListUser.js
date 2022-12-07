import './listUser.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DatatableUser from '../../components/datatableUser/DatatableUser';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListUser = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableUser />
            </div>
        </div>
    );
};

export default ListUser;
