
/* assets/js/absensi.js */
async function loadAbsensi(){
  const res = await fetch('/data/absensi.json');
  const data = await res.json();
  document.getElementById('absensi-title').textContent = `Absensi - ${data.bulan} ${data.tahun}`;
  const table = document.getElementById('absensi-table-body');
  table.innerHTML = '';
  data.pertemuan.forEach(p=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.tanggal}</td><td>${p.hadir.join(', ')}</td><td>${p.izin.join(', ')}</td><td>${p.alpha.join(', ')}</td>`;
    table.appendChild(tr);
  });
}
function downloadAbsensiExcel(){
  // SheetJS via CDN must be included in page
  fetch('/data/absensi.json').then(r=>r.json()).then(data=>{
    const rows = [['Tanggal','Hadir','Izin','Alpha']];
    data.pertemuan.forEach(p=> rows.push([p.tanggal, p.hadir.join('; '), p.izin.join('; '), p.alpha.join('; ')]));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Absensi');
    XLSX.writeFile(wb, `absensi-${data.bulan}-${data.tahun}.xlsx`);
  });
}
window.loadAbsensi = loadAbsensi;
window.downloadAbsensiExcel = downloadAbsensiExcel;
