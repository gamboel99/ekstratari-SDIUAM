
function tambahKinerja(){
  const indikator = document.getElementById('indikator').value;
  const catatan = document.getElementById('catatan').value;
  if(!indikator) return alert("Lengkapi data!");
  const table = document.getElementById('kinerjaTable');
  const row = table.insertRow();
  row.insertCell(0).innerText = indikator;
  row.insertCell(1).innerText = catatan;
}
function exportKinerja(){ alert("Export Kinerja ke Excel (SheetJS bisa ditambahkan)"); }
