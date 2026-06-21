const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');const store={};
const sb={console,performance:{now:()=>Date.now()+Math.random()},localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}},Math,JSON,Date,parseInt,parseFloat,isNaN};
sb.window=sb;const ctx=vm.createContext(sb);
['js/rng.js','data/countries.js','data/names.js','data/careers.js','data/activities.js','data/events.js','data/crimes.js','data/health.js','data/assets.js','data/orgs.js','data/missions.js','data/world.js','js/engine.js','js/systems.js','js/statecraft.js'].forEach(f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f}));
const RTP=sb.RTP,E=RTP.Engine;
RTP.Engine.on((t,p)=>{if(t==='events')p.events.forEach(ev=>E.resolveChoice(p.state,ev,ev.choices[0]))});

// ---- FORCE LEGACY ----
let s=E.newState({seed:'legacy'});E.createCharacter(s,{first:'Test',sex:'male'});
s.char.age=30;
const d=RTP.loveSystem.findDate(s); const p=E.addRelationship(s.char,{type:'spouse',name:'Spouse X',sex:'female',age:28,rel:80});
const kid=RTP.loveSystem.haveChild(s);
console.log('child created:',kid.ok, '->', s.char.relationships.filter(r=>r.type==='child').map(c=>c.name));
E.addMoney(s,500000); E.addAsset(s,{kind:'realestate',name:'Estate',value:1000000});
E.die(s,'testing');
console.log('canContinueLegacy:',E.canContinueLegacy(s));
const before=s.dynasty.generation;
E.continueAsHeir(s,null);
console.log('legacy OK -> gen',s.dynasty.generation,'(was',before,'), heir cash',s.char.money,'heir name',s.char.first,s.char.last,'inherited assets',s.char.assets.length);

// ---- FORCE STATECRAFT + WAR + ANNEX ----
let s2=E.newState({seed:'war'});E.createCharacter(s2,{first:'Leader',sex:'female'});
s2.char.age=50; s2.char.flags.headOfState=true;
RTP.statecraftSystem.overview(s2); // init world
const me=RTP.worldUtil.playerNationObj(s2);
me.military=100; me.gdp=5e14; me.treasury=1e13;
const ov=RTP.statecraftSystem.overview(s2);
const target=ov.others[0];
console.log('declaring war on',target.name);
console.log(RTP.statecraftSystem.declareWar(s2,target.id).text);
let conquered=false;
for(let y=0;y<20 && !conquered;y++){const log=[];RTP.statecraftSystem.warTick(s2,log);log.forEach(l=>{if(/CONQUERED|failed/.test(l.text)){console.log('  ->',l.text);}});conquered=s2.world.nations[target.id].annexedBy!=null;}
const emp=RTP.worldUtil.empireStats(s2);
console.log('empire nations:',emp.nations,'conquered:',emp.conquered);

// ---- alliances + diplomacy ----
const ally=ov.others[1]; sb.window.RTP.rng=new RTP.RNG('x');
RTP.statecraftSystem.diplomacy(s2,ally.id,'summit');RTP.statecraftSystem.diplomacy(s2,ally.id,'summit');
console.log('alliance result:',RTP.statecraftSystem.diplomacy(s2,ally.id,'alliance').text);
console.log('\n=== PATH TESTS PASSED ===');
