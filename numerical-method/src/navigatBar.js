import React from "react"
import { Navbar,Container,Nav,Dropdown,NavDropdown,NavbarBrand } from "react-bootstrap";    //import
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"
// import { Link } from "react-router-dom";

var customBrand = {
    color: '#F8EDE3',
    fontSize: '100%',
    fontFamily: 'HYPE'
}
var customDropdown = {
    color: '#F8EDE3',
    fontSize: '100%',
    fontFamily: 'Bahnschrift'
}
var myName = {
    color: '#B7CADB',
    fontSize: '90%',
    fontFamily: 'Lucida Console'
}

export const Navigbar = ()=>{
    return(
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
            <Container>
                <NavbarBrand style={customBrand}>
                    Numerical method
                </NavbarBrand>
                <NavbarCollapse>
                    <Nav>
                        <NavDropdown title="Roots of Equations" style={customDropdown} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Bisection">Bisection Method</NavDropdown.Item>
                            <NavDropdown.Item href="/FalsePosition">False-Position Method</NavDropdown.Item>
                            <NavDropdown.Item href="/OnePoint">One Point Method</NavDropdown.Item>
                            <NavDropdown.Item href="/NewtonRaphson">Newton Raphson Method</NavDropdown.Item>
                            <NavDropdown.Item href="/Secant">Secant Method</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Linear Algebraic Equations" style={customDropdown} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Cramer">Cramer's Rule</NavDropdown.Item>
                            <NavDropdown.Item href="/GaussEliminate">Guass Elimination Method</NavDropdown.Item>
                            <NavDropdown.Item href="/GaussJordan">Guass-Jordon Elimination Method</NavDropdown.Item>
                            <NavDropdown.Item href="/Invertion">Matrix Inversion Method</NavDropdown.Item>
                            <NavDropdown.Item href="/LUdecom">LU Decomposition Method</NavDropdown.Item>
                            <Dropdown.Divider/>
                            <NavDropdown.Header>W.I.P</NavDropdown.Header>
                            <NavDropdown.Item href="#Cholesky">Cholesky Decomposition Method</NavDropdown.Item>
                            <NavDropdown.Item href="#Jacobi">Jacobi Iteration Method</NavDropdown.Item>
                            <NavDropdown.Item href="#GuassSeidal">Guass-Seidal Iteration Method</NavDropdown.Item>
                            <NavDropdown.Item href="#Conjugate">Conjugate Gradient Method</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Interpolation" style={customDropdown} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/NewtonDiff">Newton's Divided-Differents</NavDropdown.Item>
                            <NavDropdown.Item href="/Lagrange">Lagrange Polynomails</NavDropdown.Item>
                            <NavDropdown.Item href="/LeastSquareRegresstion">Least Square Regression</NavDropdown.Item>
                            <Dropdown.Divider/>
                            <NavDropdown.Header>W.I.P</NavDropdown.Header>
                            <NavDropdown.Item href="#Spline">Spline Interpersonal</NavDropdown.Item>
                            
                            <NavDropdown.Item href="#ไอควาย">ลองกดดูสิ</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </NavbarCollapse>
                <Navbar.Text style={myName}>
                    6404062630562 Saruda Polmanee
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}