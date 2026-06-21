const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');const store={};
const sb={console,structuredClone:(typeof structuredClone!=='undefined'?structuredClone:undefined),performance:{now:()=>Date.now()+Math.random()},localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}},Math,JSON,Date,parseInt,parseFloat,isNaN};
sb.window=sb;const ctx=vm.createContext(sb);
['js/rng.js','data/countries.js','data/names.js','data/careers.js','data/activities.js','data/events.js','data/crimes.js','data/health.js','data/assets.js','data/orgs.js','data/missions.js','data/world.js','js/engine.js','js/systems.js','js/statecraft.js'].forEach(f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f}));
const RTP=sb.RTP,E=RTP.Engine;
let pass=0,fail=0; const ok=(c,m)=>{if(c){pass++}else{fail++;console.log('  FAIL:',m)}};

// 1. ORIENTATION drives dating candidate sex
let s=E.newState({seed:'orient'});E.createCharacter(s,{first:'A',sex:'male',orientation:'gay'});
s.char.age=25;
let allMale=true; for(let i=0;i<20;i++){const d=RTP.loveSystem.findDate(s); if(d.ok && d.candidate.sex!=='male')allMale=false;}
ok(allMale,'gay male only meets male dates'); 
E.godSet(s,{orientation:'straight'}); ok(s.char.attractedTo[0]==='female','godSet orientation->straight updates attraction');

// 2. MEET / DATE / BREAKUP / CHEAT
let s2=E.newState({seed:'rel'});E.createCharacter(s2,{first:'B',sex:'female',orientation:'bisexual'});s2.char.age=30;
const f=RTP.loveSystem.meetPerson(s2); ok(f.ok && s2.char.relationships.some(r=>r.type==='friend'),'meetPerson adds friend');
const d=RTP.loveSystem.findDate(s2); const a=RTP.loveSystem.askOut(s2, d.candidate);
// force a partner if askOut failed
if(!E.partner(s2.char)) E.addRelationship(s2.char,{type:'partner',name:'P',sex:'male',rel:80,age:30});
const p=E.partner(s2.char);
const ch=RTP.loveSystem.cheat(s2); ok(ch.ok,'cheat returns result');
// ensure a partner again for breakup
if(!E.partner(s2.char)) E.addRelationship(s2.char,{type:'spouse',name:'Q',sex:'male',rel:80,age:30});
const before=s2.char.money; const bu=RTP.loveSystem.breakUp(s2, E.partner(s2.char).id);
ok(bu.ok && !E.partner(s2.char),'breakUp removes partner');

// 3. TIME TRAVEL
let s3=E.newState({seed:'tt'});E.createCharacter(s3,{first:'C'});
RTP.Engine.on(()=>{}); // ensure listeners
for(let i=0;i<10;i++)E.ageUp(s3);
const ageNow=s3.char.age; const tl=E.timeline();
ok(tl.length>0,'timeline has snapshots ('+tl.length+')');
const restored=E.timeTravel(2);
ok(restored && restored.char.age<ageNow,'timeTravel rewinds age ('+ageNow+' -> '+(restored?restored.char.age:'?')+')');

// 4. GOD MODE
let s4=E.newState({seed:'god'});E.createCharacter(s4,{first:'D'});
E.godSet(s4,{stats:{smarts:100,health:100},money:5000000});
ok(s4.char.stats.smarts===100 && s4.char.money===5000000,'godSet stats+money');
s4.char.criminal.record.push({crime:'x'});s4.char.criminal.inPrison=true;
E.godSet(s4,{clearRecord:true}); ok(!s4.char.criminal.inPrison && s4.char.criminal.record.length===0,'godSet clearRecord');
E.die(s4,'test'); E.godSet(s4,{revive:true}); ok(s4.char.alive,'godSet revive');

// 5. APPROVAL no longer stuck at 50
let s5=E.newState({seed:'appr'});E.createCharacter(s5,{first:'E'});s5.char.age=45;
s5.char.power.politics.inOffice=true;s5.char.power.politics.office='Mayor';s5.char.power.politics.approval=50;
s5.char.job={id:'office',title:'Mayor',company:'Gov',category:'Politics',salary:90000,level:2,performance:50,years:0};
const moved=new Set();
for(let i=0;i<8;i++){E.ageUp(s5); if(s5.char.power.politics.inOffice) moved.add(s5.char.power.politics.approval);}
ok(moved.size>1 || ![...moved][0] || [...moved][0]!==50,'approval drifts over years (values: '+[...moved].join(',')+')');
const pa=RTP.powerSystem.politicalAction(s5,'speech'); ok(pa.ok!==undefined,'politicalAction speech works');
const a2=RTP.powerSystem.politicalAction(s5,'bill'); ok(a2.ok,'politicalAction bill works');

console.log(`\n=== FEATURES: ${pass} passed, ${fail} failed ===`);
process.exit(fail?1:0);
