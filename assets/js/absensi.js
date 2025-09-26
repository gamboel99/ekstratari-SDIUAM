
function tambahAbsensi(){
  const nama = document.getElementById('namaSiswa').value;
  const tgl = document.getElementById('tanggal').value;
  const status = document.getElementById('status').value;
  if(!nama || !tgl) return alert("Lengkapi data!");
  const table = document.getElementById('absensiTable');
  const row = table.insertRow();
  row.insertCell(0).innerText = nama;
  row.insertCell(1).innerText = tgl;
  row.insertCell(2).innerText = status;
}
// Export excel dummy
function exportAbsensi(){ alert("Export Absensi ke Excel (SheetJS bisa ditambahkan)"); }
