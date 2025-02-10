import React from 'react';
import './Terminal.scss';
import { ProfileData } from '../../types/Profile';

const profileData: ProfileData = {
  name: "Berat Gudelek",
  title: "Front-end developer",
  contact: {
    telephoneNum: "392 86 88 006",
    email: "davide_simone1996@proton.me",
    githubLink: "https://github.com/beratgdlk",
    behanceLink: "https://www.behance.net/davidefemale",
    linkedinPage: "https://www.linkedin.com/in/davide-simone-a2823619a/"
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
          <p className="const">const telephoneNum = "{profileData.contact.telephoneNum}";</p>
          
          <p className="comment">// my e-mail</p>
          <p className="const">const email = "{profileData.contact.email}";</p>
          
          <p className="comment">// you can also see it on my GitHub page</p>
          <p className="const">const githubLink = "{profileData.contact.githubLink}";</p>
          
          <p className="comment">// you can also see my projects on Behance</p>
          <p className="const">const behanceLink = "{profileData.contact.behanceLink}";</p>
          
          <p className="comment">// you can check my LinkedIn page</p>
          <p className="const">const linkedinPage = "{profileData.contact.linkedinPage}";</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;