import { useState, useRef } from 'react';
import './App.css'
import Edit from "./components/edit/Edit"
import Header from "./components/header/Header"
import Curriculum from "./components/curriculum/Curriculum"
import Options from './components/options/Options'
import html2pdf from 'html2pdf.js';

function App() {
  const [themeColor, setThemeColor] = useState("#003366");
  const [contactList, setContactList] = useState([]);
  const [person, setPerson] = useState({ name: "", title: "", profile: "" });
  const [experienceList, setExperienceList] = useState([
    { id: Date.now(), position: "", company: "", startDate: "", endDate: "", description: "" }
  ]);
  const [educationList, setEducationList] = useState([
    { id: Date.now(), position: "", company: "", startDate: "", endDate: "" }
  ]);
  const [skillsList, setSkillsList] = useState([
    { id: Date.now(), skill: "" }
  ]);

  // Referência para o pdf do currículo
  const curriculumRef = useRef();

  //Função que muda o texto de um contato
  const handleColorChange = (newValue) => {
    setThemeColor(newValue);
  };

  //Função que muda o texto de um contato
  const handleContactChange = (id, newValue) => {
    setContactList(contactList.map(contact => {
      if (contact.id === id) {
        return { ...contact, value: newValue };
      }
      return contact;
    }));
  };

  const onUrlChange = (id, newValue) => {
    setContactList(contactList.map(contact => {
      if (contact.id === id) {
        return { ...contact, linkUrl: newValue };
      }
      return contact;
    }));
  };

  const deleteContact = (id) => {
    const updatedList = contactList.filter(contact => contact.id !== id);
    setContactList(updatedList);
  };

  const deleteExperience = (id) => {
    setExperienceList(experienceList.filter(exp => exp.id !== id));
  };

  const deleteEducation = (id) => {
    setEducationList(educationList.filter(edu => edu.id !== id));
  };

  const deleteSkill = (id) => {
    setSkillsList(skillsList.filter(skill => skill.id !== id));
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

  //Função para adicionar um novo objeto de experiência
  const addExperience = () => {
    const lastExp = experienceList[experienceList.length - 1];

    if (!lastExp || lastExp.position.trim() !== "") {
      const newExperience = {
        id: Date.now(),
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: ""
      };
      setExperienceList([...experienceList, newExperience]);
    } else {
      alert("Preencha o cargo da experiência anterior antes de adicionar uma nova.");
    }
  };

  //Função para adicionar um novo objeto de educação
  const addEducation = () => {
    const lastExp = educationList[educationList.length - 1];

    if (!lastExp || lastExp.position.trim() !== "") {
      const newEducation = {
        id: Date.now(),
        position: "",
        company: "",
        startDate: "",
        endDate: ""
      };
      setEducationList([...educationList, newEducation]);
    } else {
      alert("Preencha o cargo da educação anterior antes de adicionar uma nova.");
    }
  };

  //Função para adicionar um novo objeto de educação
  const addSkill = () => {
    const lastSkill = skillsList[skillsList.length - 1];

    if (!lastSkill || lastSkill.skill.trim() !== "") {
      const newSkill = {
        id: Date.now(),
        skill: ""
      };
      setSkillsList([...skillsList, newSkill]);
    } else {
      alert("Preencha a habilidade anterior antes de adicionar uma nova.");
    }
  };

  //Função para mudar um valor dinamico da experiencia na lista
  const handleExperienceChange = (id, field, value) => {
    setExperienceList(experienceList.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  //Função para mudar o valor dinamico da educação na lista
  const handleEducationChange = (id, field, value) => {
    setEducationList(educationList.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  //Função para mudar o valor dinamico da habilidade na lista
  const handleSkillChange = (id, field, value) => {
    setSkillsList(skillsList.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  //Função para mudar o valor dinamico da pessoa na lista
  const handlePersonChange = (field, value) => {
    setPerson({ ...person, [field]: value });
  };


  //Função que adiciona um novo contato em contactList
  function addInput() {
    const hasEmptyInput = contactList.some(contact => contact.value.trim() === "");

    if (!hasEmptyInput) {

      const newContact = {
        id: Date.now(),
        value: "",
        isLink: false,
        linkUrl: ""
      };

      setContactList([...contactList, newContact]);
    } else {
      alert("Por favor, preencha os campos de contato vazios antes de adicionar um novo.");
    }
  }

  const downloadPDF = () => {
    const element = curriculumRef.current;

    const originalStyle = element.style.width;
    element.style.width = "210mm";
    element.style.minHeight = "292mm";

    const opt = {
      margin: 0,
      filename: 'meu-curriculo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        windowWidth: 1000
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .get('pdf')
      .save()
      .then(() => {
        element.style.width = originalStyle;
        element.style.minHeight = "";
      });
  };

  return (
    <>
      <Header />
      <Edit
        contactList={contactList}
        onContactChange={handleContactChange}
        deleteContact={deleteContact}
        person={person}
        onPersonChange={handlePersonChange}
        experienceList={experienceList}
        onExperienceChange={handleExperienceChange}
        deleteExperience={deleteExperience}
        educationList={educationList}
        onEducationChange={handleEducationChange}
        deleteEducation={deleteEducation}
        skillsList={skillsList}
        onSkillsChange={handleSkillChange}
        deleteSkill={deleteSkill}
        addEducation={addEducation}
        addInput={addInput}
        addSkill={addSkill}
        addExperience={addExperience}
        handleLinkToggle={handleLinkToggle}
        onUrlChange={onUrlChange}
      />
      <div ref={curriculumRef}>
        <Curriculum
          contactList={contactList}
          person={person}
          experienceList={experienceList}
          educationList={educationList}
          skillsList={skillsList}
          themeColor={themeColor}
        />
      </div>
      <Options
        themeColor={themeColor}
        handleColorChange={handleColorChange}
        handleDownload={downloadPDF}
      />
    </>
  )
}

export default App
