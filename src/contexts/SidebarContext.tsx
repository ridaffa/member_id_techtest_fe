import React, { createContext, Dispatch, useContext, useState } from 'react';

type SidebarType = {
  sidebar: boolean;
  setSidebar?: Dispatch<React.SetStateAction<boolean>>;
};

const initiateState: SidebarType = { sidebar: false };

const SidebarContext = createContext<SidebarType>(initiateState);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebar, setSidebar] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default function SidebarConsumer() {
  return useContext(SidebarContext);
}
