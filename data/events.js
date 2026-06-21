/* EVENTS — random life-event pool.
   213 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.events = [
    {
      "id": "imaginary_friend",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "You have an imaginary friend who follows you everywhere.",
      "cond": {
        "minAge": 3,
        "maxAge": 7
      },
      "eff": {
        "happiness": 4,
        "smarts": 1
      }
    },
    {
      "id": "lemonade_stand",
      "cat": "childhood",
      "type": "money",
      "weight": 5,
      "text": "You want to run a lemonade stand this summer.",
      "cond": {
        "minAge": 6,
        "maxAge": 11
      },
      "choices": [
        {
          "text": "Run it by yourself",
          "outcomes": [
            {
              "w": 3,
              "text": "You made a tidy profit!",
              "eff": {
                "money": 40,
                "smarts": 2,
                "happiness": 4
              }
            },
            {
              "w": 1,
              "text": "Nobody bought any. Lesson learned.",
              "eff": {
                "happiness": -2
              }
            }
          ]
        },
        {
          "text": "Ask mom to help",
          "eff": {
            "money": 70,
            "happiness": 5,
            "rel": {
              "mother": 5
            }
          }
        },
        {
          "text": "Forget the whole idea",
          "eff": {
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "school_bully",
      "cat": "childhood",
      "type": "school",
      "weight": 5,
      "text": "A bully at school is picking on you.",
      "cond": {
        "minAge": 7,
        "maxAge": 13
      },
      "choices": [
        {
          "text": "Stand up to them",
          "outcomes": [
            {
              "w": 2,
              "text": "You stood your ground and earned respect.",
              "eff": {
                "happiness": 6,
                "looks": 1
              }
            },
            {
              "w": 2,
              "text": "It turned into a fight and you got hurt.",
              "eff": {
                "health": -6,
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Tell a teacher",
          "eff": {
            "happiness": 2,
            "karma": 2
          }
        },
        {
          "text": "Take it quietly",
          "eff": {
            "happiness": -7
          }
        }
      ]
    },
    {
      "id": "found_money",
      "cat": "childhood",
      "type": "money",
      "weight": 3,
      "text": "You found {currency} on the sidewalk!",
      "cond": {
        "minAge": 5,
        "maxAge": 12
      },
      "eff": {
        "money": 20,
        "happiness": 3
      }
    },
    {
      "id": "pet_chance",
      "cat": "childhood",
      "type": "family",
      "weight": 4,
      "text": "Your parents say you can get a pet.",
      "cond": {
        "minAge": 6,
        "maxAge": 14,
        "noKids": false
      },
      "choices": [
        {
          "text": "Get a dog",
          "eff": {
            "happiness": 9,
            "addAsset": {
              "kind": "possession",
              "name": "Pet Dog",
              "value": 0
            }
          }
        },
        {
          "text": "Get a cat",
          "eff": {
            "happiness": 7,
            "addAsset": {
              "kind": "possession",
              "name": "Pet Cat",
              "value": 0
            }
          }
        },
        {
          "text": "No thanks",
          "eff": {}
        }
      ]
    },
    {
      "id": "first_crush",
      "cat": "teen",
      "type": "love",
      "weight": 5,
      "text": "You have a huge crush on someone at school.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "single": true
      },
      "choices": [
        {
          "text": "Confess your feelings",
          "outcomes": [
            {
              "w": 2,
              "text": "They like you back!",
              "eff": {
                "happiness": 12,
                "looks": 2
              }
            },
            {
              "w": 3,
              "text": "They let you down gently.",
              "eff": {
                "happiness": -6
              }
            }
          ]
        },
        {
          "text": "Keep it to yourself",
          "eff": {
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "sports_team",
      "cat": "teen",
      "type": "school",
      "weight": 4,
      "text": "Tryouts for the school sports team are happening.",
      "cond": {
        "minAge": 13,
        "maxAge": 18
      },
      "choices": [
        {
          "text": "Try out",
          "outcomes": [
            {
              "w": 1,
              "text": "You made the team and became a star!",
              "eff": {
                "health": 8,
                "happiness": 8,
                "looks": 3
              }
            },
            {
              "w": 1,
              "text": "You got cut from the team.",
              "eff": {
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Skip it",
          "eff": {}
        }
      ]
    },
    {
      "id": "peer_pressure",
      "cat": "teen",
      "type": "crime",
      "weight": 4,
      "text": "Your friends dare you to shoplift something.",
      "cond": {
        "minAge": 14,
        "maxAge": 18
      },
      "choices": [
        {
          "text": "Do it",
          "outcomes": [
            {
              "w": 3,
              "text": "You got away with it.",
              "eff": {
                "karma": -5,
                "happiness": 3,
                "notoriety": 2
              }
            },
            {
              "w": 2,
              "text": "You got caught by security!",
              "eff": {
                "karma": -6,
                "happiness": -10,
                "notoriety": 4
              }
            }
          ]
        },
        {
          "text": "Refuse",
          "eff": {
            "karma": 3,
            "rel": {
              "friend": -3
            }
          }
        }
      ]
    },
    {
      "id": "part_time_job",
      "cat": "teen",
      "type": "money",
      "weight": 3,
      "text": "A local shop is hiring part-time. Want to earn some cash?",
      "cond": {
        "minAge": 15,
        "maxAge": 18,
        "noJob": true
      },
      "eff": {
        "money": 600,
        "happiness": 2,
        "smarts": 1
      }
    },
    {
      "id": "tax_audit",
      "cat": "adult",
      "type": "money",
      "weight": 2,
      "text": "You are being audited by the tax authority.",
      "cond": {
        "minAge": 21,
        "minMoney": 5000
      },
      "choices": [
        {
          "text": "Cooperate fully",
          "eff": {
            "money": -2000,
            "happiness": -3
          }
        },
        {
          "text": "Try to hide income",
          "outcomes": [
            {
              "w": 2,
              "text": "You got away with it.",
              "eff": {
                "karma": -4
              }
            },
            {
              "w": 2,
              "text": "They caught you — big fine.",
              "eff": {
                "money": -8000,
                "karma": -4,
                "happiness": -8
              }
            }
          ]
        }
      ]
    },
    {
      "id": "old_friend",
      "cat": "adult",
      "type": "family",
      "weight": 3,
      "text": "An old friend reaches out wanting to reconnect.",
      "cond": {
        "minAge": 22
      },
      "choices": [
        {
          "text": "Meet up",
          "eff": {
            "happiness": 6
          }
        },
        {
          "text": "Ignore them",
          "eff": {
            "happiness": -1,
            "karma": -1
          }
        }
      ]
    },
    {
      "id": "investment_tip",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "Someone gives you a \"can't-miss\" investment tip.",
      "cond": {
        "minAge": 21,
        "minMoney": 1000
      },
      "choices": [
        {
          "text": "Invest big",
          "outcomes": [
            {
              "w": 2,
              "text": "It paid off handsomely!",
              "eff": {
                "moneyMul": 1.4
              }
            },
            {
              "w": 3,
              "text": "It was a scam. You lost money.",
              "eff": {
                "moneyMul": 0.7,
                "happiness": -8
              }
            }
          ]
        },
        {
          "text": "Pass on it",
          "eff": {}
        }
      ]
    },
    {
      "id": "midlife_crisis",
      "cat": "adult",
      "type": "event",
      "weight": 2,
      "text": "You're having a midlife crisis.",
      "once": true,
      "cond": {
        "minAge": 40,
        "maxAge": 55
      },
      "choices": [
        {
          "text": "Buy a sports car",
          "eff": {
            "money": -45000,
            "happiness": 10,
            "addAsset": {
              "kind": "car",
              "name": "Sports Car",
              "value": 45000
            }
          }
        },
        {
          "text": "Take up a new hobby",
          "eff": {
            "happiness": 7,
            "smarts": 2
          }
        },
        {
          "text": "Power through it",
          "eff": {
            "happiness": -4
          }
        }
      ]
    },
    {
      "id": "promotion_offer",
      "cat": "work",
      "type": "money",
      "weight": 3,
      "text": "Your boss hints at a promotion if you relocate.",
      "cond": {
        "hasJob": true,
        "minAge": 25
      },
      "choices": [
        {
          "text": "Accept the move",
          "eff": {
            "salaryMul": 1.3,
            "happiness": -3
          }
        },
        {
          "text": "Stay put",
          "eff": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "flu_season",
      "cat": "random",
      "type": "health",
      "weight": 3,
      "text": "Flu season hit you hard this year.",
      "cond": {
        "minAge": 2
      },
      "eff": {
        "health": -6,
        "happiness": -3
      }
    },
    {
      "id": "gym_injury",
      "cat": "random",
      "type": "health",
      "weight": 2,
      "text": "You hurt yourself working out.",
      "cond": {
        "minAge": 16,
        "minStat": {
          "health": 0
        }
      },
      "eff": {
        "health": -8
      }
    },
    {
      "id": "grandkids_visit",
      "cat": "elder",
      "type": "family",
      "weight": 4,
      "text": "Your grandchildren came to visit!",
      "cond": {
        "minAge": 60,
        "hasKids": true
      },
      "eff": {
        "happiness": 12,
        "health": 1
      }
    },
    {
      "id": "retirement_reflection",
      "cat": "elder",
      "type": "event",
      "weight": 2,
      "text": "You reflect on a long life well lived.",
      "cond": {
        "minAge": 65
      },
      "eff": {
        "happiness": 6
      }
    },
    {
      "id": "good_samaritan",
      "cat": "random",
      "type": "event",
      "weight": 2,
      "text": "You helped a stranger in need.",
      "cond": {
        "minAge": 10
      },
      "eff": {
        "karma": 5,
        "happiness": 4
      }
    },
    {
      "id": "lottery_ticket",
      "cat": "random",
      "type": "money",
      "weight": 2,
      "text": "You bought a lottery ticket on a whim.",
      "cond": {
        "minAge": 18,
        "minMoney": 5
      },
      "choices": [
        {
          "text": "Scratch it",
          "outcomes": [
            {
              "w": 1,
              "text": "JACKPOT! You won big!",
              "eff": {
                "money": 250000,
                "happiness": 25
              }
            },
            {
              "w": 12,
              "text": "Not a winner. Oh well.",
              "eff": {
                "money": -5
              }
            }
          ]
        }
      ]
    },
    {
      "id": "viral_moment",
      "cat": "random",
      "type": "event",
      "weight": 2,
      "text": "A video of you started going viral online.",
      "cond": {
        "minAge": 14
      },
      "eff": {
        "fame": 4,
        "followers": 5000,
        "happiness": 5
      }
    },
    {
      "id": "adult_promotion_offer",
      "cat": "adult",
      "type": "money",
      "weight": 4,
      "text": "Your manager pulls you aside. There's a senior role opening up, but it means longer hours and managing your old teammates.",
      "cond": {
        "minAge": 26,
        "maxAge": 50,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Go for it",
          "outcomes": [
            {
              "w": 6,
              "text": "You nail the interview and get the promotion.",
              "eff": {
                "salaryMul": 1.2,
                "happiness": 8,
                "respect": 6
              }
            },
            {
              "w": 4,
              "text": "They pick someone else, but they noticed your hunger.",
              "eff": {
                "happiness": -6,
                "respect": 3,
                "rel": {
                  "boss": 4
                }
              }
            }
          ]
        },
        {
          "text": "Stay in your lane",
          "eff": {
            "happiness": 4,
            "salaryMul": 1
          }
        },
        {
          "text": "Use it as leverage for a raise",
          "outcomes": [
            {
              "w": 5,
              "text": "They bump your pay to keep you happy.",
              "eff": {
                "salary": 6000,
                "respect": 2
              }
            },
            {
              "w": 5,
              "text": "They call your bluff and you look greedy.",
              "eff": {
                "rel": {
                  "boss": -8
                },
                "respect": -4
              }
            }
          ]
        }
      ]
    },
    {
      "id": "adult_burnout_wall",
      "cat": "adult",
      "type": "health",
      "weight": 4,
      "text": "You've been running on caffeine and adrenaline for months. This morning you simply could not get out of bed.",
      "cond": {
        "minAge": 28,
        "maxAge": 50,
        "hasJob": true,
        "maxStat": {
          "happiness": 45
        }
      },
      "choices": [
        {
          "text": "Take a real two-week break",
          "eff": {
            "health": 10,
            "happiness": 14,
            "money": -1500
          }
        },
        {
          "text": "Push through it",
          "outcomes": [
            {
              "w": 5,
              "text": "You grind on, but something feels broken inside.",
              "eff": {
                "health": -10,
                "happiness": -8,
                "addCondition": "burnout"
              }
            },
            {
              "w": 5,
              "text": "You somehow find a second wind.",
              "eff": {
                "happiness": -3,
                "respect": 3
              }
            }
          ]
        },
        {
          "text": "Quit on the spot",
          "outcomes": [
            {
              "w": 4,
              "text": "Liberation! Terrifying, glorious liberation.",
              "eff": {
                "happiness": 16,
                "loseAssetKind": "none",
                "salaryMul": 0,
                "addTrait": "free spirit"
              }
            },
            {
              "w": 6,
              "text": "You quit with no plan. The bills don't.",
              "eff": {
                "happiness": -4,
                "money": -800,
                "salaryMul": 0
              }
            }
          ]
        }
      ]
    },
    {
      "id": "adult_first_mortgage",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "The bank approved you for a mortgage. A modest house in {city} could finally be yours.",
      "cond": {
        "minAge": 27,
        "maxAge": 48,
        "minMoney": 20000,
        "hasJob": true,
        "notFlag": "homeowner"
      },
      "choices": [
        {
          "text": "Buy the house",
          "eff": {
            "money": -20000,
            "happiness": 12,
            "addAsset": {
              "kind": "realestate",
              "name": "Starter Home",
              "value": 250000
            },
            "flag": {
              "homeowner": true
            }
          }
        },
        {
          "text": "Keep renting and stay flexible",
          "eff": {
            "happiness": 2,
            "money": 1000
          }
        }
      ]
    },
    {
      "id": "adult_wedding_proposal",
      "cat": "adult",
      "type": "love",
      "weight": 4,
      "text": "You've been with {him} for years. Tonight feels right. You reach for the small velvet box in your pocket.",
      "cond": {
        "minAge": 26,
        "maxAge": 45,
        "single": true,
        "hasPartnerKind": "partner"
      },
      "choices": [
        {
          "text": "Propose",
          "outcomes": [
            {
              "w": 7,
              "text": "They say yes through happy tears.",
              "eff": {
                "happiness": 20,
                "rel": {
                  "partner": 15
                }
              }
            },
            {
              "w": 3,
              "text": "They say they're not ready. The silence is deafening.",
              "eff": {
                "happiness": -16,
                "rel": {
                  "partner": -10
                }
              }
            }
          ]
        },
        {
          "text": "Put the box back. Not yet.",
          "eff": {
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "adult_new_baby",
      "cat": "adult",
      "type": "family",
      "weight": 3,
      "text": "Two pink lines. You and your spouse stare at the test, then at each other.",
      "cond": {
        "minAge": 26,
        "maxAge": 44,
        "married": true,
        "noKids": true
      },
      "eff": {
        "happiness": 14,
        "money": -5000,
        "health": -3,
        "rel": {
          "partner": 8
        }
      }
    },
    {
      "id": "adult_toddler_meltdown",
      "cat": "adult",
      "type": "family",
      "weight": 4,
      "text": "Your toddler is having a category-five meltdown in the cereal aisle because the box is the wrong shade of blue.",
      "cond": {
        "minAge": 27,
        "maxAge": 48,
        "hasKids": true
      },
      "choices": [
        {
          "text": "Stay calm and validate the feelings",
          "eff": {
            "happiness": 4,
            "smarts": 1,
            "rel": {
              "child": 4
            }
          }
        },
        {
          "text": "Cave and buy three boxes",
          "eff": {
            "money": -25,
            "happiness": 2
          }
        },
        {
          "text": "Abandon the cart and walk out",
          "outcomes": [
            {
              "w": 5,
              "text": "Tactical retreat. The whole store applauds your wisdom.",
              "eff": {
                "happiness": 3
              }
            },
            {
              "w": 5,
              "text": "You forgot you needed those groceries for tonight.",
              "eff": {
                "happiness": -3,
                "money": -15
              }
            }
          ]
        }
      ]
    },
    {
      "id": "adult_side_hustle_launch",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "You've got a weekend idea that won't leave you alone. You could put real money behind it.",
      "cond": {
        "minAge": 26,
        "maxAge": 50,
        "minMoney": 2000
      },
      "choices": [
        {
          "text": "Invest $3,000 and launch",
          "outcomes": [
            {
              "w": 2,
              "text": "It takes off! Orders are flooding in.",
              "eff": {
                "money": 12000,
                "happiness": 12,
                "salary": 4000,
                "addTrait": "entrepreneur"
              }
            },
            {
              "w": 4,
              "text": "Slow but steady — beer money, not yacht money.",
              "eff": {
                "money": 1500,
                "happiness": 4
              }
            },
            {
              "w": 4,
              "text": "It flops. The garage is full of unsold inventory.",
              "eff": {
                "money": -3000,
                "happiness": -5
              }
            }
          ]
        },
        {
          "text": "Keep it a daydream",
          "eff": {
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "adult_friend_drift",
      "cat": "adult",
      "type": "event",
      "weight": 4,
      "text": "Your best friend from your twenties hasn't replied in months. You realize you've quietly drifted apart.",
      "cond": {
        "minAge": 30,
        "maxAge": 50
      },
      "choices": [
        {
          "text": "Plan a reunion trip",
          "outcomes": [
            {
              "w": 6,
              "text": "You pick up exactly where you left off.",
              "eff": {
                "happiness": 12,
                "money": -600,
                "rel": {
                  "friend": 12
                }
              }
            },
            {
              "w": 4,
              "text": "It's pleasant but you're different people now.",
              "eff": {
                "happiness": 2,
                "money": -600
              }
            }
          ]
        },
        {
          "text": "Let it fade. People grow apart.",
          "eff": {
            "happiness": -6
          }
        }
      ]
    },
    {
      "id": "adult_midlife_question",
      "cat": "adult",
      "type": "event",
      "weight": 3,
      "text": "Lying awake at 3am, a thought lands hard: is this the life you actually wanted?",
      "cond": {
        "minAge": 38,
        "maxAge": 50
      },
      "choices": [
        {
          "text": "Blow it up — quit, move, reinvent",
          "outcomes": [
            {
              "w": 4,
              "text": "A bold new chapter. You feel alive again.",
              "eff": {
                "happiness": 16,
                "salaryMul": 0.8,
                "addTrait": "reinvented"
              }
            },
            {
              "w": 6,
              "text": "Chaos. You miss the stability you torched.",
              "eff": {
                "happiness": -8,
                "money": -4000
              }
            }
          ]
        },
        {
          "text": "Buy a flashy convertible",
          "eff": {
            "money": -35000,
            "happiness": 8,
            "looks": 2,
            "addAsset": {
              "kind": "car",
              "name": "Midlife Convertible",
              "value": 35000
            }
          }
        },
        {
          "text": "Make peace with your choices",
          "eff": {
            "happiness": 6,
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "adult_layoff_news",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "A surprise all-hands meeting. The slide just says 'Restructuring.' Your stomach drops.",
      "cond": {
        "minAge": 28,
        "maxAge": 50,
        "hasJob": true
      },
      "eff": {}
    },
    {
      "id": "adult_office_romance",
      "cat": "adult",
      "type": "love",
      "weight": 3,
      "text": "There's undeniable chemistry with a coworker. HR would have opinions.",
      "cond": {
        "minAge": 26,
        "maxAge": 45,
        "single": true,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Shoot your shot",
          "outcomes": [
            {
              "w": 5,
              "text": "Sparks fly. You're officially a couple.",
              "eff": {
                "happiness": 12,
                "addCondition": "in_relationship"
              }
            },
            {
              "w": 5,
              "text": "It gets awkward and the gossip mill spins.",
              "eff": {
                "happiness": -6,
                "respect": -3
              }
            }
          ]
        },
        {
          "text": "Keep it strictly professional",
          "eff": {
            "respect": 3,
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "adult_aging_parent",
      "cat": "adult",
      "type": "family",
      "weight": 3,
      "text": "Your mother calls. She's been having dizzy spells and won't admit she needs help.",
      "cond": {
        "minAge": 35,
        "maxAge": 50
      },
      "choices": [
        {
          "text": "Move her in with you",
          "eff": {
            "money": -3000,
            "happiness": 4,
            "health": -2,
            "rel": {
              "mother": 14
            },
            "karma": 8
          }
        },
        {
          "text": "Pay for a caregiver",
          "eff": {
            "money": -8000,
            "rel": {
              "mother": 8
            },
            "karma": 5
          }
        },
        {
          "text": "Tell yourself she's fine",
          "eff": {
            "rel": {
              "mother": -10
            },
            "karma": -6,
            "happiness": -4
          }
        }
      ]
    },
    {
      "id": "adult_marriage_rut",
      "cat": "adult",
      "type": "love",
      "weight": 3,
      "text": "You and your spouse haven't really talked in weeks. The silence at dinner has gotten loud.",
      "cond": {
        "minAge": 30,
        "maxAge": 50,
        "married": true
      },
      "choices": [
        {
          "text": "Book couples counseling",
          "outcomes": [
            {
              "w": 7,
              "text": "Hard conversations, but you find each other again.",
              "eff": {
                "happiness": 10,
                "money": -1200,
                "rel": {
                  "partner": 12
                }
              }
            },
            {
              "w": 3,
              "text": "Counseling reveals you want different things.",
              "eff": {
                "happiness": -8,
                "rel": {
                  "partner": -6
                }
              }
            }
          ]
        },
        {
          "text": "Plan a surprise getaway",
          "eff": {
            "money": -2000,
            "happiness": 8,
            "rel": {
              "partner": 8
            }
          }
        },
        {
          "text": "Hope it sorts itself out",
          "eff": {
            "rel": {
              "partner": -8
            },
            "happiness": -4
          }
        }
      ]
    },
    {
      "id": "adult_gym_resolution",
      "cat": "adult",
      "type": "health",
      "weight": 4,
      "text": "You signed up for a gym membership with the fire of a thousand suns.",
      "cond": {
        "minAge": 26,
        "maxAge": 50
      },
      "eff": {}
    },
    {
      "id": "adult_inheritance_modest",
      "cat": "adult",
      "type": "money",
      "weight": 2,
      "text": "A great-aunt you barely knew left you something in her will.",
      "cond": {
        "minAge": 35,
        "maxAge": 50
      },
      "eff": {}
    },
    {
      "id": "adult_diy_disaster",
      "cat": "adult",
      "type": "event",
      "weight": 4,
      "text": "You watched one video and decided you could absolutely retile the bathroom yourself.",
      "cond": {
        "minAge": 27,
        "maxAge": 50,
        "hasFlag": "homeowner"
      },
      "eff": {}
    },
    {
      "id": "adult_school_volunteer",
      "cat": "adult",
      "type": "family",
      "weight": 3,
      "text": "Your kid's school is begging for parent volunteers for the fundraiser.",
      "cond": {
        "minAge": 30,
        "maxAge": 50,
        "hasKids": true
      },
      "choices": [
        {
          "text": "Sign up to run the bake sale",
          "eff": {
            "happiness": 4,
            "respect": 4,
            "rel": {
              "child": 6
            },
            "karma": 4
          }
        },
        {
          "text": "Quietly donate and skip the duty",
          "eff": {
            "money": -150,
            "rel": {
              "child": 1
            }
          }
        },
        {
          "text": "Pretend the email went to spam",
          "eff": {
            "rel": {
              "child": -4
            },
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "adult_promotion_burnout_combo",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "They offered you the corner office, but everyone who's had it left within a year, exhausted.",
      "cond": {
        "minAge": 30,
        "maxAge": 50,
        "hasJob": true,
        "minStat": {
          "smarts": 60
        }
      },
      "choices": [
        {
          "text": "Accept the climb",
          "outcomes": [
            {
              "w": 5,
              "text": "You thrive where others crumbled.",
              "eff": {
                "salaryMul": 1.35,
                "respect": 8,
                "happiness": -4
              }
            },
            {
              "w": 5,
              "text": "The pressure eats you alive.",
              "eff": {
                "salaryMul": 1.35,
                "health": -10,
                "happiness": -10,
                "addCondition": "anxiety"
              }
            }
          ]
        },
        {
          "text": "Decline and protect your peace",
          "eff": {
            "happiness": 8,
            "respect": -2
          }
        }
      ]
    },
    {
      "id": "adult_neighbor_feud",
      "cat": "adult",
      "type": "event",
      "weight": 4,
      "text": "Your neighbor's tree dumps leaves all over your yard, and they say it's 'nature's gift.'",
      "cond": {
        "minAge": 28,
        "maxAge": 50,
        "hasFlag": "homeowner"
      },
      "choices": [
        {
          "text": "Bring over a peace-offering pie",
          "outcomes": [
            {
              "w": 6,
              "text": "You become unlikely friends.",
              "eff": {
                "happiness": 6,
                "money": -20,
                "karma": 4
              }
            },
            {
              "w": 4,
              "text": "They eat the pie and keep the tree. Bold.",
              "eff": {
                "happiness": -2,
                "money": -20
              }
            }
          ]
        },
        {
          "text": "Report them to the HOA",
          "outcomes": [
            {
              "w": 5,
              "text": "The HOA sides with you. Sweet, petty victory.",
              "eff": {
                "happiness": 4,
                "karma": -2
              }
            },
            {
              "w": 5,
              "text": "Now it's open warfare on the cul-de-sac.",
              "eff": {
                "happiness": -6,
                "karma": -4
              }
            }
          ]
        }
      ]
    },
    {
      "id": "adult_career_pivot_certification",
      "cat": "adult",
      "type": "school",
      "weight": 3,
      "text": "A night course could open the door to a completely different career. It's a year of sacrifice.",
      "cond": {
        "minAge": 28,
        "maxAge": 48,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Enroll and grind",
          "outcomes": [
            {
              "w": 6,
              "text": "You pass and land a better-paying field.",
              "eff": {
                "smarts": 8,
                "salaryMul": 1.25,
                "money": -4000,
                "happiness": 6
              }
            },
            {
              "w": 4,
              "text": "Life got in the way and you didn't finish.",
              "eff": {
                "money": -4000,
                "happiness": -4,
                "smarts": 2
              }
            }
          ]
        },
        {
          "text": "Decide you're fine where you are",
          "eff": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "adult_lottery_temptation",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "The jackpot is enormous. A single ticket whispers your name from the gas station counter.",
      "cond": {
        "minAge": 26,
        "maxAge": 50
      },
      "choices": [
        {
          "text": "Buy one ticket",
          "outcomes": [
            {
              "w": 1,
              "text": "You match four numbers — a tidy little windfall.",
              "eff": {
                "money": 4000,
                "happiness": 10
              }
            },
            {
              "w": 9,
              "text": "Nothing. Of course. But you bought a daydream.",
              "eff": {
                "money": -10,
                "happiness": 1
              }
            }
          ]
        },
        {
          "text": "Keep your two dollars",
          "eff": {
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "adult_food_poisoning",
      "cat": "adult",
      "type": "health",
      "weight": 3,
      "text": "That gas-station sushi seemed like a calculated risk. The math was wrong.",
      "cond": {
        "minAge": 26,
        "maxAge": 50
      },
      "eff": {
        "health": -8,
        "happiness": -5,
        "money": -100
      }
    },
    {
      "id": "adult_charity_gala",
      "cat": "adult",
      "type": "event",
      "weight": 2,
      "text": "You're invited to a charity gala full of important people in {country}.",
      "cond": {
        "minAge": 32,
        "maxAge": 50,
        "minMoney": 30000
      },
      "choices": [
        {
          "text": "Make a generous donation",
          "eff": {
            "money": -5000,
            "karma": 10,
            "respect": 6,
            "happiness": 5
          }
        },
        {
          "text": "Network shamelessly",
          "outcomes": [
            {
              "w": 5,
              "text": "You land a valuable connection.",
              "eff": {
                "respect": 4,
                "salary": 3000
              }
            },
            {
              "w": 5,
              "text": "You spill wine on a billionaire's shoes.",
              "eff": {
                "respect": -4,
                "happiness": -3
              }
            }
          ]
        },
        {
          "text": "Eat the free shrimp and leave",
          "eff": {
            "happiness": 3,
            "money": 0
          }
        }
      ]
    },
    {
      "id": "adult_pet_adoption",
      "cat": "adult",
      "type": "family",
      "weight": 3,
      "text": "A scruffy shelter dog presses its nose against the glass and looks directly into your soul.",
      "cond": {
        "minAge": 26,
        "maxAge": 50
      },
      "choices": [
        {
          "text": "Adopt the good boy",
          "eff": {
            "happiness": 12,
            "money": -800,
            "health": 3,
            "karma": 6,
            "addAsset": {
              "kind": "possession",
              "name": "Rescue Dog",
              "value": 0
            }
          }
        },
        {
          "text": "Walk away (you'll think about him forever)",
          "eff": {
            "happiness": -3
          }
        }
      ]
    },
    {
      "id": "adult_tax_audit",
      "cat": "adult",
      "type": "money",
      "weight": 2,
      "text": "An official letter arrives. The tax office would like to 'have a word' about your returns.",
      "cond": {
        "minAge": 30,
        "maxAge": 50,
        "minMoney": 15000
      },
      "eff": {}
    },
    {
      "id": "adult_drunk_decision",
      "cat": "adult",
      "type": "crime",
      "weight": 2,
      "text": "After the reunion, you're definitely over the limit, and your car is right there.",
      "cond": {
        "minAge": 26,
        "maxAge": 45
      },
      "choices": [
        {
          "text": "Call a cab",
          "eff": {
            "money": -40,
            "smarts": 2,
            "karma": 3
          }
        },
        {
          "text": "Risk the drive home",
          "outcomes": [
            {
              "w": 5,
              "text": "You make it, shaken and lucky.",
              "eff": {
                "happiness": -2
              }
            },
            {
              "w": 3,
              "text": "Flashing lights. A DUI and a night in a cell.",
              "eff": {
                "jail": 1,
                "crimeName": "drunk driving",
                "money": -6000,
                "karma": -8,
                "respect": -6
              }
            },
            {
              "w": 2,
              "text": "A minor fender-bender. Expensive lesson.",
              "eff": {
                "money": -3000,
                "health": -4,
                "karma": -4
              }
            }
          ]
        }
      ]
    },
    {
      "id": "adult_anniversary_forgotten",
      "cat": "adult",
      "type": "love",
      "weight": 3,
      "text": "Your spouse is staring at you expectantly. A cold dread arrives: it's your anniversary, isn't it?",
      "cond": {
        "minAge": 28,
        "maxAge": 50,
        "married": true
      },
      "choices": [
        {
          "text": "Bluff a 'surprise' dinner reservation",
          "outcomes": [
            {
              "w": 4,
              "text": "You snag a last-minute table and pull it off.",
              "eff": {
                "money": -200,
                "rel": {
                  "partner": 6
                }
              }
            },
            {
              "w": 6,
              "text": "Everywhere's booked. The jig is up.",
              "eff": {
                "rel": {
                  "partner": -8
                },
                "happiness": -5
              }
            }
          ]
        },
        {
          "text": "Come clean and grovel",
          "eff": {
            "rel": {
              "partner": -3
            },
            "happiness": -2,
            "karma": 2
          }
        }
      ]
    },
    {
      "id": "adult_stock_tip",
      "cat": "adult",
      "type": "money",
      "weight": 2,
      "text": "A confident friend swears this one stock is about to 'go to the moon.'",
      "cond": {
        "minAge": 28,
        "maxAge": 50,
        "minMoney": 10000
      },
      "choices": [
        {
          "text": "Invest $5,000",
          "outcomes": [
            {
              "w": 2,
              "text": "It moons. You cash out grinning.",
              "eff": {
                "money": 11000,
                "happiness": 10
              }
            },
            {
              "w": 3,
              "text": "It dips, you hold, you break even.",
              "eff": {
                "money": 0,
                "happiness": -1
              }
            },
            {
              "w": 5,
              "text": "It cratered. Your friend stopped texting.",
              "eff": {
                "money": -5000,
                "happiness": -6,
                "rel": {
                  "friend": -4
                }
              }
            }
          ]
        },
        {
          "text": "Politely pass",
          "eff": {
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "adult_health_scare",
      "cat": "adult",
      "type": "health",
      "weight": 2,
      "text": "A routine checkup turns serious. The doctor wants to run more tests.",
      "cond": {
        "minAge": 40,
        "maxAge": 50,
        "maxStat": {
          "health": 55
        }
      },
      "eff": {}
    },
    {
      "id": "adult_volunteer_mentor",
      "cat": "adult",
      "type": "event",
      "weight": 3,
      "text": "A young person at your old field asks if you'd mentor them. It's unpaid and time-consuming.",
      "cond": {
        "minAge": 32,
        "maxAge": 50,
        "minStat": {
          "smarts": 55
        }
      },
      "choices": [
        {
          "text": "Take them under your wing",
          "eff": {
            "happiness": 8,
            "karma": 8,
            "respect": 5,
            "smarts": 2
          }
        },
        {
          "text": "You're too busy right now",
          "eff": {
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "adult_remote_work_offer",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "A company across the country offers you a fully remote role for a small raise.",
      "cond": {
        "minAge": 26,
        "maxAge": 50,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Take it — work in pajamas",
          "outcomes": [
            {
              "w": 6,
              "text": "Freedom and focus. Best of both worlds.",
              "eff": {
                "salary": 4000,
                "happiness": 8,
                "health": 2
              }
            },
            {
              "w": 4,
              "text": "The isolation creeps in fast.",
              "eff": {
                "salary": 4000,
                "happiness": -6,
                "addCondition": "loneliness"
              }
            }
          ]
        },
        {
          "text": "Keep the office and the coworkers you like",
          "eff": {
            "happiness": 3,
            "rel": {
              "friend": 2
            }
          }
        }
      ]
    },
    {
      "id": "adult_credit_card_debt",
      "cat": "adult",
      "type": "money",
      "weight": 3,
      "text": "The credit card statement arrives and the balance has quietly become a small mountain.",
      "cond": {
        "minAge": 26,
        "maxAge": 50,
        "maxMoney": 5000
      },
      "choices": [
        {
          "text": "Make a strict budget and pay it down",
          "eff": {
            "money": -2000,
            "happiness": -3,
            "smarts": 4,
            "addTrait": "disciplined"
          }
        },
        {
          "text": "Just pay the minimum and look away",
          "outcomes": [
            {
              "w": 6,
              "text": "The interest keeps compounding against you.",
              "eff": {
                "money": -1200,
                "happiness": -4
              }
            },
            {
              "w": 4,
              "text": "A balance-transfer offer buys you time.",
              "eff": {
                "money": -300,
                "smarts": 2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "adult_kid_graduation",
      "cat": "adult",
      "type": "family",
      "weight": 3,
      "text": "Your child walks across the stage in a cap and gown. You weren't going to cry. You're crying.",
      "cond": {
        "minAge": 42,
        "maxAge": 50,
        "hasKids": true
      },
      "eff": {
        "happiness": 16,
        "rel": {
          "child": 10
        },
        "respect": 3
      }
    },
    {
      "id": "adult_empty_nest",
      "cat": "adult",
      "type": "family",
      "weight": 2,
      "text": "The last kid moved out. The house is suddenly, echoingly quiet.",
      "cond": {
        "minAge": 45,
        "maxAge": 50,
        "hasKids": true,
        "married": true
      },
      "choices": [
        {
          "text": "Rediscover each other and travel",
          "eff": {
            "happiness": 12,
            "money": -3000,
            "rel": {
              "partner": 10
            },
            "health": 3
          }
        },
        {
          "text": "Throw yourself back into work",
          "eff": {
            "salary": 2000,
            "happiness": -2,
            "rel": {
              "partner": -3
            }
          }
        },
        {
          "text": "Adopt a hobby with alarming intensity",
          "outcomes": [
            {
              "w": 6,
              "text": "You discover a genuine passion.",
              "eff": {
                "happiness": 10,
                "smarts": 3,
                "addTrait": "hobbyist"
              }
            },
            {
              "w": 4,
              "text": "The garage fills with abandoned half-projects.",
              "eff": {
                "money": -1500,
                "happiness": 3
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_first_word",
      "cat": "childhood",
      "type": "family",
      "weight": 4,
      "text": "Everyone is leaning in, waiting for your very first word. The whole room goes quiet.",
      "once": true,
      "cond": {
        "minAge": 1,
        "maxAge": 2
      },
      "choices": [
        {
          "text": "Say \"mama\"",
          "eff": {
            "happiness": 6,
            "rel": {
              "mother": 12,
              "father": -2
            }
          }
        },
        {
          "text": "Say \"dada\"",
          "eff": {
            "happiness": 6,
            "rel": {
              "father": 12
            }
          }
        },
        {
          "text": "Blurt out a swear you overheard",
          "outcomes": [
            {
              "w": 6,
              "text": "The room gasps, then erupts in horrified laughter.",
              "eff": {
                "happiness": 4,
                "rel": {
                  "mother": -3
                },
                "karma": -1
              }
            },
            {
              "w": 4,
              "text": "Grandma is scandalized and never lets it go.",
              "eff": {
                "happiness": 2,
                "rel": {
                  "mother": -5
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_first_steps",
      "cat": "childhood",
      "type": "family",
      "weight": 4,
      "text": "You wobble up onto two feet for the first time and take a heroic step toward {him}.",
      "once": true,
      "cond": {
        "minAge": 1,
        "maxAge": 2
      },
      "eff": {
        "happiness": 8,
        "health": 2,
        "rel": {
          "father": 6
        }
      }
    },
    {
      "id": "childhood_imaginary_friend",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "You've invented an imaginary friend who insists on having {his} own seat at dinner.",
      "cond": {
        "minAge": 3,
        "maxAge": 7
      },
      "choices": [
        {
          "text": "Set a place for them every night",
          "eff": {
            "happiness": 5,
            "smarts": 3,
            "rel": {
              "mother": -1
            }
          }
        },
        {
          "text": "Blame them for everything you break",
          "outcomes": [
            {
              "w": 5,
              "text": "Your parents almost buy it.",
              "eff": {
                "happiness": 4,
                "karma": -2
              }
            },
            {
              "w": 5,
              "text": "Nobody is fooled and you both get a talking-to.",
              "eff": {
                "happiness": 1,
                "rel": {
                  "mother": -3
                }
              }
            }
          ]
        },
        {
          "text": "Quietly grow out of them",
          "eff": {
            "smarts": 4,
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "childhood_lost_tooth",
      "cat": "childhood",
      "type": "family",
      "weight": 4,
      "text": "Your first wobbly tooth finally falls out at the dinner table. You tuck it under your pillow.",
      "cond": {
        "minAge": 5,
        "maxAge": 9
      },
      "choices": [
        {
          "text": "Stay awake to catch the Tooth Fairy",
          "outcomes": [
            {
              "w": 6,
              "text": "You drift off and wake to a coin and a note.",
              "eff": {
                "happiness": 6,
                "money": 2
              }
            },
            {
              "w": 4,
              "text": "You spot a parent tiptoeing in. The magic dies a little.",
              "eff": {
                "happiness": -2,
                "smarts": 3,
                "money": 2
              }
            }
          ]
        },
        {
          "text": "Go straight to sleep",
          "eff": {
            "happiness": 4,
            "money": 2,
            "health": 1
          }
        }
      ]
    },
    {
      "id": "childhood_first_day_school",
      "cat": "childhood",
      "type": "school",
      "weight": 5,
      "text": "It's your very first day of school. Your backpack is bigger than you are.",
      "once": true,
      "cond": {
        "minAge": 4,
        "maxAge": 6
      },
      "choices": [
        {
          "text": "March in bravely and introduce yourself",
          "eff": {
            "happiness": 5,
            "smarts": 3,
            "respect": 2
          }
        },
        {
          "text": "Cling to your parent's leg and cry",
          "outcomes": [
            {
              "w": 6,
              "text": "A kind teacher coaxes you in and you settle down.",
              "eff": {
                "happiness": 1,
                "rel": {
                  "mother": 2
                }
              }
            },
            {
              "w": 4,
              "text": "You make a friend who cried even harder than you.",
              "eff": {
                "happiness": 4,
                "smarts": 1
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_talent_show",
      "cat": "childhood",
      "type": "school",
      "weight": 3,
      "text": "The school talent show sign-up sheet is going around. What do you put your name down for?",
      "cond": {
        "minAge": 6,
        "maxAge": 12,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Sing your heart out",
          "outcomes": [
            {
              "w": 4,
              "text": "You nail it and the gym roars.",
              "eff": {
                "happiness": 8,
                "looks": 2,
                "fame": 3,
                "respect": 4
              }
            },
            {
              "w": 4,
              "text": "Your voice cracks but the crowd is kind.",
              "eff": {
                "happiness": 2,
                "respect": 1
              }
            },
            {
              "w": 2,
              "text": "Stage fright freezes you mid-song.",
              "eff": {
                "happiness": -4,
                "respect": -2
              }
            }
          ]
        },
        {
          "text": "Do a magic act",
          "outcomes": [
            {
              "w": 5,
              "text": "The big trick actually works!",
              "eff": {
                "happiness": 6,
                "smarts": 3,
                "fame": 2
              }
            },
            {
              "w": 5,
              "text": "The rabbit escapes mid-trick.",
              "eff": {
                "happiness": 2,
                "fame": 1
              }
            }
          ]
        },
        {
          "text": "Watch from the safety of the audience",
          "eff": {
            "happiness": 1,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "childhood_new_sibling",
      "cat": "childhood",
      "type": "family",
      "weight": 3,
      "text": "Your parents bring home a tiny new baby. Suddenly you are a big sibling.",
      "once": true,
      "cond": {
        "minAge": 2,
        "maxAge": 9
      },
      "choices": [
        {
          "text": "Be the proudest helper ever",
          "eff": {
            "happiness": 5,
            "smarts": 2,
            "karma": 4,
            "rel": {
              "mother": 5
            }
          }
        },
        {
          "text": "Sulk about sharing the spotlight",
          "outcomes": [
            {
              "w": 6,
              "text": "It passes, and you warm up to the little one.",
              "eff": {
                "happiness": 1,
                "karma": -1
              }
            },
            {
              "w": 4,
              "text": "The rivalry sticks for years.",
              "eff": {
                "happiness": -2,
                "rel": {
                  "mother": -3
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_pet_adoption",
      "cat": "childhood",
      "type": "family",
      "weight": 3,
      "text": "Your family agrees to adopt a pet from the shelter. Which one steals your heart?",
      "cond": {
        "minAge": 5,
        "maxAge": 12,
        "notFlag": "has_childhood_pet"
      },
      "choices": [
        {
          "text": "A goofy floppy-eared puppy",
          "eff": {
            "happiness": 9,
            "health": 2,
            "flag": {
              "has_childhood_pet": "dog"
            },
            "rel": {
              "father": 3
            }
          }
        },
        {
          "text": "A mysterious aloof cat",
          "eff": {
            "happiness": 7,
            "smarts": 1,
            "flag": {
              "has_childhood_pet": "cat"
            }
          }
        },
        {
          "text": "A goldfish (low-stakes)",
          "eff": {
            "happiness": 4,
            "money": -1,
            "flag": {
              "has_childhood_pet": "fish"
            }
          }
        }
      ]
    },
    {
      "id": "childhood_pet_loss",
      "cat": "childhood",
      "type": "family",
      "weight": 2,
      "text": "Your beloved pet passes away of old age. It's your first real goodbye.",
      "cond": {
        "minAge": 6,
        "maxAge": 12,
        "hasFlag": "has_childhood_pet"
      },
      "choices": [
        {
          "text": "Hold a tiny backyard funeral",
          "eff": {
            "happiness": -5,
            "smarts": 3,
            "karma": 3,
            "rel": {
              "mother": 4
            },
            "flag": {
              "has_childhood_pet": ""
            }
          }
        },
        {
          "text": "Bottle it all up",
          "eff": {
            "happiness": -7,
            "health": -2,
            "flag": {
              "has_childhood_pet": ""
            }
          }
        }
      ]
    },
    {
      "id": "childhood_spelling_bee",
      "cat": "childhood",
      "type": "school",
      "weight": 3,
      "text": "You make it to the final round of the school spelling bee. The word is \"rhythm\".",
      "cond": {
        "minAge": 7,
        "maxAge": 12,
        "inSchool": true,
        "minStat": {
          "smarts": 45
        }
      },
      "choices": [
        {
          "text": "Sound it out carefully",
          "outcomes": [
            {
              "w": 5,
              "text": "R-H-Y-T-H-M. Correct! You win.",
              "eff": {
                "happiness": 8,
                "smarts": 5,
                "respect": 5,
                "fame": 2,
                "money": 5
              }
            },
            {
              "w": 5,
              "text": "You drop a letter and place second.",
              "eff": {
                "happiness": 2,
                "smarts": 3,
                "respect": 2
              }
            }
          ]
        },
        {
          "text": "Panic and guess",
          "outcomes": [
            {
              "w": 7,
              "text": "Wrong. So close, though.",
              "eff": {
                "happiness": -2,
                "smarts": 2
              }
            },
            {
              "w": 3,
              "text": "A lucky guess lands it!",
              "eff": {
                "happiness": 7,
                "smarts": 3,
                "respect": 4
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_treehouse",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "You and your friends decide to build a treehouse out of scavenged scraps.",
      "cond": {
        "minAge": 7,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Plan it out like an engineer",
          "eff": {
            "happiness": 6,
            "smarts": 5,
            "health": 1
          }
        },
        {
          "text": "Wing it and hammer fast",
          "outcomes": [
            {
              "w": 5,
              "text": "It's wonky but it stands. Best clubhouse ever.",
              "eff": {
                "happiness": 7,
                "respect": 2
              }
            },
            {
              "w": 5,
              "text": "A plank gives way and you tumble out.",
              "eff": {
                "happiness": 2,
                "health": -6
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_broke_window",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "Your home-run baseball sails straight through a neighbor's window with a crash.",
      "cond": {
        "minAge": 6,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Confess and offer to do chores to pay it off",
          "eff": {
            "happiness": -1,
            "karma": 5,
            "respect": 4,
            "money": -3
          }
        },
        {
          "text": "Run and hide",
          "outcomes": [
            {
              "w": 5,
              "text": "Nobody saw you. You got away with it.",
              "eff": {
                "happiness": 2,
                "karma": -4
              }
            },
            {
              "w": 5,
              "text": "The neighbor recognized your jersey. Busted.",
              "eff": {
                "happiness": -3,
                "karma": -3,
                "money": -4,
                "rel": {
                  "father": -3
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_allowance_choice",
      "cat": "childhood",
      "type": "money",
      "weight": 3,
      "text": "Your parents start giving you a weekly allowance. You've saved up a small pile.",
      "cond": {
        "minAge": 7,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Blow it all on candy and toys",
          "eff": {
            "happiness": 6,
            "health": -1,
            "money": -3
          }
        },
        {
          "text": "Save it in a piggy bank",
          "eff": {
            "happiness": 1,
            "smarts": 3,
            "money": 8
          }
        },
        {
          "text": "Start a lemonade stand with it",
          "outcomes": [
            {
              "w": 5,
              "text": "A scorching day means brisk business!",
              "eff": {
                "happiness": 5,
                "smarts": 3,
                "money": 12,
                "respect": 2
              }
            },
            {
              "w": 5,
              "text": "Slow day; you mostly drank the profits.",
              "eff": {
                "happiness": 3,
                "money": -2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_class_pet_duty",
      "cat": "childhood",
      "type": "school",
      "weight": 3,
      "text": "You're chosen to take the class hamster home for the long weekend.",
      "cond": {
        "minAge": 6,
        "maxAge": 11,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Guard it with your life",
          "eff": {
            "happiness": 5,
            "karma": 3,
            "respect": 3
          }
        },
        {
          "text": "Get distracted and leave the cage open",
          "outcomes": [
            {
              "w": 5,
              "text": "You find it asleep in a slipper just in time.",
              "eff": {
                "happiness": 2,
                "smarts": 2
              }
            },
            {
              "w": 5,
              "text": "It escapes into the walls. Awkward Monday.",
              "eff": {
                "happiness": -5,
                "respect": -4,
                "karma": -2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_dinosaur_phase",
      "cat": "childhood",
      "type": "event",
      "weight": 2,
      "text": "You have become utterly, encyclopedically obsessed with dinosaurs. You correct adults on pronunciation.",
      "cond": {
        "minAge": 4,
        "maxAge": 9
      },
      "eff": {
        "happiness": 5,
        "smarts": 5,
        "respect": 1
      }
    },
    {
      "id": "childhood_scraped_knee",
      "cat": "childhood",
      "type": "health",
      "weight": 4,
      "text": "You wipe out hard learning to ride your bike, scraping your knee bloody.",
      "cond": {
        "minAge": 3,
        "maxAge": 10
      },
      "choices": [
        {
          "text": "Shake it off and get right back on",
          "eff": {
            "happiness": 3,
            "health": -1,
            "respect": 3,
            "smarts": 1
          }
        },
        {
          "text": "Run home crying for a bandage",
          "eff": {
            "happiness": -1,
            "health": 1,
            "rel": {
              "mother": 3
            }
          }
        }
      ]
    },
    {
      "id": "childhood_show_and_tell",
      "cat": "childhood",
      "type": "school",
      "weight": 3,
      "text": "It's show-and-tell day. You have to bring something cool from home.",
      "cond": {
        "minAge": 5,
        "maxAge": 9,
        "inSchool": true
      },
      "choices": [
        {
          "text": "A weird rock from the backyard",
          "outcomes": [
            {
              "w": 5,
              "text": "Turns out it's a real fossil! The class is amazed.",
              "eff": {
                "happiness": 6,
                "smarts": 4,
                "respect": 4
              }
            },
            {
              "w": 5,
              "text": "It's just a rock, but you sell it well.",
              "eff": {
                "happiness": 3,
                "respect": 1
              }
            }
          ]
        },
        {
          "text": "Your grandparent's war medal",
          "eff": {
            "happiness": 4,
            "smarts": 2,
            "respect": 5,
            "rel": {
              "father": 2
            }
          }
        },
        {
          "text": "Nothing; you forgot",
          "eff": {
            "happiness": -3,
            "respect": -2
          }
        }
      ]
    },
    {
      "id": "childhood_sandbox_squabble",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "Another kid swipes your favorite toy truck in the sandbox.",
      "cond": {
        "minAge": 3,
        "maxAge": 7
      },
      "choices": [
        {
          "text": "Use your words and ask for it back",
          "eff": {
            "happiness": 2,
            "smarts": 3,
            "karma": 3,
            "respect": 3
          }
        },
        {
          "text": "Throw sand at them",
          "outcomes": [
            {
              "w": 6,
              "text": "Both of you get a time-out.",
              "eff": {
                "happiness": -2,
                "karma": -3,
                "respect": -2
              }
            },
            {
              "w": 4,
              "text": "They flee; you reclaim the truck like a tyrant.",
              "eff": {
                "happiness": 3,
                "karma": -4,
                "notoriety": 1
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_sick_day",
      "cat": "childhood",
      "type": "health",
      "weight": 3,
      "text": "You wake up with a nasty case of the chickenpox, covered head to toe in itchy spots.",
      "cond": {
        "minAge": 4,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Resist the urge to scratch",
          "eff": {
            "happiness": -2,
            "health": 2,
            "smarts": 1
          }
        },
        {
          "text": "Scratch everything",
          "outcomes": [
            {
              "w": 5,
              "text": "Relief now, but a little scar to remember it by.",
              "eff": {
                "happiness": 1,
                "health": -2,
                "looks": -1
              }
            },
            {
              "w": 5,
              "text": "You make it worse and feel miserable.",
              "eff": {
                "happiness": -4,
                "health": -3
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_birthday_party",
      "cat": "childhood",
      "type": "family",
      "weight": 4,
      "text": "It's your birthday party! You blow out the candles and make a wish.",
      "cond": {
        "minAge": 4,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Wish for the whole family to be happy",
          "eff": {
            "happiness": 7,
            "karma": 4,
            "rel": {
              "father": 3
            }
          }
        },
        {
          "text": "Wish for a mountain of presents",
          "outcomes": [
            {
              "w": 5,
              "text": "You get exactly what you asked for!",
              "eff": {
                "happiness": 8,
                "money": 4,
                "karma": -1
              }
            },
            {
              "w": 5,
              "text": "You get socks and a book. Character building.",
              "eff": {
                "happiness": 1,
                "smarts": 2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_bully_encounter",
      "cat": "childhood",
      "type": "school",
      "weight": 3,
      "text": "A bigger kid starts picking on a smaller classmate at recess.",
      "cond": {
        "minAge": 7,
        "maxAge": 12,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Stand up and defend them",
          "outcomes": [
            {
              "w": 5,
              "text": "The bully backs down. You're a hero.",
              "eff": {
                "happiness": 5,
                "karma": 8,
                "respect": 6
              }
            },
            {
              "w": 5,
              "text": "The bully turns on you, but you've made a loyal friend.",
              "eff": {
                "happiness": -2,
                "health": -3,
                "karma": 8,
                "respect": 4
              }
            }
          ]
        },
        {
          "text": "Tell a teacher",
          "eff": {
            "happiness": 1,
            "karma": 5,
            "respect": 2
          }
        },
        {
          "text": "Look away and keep playing",
          "eff": {
            "happiness": -2,
            "karma": -4
          }
        }
      ]
    },
    {
      "id": "childhood_summer_camp",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "Your parents send you off to sleepaway summer camp for two weeks.",
      "cond": {
        "minAge": 8,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Dive into every activity",
          "outcomes": [
            {
              "w": 6,
              "text": "Best summer ever; you make a pile of friends.",
              "eff": {
                "happiness": 8,
                "health": 3,
                "smarts": 2,
                "respect": 3
              }
            },
            {
              "w": 4,
              "text": "You win the canoe race and earn a badge.",
              "eff": {
                "happiness": 6,
                "health": 2,
                "respect": 4
              }
            }
          ]
        },
        {
          "text": "Get homesick the whole time",
          "eff": {
            "happiness": -4,
            "rel": {
              "mother": 3
            }
          }
        }
      ]
    },
    {
      "id": "childhood_caught_lying",
      "cat": "childhood",
      "type": "family",
      "weight": 3,
      "text": "You told a fib about finishing your homework, and now your parent has found out.",
      "cond": {
        "minAge": 5,
        "maxAge": 11
      },
      "choices": [
        {
          "text": "Own up and apologize",
          "eff": {
            "happiness": -1,
            "karma": 4,
            "smarts": 2,
            "rel": {
              "mother": 2
            }
          }
        },
        {
          "text": "Double down with another lie",
          "outcomes": [
            {
              "w": 5,
              "text": "It collapses fast and you're grounded.",
              "eff": {
                "happiness": -4,
                "karma": -4,
                "rel": {
                  "mother": -5
                }
              }
            },
            {
              "w": 5,
              "text": "Somehow you wriggle out of it.",
              "eff": {
                "happiness": 2,
                "karma": -3,
                "smarts": 1
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_first_crush",
      "cat": "childhood",
      "type": "love",
      "weight": 2,
      "text": "You have your very first crush on a classmate. Your stomach does flips when they walk by.",
      "cond": {
        "minAge": 9,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Pass a note that says \"Do you like me? Y/N\"",
          "outcomes": [
            {
              "w": 4,
              "text": "They circle Y! You float home.",
              "eff": {
                "happiness": 8,
                "looks": 1,
                "respect": 1
              }
            },
            {
              "w": 4,
              "text": "They circle N. Ouch.",
              "eff": {
                "happiness": -4,
                "smarts": 1
              }
            },
            {
              "w": 2,
              "text": "The teacher intercepts and reads it aloud.",
              "eff": {
                "happiness": -3,
                "fame": 1,
                "respect": -2
              }
            }
          ]
        },
        {
          "text": "Keep it a secret forever",
          "eff": {
            "happiness": 1,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "childhood_report_card",
      "cat": "childhood",
      "type": "school",
      "weight": 4,
      "text": "Report cards are out. Yours is in a sealed envelope your parents are about to open.",
      "cond": {
        "minAge": 6,
        "maxAge": 12,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Hand it over proudly",
          "outcomes": [
            {
              "w": 5,
              "text": "Straight marks! Your parents beam.",
              "eff": {
                "happiness": 6,
                "smarts": 4,
                "money": 5,
                "rel": {
                  "mother": 4
                }
              }
            },
            {
              "w": 5,
              "text": "Decent, with a note to try harder in math.",
              "eff": {
                "happiness": 2,
                "smarts": 2
              }
            }
          ]
        },
        {
          "text": "\"Lose\" it on the way home",
          "outcomes": [
            {
              "w": 5,
              "text": "The school mails a copy anyway. Caught.",
              "eff": {
                "happiness": -3,
                "karma": -3,
                "rel": {
                  "mother": -4
                }
              }
            },
            {
              "w": 5,
              "text": "Bought yourself a week of peace.",
              "eff": {
                "happiness": 2,
                "karma": -2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_mud_kingdom",
      "cat": "childhood",
      "type": "event",
      "weight": 2,
      "text": "After the rain, the backyard becomes a glorious mud kingdom and you are its ruler.",
      "cond": {
        "minAge": 3,
        "maxAge": 8
      },
      "eff": {
        "happiness": 6,
        "health": 1,
        "smarts": 1,
        "rel": {
          "mother": -1
        }
      }
    },
    {
      "id": "childhood_science_fair",
      "cat": "childhood",
      "type": "school",
      "weight": 3,
      "text": "The annual science fair is here. You've built a homemade volcano for your project.",
      "cond": {
        "minAge": 9,
        "maxAge": 12,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Go big with extra baking soda",
          "outcomes": [
            {
              "w": 4,
              "text": "It erupts spectacularly and wins first prize!",
              "eff": {
                "happiness": 8,
                "smarts": 6,
                "respect": 5,
                "money": 5
              }
            },
            {
              "w": 6,
              "text": "It overflows onto the judges' table. Memorable, at least.",
              "eff": {
                "happiness": 3,
                "smarts": 3,
                "fame": 1
              }
            }
          ]
        },
        {
          "text": "Play it safe with a tidy display",
          "eff": {
            "happiness": 3,
            "smarts": 4,
            "respect": 2
          }
        }
      ]
    },
    {
      "id": "childhood_grandparent_stories",
      "cat": "childhood",
      "type": "family",
      "weight": 3,
      "text": "Your grandparent settles into the armchair and offers to tell you stories of the old days.",
      "cond": {
        "minAge": 4,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Listen for hours, wide-eyed",
          "eff": {
            "happiness": 6,
            "smarts": 5,
            "karma": 3,
            "rel": {
              "father": 2
            }
          }
        },
        {
          "text": "Beg to play video games instead",
          "eff": {
            "happiness": 3,
            "smarts": -1,
            "rel": {
              "father": -2
            }
          }
        }
      ]
    },
    {
      "id": "childhood_snow_day",
      "cat": "childhood",
      "type": "event",
      "weight": 3,
      "text": "School is cancelled for a snow day! A blanket of fresh powder covers everything.",
      "cond": {
        "minAge": 5,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Build the world's biggest snow fort",
          "eff": {
            "happiness": 7,
            "health": 2,
            "smarts": 1
          }
        },
        {
          "text": "Sled down the steepest hill in town",
          "outcomes": [
            {
              "w": 6,
              "text": "An exhilarating, record-breaking run!",
              "eff": {
                "happiness": 8,
                "health": 1,
                "respect": 3
              }
            },
            {
              "w": 4,
              "text": "You crash into a snowbank and bonk your head.",
              "eff": {
                "happiness": 2,
                "health": -4
              }
            }
          ]
        }
      ]
    },
    {
      "id": "childhood_family_money_trouble",
      "cat": "childhood",
      "type": "family",
      "weight": 2,
      "text": "You overhear your parents at the kitchen table, worried about paying the bills this month.",
      "cond": {
        "minAge": 7,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Offer your piggy-bank savings to help",
          "outcomes": [
            {
              "w": 7,
              "text": "They tear up, hug you, and gently say to keep it.",
              "eff": {
                "happiness": 3,
                "karma": 8,
                "rel": {
                  "father": 6
                }
              }
            },
            {
              "w": 3,
              "text": "Money is tight enough that they accept a little.",
              "eff": {
                "happiness": 1,
                "karma": 6,
                "money": -4,
                "rel": {
                  "mother": 5
                }
              }
            }
          ]
        },
        {
          "text": "Pretend you didn't hear and stay quiet",
          "eff": {
            "happiness": -3,
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "childhood_natural_talent",
      "cat": "childhood",
      "type": "event",
      "weight": 2,
      "text": "A teacher pulls your parents aside; you seem to have a natural gift just waiting to be nurtured.",
      "once": true,
      "cond": {
        "minAge": 6,
        "maxAge": 11
      },
      "choices": [
        {
          "text": "Take up the piano",
          "eff": {
            "happiness": 4,
            "smarts": 4,
            "looks": 1,
            "addTrait": "musical"
          }
        },
        {
          "text": "Join the soccer team",
          "eff": {
            "happiness": 5,
            "health": 5,
            "respect": 2,
            "addTrait": "athletic"
          }
        },
        {
          "text": "Bury yourself in books",
          "eff": {
            "happiness": 3,
            "smarts": 7,
            "addTrait": "bookworm"
          }
        }
      ]
    },
    {
      "id": "childhood_moving_away",
      "cat": "childhood",
      "type": "family",
      "weight": 2,
      "text": "Your family is moving to a new {city}. You have to say goodbye to your best friend.",
      "cond": {
        "minAge": 6,
        "maxAge": 12
      },
      "choices": [
        {
          "text": "Promise to write letters and stay in touch",
          "outcomes": [
            {
              "w": 6,
              "text": "You keep the promise; the friendship endures across the miles.",
              "eff": {
                "happiness": 2,
                "karma": 4,
                "smarts": 1
              }
            },
            {
              "w": 4,
              "text": "Letters fade, but the move opens a brand-new chapter.",
              "eff": {
                "happiness": 1,
                "smarts": 2
              }
            }
          ]
        },
        {
          "text": "Throw a tantrum about leaving",
          "eff": {
            "happiness": -5,
            "rel": {
              "mother": -3
            }
          }
        }
      ]
    },
    {
      "id": "elder_retirement_party",
      "cat": "elder",
      "type": "event",
      "weight": 4,
      "text": "After decades on the job, {first}'s coworkers throw a retirement party with a sheet cake and a gold-painted plastic clock. How do you make your exit?",
      "once": true,
      "cond": {
        "minAge": 60,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Give a heartfelt farewell speech",
          "eff": {
            "happiness": 14,
            "respect": 8,
            "karma": 4
          }
        },
        {
          "text": "Quietly slip out the side door",
          "eff": {
            "happiness": 6,
            "smarts": 2
          }
        },
        {
          "text": "Announce you're un-retiring next week",
          "outcomes": [
            {
              "w": 3,
              "text": "Everyone laughs; you actually mean it.",
              "eff": {
                "happiness": -4,
                "salary": 0
              }
            },
            {
              "w": 2,
              "text": "The boss takes you up on it part-time.",
              "eff": {
                "happiness": 5,
                "money": 4000
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_pension_choice",
      "cat": "elder",
      "type": "money",
      "weight": 3,
      "text": "Your pension statement arrives. The advisor asks how you'd like to take it.",
      "once": true,
      "cond": {
        "minAge": 63
      },
      "choices": [
        {
          "text": "Lump sum now",
          "eff": {
            "money": 85000,
            "happiness": 6
          }
        },
        {
          "text": "Steady monthly payments",
          "eff": {
            "money": 9000,
            "salaryMul": 1.05,
            "happiness": 4
          }
        },
        {
          "text": "Gamble it on a 'guaranteed' annuity scheme",
          "outcomes": [
            {
              "w": 4,
              "text": "It was a scam. Most of it vanished.",
              "eff": {
                "money": -30000,
                "happiness": -16,
                "smarts": 3
              }
            },
            {
              "w": 2,
              "text": "Against the odds, it actually pays out.",
              "eff": {
                "money": 120000,
                "happiness": 14
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_grandkid_first",
      "cat": "elder",
      "type": "family",
      "weight": 4,
      "text": "Your child calls with the news: you're going to be a grandparent.",
      "once": true,
      "cond": {
        "minAge": 55,
        "hasKids": true
      },
      "eff": {
        "happiness": 20,
        "health": 4,
        "relAll": 3
      }
    },
    {
      "id": "elder_grandkid_babysit",
      "cat": "elder",
      "type": "family",
      "weight": 3,
      "text": "Your grandkids are dropped off for the weekend, full of sugar and questions about why the sky is blue.",
      "cond": {
        "minAge": 58,
        "hasKids": true
      },
      "choices": [
        {
          "text": "Spoil them rotten with sweets and movies",
          "eff": {
            "happiness": 12,
            "money": -200,
            "relAll": 4,
            "health": -2
          }
        },
        {
          "text": "Teach them old-fashioned card games",
          "eff": {
            "happiness": 9,
            "smarts": 3,
            "relAll": 5
          }
        },
        {
          "text": "Pretend you have a 'doctor's appointment'",
          "eff": {
            "happiness": -3,
            "relAll": -3,
            "health": 3
          }
        }
      ]
    },
    {
      "id": "elder_health_scare_chest",
      "cat": "elder",
      "type": "health",
      "weight": 3,
      "text": "A sharp pain grips {first}'s chest while climbing the stairs. The room tilts.",
      "cond": {
        "minAge": 60
      },
      "choices": [
        {
          "text": "Call an ambulance immediately",
          "outcomes": [
            {
              "w": 5,
              "text": "Caught early. The doctors put in a stent.",
              "eff": {
                "health": 6,
                "money": -4000,
                "addCondition": "heart condition",
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "False alarm, just bad heartburn. Embarrassing bill.",
              "eff": {
                "money": -1500,
                "happiness": -3
              }
            }
          ]
        },
        {
          "text": "Sit down and tough it out",
          "outcomes": [
            {
              "w": 3,
              "text": "It passes. You got lucky this time.",
              "eff": {
                "health": -6,
                "happiness": -4
              }
            },
            {
              "w": 3,
              "text": "It was a heart attack. You barely pull through.",
              "eff": {
                "health": -22,
                "addCondition": "heart condition"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_downsizing_home",
      "cat": "elder",
      "type": "money",
      "weight": 3,
      "text": "The big family house feels empty and the stairs are getting harder. A realtor suggests downsizing.",
      "once": true,
      "cond": {
        "minAge": 62,
        "minMoney": 1
      },
      "choices": [
        {
          "text": "Sell and buy a cozy bungalow",
          "eff": {
            "money": 60000,
            "happiness": 8,
            "health": 3
          }
        },
        {
          "text": "Move into a retirement community",
          "eff": {
            "money": 20000,
            "happiness": 5,
            "relAll": 2,
            "health": 2
          }
        },
        {
          "text": "Refuse to leave; this is home",
          "eff": {
            "happiness": 4,
            "health": -2,
            "respect": 2
          }
        }
      ]
    },
    {
      "id": "elder_bucket_list_skydive",
      "cat": "elder",
      "type": "event",
      "weight": 2,
      "text": "It's been on the bucket list forever. The instructor straps you in: ready to skydive?",
      "cond": {
        "minAge": 65,
        "minMoney": 500
      },
      "choices": [
        {
          "text": "Jump out of the plane",
          "outcomes": [
            {
              "w": 6,
              "text": "The most alive you've felt in years!",
              "eff": {
                "happiness": 22,
                "health": 2,
                "fame": 1,
                "money": -300
              }
            },
            {
              "w": 1,
              "text": "A rough landing breaks your hip.",
              "eff": {
                "health": -18,
                "happiness": -6,
                "addCondition": "broken hip",
                "money": -300
              }
            }
          ]
        },
        {
          "text": "Chicken out at the door",
          "eff": {
            "happiness": -4,
            "money": -300,
            "health": 1
          }
        }
      ]
    },
    {
      "id": "elder_nostalgia_attic",
      "cat": "elder",
      "type": "event",
      "weight": 3,
      "text": "Sorting the attic, {first} finds a dusty box of old photos and love letters.",
      "cond": {
        "minAge": 60
      },
      "choices": [
        {
          "text": "Open the box",
          "outcomes": [
            {
              "w": 4,
              "text": "You spend the afternoon lost in happy memories.",
              "eff": {
                "happiness": 10,
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "A letter reopens an old wound.",
              "eff": {
                "happiness": -6,
                "smarts": 3
              }
            }
          ]
        },
        {
          "text": "Leave the past where it lies",
          "eff": {
            "happiness": 2,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "elder_peer_funeral",
      "cat": "elder",
      "type": "family",
      "weight": 3,
      "text": "A lifelong friend has passed away. At the funeral, you're asked to say a few words.",
      "cond": {
        "minAge": 68
      },
      "choices": [
        {
          "text": "Deliver a moving eulogy",
          "eff": {
            "happiness": -8,
            "respect": 10,
            "karma": 5
          }
        },
        {
          "text": "Sit silently in the back pew",
          "eff": {
            "happiness": -10,
            "health": -2
          }
        },
        {
          "text": "Resolve to live every day to the fullest",
          "eff": {
            "happiness": -4,
            "health": 4,
            "smarts": 3
          }
        }
      ]
    },
    {
      "id": "elder_legacy_will",
      "cat": "elder",
      "type": "money",
      "weight": 2,
      "text": "A lawyer suggests it's time to finalize your will. Who gets the bulk of your estate?",
      "once": true,
      "cond": {
        "minAge": 70,
        "minMoney": 10000
      },
      "choices": [
        {
          "text": "Split it evenly among the family",
          "eff": {
            "relAll": 6,
            "happiness": 6,
            "karma": 4
          }
        },
        {
          "text": "Leave it all to charity",
          "eff": {
            "karma": 14,
            "respect": 8,
            "happiness": 5,
            "relAll": -4
          }
        },
        {
          "text": "Leave it to the cat",
          "outcomes": [
            {
              "w": 2,
              "text": "The family is furious but you find it hilarious.",
              "eff": {
                "happiness": 8,
                "relAll": -10,
                "notoriety": 3
              }
            },
            {
              "w": 1,
              "text": "It makes the local news.",
              "eff": {
                "happiness": 6,
                "fame": 4,
                "relAll": -8
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_reinvention_painter",
      "cat": "elder",
      "type": "event",
      "weight": 2,
      "text": "Restless in retirement, {first} signs up for a beginner's painting class.",
      "cond": {
        "minAge": 62,
        "noJob": true
      },
      "choices": [
        {
          "text": "Throw yourself into it",
          "outcomes": [
            {
              "w": 3,
              "text": "You discover a genuine hidden talent.",
              "eff": {
                "happiness": 12,
                "smarts": 4,
                "looks": 1
              }
            },
            {
              "w": 3,
              "text": "Your work is terrible but the company is lovely.",
              "eff": {
                "happiness": 7,
                "relAll": 2
              }
            },
            {
              "w": 1,
              "text": "A gallery buys a piece! You're a late-blooming artist.",
              "eff": {
                "happiness": 16,
                "money": 5000,
                "fame": 6,
                "respect": 5
              }
            }
          ]
        },
        {
          "text": "Decide it's not for you",
          "eff": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "elder_scam_phone",
      "cat": "elder",
      "type": "crime",
      "weight": 4,
      "text": "The phone rings. A panicked voice claims to be your grandchild in jail, needing bail money wired right now.",
      "cond": {
        "minAge": 66
      },
      "choices": [
        {
          "text": "Wire the money immediately",
          "outcomes": [
            {
              "w": 5,
              "text": "It was a scammer. The money's gone.",
              "eff": {
                "money": -3000,
                "happiness": -12,
                "smarts": 2
              }
            },
            {
              "w": 1,
              "text": "It was actually real this time.",
              "eff": {
                "money": -3000,
                "relAll": 4,
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Call the family to verify first",
          "eff": {
            "smarts": 5,
            "happiness": 4,
            "respect": 2
          }
        },
        {
          "text": "String the scammer along to waste their time",
          "eff": {
            "happiness": 8,
            "smarts": 3,
            "karma": 2
          }
        }
      ]
    },
    {
      "id": "elder_garden_pride",
      "cat": "elder",
      "type": "event",
      "weight": 3,
      "text": "{first}'s vegetable garden has become the talk of the neighborhood. The annual flower show is coming up.",
      "cond": {
        "minAge": 58
      },
      "choices": [
        {
          "text": "Enter the competition",
          "outcomes": [
            {
              "w": 3,
              "text": "Blue ribbon! Your tomatoes are legendary.",
              "eff": {
                "happiness": 12,
                "respect": 6,
                "fame": 2
              }
            },
            {
              "w": 2,
              "text": "You place second to a smug rival.",
              "eff": {
                "happiness": 4,
                "respect": 2
              }
            }
          ]
        },
        {
          "text": "Just give the veggies to neighbors",
          "eff": {
            "happiness": 8,
            "karma": 5,
            "relAll": 3
          }
        }
      ]
    },
    {
      "id": "elder_joint_replacement",
      "cat": "elder",
      "type": "health",
      "weight": 3,
      "text": "Years of wear have worn out {first}'s knee. The surgeon recommends a replacement.",
      "cond": {
        "minAge": 65
      },
      "choices": [
        {
          "text": "Get the surgery and do the rehab",
          "outcomes": [
            {
              "w": 4,
              "text": "Good as new! You can hike again.",
              "eff": {
                "health": 10,
                "happiness": 8,
                "money": -6000
              }
            },
            {
              "w": 2,
              "text": "Recovery is long and painful.",
              "eff": {
                "health": 3,
                "happiness": -4,
                "money": -6000
              }
            }
          ]
        },
        {
          "text": "Tough it out with a cane",
          "eff": {
            "health": -4,
            "happiness": -3,
            "money": -100
          }
        }
      ]
    },
    {
      "id": "elder_silver_wedding",
      "cat": "elder",
      "type": "love",
      "weight": 3,
      "text": "You and your spouse have been married longer than most people stay anywhere. Time to celebrate the milestone.",
      "cond": {
        "minAge": 60,
        "married": true
      },
      "choices": [
        {
          "text": "Renew your vows",
          "eff": {
            "happiness": 16,
            "rel": {
              "spouse": 10
            },
            "looks": 1
          }
        },
        {
          "text": "Take a second honeymoon cruise",
          "eff": {
            "happiness": 14,
            "rel": {
              "spouse": 8
            },
            "money": -5000,
            "health": 2
          }
        },
        {
          "text": "A quiet dinner at home is enough",
          "eff": {
            "happiness": 9,
            "rel": {
              "spouse": 5
            }
          }
        }
      ]
    },
    {
      "id": "elder_grumpy_neighbor",
      "cat": "elder",
      "type": "event",
      "weight": 3,
      "text": "The kids next door keep cutting across your lawn. Your patience is wearing thin.",
      "cond": {
        "minAge": 64
      },
      "choices": [
        {
          "text": "Bake them cookies and make peace",
          "eff": {
            "happiness": 8,
            "karma": 6,
            "relAll": 2
          }
        },
        {
          "text": "Become the legendary 'get off my lawn' elder",
          "eff": {
            "happiness": 5,
            "notoriety": 4,
            "respect": -2
          }
        },
        {
          "text": "Install motion-activated sprinklers",
          "outcomes": [
            {
              "w": 3,
              "text": "Hilarious and effective. The kids steer clear.",
              "eff": {
                "happiness": 10,
                "smarts": 2,
                "notoriety": 2
              }
            },
            {
              "w": 2,
              "text": "A parent files a complaint.",
              "eff": {
                "happiness": -3,
                "money": -200,
                "approval": -2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_memoir_writing",
      "cat": "elder",
      "type": "event",
      "weight": 2,
      "text": "Your family keeps saying you should write down all your stories. You buy a leather journal.",
      "cond": {
        "minAge": 67
      },
      "choices": [
        {
          "text": "Start writing your memoir",
          "outcomes": [
            {
              "w": 3,
              "text": "The memoir becomes a treasured family heirloom.",
              "eff": {
                "happiness": 10,
                "smarts": 4,
                "relAll": 4,
                "respect": 3
              }
            },
            {
              "w": 2,
              "text": "You write three pages and lose interest.",
              "eff": {
                "happiness": 3,
                "smarts": 1
              }
            },
            {
              "w": 1,
              "text": "A small publisher picks it up!",
              "eff": {
                "happiness": 14,
                "money": 8000,
                "fame": 8,
                "respect": 6
              }
            }
          ]
        },
        {
          "text": "Keep the stories to yourself",
          "eff": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "elder_volunteer_legacy",
      "cat": "elder",
      "type": "event",
      "weight": 3,
      "text": "With time on your hands, the local library asks if you'd volunteer to mentor young readers.",
      "cond": {
        "minAge": 60,
        "noJob": true
      },
      "choices": [
        {
          "text": "Devote yourself to it fully",
          "eff": {
            "happiness": 12,
            "karma": 10,
            "respect": 6,
            "smarts": 2
          }
        },
        {
          "text": "Help out once a week",
          "eff": {
            "happiness": 6,
            "karma": 5,
            "relAll": 1
          }
        },
        {
          "text": "Decline; you've earned your rest",
          "eff": {
            "happiness": 3,
            "health": 2
          }
        }
      ]
    },
    {
      "id": "elder_dementia_worry",
      "cat": "elder",
      "type": "health",
      "weight": 2,
      "text": "{first} keeps misplacing keys and forgetting names. The family gently suggests seeing a specialist.",
      "cond": {
        "minAge": 72
      },
      "choices": [
        {
          "text": "Get tested early",
          "outcomes": [
            {
              "w": 4,
              "text": "Just normal aging. Relief all around.",
              "eff": {
                "happiness": 8,
                "health": 2,
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "Early-stage diagnosis, but caught in time to plan.",
              "eff": {
                "happiness": -6,
                "addCondition": "memory loss",
                "relAll": 3
              }
            }
          ]
        },
        {
          "text": "Ignore it and hope it passes",
          "outcomes": [
            {
              "w": 3,
              "text": "It was nothing, just stress.",
              "eff": {
                "happiness": 2
              }
            },
            {
              "w": 3,
              "text": "It worsens quietly over the years.",
              "eff": {
                "health": -8,
                "addCondition": "memory loss",
                "happiness": -6
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_old_flame_reunion",
      "cat": "elder",
      "type": "love",
      "weight": 2,
      "text": "At the high school reunion, {first} locks eyes with a sweetheart from sixty years ago.",
      "cond": {
        "minAge": 64,
        "single": true
      },
      "choices": [
        {
          "text": "Ask them to dance",
          "outcomes": [
            {
              "w": 3,
              "text": "Sparks fly all over again. Late-life romance!",
              "eff": {
                "happiness": 16,
                "looks": 2,
                "health": 3
              }
            },
            {
              "w": 2,
              "text": "They're happily married now. Still, a sweet chat.",
              "eff": {
                "happiness": 6
              }
            }
          ]
        },
        {
          "text": "Just wave from across the room",
          "eff": {
            "happiness": 4,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "elder_classic_car",
      "cat": "elder",
      "type": "money",
      "weight": 2,
      "text": "{first} always wanted that dream car from youth. A pristine vintage model just hit the market.",
      "cond": {
        "minAge": 60,
        "minMoney": 30000
      },
      "choices": [
        {
          "text": "Buy it; you only live once",
          "eff": {
            "money": -28000,
            "happiness": 16,
            "looks": 3,
            "addAsset": {
              "kind": "car",
              "name": "Vintage Convertible",
              "value": 28000
            }
          }
        },
        {
          "text": "Be sensible and pass",
          "eff": {
            "happiness": -4,
            "money": 0,
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "elder_falls_at_home",
      "cat": "elder",
      "type": "health",
      "weight": 3,
      "text": "{first} slips on a loose rug and goes down hard, unable to reach the phone.",
      "cond": {
        "minAge": 75
      },
      "choices": [
        {
          "text": "Call out for help",
          "outcomes": [
            {
              "w": 3,
              "text": "A neighbor hears the calls and gets help in time.",
              "eff": {
                "health": -8,
                "happiness": -4,
                "relAll": 2
              }
            },
            {
              "w": 3,
              "text": "Hours pass before help arrives. A long recovery follows.",
              "eff": {
                "health": -16,
                "happiness": -8,
                "addCondition": "frailty"
              }
            },
            {
              "w": 1,
              "text": "The fall proves fatal.",
              "eff": {
                "die": true,
                "dieCause": "a fall at home"
              }
            }
          ]
        },
        {
          "text": "Try to crawl to the phone yourself",
          "outcomes": [
            {
              "w": 2,
              "text": "You make it and dial for an ambulance.",
              "eff": {
                "health": -10,
                "happiness": -4,
                "smarts": 1
              }
            },
            {
              "w": 3,
              "text": "The strain is too much; you collapse and wait.",
              "eff": {
                "health": -18,
                "happiness": -8,
                "addCondition": "frailty"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "elder_rocking_chair_wisdom",
      "cat": "elder",
      "type": "event",
      "weight": 3,
      "text": "A nervous young relative comes to you for advice before a big life decision.",
      "cond": {
        "minAge": 70
      },
      "choices": [
        {
          "text": "Share hard-won wisdom",
          "eff": {
            "happiness": 10,
            "respect": 8,
            "relAll": 5,
            "smarts": 2
          }
        },
        {
          "text": "Tell a rambling story with no point",
          "eff": {
            "happiness": 6,
            "relAll": 1
          }
        },
        {
          "text": "Tell them to figure it out themselves like you did",
          "eff": {
            "happiness": 2,
            "respect": -2,
            "relAll": -2
          }
        }
      ]
    },
    {
      "id": "elder_centenarian_letter",
      "cat": "elder",
      "type": "event",
      "weight": 1,
      "text": "An official letter arrives congratulating {first} on reaching one hundred years old. There's even a small ceremony.",
      "once": true,
      "cond": {
        "minAge": 99
      },
      "eff": {
        "happiness": 25,
        "fame": 12,
        "respect": 15,
        "health": 2
      }
    },
    {
      "id": "elder_estranged_child_call",
      "cat": "elder",
      "type": "family",
      "weight": 2,
      "text": "After years of silence, an estranged child leaves a tentative voicemail asking to talk.",
      "cond": {
        "minAge": 68,
        "hasKids": true
      },
      "choices": [
        {
          "text": "Call back and reconcile",
          "outcomes": [
            {
              "w": 4,
              "text": "The years melt away. You're family again.",
              "eff": {
                "happiness": 20,
                "rel": {
                  "child": 15
                },
                "karma": 6,
                "health": 3
              }
            },
            {
              "w": 2,
              "text": "It's tense, but a fragile peace begins.",
              "eff": {
                "happiness": 6,
                "rel": {
                  "child": 6
                }
              }
            }
          ]
        },
        {
          "text": "Let the old grudge win; don't call back",
          "eff": {
            "happiness": -10,
            "rel": {
              "child": -5
            },
            "karma": -3
          }
        }
      ]
    },
    {
      "id": "elder_quiet_passing",
      "cat": "elder",
      "type": "health",
      "weight": 2,
      "text": "Surrounded by the quiet of a long life well lived, {first} drifts off to sleep one peaceful evening.",
      "cond": {
        "minAge": 88,
        "maxStat": {
          "health": 25
        }
      },
      "eff": {}
    },
    {
      "id": "love_first_school_dance",
      "cat": "love",
      "type": "love",
      "weight": 5,
      "text": "The school dance is this Friday and there's someone you've been daydreaming about.",
      "cond": {
        "minAge": 14,
        "maxAge": 17,
        "single": true
      },
      "choices": [
        {
          "text": "Ask them to be your date",
          "outcomes": [
            {
              "w": 2,
              "text": "They said yes and you danced all night.",
              "eff": {
                "happiness": 12,
                "looks": 2,
                "rel": {
                  "partner": 8
                }
              }
            },
            {
              "w": 2,
              "text": "They already had a date. Awkward.",
              "eff": {
                "happiness": -6
              }
            }
          ]
        },
        {
          "text": "Go with your friends instead",
          "eff": {
            "happiness": 4,
            "rel": {
              "friend": 4
            }
          }
        },
        {
          "text": "Stay home and avoid the whole thing",
          "eff": {
            "happiness": -3,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "love_blind_date_setup",
      "cat": "love",
      "type": "love",
      "weight": 5,
      "text": "A friend swears they've found your perfect match and set up a blind date.",
      "cond": {
        "minAge": 19,
        "single": true
      },
      "choices": [
        {
          "text": "Show up with an open mind",
          "outcomes": [
            {
              "w": 2,
              "text": "Instant chemistry! You're seeing them again.",
              "eff": {
                "happiness": 11,
                "rel": {
                  "partner": 10
                }
              }
            },
            {
              "w": 2,
              "text": "Pleasant, but no spark. You part as friends.",
              "eff": {
                "happiness": 2
              }
            },
            {
              "w": 1,
              "text": "A total disaster. They talked about their ex the entire time.",
              "eff": {
                "happiness": -5,
                "rel": {
                  "friend": -3
                }
              }
            }
          ]
        },
        {
          "text": "Cancel last minute",
          "eff": {
            "happiness": -2,
            "rel": {
              "friend": -4
            }
          }
        }
      ]
    },
    {
      "id": "love_dating_app_swipe",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "You match with someone charming on a dating app.",
      "cond": {
        "minAge": 18,
        "single": true
      },
      "choices": [
        {
          "text": "Meet for coffee",
          "outcomes": [
            {
              "w": 3,
              "text": "They were exactly like their photos and lovely. A real connection.",
              "eff": {
                "happiness": 9,
                "rel": {
                  "partner": 9
                }
              }
            },
            {
              "w": 2,
              "text": "Catfished. They looked nothing like the profile.",
              "eff": {
                "happiness": -6,
                "smarts": 1
              }
            }
          ]
        },
        {
          "text": "Keep it to texting for now",
          "eff": {
            "happiness": 2
          }
        },
        {
          "text": "Unmatch and move on",
          "eff": {}
        }
      ]
    },
    {
      "id": "love_grand_proposal",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Things with your partner are serious. You're thinking of proposing.",
      "cond": {
        "minAge": 22,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Plan an elaborate surprise proposal",
          "outcomes": [
            {
              "w": 4,
              "text": "They cried, said yes, and the whole restaurant applauded.",
              "eff": {
                "happiness": 25,
                "money": -3000,
                "rel": {
                  "partner": 20
                },
                "flag": {
                  "engaged": true
                }
              }
            },
            {
              "w": 1,
              "text": "They felt rushed and asked for more time.",
              "eff": {
                "happiness": -10,
                "money": -3000,
                "rel": {
                  "partner": -5
                }
              }
            }
          ]
        },
        {
          "text": "Propose simply, at home",
          "eff": {
            "happiness": 18,
            "money": -800,
            "rel": {
              "partner": 15
            },
            "flag": {
              "engaged": true
            }
          }
        },
        {
          "text": "Wait a while longer",
          "eff": {
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "love_got_proposed_to",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Your partner gets down on one knee and asks you to marry them.",
      "cond": {
        "minAge": 20,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Say yes!",
          "eff": {
            "happiness": 24,
            "rel": {
              "partner": 20
            },
            "flag": {
              "engaged": true
            }
          }
        },
        {
          "text": "Ask for time to think",
          "eff": {
            "happiness": -4,
            "rel": {
              "partner": -8
            }
          }
        },
        {
          "text": "Gently say no",
          "eff": {
            "happiness": -12,
            "rel": {
              "partner": -25
            }
          }
        }
      ]
    },
    {
      "id": "love_dream_wedding",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "It's time to plan the wedding. How big do you want to go?",
      "once": true,
      "cond": {
        "minAge": 20,
        "hasFlag": "engaged"
      },
      "choices": [
        {
          "text": "Lavish ceremony, spare no expense",
          "eff": {
            "happiness": 20,
            "money": -35000,
            "fame": 1,
            "rel": {
              "partner": 12
            },
            "flag": {
              "married": true
            }
          }
        },
        {
          "text": "Intimate wedding with close family",
          "eff": {
            "happiness": 16,
            "money": -6000,
            "rel": {
              "partner": 14,
              "mother": 4
            },
            "flag": {
              "married": true
            }
          }
        },
        {
          "text": "Elope at the courthouse",
          "eff": {
            "happiness": 10,
            "money": -200,
            "rel": {
              "partner": 8,
              "mother": -6
            },
            "flag": {
              "married": true
            }
          }
        }
      ]
    },
    {
      "id": "love_first_anniversary",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Your wedding anniversary is here.",
      "cond": {
        "minAge": 18,
        "married": true
      },
      "choices": [
        {
          "text": "Surprise them with a weekend getaway",
          "eff": {
            "happiness": 12,
            "money": -1500,
            "rel": {
              "partner": 12
            }
          }
        },
        {
          "text": "Cook their favorite meal at home",
          "eff": {
            "happiness": 8,
            "rel": {
              "partner": 8
            }
          }
        },
        {
          "text": "You completely forgot what day it was",
          "eff": {
            "happiness": -8,
            "rel": {
              "partner": -12
            }
          }
        }
      ]
    },
    {
      "id": "love_anniversary_milestone",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "You and your spouse celebrate decades together, surrounded by family.",
      "cond": {
        "minAge": 45,
        "married": true
      },
      "eff": {
        "happiness": 14,
        "health": 2,
        "rel": {
          "partner": 10
        }
      }
    },
    {
      "id": "love_jealous_coworker",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Your spouse keeps mentioning a flirty new coworker, and a knot of jealousy tightens in your chest.",
      "cond": {
        "minAge": 22,
        "married": true,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Talk to them openly about how you feel",
          "outcomes": [
            {
              "w": 3,
              "text": "They reassured you. You feel closer than ever.",
              "eff": {
                "happiness": 7,
                "rel": {
                  "partner": 8
                }
              }
            },
            {
              "w": 1,
              "text": "It spiraled into a bitter argument.",
              "eff": {
                "happiness": -8,
                "rel": {
                  "partner": -6
                }
              }
            }
          ]
        },
        {
          "text": "Snoop through their phone",
          "outcomes": [
            {
              "w": 3,
              "text": "Nothing there but guilt. You feel awful.",
              "eff": {
                "happiness": -5,
                "karma": -3,
                "rel": {
                  "partner": -4
                }
              }
            },
            {
              "w": 1,
              "text": "They caught you and trust shattered.",
              "eff": {
                "happiness": -12,
                "rel": {
                  "partner": -18
                }
              }
            }
          ]
        },
        {
          "text": "Trust them and let it go",
          "eff": {
            "happiness": 3,
            "rel": {
              "partner": 4
            }
          }
        }
      ]
    },
    {
      "id": "love_tempting_affair",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "An old flame resurfaces and makes it clear they'd like to rekindle things, even though you're married.",
      "cond": {
        "minAge": 25,
        "married": true
      },
      "choices": [
        {
          "text": "Shut it down and recommit to your marriage",
          "eff": {
            "happiness": 6,
            "karma": 5,
            "rel": {
              "partner": 8
            }
          }
        },
        {
          "text": "Indulge in a secret affair",
          "outcomes": [
            {
              "w": 2,
              "text": "It stayed hidden, but the guilt gnaws at you.",
              "eff": {
                "happiness": -4,
                "karma": -10,
                "rel": {
                  "partner": -5
                }
              }
            },
            {
              "w": 2,
              "text": "Your spouse found out. The fallout is brutal.",
              "eff": {
                "happiness": -18,
                "karma": -12,
                "rel": {
                  "partner": -30
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "love_partner_confession",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "Your spouse tearfully confesses they had a brief affair and ended it.",
      "cond": {
        "minAge": 25,
        "married": true
      },
      "choices": [
        {
          "text": "Try to forgive and rebuild trust",
          "outcomes": [
            {
              "w": 2,
              "text": "Slowly, with counseling, you heal together.",
              "eff": {
                "happiness": 4,
                "karma": 4,
                "rel": {
                  "partner": 6
                }
              }
            },
            {
              "w": 2,
              "text": "The wound never quite closes.",
              "eff": {
                "happiness": -8,
                "rel": {
                  "partner": -8
                }
              }
            }
          ]
        },
        {
          "text": "File for divorce",
          "eff": {
            "happiness": -10,
            "money": -5000,
            "rel": {
              "partner": -40
            },
            "flag": {
              "married": false
            }
          }
        }
      ]
    },
    {
      "id": "love_long_distance",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Your partner is moving across the {country} for work. Long distance looms.",
      "cond": {
        "minAge": 18,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Commit to making it work",
          "outcomes": [
            {
              "w": 2,
              "text": "Daily calls and visits kept the spark alive.",
              "eff": {
                "happiness": 6,
                "rel": {
                  "partner": 8
                },
                "money": -1200
              }
            },
            {
              "w": 2,
              "text": "The distance slowly pulled you apart.",
              "eff": {
                "happiness": -10,
                "rel": {
                  "partner": -15
                }
              }
            }
          ]
        },
        {
          "text": "Break up before they leave",
          "eff": {
            "happiness": -8,
            "rel": {
              "partner": -20
            }
          }
        },
        {
          "text": "Quit your life and move with them",
          "eff": {
            "happiness": 5,
            "money": -3000,
            "salaryMul": 0.8,
            "rel": {
              "partner": 12
            }
          }
        }
      ]
    },
    {
      "id": "love_breakup_blindside",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Out of nowhere, your partner ends things with a text message.",
      "cond": {
        "minAge": 16,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Wallow with ice cream and sad playlists",
          "eff": {
            "happiness": -6,
            "health": -1
          }
        },
        {
          "text": "Throw yourself into self-improvement",
          "eff": {
            "happiness": -2,
            "smarts": 3,
            "looks": 3,
            "health": 3
          }
        },
        {
          "text": "Demand an in-person explanation",
          "outcomes": [
            {
              "w": 2,
              "text": "You got closure and walked away with your head high.",
              "eff": {
                "happiness": 2
              }
            },
            {
              "w": 2,
              "text": "It just reopened the wound.",
              "eff": {
                "happiness": -7
              }
            }
          ]
        }
      ]
    },
    {
      "id": "love_reconciliation",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "An ex you never quite got over slides back into your life, apologizing for everything.",
      "cond": {
        "minAge": 18,
        "single": true
      },
      "choices": [
        {
          "text": "Give it another shot",
          "outcomes": [
            {
              "w": 2,
              "text": "Round two is sweeter and wiser. You're together again.",
              "eff": {
                "happiness": 12,
                "rel": {
                  "partner": 12
                }
              }
            },
            {
              "w": 3,
              "text": "Same problems, same ending. Heartbreak again.",
              "eff": {
                "happiness": -10
              }
            }
          ]
        },
        {
          "text": "Politely decline and keep moving forward",
          "eff": {
            "happiness": 4,
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "love_meet_cute_rain",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "You and a stranger duck under the same awning in {city} during a sudden downpour, sharing your umbrella.",
      "cond": {
        "minAge": 17,
        "single": true
      },
      "choices": [
        {
          "text": "Strike up a conversation",
          "outcomes": [
            {
              "w": 2,
              "text": "You talked for hours and exchanged numbers.",
              "eff": {
                "happiness": 10,
                "rel": {
                  "partner": 7
                }
              }
            },
            {
              "w": 2,
              "text": "Nice chat, but they had to dash off.",
              "eff": {
                "happiness": 3
              }
            }
          ]
        },
        {
          "text": "Stay quiet and just watch the rain",
          "eff": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "love_valentines_alone",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "It's Valentine's Day and everyone seems to be coupled up except you.",
      "cond": {
        "minAge": 16,
        "single": true
      },
      "choices": [
        {
          "text": "Treat yourself to a solo spa day",
          "eff": {
            "happiness": 6,
            "looks": 2,
            "money": -120
          }
        },
        {
          "text": "Host an anti-Valentine's party with friends",
          "eff": {
            "happiness": 8,
            "rel": {
              "friend": 5
            },
            "money": -200
          }
        },
        {
          "text": "Sit alone feeling sorry for yourself",
          "eff": {
            "happiness": -5
          }
        }
      ]
    },
    {
      "id": "love_secret_admirer",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "An unsigned note appears in your locker: someone has a crush on you.",
      "cond": {
        "minAge": 14,
        "maxAge": 25,
        "single": true
      },
      "choices": [
        {
          "text": "Play detective to find out who",
          "outcomes": [
            {
              "w": 2,
              "text": "It was someone wonderful. You hit it off.",
              "eff": {
                "happiness": 11,
                "rel": {
                  "partner": 8
                }
              }
            },
            {
              "w": 2,
              "text": "It was a prank by some classmates.",
              "eff": {
                "happiness": -5,
                "rel": {
                  "friend": -3
                }
              }
            }
          ]
        },
        {
          "text": "Enjoy the mystery and tell no one",
          "eff": {
            "happiness": 5
          }
        }
      ]
    },
    {
      "id": "love_moving_in",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "Your partner suggests moving in together.",
      "cond": {
        "minAge": 20,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Get a place together",
          "outcomes": [
            {
              "w": 3,
              "text": "Domestic bliss. You love sharing a life.",
              "eff": {
                "happiness": 10,
                "money": -1500,
                "rel": {
                  "partner": 10
                }
              }
            },
            {
              "w": 1,
              "text": "Living together revealed dealbreaker habits.",
              "eff": {
                "happiness": -8,
                "money": -1500,
                "rel": {
                  "partner": -10
                }
              }
            }
          ]
        },
        {
          "text": "Say you're not ready yet",
          "eff": {
            "happiness": -2,
            "rel": {
              "partner": -5
            }
          }
        }
      ]
    },
    {
      "id": "love_meet_the_parents",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "Your partner invites you to meet their parents for the first time.",
      "cond": {
        "minAge": 18,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Bring flowers and be charming",
          "outcomes": [
            {
              "w": 3,
              "text": "They adored you and welcomed you warmly.",
              "eff": {
                "happiness": 9,
                "rel": {
                  "partner": 8
                }
              }
            },
            {
              "w": 1,
              "text": "You spilled wine on the rug and panicked.",
              "eff": {
                "happiness": -4,
                "rel": {
                  "partner": -2
                }
              }
            }
          ]
        },
        {
          "text": "Be your blunt, unfiltered self",
          "outcomes": [
            {
              "w": 2,
              "text": "Your honesty won them over.",
              "eff": {
                "happiness": 6,
                "rel": {
                  "partner": 5
                }
              }
            },
            {
              "w": 2,
              "text": "You offended their politics over dinner.",
              "eff": {
                "happiness": -7,
                "rel": {
                  "partner": -8
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "love_pet_together",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "You and your partner are thinking of adopting a pet as your first 'baby' together.",
      "cond": {
        "minAge": 20,
        "hasPartnerKind": "partner",
        "single": true
      },
      "choices": [
        {
          "text": "Adopt a rescue dog",
          "eff": {
            "happiness": 10,
            "money": -400,
            "rel": {
              "partner": 7
            },
            "addAsset": {
              "kind": "possession",
              "name": "Rescue Dog",
              "value": 0
            }
          }
        },
        {
          "text": "Adopt a cat",
          "eff": {
            "happiness": 8,
            "money": -200,
            "rel": {
              "partner": 6
            },
            "addAsset": {
              "kind": "possession",
              "name": "Cat",
              "value": 0
            }
          }
        },
        {
          "text": "Decide you're not ready",
          "eff": {
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "love_couple_fight_money",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "You and your spouse keep fighting about money.",
      "cond": {
        "minAge": 22,
        "married": true
      },
      "choices": [
        {
          "text": "Sit down and build a budget together",
          "eff": {
            "happiness": 5,
            "smarts": 2,
            "rel": {
              "partner": 6
            }
          }
        },
        {
          "text": "Secretly hide a stash of cash",
          "outcomes": [
            {
              "w": 2,
              "text": "Your rainy-day fund stays a secret.",
              "eff": {
                "happiness": 1,
                "karma": -2
              }
            },
            {
              "w": 2,
              "text": "They found the hidden account. Betrayal.",
              "eff": {
                "happiness": -10,
                "rel": {
                  "partner": -14
                }
              }
            }
          ]
        },
        {
          "text": "Let resentment simmer",
          "eff": {
            "happiness": -6,
            "rel": {
              "partner": -7
            }
          }
        }
      ]
    },
    {
      "id": "love_renew_vows",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "After years together, your spouse suggests renewing your vows.",
      "cond": {
        "minAge": 40,
        "married": true
      },
      "choices": [
        {
          "text": "Throw a beautiful ceremony",
          "eff": {
            "happiness": 14,
            "money": -4000,
            "rel": {
              "partner": 12
            }
          }
        },
        {
          "text": "Just exchange private promises",
          "eff": {
            "happiness": 9,
            "rel": {
              "partner": 9
            }
          }
        }
      ]
    },
    {
      "id": "love_wingman_disaster",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "A friend drags you out to be their wingman at a party.",
      "cond": {
        "minAge": 18,
        "maxAge": 30,
        "single": true
      },
      "choices": [
        {
          "text": "Help your friend, focus on them",
          "outcomes": [
            {
              "w": 2,
              "text": "Ironically, someone fell for YOU instead.",
              "eff": {
                "happiness": 9,
                "rel": {
                  "partner": 6,
                  "friend": 3
                }
              }
            },
            {
              "w": 2,
              "text": "A fun but uneventful night.",
              "eff": {
                "happiness": 3,
                "rel": {
                  "friend": 3
                }
              }
            }
          ]
        },
        {
          "text": "Stay home, you're not in the mood",
          "eff": {
            "happiness": -1,
            "rel": {
              "friend": -3
            }
          }
        }
      ]
    },
    {
      "id": "love_summer_fling",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "On a summer trip you meet someone exciting, but you both know it's only for the season.",
      "cond": {
        "minAge": 17,
        "maxAge": 28,
        "single": true
      },
      "choices": [
        {
          "text": "Dive in and enjoy every moment",
          "eff": {
            "happiness": 11,
            "looks": 1,
            "money": -300
          }
        },
        {
          "text": "Try to turn it into something lasting",
          "outcomes": [
            {
              "w": 1,
              "text": "Against the odds, it bloomed into real love.",
              "eff": {
                "happiness": 14,
                "rel": {
                  "partner": 10
                }
              }
            },
            {
              "w": 3,
              "text": "Summer ended, and so did you two.",
              "eff": {
                "happiness": -7
              }
            }
          ]
        },
        {
          "text": "Keep your guard up the whole time",
          "eff": {
            "happiness": -2,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "love_celebrity_crush_dm",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "Now that you're famous, an attractive fellow celebrity slides into your DMs.",
      "cond": {
        "minAge": 18,
        "single": true,
        "famous": true
      },
      "choices": [
        {
          "text": "Reply and arrange a discreet date",
          "outcomes": [
            {
              "w": 2,
              "text": "A glamorous whirlwind romance begins.",
              "eff": {
                "happiness": 12,
                "fame": 2,
                "followers": 8000,
                "rel": {
                  "partner": 8
                }
              }
            },
            {
              "w": 2,
              "text": "The tabloids leaked it and it got messy.",
              "eff": {
                "happiness": -6,
                "fame": 1,
                "notoriety": 2
              }
            }
          ]
        },
        {
          "text": "Stay private, leave it on read",
          "eff": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "love_grief_widow",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "Your beloved spouse of many years passes away peacefully in their sleep.",
      "cond": {
        "minAge": 55,
        "married": true
      },
      "eff": {
        "happiness": -25,
        "health": -4,
        "rel": {
          "partner": -100
        },
        "flag": {
          "married": false,
          "widowed": true
        }
      }
    },
    {
      "id": "love_late_bloomer",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "At the community center, a kind widower your age keeps saving you a seat.",
      "cond": {
        "minAge": 60,
        "single": true
      },
      "choices": [
        {
          "text": "Let yourself fall in love again",
          "eff": {
            "happiness": 14,
            "health": 2,
            "rel": {
              "partner": 10
            }
          }
        },
        {
          "text": "Politely keep it to friendship",
          "eff": {
            "happiness": 4,
            "rel": {
              "friend": 5
            }
          }
        }
      ]
    },
    {
      "id": "love_friend_zone",
      "cat": "love",
      "type": "love",
      "weight": 4,
      "text": "You've realized you've fallen for your best friend.",
      "cond": {
        "minAge": 15,
        "maxAge": 26,
        "single": true
      },
      "choices": [
        {
          "text": "Confess everything",
          "outcomes": [
            {
              "w": 2,
              "text": "They felt the same! Friends to lovers.",
              "eff": {
                "happiness": 15,
                "rel": {
                  "partner": 12
                }
              }
            },
            {
              "w": 3,
              "text": "They only see you as a friend, and now it's weird.",
              "eff": {
                "happiness": -9,
                "rel": {
                  "friend": -6
                }
              }
            }
          ]
        },
        {
          "text": "Bury the feelings to save the friendship",
          "eff": {
            "happiness": -4,
            "rel": {
              "friend": 2
            }
          }
        }
      ]
    },
    {
      "id": "love_disastrous_first_date",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "Your first date is going so badly the silence is deafening.",
      "cond": {
        "minAge": 18,
        "single": true
      },
      "choices": [
        {
          "text": "Crack a joke about how awkward it is",
          "outcomes": [
            {
              "w": 2,
              "text": "The honesty broke the ice and saved the night.",
              "eff": {
                "happiness": 8,
                "rel": {
                  "partner": 5
                }
              }
            },
            {
              "w": 2,
              "text": "They didn't find it funny at all.",
              "eff": {
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Fake an emergency and leave",
          "eff": {
            "happiness": -2,
            "karma": -1
          }
        }
      ]
    },
    {
      "id": "love_arranged_introduction",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "Your family proudly arranges an introduction to a 'wonderful match' they've chosen for you.",
      "cond": {
        "minAge": 22,
        "single": true
      },
      "choices": [
        {
          "text": "Go along and give them a chance",
          "outcomes": [
            {
              "w": 2,
              "text": "Surprisingly, your family knew you well. Sparks fly.",
              "eff": {
                "happiness": 10,
                "rel": {
                  "partner": 8,
                  "mother": 6
                }
              }
            },
            {
              "w": 2,
              "text": "Lovely person, zero chemistry.",
              "eff": {
                "happiness": 1,
                "rel": {
                  "mother": 2
                }
              }
            }
          ]
        },
        {
          "text": "Refuse, you'll find love yourself",
          "eff": {
            "happiness": 2,
            "rel": {
              "mother": -8
            }
          }
        }
      ]
    },
    {
      "id": "love_quiet_contentment",
      "cat": "love",
      "type": "love",
      "weight": 3,
      "text": "On an ordinary Tuesday, you watch your spouse fall asleep on the couch and feel utterly at peace.",
      "cond": {
        "minAge": 25,
        "married": true
      },
      "eff": {
        "happiness": 7,
        "health": 1,
        "rel": {
          "partner": 4
        }
      }
    },
    {
      "id": "love_drunken_vegas",
      "cat": "love",
      "type": "love",
      "weight": 2,
      "text": "You wake up in a {city} hotel with a ring on your finger and a marriage certificate on the nightstand.",
      "cond": {
        "minAge": 21,
        "single": true
      },
      "choices": [
        {
          "text": "Annul it immediately",
          "eff": {
            "happiness": -3,
            "money": -500,
            "karma": -1
          }
        },
        {
          "text": "Get to know your new spouse",
          "outcomes": [
            {
              "w": 1,
              "text": "Wildest love story ever — it actually works.",
              "eff": {
                "happiness": 12,
                "rel": {
                  "partner": 8
                },
                "flag": {
                  "married": true
                }
              }
            },
            {
              "w": 3,
              "text": "A messy, expensive divorce follows.",
              "eff": {
                "happiness": -10,
                "money": -4000
              }
            }
          ]
        }
      ]
    },
    {
      "id": "teen_lunch_table_politics",
      "cat": "teen",
      "type": "school",
      "weight": 5,
      "text": "The cafeteria is a battlefield of cliques and you need somewhere to sit.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Sit with the popular crowd",
          "outcomes": [
            {
              "w": 2,
              "text": "They make room for you and your social stock soars.",
              "eff": {
                "happiness": 7,
                "looks": 2,
                "rel": {
                  "friend": 4
                }
              }
            },
            {
              "w": 2,
              "text": "They look you up and down and ignore you.",
              "eff": {
                "happiness": -6
              }
            }
          ]
        },
        {
          "text": "Sit with the misfits",
          "eff": {
            "happiness": 4,
            "smarts": 2,
            "karma": 2,
            "rel": {
              "friend": 5
            }
          }
        },
        {
          "text": "Eat alone in the library",
          "eff": {
            "smarts": 4,
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "teen_learners_permit",
      "cat": "teen",
      "type": "event",
      "weight": 5,
      "text": "You're finally old enough to take the test for your learner's permit.",
      "once": true,
      "cond": {
        "minAge": 16,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Study the handbook for a week first",
          "outcomes": [
            {
              "w": 4,
              "text": "You aced the written test on the first try.",
              "eff": {
                "happiness": 8,
                "smarts": 2,
                "flag": {
                  "hasPermit": true
                }
              }
            },
            {
              "w": 1,
              "text": "Nerves got you and you failed by one question.",
              "eff": {
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Wing it on confidence alone",
          "outcomes": [
            {
              "w": 1,
              "text": "Somehow you passed!",
              "eff": {
                "happiness": 9,
                "flag": {
                  "hasPermit": true
                }
              }
            },
            {
              "w": 3,
              "text": "You failed and have to wait to retake it.",
              "eff": {
                "happiness": -6
              }
            }
          ]
        }
      ]
    },
    {
      "id": "teen_first_driving_lesson",
      "cat": "teen",
      "type": "event",
      "weight": 4,
      "text": "Your parent takes you to an empty parking lot for your first driving lesson.",
      "cond": {
        "minAge": 16,
        "maxAge": 17,
        "hasFlag": "hasPermit"
      },
      "choices": [
        {
          "text": "Take it slow and careful",
          "eff": {
            "smarts": 2,
            "happiness": 5,
            "rel": {
              "father": 4,
              "mother": 4
            }
          }
        },
        {
          "text": "Show off and floor it",
          "outcomes": [
            {
              "w": 2,
              "text": "You stalled it and clipped a shopping cart. Embarrassing.",
              "eff": {
                "happiness": -4,
                "rel": {
                  "father": -3
                }
              }
            },
            {
              "w": 1,
              "text": "A clean, thrilling lap. Your parent is impressed.",
              "eff": {
                "happiness": 8,
                "rel": {
                  "father": 3
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "teen_first_phone",
      "cat": "teen",
      "type": "family",
      "weight": 4,
      "text": "Your parents finally agree to get you your first smartphone.",
      "once": true,
      "cond": {
        "minAge": 13,
        "maxAge": 15
      },
      "choices": [
        {
          "text": "Promise to use it responsibly",
          "eff": {
            "happiness": 9,
            "rel": {
              "mother": 3
            },
            "addAsset": {
              "kind": "possession",
              "name": "Smartphone",
              "value": 300
            }
          }
        },
        {
          "text": "Immediately make a social media account",
          "eff": {
            "happiness": 6,
            "followers": 80,
            "addAsset": {
              "kind": "possession",
              "name": "Smartphone",
              "value": 300
            }
          }
        }
      ]
    },
    {
      "id": "teen_locker_crush_note",
      "cat": "teen",
      "type": "love",
      "weight": 4,
      "text": "An anonymous note appears in your locker: someone has a crush on you, and your heart races all day.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "single": true
      },
      "eff": {
        "happiness": 6,
        "looks": 1
      }
    },
    {
      "id": "teen_final_exams",
      "cat": "teen",
      "type": "school",
      "weight": 5,
      "text": "Final exams are next week and the pressure is on.",
      "cond": {
        "minAge": 14,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Pull all-nighters cramming",
          "outcomes": [
            {
              "w": 3,
              "text": "You aced them but feel like a zombie.",
              "eff": {
                "smarts": 6,
                "health": -4,
                "happiness": 3
              }
            },
            {
              "w": 1,
              "text": "You burned out and blanked during the test.",
              "eff": {
                "smarts": 1,
                "health": -5,
                "happiness": -6
              }
            }
          ]
        },
        {
          "text": "Study a steady amount and sleep well",
          "eff": {
            "smarts": 4,
            "happiness": 2
          }
        },
        {
          "text": "Don't study at all",
          "outcomes": [
            {
              "w": 1,
              "text": "You guessed your way to a passing grade.",
              "eff": {
                "happiness": 4
              }
            },
            {
              "w": 3,
              "text": "You bombed the exams.",
              "eff": {
                "smarts": -3,
                "happiness": -7
              }
            }
          ]
        }
      ]
    },
    {
      "id": "teen_cheating_offer",
      "cat": "teen",
      "type": "school",
      "weight": 4,
      "text": "A classmate offers to sell you the answer key to the big test.",
      "cond": {
        "minAge": 14,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Buy it",
          "outcomes": [
            {
              "w": 3,
              "text": "You got a perfect score and nobody noticed.",
              "eff": {
                "smarts": 1,
                "karma": -5,
                "money": -20,
                "happiness": 4
              }
            },
            {
              "w": 2,
              "text": "The teacher caught you and called your parents.",
              "eff": {
                "karma": -6,
                "happiness": -10,
                "rel": {
                  "mother": -6
                }
              }
            }
          ]
        },
        {
          "text": "Refuse and study honestly",
          "eff": {
            "karma": 4,
            "smarts": 3
          }
        }
      ]
    },
    {
      "id": "teen_garage_band",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "Your friends want to start a garage band with you.",
      "cond": {
        "minAge": 14,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Join as the lead singer",
          "outcomes": [
            {
              "w": 2,
              "text": "Your first gig was a hit at a house party!",
              "eff": {
                "happiness": 9,
                "looks": 2,
                "followers": 200,
                "fame": 1
              }
            },
            {
              "w": 2,
              "text": "The band fizzled out after two practices.",
              "eff": {
                "happiness": -2
              }
            }
          ]
        },
        {
          "text": "Stick to writing the songs",
          "eff": {
            "smarts": 2,
            "happiness": 5
          }
        },
        {
          "text": "Pass — you can't carry a tune",
          "eff": {}
        }
      ]
    },
    {
      "id": "teen_viral_dance",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "You post a dance video and check your phone the next morning.",
      "cond": {
        "minAge": 13,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Refresh the app obsessively",
          "outcomes": [
            {
              "w": 1,
              "text": "It exploded overnight — you're internet famous!",
              "eff": {
                "followers": 25000,
                "fame": 4,
                "happiness": 12
              }
            },
            {
              "w": 4,
              "text": "Forty-three views, mostly your mom.",
              "eff": {
                "happiness": -3,
                "followers": 40
              }
            }
          ]
        }
      ]
    },
    {
      "id": "teen_vape_pressure",
      "cat": "teen",
      "type": "health",
      "weight": 4,
      "text": "Kids behind the gym pass you a vape and tell you everyone's doing it.",
      "cond": {
        "minAge": 14,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Take a hit to fit in",
          "outcomes": [
            {
              "w": 3,
              "text": "You cough your lungs out and feel sick.",
              "eff": {
                "health": -4,
                "happiness": -2
              }
            },
            {
              "w": 2,
              "text": "You get hooked and start buying them yourself.",
              "eff": {
                "health": -8,
                "money": -40,
                "addCondition": "nicotine addiction"
              }
            }
          ]
        },
        {
          "text": "Hard pass and walk away",
          "eff": {
            "health": 1,
            "karma": 2,
            "rel": {
              "friend": -2
            }
          }
        }
      ]
    },
    {
      "id": "teen_summer_lifeguard",
      "cat": "teen",
      "type": "money",
      "weight": 3,
      "text": "The community pool is hiring lifeguards for the summer.",
      "cond": {
        "minAge": 15,
        "maxAge": 17,
        "noJob": true,
        "minStat": {
          "health": 50
        }
      },
      "eff": {
        "money": 1200,
        "health": 3,
        "looks": 2,
        "happiness": 4
      }
    },
    {
      "id": "teen_babysitting_gig",
      "cat": "teen",
      "type": "money",
      "weight": 4,
      "text": "The neighbors ask if you can babysit their two kids on Friday night.",
      "cond": {
        "minAge": 13,
        "maxAge": 16,
        "noJob": true
      },
      "choices": [
        {
          "text": "Take the job",
          "outcomes": [
            {
              "w": 3,
              "text": "The kids were angels and the parents tipped you well.",
              "eff": {
                "money": 60,
                "happiness": 4,
                "smarts": 1,
                "karma": 1
              }
            },
            {
              "w": 2,
              "text": "Total chaos — one kid drew on the walls in marker.",
              "eff": {
                "money": 40,
                "happiness": -3
              }
            }
          ]
        },
        {
          "text": "Stay home instead",
          "eff": {}
        }
      ]
    },
    {
      "id": "teen_homecoming_dance",
      "cat": "teen",
      "type": "love",
      "weight": 4,
      "text": "Homecoming is coming up and everyone's pairing off.",
      "cond": {
        "minAge": 15,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Make a big public promposal",
          "outcomes": [
            {
              "w": 2,
              "text": "They said yes in front of everyone — magical!",
              "eff": {
                "happiness": 13,
                "looks": 2,
                "fame": 1
              }
            },
            {
              "w": 2,
              "text": "They turned you down in front of the whole hallway.",
              "eff": {
                "happiness": -9
              }
            }
          ]
        },
        {
          "text": "Go solo with your friends",
          "eff": {
            "happiness": 6,
            "rel": {
              "friend": 3
            }
          }
        },
        {
          "text": "Skip it and stay home",
          "eff": {
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "teen_detention",
      "cat": "teen",
      "type": "school",
      "weight": 3,
      "text": "You got caught passing notes and landed in after-school detention.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "inSchool": true
      },
      "eff": {
        "happiness": -3,
        "smarts": 1,
        "rel": {
          "mother": -2
        }
      }
    },
    {
      "id": "teen_science_fair",
      "cat": "teen",
      "type": "school",
      "weight": 3,
      "text": "The regional science fair is accepting projects.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Pour your heart into a real experiment",
          "outcomes": [
            {
              "w": 2,
              "text": "You won first place and a small scholarship!",
              "eff": {
                "smarts": 6,
                "happiness": 9,
                "money": 250
              }
            },
            {
              "w": 2,
              "text": "Your volcano didn't erupt. Participation ribbon.",
              "eff": {
                "smarts": 3,
                "happiness": 1
              }
            }
          ]
        },
        {
          "text": "Throw something together the night before",
          "eff": {
            "smarts": 1,
            "happiness": -1
          }
        },
        {
          "text": "Don't enter",
          "eff": {}
        }
      ]
    },
    {
      "id": "teen_growth_spurt",
      "cat": "teen",
      "type": "health",
      "weight": 3,
      "text": "You hit a sudden growth spurt over the summer and barely recognize yourself.",
      "cond": {
        "minAge": 13,
        "maxAge": 16
      },
      "eff": {
        "looks": 4,
        "health": 2,
        "happiness": 5
      }
    },
    {
      "id": "teen_acne_breakout",
      "cat": "teen",
      "type": "health",
      "weight": 3,
      "text": "A brutal acne breakout shows up right before picture day.",
      "cond": {
        "minAge": 13,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "See a dermatologist",
          "eff": {
            "looks": 3,
            "money": -120,
            "happiness": 2
          }
        },
        {
          "text": "Just power through it",
          "eff": {
            "looks": -3,
            "happiness": -4
          }
        }
      ]
    },
    {
      "id": "teen_skip_school",
      "cat": "teen",
      "type": "school",
      "weight": 4,
      "text": "Your friends want to skip class and go to the mall.",
      "cond": {
        "minAge": 14,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Ditch with them",
          "outcomes": [
            {
              "w": 3,
              "text": "Best day ever — and nobody noticed.",
              "eff": {
                "happiness": 8,
                "rel": {
                  "friend": 4
                },
                "smarts": -1
              }
            },
            {
              "w": 2,
              "text": "The attendance office called home. Grounded.",
              "eff": {
                "happiness": -6,
                "rel": {
                  "mother": -5
                }
              }
            }
          ]
        },
        {
          "text": "Stay in class",
          "eff": {
            "smarts": 2,
            "rel": {
              "friend": -2
            }
          }
        }
      ]
    },
    {
      "id": "teen_online_troll",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "A troll is leaving nasty comments all over your posts.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "minStat": {
          "followers": 0
        }
      },
      "choices": [
        {
          "text": "Clap back publicly",
          "outcomes": [
            {
              "w": 2,
              "text": "Your comeback went viral and the troll deleted their account.",
              "eff": {
                "followers": 1500,
                "happiness": 5,
                "fame": 1
              }
            },
            {
              "w": 2,
              "text": "It spiraled into a flame war that drained you.",
              "eff": {
                "happiness": -7,
                "followers": -200
              }
            }
          ]
        },
        {
          "text": "Block and ignore them",
          "eff": {
            "happiness": 2,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "teen_first_heartbreak",
      "cat": "teen",
      "type": "love",
      "weight": 4,
      "text": "Your first real relationship comes to a painful end.",
      "cond": {
        "minAge": 14,
        "maxAge": 17,
        "hasPartnerKind": "partner"
      },
      "choices": [
        {
          "text": "Cry it out with friends and ice cream",
          "eff": {
            "happiness": -4,
            "rel": {
              "friend": 4
            },
            "health": -1
          }
        },
        {
          "text": "Throw yourself into schoolwork",
          "eff": {
            "happiness": -3,
            "smarts": 4
          }
        },
        {
          "text": "Write angsty poetry about it",
          "eff": {
            "happiness": 1,
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "teen_underage_party",
      "cat": "teen",
      "type": "crime",
      "weight": 4,
      "text": "Someone's parents are out of town and there's a wild party tonight.",
      "cond": {
        "minAge": 15,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Go and party hard",
          "outcomes": [
            {
              "w": 2,
              "text": "Legendary night, no consequences.",
              "eff": {
                "happiness": 9,
                "health": -2,
                "rel": {
                  "friend": 4
                }
              }
            },
            {
              "w": 2,
              "text": "The cops broke it up and your parents had to pick you up.",
              "eff": {
                "happiness": -6,
                "karma": -2,
                "rel": {
                  "father": -5
                }
              }
            }
          ]
        },
        {
          "text": "Go but stay sober and leave early",
          "eff": {
            "happiness": 4,
            "karma": 1
          }
        },
        {
          "text": "Skip it",
          "eff": {
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "teen_volunteer_shelter",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "Your school offers volunteer hours at the local animal shelter.",
      "cond": {
        "minAge": 14,
        "maxAge": 17
      },
      "eff": {
        "karma": 6,
        "happiness": 6,
        "smarts": 1,
        "rel": {
          "friend": 2
        }
      }
    },
    {
      "id": "teen_class_president",
      "cat": "teen",
      "type": "school",
      "weight": 3,
      "text": "Friends encourage you to run for class president.",
      "cond": {
        "minAge": 15,
        "maxAge": 17,
        "inSchool": true,
        "minStat": {
          "smarts": 40
        }
      },
      "choices": [
        {
          "text": "Run a full campaign",
          "outcomes": [
            {
              "w": 2,
              "text": "You won in a landslide!",
              "eff": {
                "happiness": 10,
                "respect": 3,
                "approval": 5,
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "You lost, but learned a lot about people.",
              "eff": {
                "happiness": -3,
                "smarts": 3
              }
            }
          ]
        },
        {
          "text": "Decide it's not for you",
          "eff": {}
        }
      ]
    },
    {
      "id": "teen_part_time_burger",
      "cat": "teen",
      "type": "money",
      "weight": 4,
      "text": "The fast-food joint downtown is hiring after school.",
      "cond": {
        "minAge": 15,
        "maxAge": 17,
        "noJob": true
      },
      "choices": [
        {
          "text": "Take the shifts",
          "eff": {
            "money": 800,
            "happiness": -1,
            "smarts": 1
          }
        },
        {
          "text": "Decide school comes first",
          "eff": {
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "teen_sneak_out",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "You want to sneak out your window to meet friends at midnight.",
      "cond": {
        "minAge": 14,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Climb out",
          "outcomes": [
            {
              "w": 3,
              "text": "You snuck back in by sunrise undetected.",
              "eff": {
                "happiness": 7,
                "rel": {
                  "friend": 3
                }
              }
            },
            {
              "w": 2,
              "text": "Your parents caught you climbing back in.",
              "eff": {
                "happiness": -5,
                "rel": {
                  "mother": -6
                }
              }
            }
          ]
        },
        {
          "text": "Stay in bed",
          "eff": {
            "health": 1
          }
        }
      ]
    },
    {
      "id": "teen_first_car_handmedown",
      "cat": "teen",
      "type": "family",
      "weight": 2,
      "text": "Your family gives you their old beater as your first car.",
      "once": true,
      "cond": {
        "minAge": 16,
        "maxAge": 17,
        "hasFlag": "hasPermit"
      },
      "choices": [
        {
          "text": "Accept it gratefully",
          "eff": {
            "happiness": 12,
            "rel": {
              "father": 5,
              "mother": 5
            },
            "addAsset": {
              "kind": "car",
              "name": "Rusty Hand-Me-Down",
              "value": 1500
            }
          }
        },
        {
          "text": "Complain that it's embarrassing",
          "eff": {
            "happiness": -2,
            "rel": {
              "father": -4
            },
            "addAsset": {
              "kind": "car",
              "name": "Rusty Hand-Me-Down",
              "value": 1500
            }
          }
        }
      ]
    },
    {
      "id": "teen_track_meet",
      "cat": "teen",
      "type": "school",
      "weight": 3,
      "text": "You're running the anchor leg at the big track meet.",
      "cond": {
        "minAge": 13,
        "maxAge": 17,
        "minStat": {
          "health": 45
        }
      },
      "choices": [
        {
          "text": "Give it everything",
          "outcomes": [
            {
              "w": 2,
              "text": "You crossed the line first — school record!",
              "eff": {
                "health": 5,
                "happiness": 11,
                "looks": 2,
                "fame": 1
              }
            },
            {
              "w": 1,
              "text": "You pulled a hamstring at the final turn.",
              "eff": {
                "health": -8,
                "happiness": -5
              }
            }
          ]
        },
        {
          "text": "Pace yourself safely",
          "eff": {
            "health": 3,
            "happiness": 3
          }
        }
      ]
    },
    {
      "id": "teen_identity_questions",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "You're staying up late wondering who you really are and who you want to become.",
      "cond": {
        "minAge": 14,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Journal your thoughts honestly",
          "eff": {
            "smarts": 2,
            "happiness": 4
          }
        },
        {
          "text": "Talk it through with a parent",
          "eff": {
            "happiness": 5,
            "rel": {
              "mother": 5
            }
          }
        },
        {
          "text": "Reinvent your whole style",
          "eff": {
            "looks": 3,
            "happiness": 3
          }
        }
      ]
    },
    {
      "id": "teen_lemonade_grown_up",
      "cat": "teen",
      "type": "money",
      "weight": 2,
      "text": "You decide to flip thrifted clothes online for profit.",
      "cond": {
        "minAge": 13,
        "maxAge": 16
      },
      "choices": [
        {
          "text": "Go all in on the hustle",
          "outcomes": [
            {
              "w": 1,
              "text": "Your shop blew up and you cleared real money.",
              "eff": {
                "money": 900,
                "smarts": 3,
                "happiness": 7,
                "followers": 500
              }
            },
            {
              "w": 2,
              "text": "Modest sales, but you learned the ropes.",
              "eff": {
                "money": 120,
                "smarts": 2
              }
            }
          ]
        },
        {
          "text": "Keep it a casual side thing",
          "eff": {
            "money": 50,
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "teen_cyberbully_dilemma",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "You see classmates piling onto someone in a group chat.",
      "cond": {
        "minAge": 13,
        "maxAge": 17
      },
      "choices": [
        {
          "text": "Defend the target publicly",
          "eff": {
            "karma": 6,
            "happiness": 3,
            "rel": {
              "friend": -2
            }
          }
        },
        {
          "text": "Stay silent",
          "eff": {
            "karma": -3,
            "happiness": -2
          }
        },
        {
          "text": "Join in to fit in",
          "eff": {
            "karma": -7,
            "happiness": -1,
            "rel": {
              "friend": 2
            }
          }
        }
      ]
    },
    {
      "id": "teen_braces_off",
      "cat": "teen",
      "type": "health",
      "weight": 2,
      "text": "The orthodontist finally takes your braces off after years.",
      "once": true,
      "cond": {
        "minAge": 14,
        "maxAge": 17
      },
      "eff": {
        "looks": 5,
        "happiness": 8,
        "health": 1
      }
    },
    {
      "id": "teen_street_race_dare",
      "cat": "teen",
      "type": "crime",
      "weight": 2,
      "text": "Older kids dare you to a late-night street race.",
      "cond": {
        "minAge": 16,
        "maxAge": 17,
        "hasPartnerKind": "car"
      },
      "choices": [
        {
          "text": "Race them",
          "outcomes": [
            {
              "w": 2,
              "text": "You won and looked cool, but it was reckless.",
              "eff": {
                "happiness": 6,
                "karma": -3,
                "notoriety": 2,
                "looks": 1
              }
            },
            {
              "w": 2,
              "text": "You lost control and dinged the car.",
              "eff": {
                "health": -6,
                "money": -400,
                "happiness": -5
              }
            },
            {
              "w": 1,
              "text": "Cops showed up and impounded the car.",
              "eff": {
                "happiness": -10,
                "karma": -4,
                "loseAssetKind": "car",
                "rel": {
                  "father": -8
                }
              }
            }
          ]
        },
        {
          "text": "Decline and drive home",
          "eff": {
            "karma": 2,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "teen_mentor_teacher",
      "cat": "teen",
      "type": "school",
      "weight": 3,
      "text": "A teacher sees real potential in you and offers to mentor you after class.",
      "cond": {
        "minAge": 14,
        "maxAge": 17,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Accept the guidance",
          "eff": {
            "smarts": 5,
            "happiness": 5,
            "rel": {
              "friend": 2
            }
          }
        },
        {
          "text": "Brush it off as uncool",
          "eff": {
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "teen_summer_camp",
      "cat": "teen",
      "type": "event",
      "weight": 3,
      "text": "Your parents sign you up for a few weeks at summer camp.",
      "cond": {
        "minAge": 13,
        "maxAge": 16
      },
      "choices": [
        {
          "text": "Embrace it fully",
          "outcomes": [
            {
              "w": 3,
              "text": "You made lifelong friends and a summer crush.",
              "eff": {
                "happiness": 10,
                "health": 3,
                "rel": {
                  "friend": 5
                }
              }
            },
            {
              "w": 1,
              "text": "You were homesick the whole time.",
              "eff": {
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Sulk and count the days",
          "eff": {
            "happiness": -3,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "youngadult_dorm_roommate_lottery",
      "cat": "youngadult",
      "type": "school",
      "weight": 5,
      "text": "You move into the dorms and meet your randomly assigned roommate for the first time.",
      "cond": {
        "minAge": 18,
        "maxAge": 22,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Try to befriend them",
          "outcomes": [
            {
              "w": 3,
              "text": "You two click instantly and become close friends.",
              "eff": {
                "happiness": 8,
                "rel": {
                  "friend": 12
                }
              }
            },
            {
              "w": 2,
              "text": "They're nice but you have nothing in common.",
              "eff": {
                "happiness": 2
              }
            }
          ]
        },
        {
          "text": "Keep to yourself and study",
          "eff": {
            "smarts": 3,
            "happiness": -2
          }
        },
        {
          "text": "Set strict shared-space rules day one",
          "outcomes": [
            {
              "w": 2,
              "text": "The chore chart works and the room stays clean.",
              "eff": {
                "happiness": 3,
                "smarts": 1
              }
            },
            {
              "w": 2,
              "text": "They think you're uptight and resent it.",
              "eff": {
                "happiness": -3,
                "rel": {
                  "friend": -5
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "youngadult_first_all_nighter",
      "cat": "youngadult",
      "type": "school",
      "weight": 5,
      "text": "A massive exam is tomorrow and you haven't started studying.",
      "cond": {
        "minAge": 18,
        "maxAge": 24,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Pull an all-nighter fueled by energy drinks",
          "outcomes": [
            {
              "w": 2,
              "text": "You crammed it all and aced the exam.",
              "eff": {
                "smarts": 5,
                "health": -5,
                "happiness": 3
              }
            },
            {
              "w": 3,
              "text": "You blanked from exhaustion and barely passed.",
              "eff": {
                "smarts": 1,
                "health": -6,
                "happiness": -4
              }
            }
          ]
        },
        {
          "text": "Get a full night's sleep and wing it",
          "outcomes": [
            {
              "w": 2,
              "text": "Rested and calm, you did fine.",
              "eff": {
                "health": 2,
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "You needed those hours. Rough grade.",
              "eff": {
                "smarts": -2,
                "happiness": -3
              }
            }
          ]
        }
      ]
    },
    {
      "id": "youngadult_student_loans",
      "cat": "youngadult",
      "type": "money",
      "weight": 4,
      "text": "Tuition is due and you have to figure out how to pay for school.",
      "once": true,
      "cond": {
        "minAge": 18,
        "maxAge": 23,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Take out a big student loan",
          "eff": {
            "money": 12000,
            "flag": {
              "studentDebt": true
            },
            "happiness": 3
          }
        },
        {
          "text": "Work part-time to cover costs yourself",
          "eff": {
            "money": 3000,
            "health": -4,
            "smarts": 1,
            "happiness": -2
          }
        },
        {
          "text": "Apply for every scholarship you can find",
          "outcomes": [
            {
              "w": 1,
              "text": "You landed a full ride! Incredible.",
              "eff": {
                "money": 9000,
                "smarts": 3,
                "happiness": 12
              }
            },
            {
              "w": 3,
              "text": "A couple came through. Every bit helps.",
              "eff": {
                "money": 2500,
                "smarts": 2,
                "happiness": 4
              }
            }
          ]
        }
      ]
    },
    {
      "id": "youngadult_frat_party",
      "cat": "youngadult",
      "type": "event",
      "weight": 5,
      "text": "There's a huge house party this weekend and everyone's going.",
      "cond": {
        "minAge": 18,
        "maxAge": 23
      },
      "choices": [
        {
          "text": "Go and let loose",
          "outcomes": [
            {
              "w": 3,
              "text": "Best night of the semester. You met tons of people.",
              "eff": {
                "happiness": 10,
                "rel": {
                  "friend": 6
                }
              }
            },
            {
              "w": 2,
              "text": "You overdid it and felt awful for two days.",
              "eff": {
                "happiness": -3,
                "health": -5
              }
            }
          ]
        },
        {
          "text": "Stay in and recharge",
          "eff": {
            "happiness": 2,
            "health": 2,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "youngadult_declare_major",
      "cat": "youngadult",
      "type": "school",
      "weight": 4,
      "text": "It's time to declare your major and pick a direction for your life.",
      "once": true,
      "cond": {
        "minAge": 18,
        "maxAge": 21,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Follow the money into a practical field",
          "eff": {
            "smarts": 4,
            "flag": {
              "practicalMajor": true
            },
            "happiness": -1
          }
        },
        {
          "text": "Follow your passion regardless of pay",
          "eff": {
            "happiness": 8,
            "flag": {
              "passionMajor": true
            },
            "smarts": 2
          }
        },
        {
          "text": "Stay undecided a while longer",
          "eff": {
            "happiness": -2,
            "smarts": 1
          }
        }
      ]
    },
    {
      "id": "youngadult_dining_hall_mystery",
      "cat": "youngadult",
      "type": "health",
      "weight": 4,
      "text": "The dining hall served something tonight that you cannot quite identify.",
      "cond": {
        "minAge": 18,
        "maxAge": 23,
        "inSchool": true
      },
      "eff": {
        "health": -4,
        "happiness": -2,
        "money": 5
      }
    },
    {
      "id": "youngadult_first_real_job",
      "cat": "youngadult",
      "type": "money",
      "weight": 5,
      "text": "After a string of applications, you finally land your first real full-time job.",
      "once": true,
      "cond": {
        "minAge": 21,
        "maxAge": 25,
        "noJob": true,
        "notSchool": true
      },
      "eff": {
        "money": 1500,
        "salary": 38000,
        "happiness": 12,
        "smarts": 2,
        "respect": 3
      }
    },
    {
      "id": "youngadult_imposter_syndrome",
      "cat": "youngadult",
      "type": "event",
      "weight": 4,
      "text": "Everyone at your new job seems smarter than you, and you feel like a fraud.",
      "cond": {
        "minAge": 21,
        "maxAge": 25,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Ask a senior coworker for guidance",
          "outcomes": [
            {
              "w": 3,
              "text": "They mentor you and your confidence grows.",
              "eff": {
                "smarts": 4,
                "happiness": 6,
                "respect": 2
              }
            },
            {
              "w": 1,
              "text": "They brush you off, but you push through anyway.",
              "eff": {
                "happiness": 2,
                "smarts": 2
              }
            }
          ]
        },
        {
          "text": "Fake it till you make it",
          "outcomes": [
            {
              "w": 2,
              "text": "You bluffed your way to looking competent.",
              "eff": {
                "happiness": 3,
                "respect": 2
              }
            },
            {
              "w": 2,
              "text": "Your bluff got called in a meeting. Mortifying.",
              "eff": {
                "happiness": -6,
                "respect": -3
              }
            }
          ]
        }
      ]
    },
    {
      "id": "youngadult_move_out",
      "cat": "youngadult",
      "type": "family",
      "weight": 5,
      "text": "You're ready to move out of your parents' place and get your own apartment.",
      "once": true,
      "cond": {
        "minAge": 19,
        "maxAge": 24,
        "minMoney": 800
      },
      "choices": [
        {
          "text": "Sign a lease with roommates",
          "eff": {
            "money": -1200,
            "happiness": 8,
            "rel": {
              "friend": 4
            },
            "flag": {
              "movedOut": true
            }
          }
        },
        {
          "text": "Get a tiny studio all to yourself",
          "eff": {
            "money": -2000,
            "happiness": 6,
            "flag": {
              "movedOut": true
            }
          }
        },
        {
          "text": "Stay home a bit longer to save money",
          "eff": {
            "money": 600,
            "happiness": -3,
            "rel": {
              "mother": -2
            }
          }
        }
      ]
    },
    {
      "id": "youngadult_internship",
      "cat": "youngadult",
      "type": "school",
      "weight": 4,
      "text": "A competitive summer internship just opened applications in your field.",
      "cond": {
        "minAge": 19,
        "maxAge": 24,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Apply and hustle for it",
          "outcomes": [
            {
              "w": 2,
              "text": "You got it! Real experience and a stipend.",
              "eff": {
                "money": 4000,
                "smarts": 5,
                "respect": 3,
                "happiness": 8
              }
            },
            {
              "w": 3,
              "text": "Rejected, but the practice interviews helped.",
              "eff": {
                "smarts": 2,
                "happiness": -3
              }
            }
          ]
        },
        {
          "text": "Take an unpaid 'exposure' internship instead",
          "eff": {
            "smarts": 4,
            "money": -300,
            "happiness": 1,
            "respect": 2
          }
        },
        {
          "text": "Just relax this summer",
          "eff": {
            "happiness": 5,
            "health": 3
          }
        }
      ]
    },
    {
      "id": "youngadult_credit_card_trap",
      "cat": "youngadult",
      "type": "money",
      "weight": 4,
      "text": "A booth on campus offers a free t-shirt if you sign up for a credit card.",
      "cond": {
        "minAge": 18,
        "maxAge": 24
      },
      "choices": [
        {
          "text": "Sign up and grab the shirt",
          "outcomes": [
            {
              "w": 2,
              "text": "You build credit responsibly. Adulting!",
              "eff": {
                "smarts": 2,
                "happiness": 2,
                "flag": {
                  "hasCredit": true
                }
              }
            },
            {
              "w": 3,
              "text": "You max it out on takeout and games.",
              "eff": {
                "money": -1800,
                "happiness": -4,
                "flag": {
                  "creditDebt": true
                }
              }
            }
          ]
        },
        {
          "text": "Walk past. You don't need the debt.",
          "eff": {
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "youngadult_first_breakup",
      "cat": "youngadult",
      "type": "love",
      "weight": 5,
      "text": "Your relationship has been rocky, and a serious fight brings it to a head.",
      "cond": {
        "minAge": 18,
        "maxAge": 25,
        "hasPartnerKind": "partner"
      },
      "choices": [
        {
          "text": "Work it out together",
          "outcomes": [
            {
              "w": 2,
              "text": "You both apologize and grow closer.",
              "eff": {
                "happiness": 6,
                "rel": {
                  "partner": 10
                }
              }
            },
            {
              "w": 2,
              "text": "The cracks are too deep. You drift apart.",
              "eff": {
                "happiness": -8,
                "rel": {
                  "partner": -15
                }
              }
            }
          ]
        },
        {
          "text": "End it cleanly",
          "eff": {
            "happiness": -6,
            "rel": {
              "partner": -25
            },
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "youngadult_situationship",
      "cat": "youngadult",
      "type": "love",
      "weight": 4,
      "text": "You've been talking to someone for months but you're not 'official' and it's confusing.",
      "cond": {
        "minAge": 18,
        "maxAge": 25,
        "single": true
      },
      "choices": [
        {
          "text": "Have the 'what are we' talk",
          "outcomes": [
            {
              "w": 2,
              "text": "They want to make it real. Yes!",
              "eff": {
                "happiness": 10,
                "rel": {
                  "partner": 8
                }
              }
            },
            {
              "w": 2,
              "text": "They get scared and pull away.",
              "eff": {
                "happiness": -5
              }
            }
          ]
        },
        {
          "text": "Keep it casual and go with the flow",
          "eff": {
            "happiness": 1
          }
        },
        {
          "text": "Cut it off and move on",
          "eff": {
            "happiness": -2,
            "smarts": 2
          }
        }
      ]
    },
    {
      "id": "youngadult_ramen_diet",
      "cat": "youngadult",
      "type": "money",
      "weight": 4,
      "text": "You're broke until your next paycheck, surviving on instant noodles.",
      "cond": {
        "minAge": 18,
        "maxAge": 24,
        "maxMoney": 500
      },
      "eff": {
        "money": 30,
        "health": -3,
        "happiness": -2
      }
    },
    {
      "id": "youngadult_dropout_decision",
      "cat": "youngadult",
      "type": "school",
      "weight": 3,
      "text": "You're burnt out and seriously questioning whether college is worth it.",
      "cond": {
        "minAge": 19,
        "maxAge": 23,
        "inSchool": true
      },
      "choices": [
        {
          "text": "Drop out and chase a startup idea",
          "outcomes": [
            {
              "w": 1,
              "text": "Against the odds, your idea takes off.",
              "eff": {
                "money": 20000,
                "happiness": 12,
                "respect": 6,
                "flag": {
                  "dropout": true
                }
              }
            },
            {
              "w": 4,
              "text": "It fizzles and you're back to square one.",
              "eff": {
                "money": -1000,
                "happiness": -8,
                "flag": {
                  "dropout": true
                }
              }
            }
          ]
        },
        {
          "text": "Push through and finish the degree",
          "eff": {
            "smarts": 3,
            "happiness": -2,
            "respect": 2
          }
        },
        {
          "text": "Take a gap semester to reset",
          "eff": {
            "happiness": 5,
            "health": 3,
            "smarts": -1
          }
        }
      ]
    },
    {
      "id": "youngadult_roommate_doesnt_pay_rent",
      "cat": "youngadult",
      "type": "money",
      "weight": 4,
      "text": "Your roommate is short on rent again and asks you to cover their half.",
      "cond": {
        "minAge": 19,
        "maxAge": 25,
        "hasFlag": "movedOut"
      },
      "choices": [
        {
          "text": "Cover it to keep the peace",
          "eff": {
            "money": -700,
            "happiness": -2,
            "karma": 3,
            "rel": {
              "friend": 4
            }
          }
        },
        {
          "text": "Refuse and tell them to figure it out",
          "outcomes": [
            {
              "w": 2,
              "text": "They scramble and pay up. Tension lingers.",
              "eff": {
                "rel": {
                  "friend": -6
                }
              }
            },
            {
              "w": 2,
              "text": "They ghost on the lease and you're stuck.",
              "eff": {
                "money": -900,
                "happiness": -6,
                "rel": {
                  "friend": -12
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "youngadult_gym_phase",
      "cat": "youngadult",
      "type": "health",
      "weight": 4,
      "text": "You decide this is the year you finally get in shape.",
      "cond": {
        "minAge": 18,
        "maxAge": 25
      },
      "choices": [
        {
          "text": "Commit to a real routine",
          "outcomes": [
            {
              "w": 2,
              "text": "You stuck with it and feel amazing.",
              "eff": {
                "health": 8,
                "looks": 5,
                "happiness": 6
              }
            },
            {
              "w": 2,
              "text": "Motivation faded after three weeks.",
              "eff": {
                "health": 2,
                "money": -200
              }
            }
          ]
        },
        {
          "text": "Buy expensive gear to motivate yourself",
          "eff": {
            "money": -400,
            "happiness": 2,
            "looks": 1
          }
        }
      ]
    },
    {
      "id": "youngadult_side_hustle",
      "cat": "youngadult",
      "type": "money",
      "weight": 4,
      "text": "A friend convinces you to start a side hustle in your spare time.",
      "cond": {
        "minAge": 18,
        "maxAge": 25
      },
      "choices": [
        {
          "text": "Sell handmade stuff online",
          "outcomes": [
            {
              "w": 2,
              "text": "Orders roll in steadily. Sweet side cash.",
              "eff": {
                "money": 1200,
                "happiness": 4,
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "It barely covered the supplies.",
              "eff": {
                "money": -150,
                "smarts": 1
              }
            }
          ]
        },
        {
          "text": "Drive for a delivery app",
          "eff": {
            "money": 800,
            "health": -2,
            "happiness": 1
          }
        },
        {
          "text": "Too busy. Pass.",
          "eff": {}
        }
      ]
    },
    {
      "id": "youngadult_first_car",
      "cat": "youngadult",
      "type": "money",
      "weight": 4,
      "text": "You've saved up and it's time to buy your first car.",
      "cond": {
        "minAge": 18,
        "maxAge": 25,
        "minMoney": 2500
      },
      "choices": [
        {
          "text": "Buy a reliable used sedan",
          "eff": {
            "money": -6000,
            "happiness": 7,
            "addAsset": {
              "kind": "car",
              "name": "Used Sedan",
              "value": 6000
            }
          }
        },
        {
          "text": "Gamble on a cheap fixer-upper",
          "outcomes": [
            {
              "w": 2,
              "text": "Runs like a charm. Steal of a deal!",
              "eff": {
                "money": -1500,
                "happiness": 6,
                "addAsset": {
                  "kind": "car",
                  "name": "Beater Car",
                  "value": 2000
                }
              }
            },
            {
              "w": 2,
              "text": "It's a money pit that breaks down weekly.",
              "eff": {
                "money": -2500,
                "happiness": -5,
                "addAsset": {
                  "kind": "car",
                  "name": "Lemon",
                  "value": 500
                }
              }
            }
          ]
        },
        {
          "text": "Stick with the bus for now",
          "eff": {
            "money": 0,
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "youngadult_networking_event",
      "cat": "youngadult",
      "type": "event",
      "weight": 3,
      "text": "There's an industry networking mixer downtown tonight.",
      "cond": {
        "minAge": 20,
        "maxAge": 25,
        "notSchool": true
      },
      "choices": [
        {
          "text": "Work the room confidently",
          "outcomes": [
            {
              "w": 2,
              "text": "You made a connection that leads to a job tip.",
              "eff": {
                "respect": 4,
                "happiness": 5,
                "salaryMul": 1.05
              }
            },
            {
              "w": 2,
              "text": "You stood awkwardly by the snacks all night.",
              "eff": {
                "happiness": -2
              }
            }
          ]
        },
        {
          "text": "Skip it and watch TV",
          "eff": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "youngadult_road_trip",
      "cat": "youngadult",
      "type": "event",
      "weight": 4,
      "text": "Your friends want to pile in a car and take a spontaneous road trip across the {country}.",
      "cond": {
        "minAge": 18,
        "maxAge": 25
      },
      "choices": [
        {
          "text": "Pack up and go",
          "outcomes": [
            {
              "w": 3,
              "text": "Unforgettable memories and inside jokes for life.",
              "eff": {
                "happiness": 12,
                "rel": {
                  "friend": 8
                },
                "money": -400
              }
            },
            {
              "w": 1,
              "text": "The car broke down in the middle of nowhere.",
              "eff": {
                "happiness": -2,
                "money": -700,
                "health": -2
              }
            }
          ]
        },
        {
          "text": "Stay back, you can't afford it",
          "eff": {
            "happiness": -3,
            "money": 0
          }
        }
      ]
    },
    {
      "id": "youngadult_quarter_life_crisis",
      "cat": "youngadult",
      "type": "event",
      "weight": 3,
      "text": "Everyone online seems to have life figured out, and you suddenly feel hopelessly behind.",
      "once": true,
      "cond": {
        "minAge": 23,
        "maxAge": 25
      },
      "choices": [
        {
          "text": "Make a real five-year plan",
          "eff": {
            "smarts": 3,
            "happiness": 4
          }
        },
        {
          "text": "Impulsively change your whole life",
          "outcomes": [
            {
              "w": 2,
              "text": "The fresh start was exactly what you needed.",
              "eff": {
                "happiness": 8,
                "smarts": 2
              }
            },
            {
              "w": 2,
              "text": "You just created new chaos.",
              "eff": {
                "happiness": -5,
                "money": -500
              }
            }
          ]
        },
        {
          "text": "Delete social media for a while",
          "eff": {
            "happiness": 5,
            "health": 2
          }
        }
      ]
    },
    {
      "id": "youngadult_college_radio",
      "cat": "youngadult",
      "type": "event",
      "weight": 3,
      "text": "You start a niche show on the campus radio station for fun.",
      "cond": {
        "minAge": 18,
        "maxAge": 23,
        "inSchool": true
      },
      "eff": {
        "happiness": 5,
        "followers": 200,
        "smarts": 1
      }
    },
    {
      "id": "youngadult_protest_march",
      "cat": "youngadult",
      "type": "event",
      "weight": 3,
      "text": "A cause you care about is holding a march in {city} this weekend.",
      "cond": {
        "minAge": 18,
        "maxAge": 25
      },
      "choices": [
        {
          "text": "March and make your voice heard",
          "outcomes": [
            {
              "w": 3,
              "text": "You felt energized and part of something bigger.",
              "eff": {
                "happiness": 7,
                "karma": 4,
                "approval": 2
              }
            },
            {
              "w": 1,
              "text": "Things got tense and police moved everyone along.",
              "eff": {
                "happiness": -2,
                "karma": 3,
                "health": -2
              }
            }
          ]
        },
        {
          "text": "Support quietly from home",
          "eff": {
            "karma": 1
          }
        }
      ]
    },
    {
      "id": "youngadult_pulled_an_ankle_dancing",
      "cat": "youngadult",
      "type": "health",
      "weight": 3,
      "text": "You rolled your ankle dancing at a club and limped home laughing.",
      "cond": {
        "minAge": 18,
        "maxAge": 25
      },
      "eff": {
        "health": -4,
        "happiness": 2
      }
    },
    {
      "id": "youngadult_fake_id",
      "cat": "youngadult",
      "type": "crime",
      "weight": 3,
      "text": "A guy in the dorms offers to sell you a fake ID.",
      "cond": {
        "minAge": 18,
        "maxAge": 20
      },
      "choices": [
        {
          "text": "Buy one",
          "outcomes": [
            {
              "w": 3,
              "text": "It works fine and nobody's the wiser.",
              "eff": {
                "money": -150,
                "happiness": 3,
                "karma": -2,
                "notoriety": 1
              }
            },
            {
              "w": 2,
              "text": "The bouncer confiscates it and calls the cops.",
              "eff": {
                "money": -150,
                "happiness": -8,
                "karma": -3,
                "notoriety": 3
              }
            }
          ]
        },
        {
          "text": "Pass on it",
          "eff": {
            "karma": 2
          }
        }
      ]
    },
    {
      "id": "youngadult_professor_mentor",
      "cat": "youngadult",
      "type": "school",
      "weight": 3,
      "text": "A professor is impressed with your work and offers to mentor you.",
      "cond": {
        "minAge": 19,
        "maxAge": 24,
        "inSchool": true,
        "minStat": {
          "smarts": 55
        }
      },
      "choices": [
        {
          "text": "Take the research opportunity",
          "eff": {
            "smarts": 6,
            "respect": 4,
            "happiness": 5,
            "rel": {
              "friend": 3
            }
          }
        },
        {
          "text": "Decline, you're too busy",
          "eff": {
            "happiness": -1
          }
        }
      ]
    },
    {
      "id": "youngadult_apartment_flood",
      "cat": "youngadult",
      "type": "event",
      "weight": 3,
      "text": "A pipe bursts and floods your apartment while you're at work.",
      "cond": {
        "minAge": 19,
        "maxAge": 25,
        "hasFlag": "movedOut"
      },
      "eff": {
        "money": -1500,
        "happiness": -6,
        "loseAssetKind": "possession"
      }
    },
    {
      "id": "youngadult_dating_app",
      "cat": "youngadult",
      "type": "love",
      "weight": 4,
      "text": "You finally make a dating app profile and start swiping.",
      "cond": {
        "minAge": 18,
        "maxAge": 25,
        "single": true
      },
      "choices": [
        {
          "text": "Go on a first date",
          "outcomes": [
            {
              "w": 2,
              "text": "Sparks flew. You've got a second date lined up.",
              "eff": {
                "happiness": 9,
                "rel": {
                  "partner": 6
                }
              }
            },
            {
              "w": 2,
              "text": "Painfully awkward. At least there were free fries.",
              "eff": {
                "happiness": -2,
                "money": -30
              }
            }
          ]
        },
        {
          "text": "Doomscroll and match with no one",
          "eff": {
            "happiness": -3,
            "health": -1
          }
        }
      ]
    },
    {
      "id": "youngadult_volunteer_abroad",
      "cat": "youngadult",
      "type": "event",
      "weight": 2,
      "text": "You have the chance to spend a summer volunteering abroad.",
      "cond": {
        "minAge": 19,
        "maxAge": 25,
        "minMoney": 1000
      },
      "choices": [
        {
          "text": "Go for the experience of a lifetime",
          "eff": {
            "money": -1500,
            "happiness": 12,
            "karma": 8,
            "smarts": 3,
            "looks": 1
          }
        },
        {
          "text": "Stay and save your money",
          "eff": {
            "money": 200,
            "happiness": -2
          }
        }
      ]
    },
    {
      "id": "youngadult_bad_landlord",
      "cat": "youngadult",
      "type": "money",
      "weight": 3,
      "text": "Your landlord is refusing to return your security deposit over imaginary 'damages.'",
      "cond": {
        "minAge": 19,
        "maxAge": 25,
        "hasFlag": "movedOut"
      },
      "choices": [
        {
          "text": "Take them to small claims court",
          "outcomes": [
            {
              "w": 2,
              "text": "You won. Justice and your deposit back.",
              "eff": {
                "money": 1000,
                "happiness": 6,
                "smarts": 2,
                "karma": 2
              }
            },
            {
              "w": 2,
              "text": "You lost on a technicality. Frustrating.",
              "eff": {
                "happiness": -5,
                "smarts": 1
              }
            }
          ]
        },
        {
          "text": "Let it go and move on",
          "eff": {
            "money": 0,
            "happiness": -3
          }
        }
      ]
    },
    {
      "id": "youngadult_promotion_first_job",
      "cat": "youngadult",
      "type": "money",
      "weight": 3,
      "text": "Your hard work gets noticed and your manager offers you a small raise and more responsibility.",
      "cond": {
        "minAge": 22,
        "maxAge": 25,
        "hasJob": true
      },
      "choices": [
        {
          "text": "Accept gratefully",
          "eff": {
            "salaryMul": 1.15,
            "happiness": 6,
            "respect": 3
          }
        },
        {
          "text": "Negotiate for more",
          "outcomes": [
            {
              "w": 2,
              "text": "They respected the ask and bumped it higher.",
              "eff": {
                "salaryMul": 1.25,
                "happiness": 7,
                "respect": 4
              }
            },
            {
              "w": 2,
              "text": "They pulled the offer entirely. Ouch.",
              "eff": {
                "happiness": -6,
                "respect": -2
              }
            }
          ]
        }
      ]
    },
    {
      "id": "youngadult_long_distance",
      "cat": "youngadult",
      "type": "love",
      "weight": 3,
      "text": "Your partner gets accepted to a program in another city, and you have to decide about long distance.",
      "cond": {
        "minAge": 18,
        "maxAge": 25,
        "hasPartnerKind": "partner"
      },
      "choices": [
        {
          "text": "Commit to making it work",
          "outcomes": [
            {
              "w": 2,
              "text": "The distance made you stronger.",
              "eff": {
                "happiness": 4,
                "rel": {
                  "partner": 10
                }
              }
            },
            {
              "w": 3,
              "text": "The miles slowly pulled you apart.",
              "eff": {
                "happiness": -7,
                "rel": {
                  "partner": -18
                }
              }
            }
          ]
        },
        {
          "text": "Break up rather than try",
          "eff": {
            "happiness": -5,
            "rel": {
              "partner": -20
            }
          }
        },
        {
          "text": "Move with them and start fresh",
          "eff": {
            "money": -1000,
            "happiness": 6,
            "rel": {
              "partner": 12
            }
          }
        }
      ]
    },
    {
      "id": "youngadult_graduation",
      "cat": "youngadult",
      "type": "school",
      "weight": 5,
      "text": "After years of work, you walk across the stage and graduate.",
      "once": true,
      "cond": {
        "minAge": 21,
        "maxAge": 25,
        "inSchool": true,
        "minStat": {
          "smarts": 45
        }
      },
      "eff": {
        "happiness": 15,
        "smarts": 4,
        "respect": 5,
        "flag": {
          "graduated": true
        },
        "rel": {
          "mother": 5,
          "father": 5
        }
      }
    }
  ];
})();
