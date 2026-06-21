/* MISSIONS — military & agency ops.
   11 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.missions = [
    {
      "id": "patrol",
      "name": "Border Patrol",
      "branch": "any",
      "minRank": 0,
      "difficulty": 30,
      "reward": 3500,
      "kills": 0,
      "lethal": 0.04
    },
    {
      "id": "convoy",
      "name": "Convoy Escort",
      "branch": "army",
      "minRank": 0,
      "difficulty": 40,
      "reward": 5000,
      "kills": 0,
      "lethal": 0.08
    },
    {
      "id": "raid",
      "name": "Compound Raid",
      "branch": "any",
      "minRank": 1,
      "difficulty": 60,
      "reward": 12000,
      "kills": 2,
      "lethal": 0.16,
      "medal": "Bronze Star"
    },
    {
      "id": "hostage",
      "name": "Hostage Rescue",
      "branch": "any",
      "minRank": 2,
      "difficulty": 68,
      "reward": 18000,
      "kills": 3,
      "lethal": 0.2,
      "medal": "Silver Star"
    },
    {
      "id": "blockade",
      "name": "Naval Blockade",
      "branch": "navy",
      "minRank": 1,
      "difficulty": 55,
      "reward": 9000,
      "kills": 0,
      "lethal": 0.1
    },
    {
      "id": "airstrike",
      "name": "Precision Airstrike",
      "branch": "air",
      "minRank": 1,
      "difficulty": 58,
      "reward": 11000,
      "kills": 0,
      "lethal": 0.09
    },
    {
      "id": "dogfight",
      "name": "Dogfight",
      "branch": "air",
      "minRank": 2,
      "difficulty": 70,
      "reward": 16000,
      "kills": 1,
      "lethal": 0.22,
      "medal": "Flying Cross"
    },
    {
      "id": "recon",
      "name": "Deep Recon",
      "branch": "agency",
      "minRank": 0,
      "difficulty": 50,
      "reward": 8000,
      "kills": 0,
      "lethal": 0.1
    },
    {
      "id": "infiltrate",
      "name": "Infiltrate a Cartel",
      "branch": "agency",
      "minRank": 1,
      "difficulty": 66,
      "reward": 22000,
      "kills": 0,
      "lethal": 0.18,
      "medal": "Intelligence Star"
    },
    {
      "id": "assassinate",
      "name": "Eliminate a Warlord",
      "branch": "agency",
      "minRank": 2,
      "difficulty": 78,
      "reward": 50000,
      "kills": 1,
      "lethal": 0.3,
      "medal": "Distinguished Service"
    },
    {
      "id": "extract",
      "name": "Extract an Asset",
      "branch": "agency",
      "minRank": 1,
      "difficulty": 60,
      "reward": 15000,
      "kills": 0,
      "lethal": 0.14
    }
  ];
})();
