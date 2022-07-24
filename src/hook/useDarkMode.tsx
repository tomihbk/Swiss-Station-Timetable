import { useEffect, useState } from "react";

export const useDarkMode = (): readonly ["dark" | "light", React.Dispatch<any>] => {
  
    // Checks if users system theme preference is dark
  const detectedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';

  const [theme, setTheme] = useState(localStorage.theme || detectedTheme);

  const colorTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    root.style.colorScheme = theme;

    localStorage.setItem("theme", theme);
  });

  return [colorTheme, setTheme] as const;
};
