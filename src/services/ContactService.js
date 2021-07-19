import axios from "axios";
import { CONTACT_API_BASE_URL } from "../constants/ContactApiUrl";

class ContactService {
  getContacts() {
    let url = CONTACT_API_BASE_URL + `api/v1/contacts`;
    return axios.get(url).then((res) => res);
  }

  saveContact(contact) {
    let url = CONTACT_API_BASE_URL + `api/v1/contact`;
    return axios.post(url, contact).then((res) => res);
  }

  getContactById(contactId) {
    let url = CONTACT_API_BASE_URL + `api/v1/contact/${contactId}`;
    return axios.get(url).then((res) => res);
  }

  deleteContact(contactId) {
    let url = CONTACT_API_BASE_URL + `api/v1/contact/${contactId}`;
    return axios.delete(url).then((res) => res);
  }
}

export default new ContactService();
