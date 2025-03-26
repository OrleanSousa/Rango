// filepath: c:\Users\orlea\Documents\workspace2\Rango-Main\Rango\src\components\Layout.tsx
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="container max-w-[375px]  lg:max-w-[650px]">
      {children}
    </div>
  );
}

export default Layout;