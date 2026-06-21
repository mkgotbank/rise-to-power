/* Countries — birthplace options. weight = relative birth likelihood. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.countries = [
    { name: 'United States', currency: '$', flag: '🇺🇸', lifeExp: 79, weight: 8, cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'] },
    { name: 'United Kingdom', currency: '£', flag: '🇬🇧', lifeExp: 81, weight: 5, cities: ['London', 'Manchester', 'Birmingham', 'Leeds'] },
    { name: 'Canada', currency: '$', flag: '🇨🇦', lifeExp: 82, weight: 4, cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'] },
    { name: 'Japan', currency: '¥', flag: '🇯🇵', lifeExp: 84, weight: 4, cities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'] },
    { name: 'Germany', currency: '€', flag: '🇩🇪', lifeExp: 81, weight: 4, cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne'] },
    { name: 'France', currency: '€', flag: '🇫🇷', lifeExp: 82, weight: 4, cities: ['Paris', 'Lyon', 'Marseille', 'Nice'] },
    { name: 'Brazil', currency: 'R$', flag: '🇧🇷', lifeExp: 76, weight: 5, cities: ['São Paulo', 'Rio de Janeiro', 'Brasília'] },
    { name: 'India', currency: '₹', flag: '🇮🇳', lifeExp: 70, weight: 8, cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'] },
    { name: 'Nigeria', currency: '₦', flag: '🇳🇬', lifeExp: 63, weight: 5, cities: ['Lagos', 'Abuja', 'Kano'] },
    { name: 'Mexico', currency: '$', flag: '🇲🇽', lifeExp: 75, weight: 5, cities: ['Mexico City', 'Guadalajara', 'Monterrey'] },
    { name: 'Australia', currency: '$', flag: '🇦🇺', lifeExp: 83, weight: 3, cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'] },
    { name: 'Italy', currency: '€', flag: '🇮🇹', lifeExp: 83, weight: 3, cities: ['Rome', 'Milan', 'Naples', 'Turin'] }
  ];
})();
