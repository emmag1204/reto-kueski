import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import logo from './images/kueski.png';
import './Login.css';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}
from 'mdb-react-ui-kit';

class Login extends Component {

    login = async () => {
        const emp_num = document.getElementById('emp_num').value;
        const pass = document.getElementById('pass').value;
        const response = await fetch(`/api/admins/${emp_num}`);
        const data = await response.json();
        const admin = data[0];
        console.log(admin);
        if (admin) {
            console.log(pass, admin.admin_password)
            if (pass == admin.admin_password) {
                window.localStorage.setItem('admin_id', admin.admin_id);
                window.location.href = '/';
            }else {
                alert('Contraseña incorrecta');
            }
        }
    }
    render() { 
        return (
            <div className='fondo'>
                <MDBContainer className='registro'>
                    <div className='inicio'>
                        <img width='200' height='100' src={logo} alt='kueski'/>
                    </div>
                    <div className='mensaje'>
                        <p>Bienvenido Administrador de Kueski</p>
                    </div>
                    <MDBInput wrapperClass='texto' label='Usuario' id='emp_num' type='email'/>
                    <MDBInput wrapperClass='texto' label='Contraseña' id='pass' type='password'/>
                    <div className="text-center">
                        <Button onClick={this.login}>Iniciar Sesion</Button>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}
export default Login;

