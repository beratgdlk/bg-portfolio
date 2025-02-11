import React from 'react';
import './Terminal.scss';
import { ProfileData } from '../../types/Profile';

const profileData: ProfileData = {
  name: "Berat Gudelek",
  title: "Front-end developer",
  contact: {
    telephoneNum: "+90 538 059 15 16",
    email: "beratgdlk@gmail.com",
    githubLink: "https://github.com/beratgdlk",
    linkedinPage: "https://www.linkedin.com/in/beratgudelek/",
    mediumLink: "https://medium.com/@beratgdlk"
  }
};

const Terminal: React.FC = () => {
  return (
    <div className="terminal">
      <div className="terminal__content">
        <p className="intro-text">Hi all. I am</p>
        <h1 className="name">{profileData.name}</h1>
        <p className="title">&gt; {profileData.title}</p>
        
        <div className="contact-info">
          <p className="comment">// my number</p>
          <p className="const">telephoneNum</p><p> = "{profileData.contact.telephoneNum}";</p>
          
          <p className="comment">// my e-mail</p>
          <p className="const">email</p><p> = "{profileData.contact.email}";</p>
          
          <p className="comment">// you can also see it on my GitHub page</p>
          <p className="const">githubLink</p><p> = "{profileData.contact.githubLink}";</p>
          
          <p className="comment">// you can see my blog on Medium</p>
          <p className="const">mediumLink</p><p> = "{profileData.contact.mediumLink}";</p>
          
          <p className="comment">// you can check my LinkedIn page</p>
          <p className="const">linkedinPage</p><p> = "{profileData.contact.linkedinPage}";</p>
        </div>
      </div>

      <div className="terminal__footer">
        <div className="left-social">
          <a href={profileData.contact.linkedinPage} target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="right-social">
          <a href={profileData.contact.githubLink} target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Terminal;