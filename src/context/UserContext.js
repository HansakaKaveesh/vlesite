// src/context/UserContext.js
"use client"; // Mark this file as a Client Component

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [syllabus, setSyllabus] = useState(null);
  const [courseLevel, setCourseLevel] = useState(null);

  const login = (userId, userData) => {
    setUserId(userId);
    setUsername(userData.username);
    setSubjects(userData.selectedSubjects);
    setSyllabus(userData.syllabus);
    setCourseLevel(userData.courseLevel);
  };

  const logout = () => {
    setUserId(null);
    setUsername(null);
    setSubjects([]);
    setSyllabus(null);
    setCourseLevel(null);
  };

  return (
    <UserContext.Provider value={{ userId, username, subjects, syllabus, courseLevel, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
