import "./Curriculum.css"

export default function Curriculum({
    contactList,
    person,
    experienceList,
    projectList,
    educationList,
    skillsList,
    themeColor
}) {

    return (
        <div className="curriculum">
            <div className="curriculum-header">
                <div className="curriculum-header-info">
                    <h1 style={{ color: themeColor }}>{person.name}</h1>
                    <h2>{person.title}</h2>
                </div>
                {contactList && contactList.some(c => c.value && c.value.trim() !== "") && (
                    <div className="curriculum-contact">
                        <h2 style={{ color: themeColor }}>Contatos</h2>

                        {contactList.map((c) => {
                            // Se o valor estiver vazio, não renderiza este item específico
                            if (!c.value || c.value.trim() === "") return null;

                            return (
                                <p key={c.id} style={{
                                    marginBottom: "8px",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    fontSize: "clamp(10px, 1.5vw, 14px)",
                                    lineHeight: "1.2"
                                }}>
                                    {c.isLink ? (
                                        <a
                                            href={c.linkUrl?.startsWith('http') ? c.linkUrl : `https://${c.linkUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "#007bff",
                                                textDecoration: "underline"
                                            }}
                                        >
                                            {c.value}
                                        </a>
                                    ) : (
                                        c.value
                                    )}
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>

            {person.profile && person.profile.trim() !== "" && (
                <div className="curriculum-profile">
                    <h2 style={{ color: themeColor }}>PERFIL</h2>
                    <p style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                        {person.profile}
                    </p>
                </div>
            )}

            <div className="curriculum-experience">
                {experienceList.some(exp => exp.position.trim() !== "" || exp.company.trim() !== "") && (
                    <>
                        <h2 style={{ color: themeColor, fontSize: "23px"}}>EXPERIÊNCIA PROFISSIONAL</h2>
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

            <div className="curriculum-experience">
                {projectList.some(proj => proj.name.trim() !== "") && (
                    <>
                        <h2 style={{ color: themeColor, marginTop: "20px", textTransform: "uppercase", fontSize: "23px" }}>PROJETOS PESSOAIS</h2>

                        {projectList.map((proj) => {
                            if (!proj.name) return null;

                            const getSafeLink = (url) => {
                                if (!url) return "#";
                                return url.startsWith("http") ? url : `https://${url}`;
                            };

                            return (
                                <div key={proj.id} style={{ marginBottom: "15px", borderLeft: "2px solid #ccc", paddingLeft: "10px" }}>

                                    {/* Título do Projeto e Link */}
                                    <h3 style={{
                                        fontSize: "clamp(12px, 2vw, 18px)",
                                        margin: "0 0 5px 0"
                                    }}>
                                        {proj.name}
                                        {proj.link && (
                                            <span style={{ fontSize: "0.8em", marginLeft: "10px" }}>
                                                <a
                                                    href={getSafeLink(proj.link)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: themeColor, textDecoration: "none" }}
                                                >
                                                    (Link do projeto)
                                                </a>
                                            </span>
                                        )}
                                    </h3>

                                    {/* Tecnologias Utilizadas (destaque visual) */}
                                    {proj.technologies && (
                                        <p style={{
                                            fontSize: "0.9rem",
                                            color: "#555",
                                            fontStyle: "italic",
                                            margin: "0 0 8px 0",
                                            fontWeight: "500"
                                        }}>
                                            Tecnologias: {proj.technologies}
                                        </p>
                                    )}

                                    {/* Descrição */}
                                    {proj.description && (
                                        <p style={{
                                            whiteSpace: "pre-wrap",
                                            margin: "0",
                                            fontSize: "14px",
                                            lineHeight: "1.5"
                                        }}>
                                            {proj.description}
                                        </p>
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
                        <h2 style={{ color: themeColor, fontSize: "23px"}}>FORMAÇÃO ACADÊMICA</h2>
                        {educationList.map((edu) => {
                            if (!edu.position && !edu.company) return null;

                            const formatDate = (dateStr) => {
                                if (!dateStr) return "";
                                const date = new Date(dateStr + 'T00:00:00');
                                return date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
                                    .replace(/^\w/, (c) => c.toUpperCase());
                            };

                            return (
                                <div key={edu.id} >
                                    <h3 style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        fontSize: "clamp(12px, 2vw, 18px)"
                                    }}>
                                        {edu.position}
                                    </h3>

                                    <h3 style={{ fontSize: "0.9rem", color: "#666", fontWeight: "normal" }}>
                                        {edu.company}
                                        {(edu.startDate || edu.endDate) && (
                                            ` (${formatDate(edu.startDate)} - ${edu.endDate === "Atual" ? "Atual" : formatDate(edu.endDate)})`
                                        )}
                                        {/* Lógica do status de conclusão */}
                                        <span style={{
                                            marginLeft: "8px",
                                            fontStyle: "italic",
                                            color: edu.complete ? "#2e7d32" : "#ed6c02" // Verde para concluído, laranja para andamento
                                        }}>
                                            • {edu.complete ? "Concluído" : "Em andamento"}
                                        </span>
                                    </h3>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {skillsList.some(s => s.skill && s.skill.trim() !== "") && (
                <div className="curriculum-skills">
                    <h3 style={{ color: themeColor }}>HABILIDADES</h3>
                    <ul style={{
                        listStyleType: "disc",
                        paddingLeft: "20px",
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
                </div>
            )}
        </div>
    )
}