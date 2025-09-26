
function tambahRapor(){
  const nama = document.getElementById('namaMurid').value;
  const prestasi = document.getElementById('prestasi').value;
  if(!nama || !prestasi) return alert("Lengkapi data!");
  const table = document.getElementById('raporTable');
  const row = table.insertRow();
  row.insertCell(0).innerText = nama;
  row.insertCell(1).innerText = prestasi;
}
function exportRapor(){ alert("Export Rapor ke Excel (SheetJS bisa ditambahkan)"); }
