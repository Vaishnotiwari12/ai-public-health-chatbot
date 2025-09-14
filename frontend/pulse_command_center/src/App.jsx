import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import Icon from "./components/AppIcon";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
