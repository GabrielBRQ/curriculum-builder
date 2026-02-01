import "./Edit.css"
import { useState } from "react";

export default function Edit({
    contactList,
    onContactChange,
    deleteContact,
    person,
    onPersonChange,
    experienceList,
    onExperienceChange,
    deleteExperience,
    educationList,
    onEducationChange,
    deleteEducation,
    skillsList,
    onSkillsChange,
    deleteSkill,
    addEducation,
    addInput,
    addSkill,
    addExperience,
    handleLinkToggle,
    onUrlChange
}) {
    const [activebutton, setActiveButton] = useState("");

    //Função que muda o activebutton
    const handleActiveButton = (e) => {
        const buttonText = e.target.innerText;
        setActiveButton(buttonText);
    };
    return (
        <div className="edit">
            <h2>Customizar</h2>
            <div className="buttons-container">
                <button onClick={handleActiveButton}>Cabeçalho</button>
                <button onClick={handleActiveButton}>Perfil</button>
                <button onClick={handleActiveButton}>Experiências</button>
                <button onClick={handleActiveButton}>Educação</button>
                <button onClick={handleActiveButton}>Habilidades</button>
            </div>
            <div className={`form-container ${activebutton !== "" ? "active-form" : ""}`}>
                {activebutton === "Cabeçalho" && (
                    <div className="header-inputs">
                        <h3>Edite as informações de cabeçalho</h3>
                        <div className="header-inputs-container">
                            <div className="header-info">
                                <label className="label-header">
                                    Nome completo
                                    <input
                                        id="full-name-input"
                                        value={person.name}
                                        onChange={(e) => onPersonChange("name", e.target.value)}
                                        placeholder="Nome completo" />
                                </label>
                                <label className="label-header">
                                    Título
                                    <input
                                        id="title-input"
                                        value={person.title}
                                        onChange={(e) => onPersonChange("title", e.target.value)}
                                        placeholder="Título" />
                                </label>
                            </div>
                            <div className="header-contact">
                                <h3>Contatos</h3>
                                {contactList.map((contact) => (
                                    <div key={contact.id} className="input-group contact-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                id={`contact-${contact.id}`}
                                                type="text"
                                                value={contact.value}
                                                onChange={(e) => onContactChange(contact.id, e.target.value)}
                                                placeholder="Título do contato (Ex: LinkedIn, E-mail)"
                                            />

                                            <div className="checkbox-group">
                                                <input
                                                    type="checkbox"
                                                    id={`link-${contact.id}`}
                                                    checked={contact.isLink}
                                                    onChange={(e) => handleLinkToggle(contact.id, e.target.checked)}
                                                />
                                                <label htmlFor={`link-${contact.id}`}>Link</label>
                                            </div>

                                            <button
                                                className="delete-contact-btn"
                                                onClick={() => deleteContact(contact.id)}
                                                title="Remover contato"
                                            >
                                                🗑️
                                            </button>
                                        </div>

                                        {/* Lógica Condicional: Se isLink for true, exibe o input da URL */}
                                        {contact.isLink && (
                                            <input
                                                type="text"
                                                className="url-input"
                                                value={contact.linkUrl}
                                                onChange={(e) => onUrlChange(contact.id, e.target.value)} // Certifique-se de criar essa função
                                                placeholder="Cole a URL aqui (Ex: linkedin.com/in/usuario)"
                                                style={{
                                                    fontSize: '0.85rem',
                                                    marginLeft: '20px',
                                                    borderColor: '#007bff',
                                                    width: 'calc(100% - 20px)'
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button className="add-btn" onClick={addInput}>Adicionar</button>
                            </div>
                        </div>
                    </div>
                )}
                {activebutton === "Perfil" && (
                    <div className="header-inputs">
                        <h3>Edite as informações de perfil</h3>
                        <textarea
                            id = "profileTextArea"
                            value={person.profile}
                            onChange={(e) => onPersonChange("profile", e.target.value)}
                            placeholder="Conte um pouco sobre você"
                            className="profile-textarea"
                            rows="5" // Define a altura inicial em linhas
                        />
                    </div>
                )}
                {activebutton === "Experiências" && (
                    <div className="header-inputs">
                        <h3>Edite as informações de experiências</h3>

                        {experienceList.map((exp) => (
                            <>
                                <div key={exp.id} className="experience-inputs-container" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                    <div className="experience-info">
                                        <label>
                                            Cargo
                                            <input
                                                value={exp.position}
                                                onChange={(e) => onExperienceChange(exp.id, "position", e.target.value)}
                                                placeholder="Digite o cargo"
                                            />
                                        </label>
                                        <label>
                                            Empresa
                                            <input
                                                value={exp.company}
                                                onChange={(e) => onExperienceChange(exp.id, "company", e.target.value)}
                                                placeholder="Digite o nome da empresa"
                                            />
                                        </label>
                                    </div>

                                    <div className="date-group">
                                        <label>
                                            Início
                                            <input
                                                type="date"
                                                className="date-input"
                                                value={exp.startDate}
                                                onChange={(e) => onExperienceChange(exp.id, "startDate", e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Fim
                                            <input
                                                type="date"
                                                className="date-input"
                                                value={exp.endDate}
                                                onChange={(e) => onExperienceChange(exp.id, "endDate", e.target.value)}
                                            />
                                        </label>

                                        <button onClick={() => deleteExperience(exp.id)} className="delete-education-btn">
                                            Remover Experiência
                                        </button>
                                    </div>
                                </div>
                                <div className="experience-description">
                                    <label>
                                        Descrição das atividades
                                        <textarea
                                            id={Date.now() + "xp"}
                                            value={exp.description}
                                            onChange={(e) => onExperienceChange(exp.id, "description", e.target.value)}
                                            placeholder="Descreva suas responsabilidades e conquistas..."
                                            className="description-textarea"
                                            rows="4"
                                        />
                                    </label>
                                </div>
                            </>
                        ))}

                        <button className="experience-button" onClick={addExperience}>Adicionar</button>
                    </div>
                )}
                {activebutton === "Educação" && (
                    <div className="header-inputs">
                        <h3>Edite as informações de Educação</h3>

                        {educationList.map((exp) => (
                            <div key={exp.id} className="experience-inputs-container" style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <div className="experience-info">
                                    <label>
                                        Formação
                                        <input
                                            value={exp.position}
                                            onChange={(e) => onEducationChange(exp.id, "position", e.target.value)}
                                            placeholder="Digite o formação"
                                        />
                                    </label>
                                    <label>
                                        Instituição
                                        <input
                                            value={exp.company}
                                            onChange={(e) => onEducationChange(exp.id, "company", e.target.value)}
                                            placeholder="Digite o nome da Instituição"
                                        />
                                    </label>
                                </div>

                                <div className="date-group">
                                    <label>
                                        Início
                                        <input
                                            type="date"
                                            className="date-input"
                                            value={exp.startDate}
                                            onChange={(e) => onEducationChange(exp.id, "startDate", e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Fim
                                        <input
                                            type="date"
                                            className="date-input"
                                            value={exp.endDate}
                                            onChange={(e) => onEducationChange(exp.id, "endDate", e.target.value)}
                                        />
                                    </label>
                                </div>

                                <button onClick={() => deleteEducation(exp.id)} className="delete-education-btn">
                                    Remover Educação
                                </button>
                            </div>
                        ))}

                        <button className="experience-button" onClick={addEducation}>Adicionar</button>
                    </div>
                )}
                {activebutton === "Habilidades" && (
                    <div className="header-inputs">
                        <h3>Edite a lista de habilidades</h3>

                        <div className="skills-container">
                            {skillsList.map((skillItem) => (
                                <div key={skillItem.id} className="skill-input-group">
                                    <input
                                        placeholder="Ex: React, Inglês Fluente, Figma..."
                                        value={skillItem.skill}
                                        onChange={(e) => onSkillsChange(skillItem.id, "skill", e.target.value)}
                                        className="skill-input"
                                    />
                                    <button
                                        className="delete-contact-btn"
                                        onClick={() => deleteSkill(skillItem.id)}
                                        title="Remover contato"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Chamando a função addSkill no clique */}
                        <button className="add-button" onClick={addSkill}>Adicionar</button>
                    </div>
                )}
            </div>
        </div>
    )
}