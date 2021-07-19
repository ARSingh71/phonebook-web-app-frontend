import React, { Component } from 'react';
import { Card } from 'primereact/card';


class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <Card style={{ marginTop: '0.25em', marginBottom: '0.25em', marginRight: '0.5em', marginLeft: '0.5em', backgroundColor: '#E7EDEB' }} >
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>
                        <img src="/phonebook.png" alt="logo" height="75px" width="75px" />
                        PhoneBook Web Application
                    </h1>
                </Card>
            </React.Fragment >
        );
    }
}

export default Header;