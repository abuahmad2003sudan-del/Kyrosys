import React, { createContext, useContext, useState, useEffect } from 'react';

interface MajesticModeContextType {
  isMajesticMode: boolean;
  toggleMajesticMode: () => void;
}

const MajesticModeContext = createContext<MajesticModeContextType>({
  isMajesticMode: false,
  toggleMajesticMode: () => {},
});

export const useMajesticMode = () => useContext(MajesticModeContext);

export const MajesticModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMajesticMode, setIsMajesticMode] = useState(false);

  const toggleMajesticMode = () => {
    setIsMajesticMode(prev => !prev);
  };

  useEffect(() => {
    if (isMajesticMode) {
      document.body.classList.add('majestic-mode');
    } else {
      document.body.classList.remove('majestic-mode');
    }
  }, [isMajesticMode]);

  return (
    <MajesticModeContext.Provider value={{ isMajesticMode, toggleMajesticMode }}>
      {children}
    </MajesticModeContext.Provider>
  );
};
