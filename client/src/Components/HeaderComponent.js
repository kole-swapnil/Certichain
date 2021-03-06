import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import Web3 from "web3";
import '../App.css'
var util;
var util1;

class Header extends Component{
    constructor(props){
        super(props);

        this.state = { isNavOpen : false }
        this.togglenav = this.togglenav.bind(this);

    }

    togglenav(){
        this.setState({isNavOpen : !this.state.isNavOpen});
    }
    conver = async (x) => {

        util =  (Web3.utils.toWei(x, 'milli'));
    }
    converb = async (x) => {
        util1 = (Web3.utils.fromWei(x, 'milli'));
    }
    render(){
        
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container justify-center">
                    
                        <NavbarToggler onClick={this.togglenav}/>
                        <NavbarBrand className="mr-auto" >CERTICHAIN</NavbarBrand>
                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                        
                            <Nav navbar className="m-auto">
                            
                            <NavItem>
                                <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                 <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/allclg">All College</NavLink>
                            </NavItem>
                            <NavItem>
                                 <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/mystu">My Student</NavLink>
                            </NavItem> 
                            </Nav>
                            
                        </Collapse>
                    </div>
                    <h6 style={{ color: "white"}}><small>{this.props.accounts}</small>
                    <br/><small>Balance : {Web3.utils.fromWei(this.props.balance.toString(), 'ether')}</small></h6>
                </Navbar>
            
            </React.Fragment>
        )

    }

}

export default Header;