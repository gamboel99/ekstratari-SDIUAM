
/* assets/js/rapor.js */
async function loadRapor(){
  const res = await fetch('/data/rapor.json');
  const data = await res.json();
  const tbody = document.getElementById('rapor-body');
  tbody.innerHTML='';
  data.siswa.forEach(s=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.nama}</td><td>${s.nilai.teknik}</td><td>${s.nilai.ekspresi}</td><td>${s.nilai.kedisiplinan}</td><td>${s.catatan}</td>`;
    tbody.appendChild(tr);
  });
}
function downloadRaporExcel(){
  fetch('/data/rapor.json').then(r=>r.json()).then(data=>{
    const rows=[['Nama','Teknik','Ekspresi','Kedisiplinan','Catatan']];
    data.siswa.forEach(s=> rows.push([s.nama, s.nilai.teknik, s.nilai.ekspresi, s.nilai.kedisiplinan, s.catatan]));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Rapor');
    XLSX.writeFile(wb, `rapor-${data.tahun}.xlsx`);
  });
}
window.loadRapor = loadRapor;
window.downloadRaporExcel = downloadRaporExcel;
