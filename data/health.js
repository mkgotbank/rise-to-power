/* HEALTH — conditions.
   10 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.health = [
    {
      "id": "cold",
      "name": "a bad cold",
      "kind": "illness",
      "severity": 1,
      "minAge": 0,
      "weight": 8,
      "onset": {
        "health": -4,
        "happiness": -2
      }
    },
    {
      "id": "asthma",
      "name": "asthma",
      "kind": "chronic",
      "severity": 1,
      "minAge": 2,
      "weight": 3,
      "onset": {
        "health": -6
      }
    },
    {
      "id": "anxiety",
      "name": "anxiety",
      "kind": "mental",
      "severity": 1,
      "minAge": 12,
      "weight": 4,
      "onset": {
        "happiness": -10,
        "health": -2
      }
    },
    {
      "id": "depression",
      "name": "depression",
      "kind": "mental",
      "severity": 2,
      "minAge": 14,
      "weight": 3,
      "onset": {
        "happiness": -18,
        "health": -4
      }
    },
    {
      "id": "obesity",
      "name": "obesity",
      "kind": "chronic",
      "severity": 2,
      "minAge": 16,
      "weight": 3,
      "onset": {
        "health": -10,
        "looks": -8
      }
    },
    {
      "id": "diabetes",
      "name": "type 2 diabetes",
      "kind": "chronic",
      "severity": 2,
      "minAge": 35,
      "weight": 3,
      "onset": {
        "health": -12
      }
    },
    {
      "id": "hypertension",
      "name": "high blood pressure",
      "kind": "chronic",
      "severity": 2,
      "minAge": 40,
      "weight": 4,
      "onset": {
        "health": -8
      }
    },
    {
      "id": "heartdisease",
      "name": "heart disease",
      "kind": "chronic",
      "severity": 3,
      "minAge": 50,
      "weight": 3,
      "onset": {
        "health": -18
      }
    },
    {
      "id": "cancer",
      "name": "cancer",
      "kind": "illness",
      "severity": 3,
      "minAge": 30,
      "weight": 2,
      "onset": {
        "health": -25,
        "happiness": -15
      }
    },
    {
      "id": "alcoholism",
      "name": "alcoholism",
      "kind": "addiction",
      "severity": 2,
      "minAge": 18,
      "weight": 2,
      "onset": {
        "health": -8,
        "happiness": -6
      }
    }
  ];
})();
