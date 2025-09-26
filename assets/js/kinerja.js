
/* assets/js/kinerja.js */
async function loadKinerja(){
  const res = await fetch('/data/kinerja.json');
  const data = await res.json();
  document.getElementById('kinerja-year').textContent = data.tahun;
  const tbody = document.getElementById('kinerja-body');
  tbody.innerHTML='';
  data.indikator.forEach(i=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.nama}</td><td>${i.skor}</td><td>${i.keterangan}</td>`;
    tbody.appendChild(tr);
  });
}
function downloadKinerjaExcel(){
  fetch('/data/kinerja.json').then(r=>r.json()).then(data=>{
    const rows=[['Indikator','Skor','Keterangan']];
    data.indikator.forEach(i=> rows.push([i.nama,i.skor,i.keterangan]));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Kinerja');
    XLSX.writeFile(wb, `kinerja-${data.tahun}.xlsx`);
  });
}
window.loadKinerja = loadKinerja;
window.downloadKinerjaExcel = downloadKinerjaExcel;
