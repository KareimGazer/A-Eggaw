import { useState, useEffect } from 'react';

function Navbar({ headline }) {
  const [light, dark] = ['nord', 'night'];
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
  };

  return (
    <nav className="navbar bg-base-100 px-4 py-2">
      <div className="flex-1">
        <a className="text-4xl font-bold text-cyan-500 font-dancing">{headline}</a>
      </div>
      <div className="flex-none">
        <button
          className="btn"
          onClick={toggleTheme}
        >
          {theme === light ? 'dark' : 'light'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
