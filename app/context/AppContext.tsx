import React, { createContext, useContext, useState } from 'react';
import type { HCPLink, HCPNode } from '~/types/mockesType';

export const AppContext = createContext<{
  setSelectedNode: (node: any) => void;
  setSelectedLink: (link: any) => void;
  selectedNode: any;
  selectedLink: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}>({
  setSelectedNode: () => { },
  setSelectedLink: () => { },
  selectedNode: null,
  selectedLink: null,
  searchTerm: '',
  setSearchTerm: () => { },
  showSidebar: false,
  setShowSidebar: () => { }
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedNode, setSelectedNode] = useState<HCPNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<HCPLink | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={{
        setSelectedNode,
        setSelectedLink,
        selectedNode,
        selectedLink,
        searchTerm,
        setSearchTerm,
        showSidebar,
        setShowSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);