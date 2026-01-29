import "./Edit.css"
import { useState } from "react";

export default function Edit() {
    const [activebutton, setActiveButton] = useState("");
    const [contactList, setContactList] = useState([]);

    //Função que muda o texto de um contato
    const handleContactChange = (id, newValue) => {
        setContactList(contactList.map(contact => {
            if (contact.id === id) {
                return { ...contact, value: newValue };
            }
            return contact;
        }));
    };

    //Função que muda o activebutton
    const handleActiveButton = (e) => {
        const buttonText = e.target.innerText;
        setActiveButton(buttonText);
    };

    //Função que troca o estado do contato como link ou não
    const handleLinkToggle = (id, isChecked) => {
        setContactList(contactList.map(contact => {
            if (contact.id === id) {
                return { ...contact, isLink: isChecked };
            }
            return contact;
        }));
    };

    //Função que adiciona um novo contato em contactList
    function addInput() {
        const hasEmptyInput = contactList.some(contact => contact.value.trim() === "");

        if (!hasEmptyInput) {

            const newContact = {
                id: Date.now(),
                value: "",
                isLink: false
            };

            setContactList([...contactList, newContact]);
        } else {
            alert("Por favor, preencha os campos de contato vazios antes de adicionar um novo.");
        }
    }

    return (
        <div className="edit">
            <h2>Customize</h2>
            <div className="buttons-container">
                <button onClick={handleActiveButton}>Header</button>
                <button onClick={handleActiveButton}>Profile</button>
                <button onClick={handleActiveButton}>Experiences</button>
                <button onClick={handleActiveButton}>Education</button>
                <button onClick={handleActiveButton}>Technical Skills</button>
            </div>
            <div className={`form-container ${activebutton !== "" ? "active-form" : ""}`}>
                {activebutton === "Header" && (
                    <div className="header-inputs">
                        <h3>Edit Header Information</h3>
                        <div className="header-inputs-container">
                            <div className="header-info">
                                <label>
                                    Nome completo
                                    <input id="full-name-input" placeholder="Nome completo" />
                                </label>
                                <label>
                                    Título
                                    <input id="title-input" placeholder="Título" />
                                </label>
                            </div>
                            <div className="header-contact">
                                <h3>Contatos</h3>
                                {contactList.map((contact) => (
                                    <div key={contact.id} className="input-group">
                                        <input
                                            id={`contact-${contact.id}`}
                                            type="text"
                                            value={contact.value}
                                            onChange={(e) => handleContactChange(contact.id, e.target.value)}
                                            placeholder={`Digite seu contato`}
                                        />

                                        {/* Nova checkbox para definir se é um link */}
                                        <div className="checkbox-group">
                                            <input
                                                type="checkbox"
                                                id={`link-${contact.id}`}
                                                checked={contact.isLink} // Verifica se o atributo isLink é true ou false
                                                onChange={(e) => handleLinkToggle(contact.id, e.target.checked)}
                                            />
                                            <label htmlFor={`link-${contact.id}`}>Link</label>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addInput}>+</button>
                            </div>
                        </div>
                    </div>
                )}
                {activebutton === "Profile" && (
                    <div className="header-inputs">
                        <h3>Edit Profile Information</h3>
                        <input placeholder="Full Name" />
                    </div>
                )}
                {activebutton === "Experiences" && (
                    <div className="header-inputs">
                        <h3>Edit Experiences Information</h3>
                        <input placeholder="Full Name" />
                    </div>
                )}
                {activebutton === "Education" && (
                    <div className="header-inputs">
                        <h3>Edit Education Information</h3>
                        <input placeholder="Full Name" />
                    </div>
                )}
                {activebutton === "Technical Skills" && (
                    <div className="header-inputs">
                        <h3>Edit Technical Skills Information</h3>
                        <input placeholder="Full Name" />
                    </div>
                )}
            </div>
        </div>
    )
}