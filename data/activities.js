/* ACTIVITIES — lifestyle actions.
   9 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.activities = [
    {
      "id": "gym",
      "name": "Hit the Gym",
      "desc": "Build health and looks.",
      "minAge": 12,
      "eff": {
        "health": 4,
        "looks": 2,
        "happiness": 1
      },
      "resultText": "You worked out. Feeling stronger."
    },
    {
      "id": "meditate",
      "name": "Meditate",
      "desc": "Find inner peace.",
      "minAge": 8,
      "eff": {
        "happiness": 5,
        "health": 1
      },
      "resultText": "You meditated and feel centered."
    },
    {
      "id": "library",
      "name": "Read at the Library",
      "desc": "Boost your smarts.",
      "minAge": 6,
      "eff": {
        "smarts": 4,
        "happiness": 1
      },
      "resultText": "You read for hours. Smarter already."
    },
    {
      "id": "party",
      "name": "Go Partying",
      "desc": "Fun, but risky.",
      "minAge": 16,
      "outcomes": [
        {
          "w": 5,
          "eff": {
            "happiness": 8,
            "health": -2
          },
          "text": "Epic night out — you had a blast."
        },
        {
          "w": 2,
          "eff": {
            "happiness": 4,
            "health": -6
          },
          "text": "You partied too hard and felt awful after."
        },
        {
          "w": 1,
          "eff": {
            "happiness": -3,
            "health": -4,
            "karma": -2
          },
          "text": "The party got out of hand and you got in trouble."
        }
      ]
    },
    {
      "id": "spa",
      "name": "Spa Day",
      "desc": "Pamper yourself.",
      "minAge": 16,
      "cost": 300,
      "eff": {
        "happiness": 7,
        "looks": 3,
        "health": 2
      },
      "resultText": "The spa worked wonders."
    },
    {
      "id": "surgery",
      "name": "Plastic Surgery",
      "desc": "Enhance your looks.",
      "minAge": 18,
      "cost": 8000,
      "outcomes": [
        {
          "w": 7,
          "eff": {
            "looks": 14,
            "happiness": 5
          },
          "text": "The surgery was a success — you look amazing."
        },
        {
          "w": 2,
          "eff": {
            "looks": -10,
            "happiness": -10,
            "health": -8
          },
          "text": "The surgery went wrong. You regret it."
        }
      ]
    },
    {
      "id": "martialarts",
      "name": "Martial Arts Class",
      "desc": "Discipline and strength.",
      "minAge": 8,
      "cost": 200,
      "eff": {
        "health": 3,
        "happiness": 3,
        "smarts": 1
      },
      "resultText": "You earned a new belt."
    },
    {
      "id": "volunteer",
      "name": "Volunteer",
      "desc": "Good for the soul (and karma).",
      "minAge": 12,
      "eff": {
        "karma": 6,
        "happiness": 4
      },
      "resultText": "You gave back to the community."
    },
    {
      "id": "doctor_visit",
      "name": "See a Therapist",
      "desc": "Care for your mind.",
      "minAge": 12,
      "cost": 150,
      "eff": {
        "happiness": 8
      },
      "resultText": "Talking it out helped a lot."
    }
  ];
})();
