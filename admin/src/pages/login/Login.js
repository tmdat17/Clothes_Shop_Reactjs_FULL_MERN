import './login.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthService from '../../services/AuthService';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newAdmin = {
            phone: phone,
            password: password,
        };
        AuthService.loginUser(newAdmin, dispatch, navigate);
    };

    const msg = useSelector((state) => state.auth?.msgLogin);
    return (
        <>
            <div className="login">
                <form
                    className="d-flex justify-content-start d-sm-flex justify-content-sm-start d-md-flex justify-content-md-center"
                    onSubmit={handleLogin}
                >
                    <div className="">
                        <h1>Login Admin</h1>
                        <div className="text-center text-danger fs-5">{msg}</div>
                        <div className=""></div>
                        <input
                            type="tel"
                            required={true}
                            size={10}
                            placeholder="Số điện thoại"
                            className=" d-block my-3 my-sm-3 my-md-4 w-sm-25 form-control "
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            type="password"
                            required={true}
                            placeholder="Mật khẩu"
                            className=" d-block my-3 my-sm-3 my-md-4 form-control "
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="d-flex justify-content-around w-100 mt-3 mt-sm-3 mt-md-4 ">
                            <button className="btn btn-primary ms-md-4 ">Đăng nhập</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
