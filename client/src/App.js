import React,{useEffect} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute  from './utils/privateRoute';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import BookPage from './components/BookPage';
import styled from 'styled-components'; 
import {setToken,logout} from './actions';
import DisplayBooks from './components/DisplayBooks';

const NavBookr = styled.div`
     width: 100%; 
     height: 100px; 
     background-color: #f7ffe0; 
     
     font-size: 1.8rem; 
     text-decoration: none; 
     display: flex; 
     justify-content: center;
     justify-content: space-around; 
     align-items: center; 
`

const App = props => {
  const {setToken} = props
  useEffect(()=>{
    localStorage.getItem('token') ? setToken(true) : setToken(false)
    //load Books
    //load Reviews
      // get AVG
    
  },[setToken])
  return (
    <div className="App">
      <NavBookr>
        <Link className = "BookrLinks" to ="/home"> Home </Link>
        <Link 
          className = "BookrLinks" 
          to="/" 
          onClick={props.token?props.logout:null}>
            {props.token?'Log Out':'Log In'}
        </Link>
      </NavBookr>
      
      <Route exact path='/' component={Login}/>
      <PrivateRoute path='/home' component={Home}/>
      <PrivateRoute path='/books/:id' component={BookPage}/>
      <PrivateRoute path='/displaybooks' component={DisplayBooks}/>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    token:state.token
  }
}
export default connect(mapStateToProps,{setToken,logout})(App);
