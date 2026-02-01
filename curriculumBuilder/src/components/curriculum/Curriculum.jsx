import "./Curriculum.css"

export default function Curriculum({
    contactList,
    person,
    experienceList,
    educationList,
    skillsList,
    themeColor
}) {

    return (
        <div className="curriculum">
            <div className="curriculum-header">
                <div className="curriculum-header-info">
                    <h1 style={{color: themeColor}}>{person.name}</h1>
                    <h2>{person.title}</h2>
                </div>
                <div className="curriculum-contact">
                    <h2 style={{color: themeColor}}>Contatos</h2>
                    {contactList.map((c) => (
                        <p key={c.id} style={{
                            marginBottom: "8px",
                            // Permite quebrar a linha se a palavra for muito longa (ex: links)
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            // Diminui a fonte proporcionalmente à largura da tela
                            fontSize: "clamp(10px, 1.5vw, 14px)",
                            lineHeight: "1.2"
                        }}>
                            {c.isLink ? (
                                <a
                                    // O link agora usa a propriedade linkUrl
                                    href={c.linkUrl?.startsWith('http') ? c.linkUrl : `https://${c.linkUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: "#007bff",
                                        textDecoration: "underline"
                                    }}
                                >
                                    {/* O texto visível continua sendo o value (ex: "LinkedIn") */}
                                    {c.value || "Ver Link"}
                                </a>
                            ) : (
                                c.value || "Sem valor"
                            )}
                        </p>
                    ))}
                </div>
            </div>

            <div className="curriculum-profile">
                <h2 style={{color: themeColor}}>PERFIL</h2>
                <p>{person.profile}</p>
            </div>

            <div className="curriculum-experience">
                {experienceList.some(exp => exp.position.trim() !== "" || exp.company.trim() !== "") && (
                    <>
                        <h2 style={{color: themeColor}}>EXPERIÊNCIA PROFISSIONAL</h2>
                        {experienceList.map((exp) => {
                            if (!exp.position && !exp.company) return null;

                            const formatDate = (dateStr) => {
                                if (!dateStr) return "";
                                const date = new Date(dateStr + 'T00:00:00');
                                return date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
                                    .replace(/^\w/, (c) => c.toUpperCase());
                            };

                            return (
                                <div key={exp.id} style={{ marginBottom: "15px", borderLeft: "2px solid #ccc", paddingLeft: "10px" }}>
                                    <h3 style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        fontSize: "clamp(12px, 2vw, 18px)"
                                    }}>
                                        {exp.position} {exp.company && ` - ${exp.company}`}
                                    </h3>

                                    {(exp.startDate || exp.endDate) && (
                                        <h3 style={{ fontSize: "0.9rem", color: "#666" }}>
                                            {formatDate(exp.startDate)} - {exp.endDate === "Atual" ? "Atual" : formatDate(exp.endDate)}
                                        </h3>
                                    )}

                                    {exp.description && (
                                        <p style={{ whiteSpace: "pre-wrap" }}>{exp.description}</p>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <div className="curriculum-education">
                {educationList.some(edu => edu.position.trim() !== "" || edu.company.trim() !== "") && (
                    <>
                        <h2 style={{color: themeColor}}>FORMAÇÃO ACADÊMICA</h2>
                        {educationList.map((edu) => {
                            if (!edu.position && !edu.company) return null;

                            const formatDate = (dateStr) => {
                                if (!dateStr) return "";
                                const date = new Date(dateStr + 'T00:00:00');
                                return date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
                                    .replace(/^\w/, (c) => c.toUpperCase());
                            };

                            return (
                                <div key={edu.id} style={{ marginBottom: "10px" }}>
                                    <h3 style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        fontSize: "clamp(12px, 2vw, 18px)"
                                    }}>
                                        {edu.position}
                                    </h3>

                                    <h3 style={{ fontSize: "0.9rem", color: "#666" }}>
                                        {edu.company}
                                        {(edu.startDate || edu.endDate) && (
                                            ` (${formatDate(edu.startDate)} - ${edu.endDate === "Atual" ? "Atual" : formatDate(edu.endDate)})`
                                        )}
                                    </h3>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <div className="curriculum-skills">
                <h3 style={{color: themeColor}}>Habilidades</h3>
                {skillsList.filter(s => s.skill && s.skill.trim() !== "").length > 0 ? (
                    <ul style={{
                        listStyleType: "disc", // Ativa as bolinhas tradicionais
                        paddingLeft: "20px",   // Espaço necessário para as bolinhas aparecerem
                        margin: 0
                    }}>
                        {skillsList
                            .filter(s => s.skill && s.skill.trim() !== "")
                            .map((s) => (
                                <li key={s.id} style={{ marginBottom: "5px" }}>
                                    {s.skill}
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>Nenhuma habilidade</p>
                )}
            </div>
        </div>
    )
}