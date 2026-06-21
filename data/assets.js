/* ASSETS — purchasable items.
   14 entries — hand-authored seeds + AI-generated content.
   See DATA_SPEC.md for the schema. Built by build/merge.js. */
(function () {
  const D = ((window.RTP = window.RTP || {}).data = (window.RTP.data || {}));
  D.assets = [
    {
      "kind": "car",
      "name": "Used Sedan",
      "price": 6000,
      "desc": "Gets you from A to B.",
      "minAge": 16
    },
    {
      "kind": "car",
      "name": "Family SUV",
      "price": 32000,
      "desc": "Reliable and roomy.",
      "minAge": 18
    },
    {
      "kind": "car",
      "name": "Sports Coupe",
      "price": 60000,
      "desc": "Fast and flashy.",
      "minAge": 18
    },
    {
      "kind": "car",
      "name": "Luxury Sedan",
      "price": 95000,
      "desc": "Executive comfort.",
      "minAge": 18
    },
    {
      "kind": "car",
      "name": "Supercar",
      "price": 320000,
      "desc": "0–60 in 2.8s.",
      "minAge": 18
    },
    {
      "kind": "realestate",
      "name": "Studio Apartment",
      "price": 90000,
      "desc": "A modest first home.",
      "minAge": 18
    },
    {
      "kind": "realestate",
      "name": "Suburban House",
      "price": 320000,
      "desc": "Three beds, two baths.",
      "minAge": 18
    },
    {
      "kind": "realestate",
      "name": "Downtown Condo",
      "price": 550000,
      "desc": "City living at its finest.",
      "minAge": 18
    },
    {
      "kind": "realestate",
      "name": "Lakeside Villa",
      "price": 1400000,
      "desc": "Your private retreat.",
      "minAge": 18
    },
    {
      "kind": "realestate",
      "name": "Private Estate",
      "price": 7500000,
      "desc": "Gates, grounds, and grandeur.",
      "minAge": 18
    },
    {
      "kind": "possession",
      "name": "Designer Watch",
      "price": 12000,
      "desc": "Tells time in style.",
      "minAge": 16
    },
    {
      "kind": "possession",
      "name": "Diamond Necklace",
      "price": 45000,
      "desc": "Ice cold.",
      "minAge": 16
    },
    {
      "kind": "possession",
      "name": "Yacht",
      "price": 2200000,
      "desc": "Weekend on the water.",
      "minAge": 18
    },
    {
      "kind": "possession",
      "name": "Private Jet",
      "price": 18000000,
      "desc": "Skip the security line forever.",
      "minAge": 18
    }
  ];
})();
