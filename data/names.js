/* Names by country (falls back to `default`). Each entry: { male:[], female:[], last:[] } */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.names = {
    default: {
      male: ['Alex', 'Jordan', 'Sam', 'Chris', 'Jamie', 'Taylor', 'Morgan', 'Casey'],
      female: ['Alex', 'Jordan', 'Sam', 'Riley', 'Jamie', 'Taylor', 'Morgan', 'Casey'],
      last: ['Smith', 'Johnson', 'Lee', 'Brown', 'Garcia', 'Khan', 'Müller', 'Rossi']
    },
    'United States': {
      male: ['James', 'Michael', 'Robert', 'David', 'William', 'Daniel', 'Joseph', 'Anthony', 'Marcus', 'Tyler'],
      female: ['Mary', 'Jennifer', 'Linda', 'Patricia', 'Elizabeth', 'Jessica', 'Ashley', 'Amanda', 'Olivia', 'Sophia'],
      last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Thomas']
    },
    'United Kingdom': {
      male: ['Oliver', 'Harry', 'George', 'Jack', 'Charlie', 'Oscar', 'William', 'Thomas'],
      female: ['Olivia', 'Amelia', 'Isla', 'Emily', 'Poppy', 'Ava', 'Grace', 'Sophie'],
      last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Evans', 'Walsh']
    },
    Japan: {
      male: ['Haruto', 'Yuto', 'Sota', 'Yuki', 'Hayato', 'Ren', 'Kaito', 'Riku'],
      female: ['Yui', 'Aoi', 'Hina', 'Sakura', 'Mei', 'Akari', 'Rin', 'Yuna'],
      last: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura']
    },
    India: {
      male: ['Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Reyansh', 'Ishaan', 'Kabir', 'Rohan'],
      female: ['Saanvi', 'Aanya', 'Aadhya', 'Diya', 'Anaya', 'Pari', 'Myra', 'Riya'],
      last: ['Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Reddy', 'Khan']
    },
    Nigeria: {
      male: ['Chidi', 'Emeka', 'Tunde', 'Ade', 'Obi', 'Femi', 'Ifeanyi', 'Kunle'],
      female: ['Amara', 'Ngozi', 'Chioma', 'Folake', 'Yetunde', 'Ada', 'Zainab', 'Ife'],
      last: ['Okafor', 'Adeyemi', 'Okonkwo', 'Balogun', 'Eze', 'Abubakar', 'Ogunyemi', 'Nwosu']
    },
    Brazil: {
      male: ['Miguel', 'Arthur', 'Heitor', 'Gabriel', 'Bernardo', 'Davi', 'Lucas', 'Rafael'],
      female: ['Alice', 'Sophia', 'Helena', 'Valentina', 'Laura', 'Isabella', 'Manuela', 'Júlia'],
      last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Pereira', 'Costa', 'Almeida']
    }
  };
})();
