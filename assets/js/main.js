
console.log('Ekstra Tari v3 - main.js');
async function loadSiswa(selector){
  const res = await fetch('data/siswa.json');
  const data = await res.json();
  // build global map name -> kelas
  window.siswaMap = {};
  data.forEach(s=>{
    window.siswaMap[s.nama] = s.kelas || '';
  });
  const el = document.querySelector(selector);
  if(!el) return;
  el.innerHTML = '';
  data.forEach(s=>{
    if(s.status && s.status.toLowerCase()==='nonaktif') return;
    const opt = document.createElement('option');
    opt.value = s.nama;
    opt.textContent = s.nama + ' — ' + s.kelas;
    el.appendChild(opt);
  });
}
