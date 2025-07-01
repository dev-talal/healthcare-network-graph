import React, { Suspense, useEffect, useRef, useState } from "react";
const NetworkGraph = React.lazy(() => import('../components/HcpGraph'));
import SelectedProfile from "~/components/SelectedProfile";
import SpinnerLoader from "~/components/SpinnerLoader";

export function GraphLayout() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.clientWidth);
    }
  }, []);

  return (
    <main>
      <div className="flex h-screen bg-gray-50 overflow-x-hidden">
        <SelectedProfile ref={sidebarRef} />
        <Suspense fallback={<div className="flex-1 flex items-center justify-center"><SpinnerLoader /></div>}>
          <NetworkGraph leftContentSize={sidebarWidth} />
        </Suspense>
      </div>
    </main>
  );
}
