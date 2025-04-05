import React, { createContext, useContext } from 'react';
import { ProfileData } from '../types/Profile';

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

const ProfileContext = createContext<ProfileData>(profileData);

export const ProfileProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext); 