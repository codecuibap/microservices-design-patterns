import React from 'react';
import { Container, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

function HomeContent({notDisplayMessage}) {
    const displayButton = (isAuthenticated, authorities) => {
        if (isAuthenticated) {
            return <Row>
                <Col xs="auto">
                    {displayButtonManagePeople(authorities)}
                </Col>
                <Col xs="auto">
                    {displayButtonManageUsers(authorities)}
                </Col>
                <Col xs="auto">
                    {displayButtonManageCategories(authorities)}
                </Col>
                <Col xs="auto">
                    {displayButtonManageRecipes(authorities)}
                </Col>
                <Col xs="auto">
                    {displayButtonAdmin(authorities)}
                </Col>
                <Col xs="auto">
                    <Link className="link" to="/logout">Logout</Link>
                </Col>
            </Row>
        }
        return <Row>
            <Col xs="auto">
                <Link className="link" to="/login">Login</Link>
            </Col>
            </Row>
    }
    const displayMessage = (user) => {
        if (notDisplayMessage) {
            return "";
        }
        return user ?
            <h2>Welcome, {user}!</h2> :
            <p>Please log in to manage.</p>;
    }
    return <UserContext.Consumer >
        {({user, isAuthenticated, authorities}) => <Container fluid>
            {displayMessage(user)}
            {displayButton(isAuthenticated, authorities)}
        </Container>}
    </UserContext.Consumer> 
}
function displayButtonManagePeople(authorities) {
    const hasManageReadAccess = authorities.some(item => item === 'ROLE_ADMIN' || item === 'ROLE_PERSON_READ' 
    || item === 'ROLE_PERSON_CREATE' || item === 'ROLE_PERSON_SAVE' || item === 'ROLE_PERSON_DELETE')
    return <Link to="/persons" className={"link" + (!hasManageReadAccess ? " disabled-link" : "")}>Manage People</Link>
}

function displayButtonManageUsers(authorities) {
    const isAdmin = authorities.some(item => item === 'ROLE_ADMIN')
    return <Link to="/users" className={"link" + (!isAdmin ? " disabled-link" : "")}>Manage Users</Link>
}

function displayButtonAdmin(authorities) {
    const isAdmin = authorities.some(item => item === 'ROLE_ADMIN')
    return (
        <UncontrolledDropdown>
                <DropdownToggle nav caret>
                    Admin
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem>
                    <Link to="/admin-eureka" className={"link" + (!isAdmin ? " disabled-link" : "")}>Service Discovery - Eureka</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/admin-monitoring" className={"link" + (!isAdmin ? " disabled-link" : "")}>Monitoring - Spring Boot Admin</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/admin-grafana" className={"link" + (!isAdmin ? " disabled-link" : "")}>Metrics - Grafana</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link to="/admin-tracing" className={"link" + (!isAdmin ? " disabled-link" : "")}>Tracing - Zipkin</Link>
                </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
    )
}

function displayButtonManageCategories(authorities) {
    const isAdmin = authorities.some(item => item === 'ROLE_ADMIN')
    return <Link to="/categories" className={"link" + (!isAdmin ? " disabled-link" : "")}>Manage Categories</Link>
}

function displayButtonManageRecipes(authorities) {
    const isAdmin = authorities.some(item => item === 'ROLE_ADMIN')
    return <Link className={"link" + (!isAdmin ? " disabled-link" : "")} to="/recipes">Manage Recipes</Link>
}

export default HomeContent