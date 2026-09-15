const fs=require('node:fs'),path=require('node:path');
const html=fs.readFileSync('dist/index.html','utf8');
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate anchors');
let count=0;
for(const [,url] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 if(url.startsWith('#')){if(!ids.includes(url.slice(1)))throw Error('Missing anchor '+url);}
 else if(!/^(https?:|mailto:|data:)/.test(url)&&!fs.existsSync(path.join('dist',url.split(/[?#]/)[0])))throw Error('Missing asset '+url);
 count++;
}
console.log('Validated '+count+' references and '+ids.length+' anchors.');
