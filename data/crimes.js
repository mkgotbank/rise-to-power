/* CRIMES — committable offenses.
   7 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.crimes = [
    {
      "id": "pickpocket",
      "name": "Pickpocket",
      "desc": "Lift a wallet from a stranger.",
      "minAge": 12,
      "difficulty": 30,
      "lootMin": 20,
      "lootMax": 400,
      "karma": -3,
      "noto": 2,
      "catchChance": 0.35,
      "minSentence": 1,
      "maxSentence": 2
    },
    {
      "id": "shoplift",
      "name": "Shoplift",
      "desc": "Walk out without paying.",
      "minAge": 12,
      "difficulty": 25,
      "lootMin": 30,
      "lootMax": 600,
      "karma": -3,
      "noto": 2,
      "catchChance": 0.4,
      "minSentence": 1,
      "maxSentence": 2
    },
    {
      "id": "burglary",
      "name": "Burglary",
      "desc": "Break into a house.",
      "minAge": 16,
      "difficulty": 45,
      "lootMin": 500,
      "lootMax": 8000,
      "karma": -6,
      "noto": 5,
      "catchChance": 0.45,
      "minSentence": 2,
      "maxSentence": 6
    },
    {
      "id": "gta",
      "name": "Grand Theft Auto",
      "desc": "Steal a car.",
      "minAge": 16,
      "difficulty": 50,
      "lootMin": 2000,
      "lootMax": 30000,
      "karma": -6,
      "noto": 7,
      "catchChance": 0.5,
      "minSentence": 3,
      "maxSentence": 8
    },
    {
      "id": "fraud",
      "name": "Wire Fraud",
      "desc": "Run a financial scam.",
      "minAge": 21,
      "difficulty": 60,
      "lootMin": 5000,
      "lootMax": 120000,
      "karma": -7,
      "noto": 6,
      "catchChance": 0.4,
      "minSentence": 4,
      "maxSentence": 12,
      "cond": {
        "minStat": {
          "smarts": 50
        }
      }
    },
    {
      "id": "bankrobbery",
      "name": "Bank Robbery",
      "desc": "Hit a bank vault.",
      "minAge": 18,
      "difficulty": 70,
      "lootMin": 20000,
      "lootMax": 500000,
      "karma": -9,
      "noto": 12,
      "catchChance": 0.55,
      "minSentence": 8,
      "maxSentence": 25
    },
    {
      "id": "extortion",
      "name": "Extortion",
      "desc": "Shake down a business.",
      "minAge": 18,
      "difficulty": 55,
      "lootMin": 3000,
      "lootMax": 60000,
      "karma": -8,
      "noto": 9,
      "catchChance": 0.45,
      "minSentence": 4,
      "maxSentence": 10,
      "cond": {
        "hasFlag": "gangMember"
      }
    }
  ];
})();
