/* The world stage — nations the player (as head of state) can ally with,
   trade with, sanction, or conquer.
   Fields: id, name, flag, gdp, military(0-100), population, stability(0-100) */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.world = [
    { id: 'us', name: 'United States', flag: '🇺🇸', gdp: 25e12, military: 95, population: 332e6, stability: 70 },
    { id: 'cn', name: 'China', flag: '🇨🇳', gdp: 18e12, military: 88, population: 1.41e9, stability: 65 },
    { id: 'ru', name: 'Russia', flag: '🇷🇺', gdp: 2e12, military: 82, population: 144e6, stability: 48 },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', gdp: 3.1e12, military: 72, population: 67e6, stability: 72 },
    { id: 'fr', name: 'France', flag: '🇫🇷', gdp: 2.9e12, military: 70, population: 65e6, stability: 70 },
    { id: 'de', name: 'Germany', flag: '🇩🇪', gdp: 4.1e12, military: 68, population: 83e6, stability: 75 },
    { id: 'in', name: 'India', flag: '🇮🇳', gdp: 3.5e12, military: 78, population: 1.4e9, stability: 60 },
    { id: 'jp', name: 'Japan', flag: '🇯🇵', gdp: 4.2e12, military: 66, population: 125e6, stability: 76 },
    { id: 'br', name: 'Brazil', flag: '🇧🇷', gdp: 2e12, military: 55, population: 214e6, stability: 55 },
    { id: 'ng', name: 'Nigeria', flag: '🇳🇬', gdp: 0.5e12, military: 45, population: 218e6, stability: 42 },
    { id: 'mx', name: 'Mexico', flag: '🇲🇽', gdp: 1.4e12, military: 50, population: 128e6, stability: 50 },
    { id: 'au', name: 'Australia', flag: '🇦🇺', gdp: 1.7e12, military: 60, population: 26e6, stability: 78 }
  ];
})();
