const clock = document.querySelector('#clock');
function updateClock(){clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kuala_Lumpur',hour:'2-digit',minute:'2-digit'}).format(new Date());}
updateClock();setInterval(updateClock,60000);
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('soojianlin@gmail.com');status.textContent='Email copied.';}catch{status.textContent='Please select and copy: soojianlin@gmail.com';}});
document.querySelectorAll('details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('details').forEach(other=>{if(other!==item)other.open=false;});}));
