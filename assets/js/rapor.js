
async function initRapor(){
  await loadSiswa('#raporNama');
  const list = JSON.parse(localStorage.getItem('rapor_list')||'[]');
  renderRapor(list);
}

async function tambahRaporForm(e){
  e.preventDefault();
  const nama = document.getElementById('raporNama').value;
  const teknik = document.getElementById('raporTeknik').value;
  const ekspresi = document.getElementById('raporEkspresi').value;
  const kedisiplinan = document.getElementById('raporKedisiplinan').value;
  const catatan = document.getElementById('raporCatatan').value;
  // get kelas from global map if available
  const kelas = (window.siswaMap && window.siswaMap[nama]) ? window.siswaMap[nama] : '';
  const list = JSON.parse(localStorage.getItem('rapor_list')||'[]');
  list.push({nama, kelas, teknik, ekspresi, kedisiplinan, catatan, tanggal: new Date().toISOString().slice(0,10)});
  localStorage.setItem('rapor_list', JSON.stringify(list));
  renderRapor(list);
  document.getElementById('raporForm').reset();
}

function renderRapor(list){
  const tbody = document.getElementById('rapor-body');
  tbody.innerHTML='';
  list.forEach((r,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td>${r.nama}</td><td>${r.kelas||'-'}</td><td>${r.teknik}</td><td>${r.ekspresi}</td><td>${r.kedisiplinan}</td><td>${r.catatan}</td><td>${r.tanggal}</td>`;
    tbody.appendChild(tr);
  });
}

function downloadRaporCSV(){
  const list = JSON.parse(localStorage.getItem('rapor_list')||'[]');
  const rows=[['No','Nama','Kelas','Teknik','Ekspresi','Kedisiplinan','Catatan','Tanggal']];
  list.forEach((r,i)=> rows.push([i+1,r.nama,r.kelas||'',r.teknik,r.ekspresi,r.kedisiplinan,r.catatan,r.tanggal]));
  const csv = rows.map(r=> r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='rapor.csv'; a.click(); a.remove(); URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', initRapor);
