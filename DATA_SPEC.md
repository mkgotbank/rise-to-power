# Rise to Power — Content Data Contract

All gameplay content is **pure data** interpreted by the engine. Add content by
appending objects to the arrays in `data/*.js`. Never put logic in data — only
the declarative keys below (the engine ignores unknown keys, but the build
strips them).

## Effect object (`eff`)
Applied to the character. All numeric values are **deltas** unless noted. Stats clamp 0–100 (karma −100..100).

| key | type | meaning |
|-----|------|---------|
| `health`,`happiness`,`smarts`,`looks`,`karma` | number | stat delta |
| `money` | number | cash delta (can be negative) |
| `moneyMul` | number | multiply cash (e.g. `1.4`, `0.7`) |
| `salary` | number | salary delta (if employed) |
| `salaryMul` | number | multiply salary |
| `fame` | number | fame level delta |
| `followers` | number | social followers delta |
| `notoriety` | number | criminal notoriety delta |
| `respect` | number | crime-org respect delta |
| `approval` | number | political approval delta |
| `flag` | object | set flags, e.g. `{"veteran": true}` |
| `flagInc` | object | increment counters, e.g. `{"arrests": 1}` |
| `rel` | object | relationship delta by type/id, e.g. `{"mother": 5, "partner": -10}` |
| `relAll` | number | delta to every relationship |
| `addAsset` | object | `{kind:"car"|"realestate"|"possession", name, value}` |
| `loseAssetKind` | string | remove all assets of a kind |
| `addCondition` | string\|object | add a health condition |
| `cureCondition` | string | remove a condition by id/kind |
| `jail` | number | go to prison for N years |
| `crimeName` | string | label for the jail record |
| `die` | boolean | the character dies |
| `dieCause` | string | cause of death text |
| `addTrait` | string\|object | add a personality trait |

## Condition object (`cond`) — gate on whether an event/action can occur
`minAge`,`maxAge`,`sex`("male"/"female"),`hasJob`,`noJob`,`inSchool`,`notSchool`,
`married`,`single`,`hasKids`,`noKids`,`inPrison`,`notPrison`,`minMoney`,`maxMoney`,
`country`,`hasFlag`(string),`notFlag`(string),`minStat`(obj),`maxStat`(obj),
`hasPartnerKind`(string),`famous`(bool).

## Event object
```js
{
  id: 'unique_snake_id',     // REQUIRED, unique across all events
  cat: 'adult',              // grouping label
  type: 'money',             // styling: event|crime|love|family|health|money|school|war
  weight: 4,                 // selection weight (default 3)
  once: false,               // fire at most once per life
  cond: { minAge: 18 },      // optional gate
  text: 'Narrative. Supports {first}{last}{he}{him}{his}{country}{city} templating.',
  // EITHER an auto effect:
  eff: { happiness: 3 },
  // OR interactive choices:
  choices: [
    { text: 'Option A', eff: { smarts: 3 } },
    { text: 'Option B', outcomes: [            // weighted random results
        { w: 3, text: 'It worked', eff: { money: 100 } },
        { w: 1, text: 'It failed', eff: { happiness: -5 } } ] }
  ]
}
```

## Catalog schemas (abridged)
- **careers**: `{id,title,category,minAge,salaryMin,salaryMax,reqDegree?,reqSmarts?}`
- **crimes**: `{id,name,desc,minAge,difficulty,lootMin,lootMax,karma,noto,catchChance,minSentence,maxSentence,cond?}`
- **activities**: `{id,name,desc,minAge,cost?,eff?|outcomes?,resultText?}`
- **assets**: `{kind,name,price,desc,minAge}`
- **health**: `{id,name,kind,severity(1-3),minAge,weight,onset{eff}}`
- **missions**: `{id,name,branch(army|navy|air|agency|any),minRank,difficulty,reward,kills?,lethal,medal?}`
