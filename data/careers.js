/* CAREERS — job board pool.
   22 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.careers = [
    {
      "id": "fastfood",
      "title": "Fast Food Cook",
      "category": "Service",
      "minAge": 15,
      "salaryMin": 16000,
      "salaryMax": 24000
    },
    {
      "id": "cashier",
      "title": "Cashier",
      "category": "Retail",
      "minAge": 16,
      "salaryMin": 17000,
      "salaryMax": 26000
    },
    {
      "id": "barista",
      "title": "Barista",
      "category": "Service",
      "minAge": 16,
      "salaryMin": 18000,
      "salaryMax": 28000
    },
    {
      "id": "lifeguard",
      "title": "Lifeguard",
      "category": "Service",
      "minAge": 16,
      "salaryMin": 20000,
      "salaryMax": 30000
    },
    {
      "id": "janitor",
      "title": "Janitor",
      "category": "Labor",
      "minAge": 18,
      "salaryMin": 22000,
      "salaryMax": 34000
    },
    {
      "id": "driver",
      "title": "Delivery Driver",
      "category": "Labor",
      "minAge": 18,
      "salaryMin": 24000,
      "salaryMax": 40000
    },
    {
      "id": "construction",
      "title": "Construction Worker",
      "category": "Labor",
      "minAge": 18,
      "salaryMin": 30000,
      "salaryMax": 55000
    },
    {
      "id": "salesrep",
      "title": "Sales Representative",
      "category": "Business",
      "minAge": 18,
      "salaryMin": 32000,
      "salaryMax": 70000,
      "reqSmarts": 35
    },
    {
      "id": "teacher",
      "title": "Teacher",
      "category": "Education",
      "minAge": 22,
      "salaryMin": 40000,
      "salaryMax": 65000,
      "reqDegree": "Bachelor's",
      "reqSmarts": 45
    },
    {
      "id": "nurse",
      "title": "Registered Nurse",
      "category": "Medical",
      "minAge": 22,
      "salaryMin": 55000,
      "salaryMax": 95000,
      "reqDegree": "Bachelor's",
      "reqSmarts": 55
    },
    {
      "id": "engineer",
      "title": "Engineer",
      "category": "Engineering",
      "minAge": 22,
      "salaryMin": 65000,
      "salaryMax": 120000,
      "reqDegree": "Engineering",
      "reqSmarts": 65
    },
    {
      "id": "swe",
      "title": "Software Engineer",
      "category": "Tech",
      "minAge": 21,
      "salaryMin": 75000,
      "salaryMax": 180000,
      "reqDegree": "Computer Science",
      "reqSmarts": 60
    },
    {
      "id": "accountant",
      "title": "Accountant",
      "category": "Finance",
      "minAge": 22,
      "salaryMin": 50000,
      "salaryMax": 95000,
      "reqDegree": "Bachelor's",
      "reqSmarts": 55
    },
    {
      "id": "analyst",
      "title": "Financial Analyst",
      "category": "Finance",
      "minAge": 22,
      "salaryMin": 60000,
      "salaryMax": 130000,
      "reqDegree": "Bachelor's",
      "reqSmarts": 60
    },
    {
      "id": "lawyer",
      "title": "Lawyer",
      "category": "Legal",
      "minAge": 25,
      "salaryMin": 90000,
      "salaryMax": 250000,
      "reqDegree": "Pre-Law",
      "reqSmarts": 72
    },
    {
      "id": "doctor",
      "title": "Doctor",
      "category": "Medical",
      "minAge": 28,
      "salaryMin": 160000,
      "salaryMax": 400000,
      "reqDegree": "Pre-Med",
      "reqSmarts": 78
    },
    {
      "id": "pilot",
      "title": "Airline Pilot",
      "category": "Aviation",
      "minAge": 23,
      "salaryMin": 80000,
      "salaryMax": 200000,
      "reqDegree": "Bachelor's",
      "reqSmarts": 60
    },
    {
      "id": "architect",
      "title": "Architect",
      "category": "Design",
      "minAge": 24,
      "salaryMin": 60000,
      "salaryMax": 130000,
      "reqDegree": "Bachelor's",
      "reqSmarts": 62
    },
    {
      "id": "actor",
      "title": "Actor",
      "category": "Entertainment",
      "minAge": 18,
      "salaryMin": 20000,
      "salaryMax": 90000,
      "reqSmarts": 30
    },
    {
      "id": "musician",
      "title": "Musician",
      "category": "Entertainment",
      "minAge": 16,
      "salaryMin": 15000,
      "salaryMax": 80000
    },
    {
      "id": "writer",
      "title": "Writer",
      "category": "Media",
      "minAge": 18,
      "salaryMin": 25000,
      "salaryMax": 70000,
      "reqSmarts": 45
    },
    {
      "id": "designer",
      "title": "Graphic Designer",
      "category": "Design",
      "minAge": 19,
      "salaryMin": 35000,
      "salaryMax": 80000,
      "reqSmarts": 40
    }
  ];
  D.companies = [
    "Globex",
    "Initech",
    "Acme Corp",
    "Hooli",
    "Vandelay",
    "Stark Industries",
    "Wayne Enterprises",
    "Soylent",
    "Umbrella",
    "Cyberdyne",
    "Wonka",
    "Oscorp",
    "Massive Dynamic",
    "Gekko & Co"
  ];
  D.majors = [
    {
      "field": "Business",
      "degree": "Bachelor's in Business"
    },
    {
      "field": "Computer Science",
      "degree": "Bachelor's in Computer Science"
    },
    {
      "field": "Pre-Medicine",
      "degree": "Pre-Med Degree"
    },
    {
      "field": "Pre-Law",
      "degree": "Pre-Law Degree"
    },
    {
      "field": "Engineering",
      "degree": "Bachelor's in Engineering"
    },
    {
      "field": "Psychology",
      "degree": "Bachelor's in Psychology"
    },
    {
      "field": "Fine Arts",
      "degree": "Bachelor's in Fine Arts"
    },
    {
      "field": "Political Science",
      "degree": "Bachelor's in Political Science"
    }
  ];
})();
