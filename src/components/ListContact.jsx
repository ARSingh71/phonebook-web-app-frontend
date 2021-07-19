import React, { Component } from 'react';
import ContactService from '../services/ContactService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { AvField, AvForm } from 'availity-reactstrap-validation';


class ListContact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contactName: '',
            contactEmail: '',
            contactPhoneNumber: '',
            contacts: [],
            contactId: '',
            deleteContactDialog: false,
            isEditing: false,
        };

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.confirmDeleteContact = this.confirmDeleteContact.bind(this);
        this.hideDeleteContactDialog = this.hideDeleteContactDialog.bind(this);
        this.editContact = this.editContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.changeContactNameHandler = this.changeContactNameHandler.bind(this);
        this.changeContactEmailHandler = this.changeContactEmailHandler.bind(this);
        this.changeContactPhoneNumberHandler = this.changeContactPhoneNumberHandler.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    componentDidMount() {
        this.loadContacts();
    }


    loadContacts() {
        ContactService.getContacts().then((dataInfo) => this.setState({ loading: false, contacts: dataInfo.data }));
    }


    changeContactNameHandler(event) {
        this.setState({ contactName: event.target.value });
    }


    changeContactEmailHandler(event) {
        this.setState({ contactEmail: event.target.value });
    }


    changeContactPhoneNumberHandler(event) {
        this.setState({ contactPhoneNumber: event.target.value });
    }


    hideDeleteContactDialog() {
        this.setState({ deleteContactDialog: false });
    }


    editContact(contact) {
        this.setState({
            contact,
            isEditing: true,
        })
        let contactId = contact.contactId;
        this.props.history.push(`/edit-contact/${contactId}`);
        ContactService.getContactById(contactId).then(
            (dataInfo) => this.setState({
                contactId: dataInfo.data.contactId,
                contactName: dataInfo.data.contactName,
                contactEmail: dataInfo.data.contactEmail,
                contactPhoneNumber: dataInfo.data.contactPhoneNumber
            }));

    }


    confirmDeleteContact(contact) {
        this.props.history.push('/');
        this.setState({
            contact,
            contactId: contact.contactId,
            deleteContactDialog: true,
            contactName: '',
            contactEmail: '',
            contactPhoneNumber: '',
            isEditing: false,

        });
    }


    handleValidSubmit(e) {
        e.preventDefault();

        if (this.props.match.params.id !== undefined && this.props.match.params.id !== null) {
            this.setState({ contactId: this.props.match.params.id })
        }

        let contact = {
            contactId: this.state.contactId, contactName: this.state.contactName, contactEmail: this.state.contactEmail, contactPhoneNumber: this.state.contactPhoneNumber,
        };

        ContactService.saveContact(contact).then(() => {
            if (this.state.isEditing) {
                this.toast.show({ severity: 'info', summary: 'Successful', detail: 'Contact Updated', life: 1500 });
            }
            else {
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Contact Created', life: 1500 });
            }

            this.setState({
                contactId: '',
                contactName: '',
                contactEmail: '',
                contactPhoneNumber: '',
                isEditing: false,
            })

            this.props.history.push('/contacts');
            this.loadContacts();
        })
    }


    cancel(e) {
        e.preventDefault();
        this.setState({
            contactName: '',
            contactEmail: '',
            contactPhoneNumber: '',
            isEditing: false,
        })

        this.props.history.push('/');
    }


    deleteContact() {
        ContactService.deleteContact(this.state.contactId).then(() => {
            this.setState({
                deleteContactDialog: false
            });
            this.loadContacts();
        });
        this.toast.show({ severity: 'error', summary: 'Successful', detail: 'Contact Deleted', life: 1500 });
    }


    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editContact(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteContact(rowData)} />
            </React.Fragment>
        );
    }


    render() {
        const deleteContactDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteContactDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteContact} />
            </React.Fragment>
        );


        return (
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />

                <Card style={{ marginTop: '0.25em', marginBottom: '0.25em', marginRight: '0.5em', marginLeft: '0.5em', height: '37.75em' }} >

                    <div className="p-fluid p-formgrid p-grid">

                        <div className="p-field p-col-3">
                            <Card style={{ marginTop: '-1em', backgroundColor: '#E7EDEB' }}>
                                <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}> Contact Info </h5>
                            </Card>
                            <Card style={{ marginTop: '0.5em', marginBottom: '0.5em', backgroundColor: '#E7EDEB' }} >
                                <AvForm onValidSubmit={this.handleValidSubmit}>
                                    <AvField name="name" label="Name :" type="text" value={this.state.contactName} onChange={this.changeContactNameHandler} pattern="^\s*([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$" placeholder="Enter name here" errorMessage="Please enter valid name" required grid={{ xs: 9.5 }} />
                                    <AvField name="email" label="Email :" type="text" value={this.state.contactEmail} onChange={this.changeContactEmailHandler} pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" placeholder="Enter email here" errorMessage="Please enter valid email" grid={{ xs: 9.5 }} />
                                    <AvField name="phno" label="Ph No :" type="text" value={this.state.contactPhoneNumber} onChange={this.changeContactPhoneNumberHandler} pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$" placeholder="Enter phone number here" errorMessage="Please enter valid phone number" required grid={{ xs: 9.5 }} />
                                    <div style={{ marginTop: '10%', }} >
                                        {this.state.isEditing ?
                                            <Button label="Update Contact" icon="pi pi-user-edit" iconPos="right" style={{ marginRight: '3%', marginLeft: '15%', width: '52%' }} />
                                            : <Button label="Add Contact" icon="pi pi-user-plus" iconPos="right" style={{ marginRight: '3%', marginLeft: '15%', width: '52%' }} />
                                        }
                                        <Button label="Cancel" className="p-button-secondary" onClick={this.cancel} icon="pi pi-times" iconPos="right" style={{ width: '30%' }} />
                                    </div>
                                </AvForm>
                            </Card>
                        </div>

                        <div className="p-field p-col">
                            <Card style={{ marginTop: '-1em', backgroundColor: '#E7EDEB' }}>
                                <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}> All Contacts </h5>
                            </Card>
                            <Card style={{ marginTop: '0.5em', marginBottom: '0.5em', backgroundColor: '#E7EDEB' }} >
                                <DataTable
                                    value={this.state.contacts ? this.state.contacts : []}
                                    paginator
                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={3} rowsPerPageOptions={[3, 6, 9]}
                                    emptyMessage="No records found" >
                                    <Column field="contactId" header="Sr No" />
                                    <Column field="contactName" header="Name" />
                                    <Column field="contactEmail" header="Email" />
                                    <Column field="contactPhoneNumber" header="Ph No" />
                                    <Column field="action" header="Action" body={this.actionBodyTemplate} />
                                </DataTable>
                            </Card>
                        </div>

                    </div>
                </Card >

                <Dialog visible={this.state.deleteContactDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteContactDialogFooter} onHide={this.hideDeleteContactDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.contact && <span>Are you sure you want to delete <b>{this.state.contact.contactName}</b>?</span>}
                    </div>
                </Dialog>
            </React.Fragment >
        );
    }
}

export default ListContact;