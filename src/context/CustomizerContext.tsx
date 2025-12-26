'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CustomizerConfig {
  activeDir: 'ltr' | 'rtl';
  activeMode: 'light' | 'dark';
  activeTheme: string;
  SidebarWidth: number;
  MiniSidebarWidth: number;
  TopbarHeight: number;
  isCollapse: boolean;
  isLayout: 'boxed' | 'full';
  isSidebarHover: boolean;
  isMobileSidebar: boolean;
  isHorizontal: boolean;
  isLanguage: string;
  isCardShadow: boolean;
  borderRadius: number;
}

const initialState: CustomizerConfig = {
  activeDir: 'ltr',
  activeMode: 'light',
  activeTheme: 'BLUE_THEME',
  SidebarWidth: 270,
  MiniSidebarWidth: 95,
  TopbarHeight: 70,
  isCollapse: false,
  isLayout: 'full',
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: 'en',
  isCardShadow: true,
  borderRadius: 7,
};

interface CustomizerContextType {
  customizer: CustomizerConfig;
  setCustomizer: React.Dispatch<React.SetStateAction<CustomizerConfig>>;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customizer, setCustomizer] = useState<CustomizerConfig>(initialState);

  return (
    <CustomizerContext.Provider value={{ customizer, setCustomizer }}>
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (context === undefined) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
