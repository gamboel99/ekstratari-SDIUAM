
async function renderAbsensiChecklist(){
  const res = await fetch('data/siswa.json'); const siswa = await res.json();
  const container = document.getElementById('absensi-list');
  container.innerHTML='';
  siswa.forEach(s=>{
    if(s.status && s.status.toLowerCase()==='nonaktif') return;
    const row = document.createElement('div'); row.className='form-row';
    row.style.display='flex'; row.style.gap='8px'; row.style.alignItems='center'; row.innerHTML = `<label style="flex:1"><input type="checkbox" class="hadir" data-nama="${s.nama}"> <strong>${s.nama}</strong> <span class="small">(${s.kelas})</span></label>
    <select class="alasan" data-nama="${s.nama}" style="width:200px"><option value="">— jika tidak hadir pilih alasan —</option><option value="Izin">Izin</option><option value="Sakit">Sakit</option><option value="Alpa">Alpa</option></select>`;
    container.appendChild(row);
  });
}

function savePertemuan(){
  const tanggal = document.getElementById('tglPertemuan').value;
  if(!tanggal) return alert('Pilih tanggal pertemuan dulu');
  const hadirChecks = document.querySelectorAll('.hadir');
  const rows = [];
  hadirChecks.forEach(h => {
    const nama = h.dataset.nama;
    const hadir = h.checked;
    const alasan = document.querySelector(`.alasan[data-nama="${nama}"]`).value;
    rows.push({nama, hadir, alasan});
  });
  const key = 'pertemuan_' + tanggal;
  localStorage.setItem(key, JSON.stringify({tanggal, rows}));
  alert('Tersimpan di browser. Untuk arsip silakan Download Word/Excel.');
  renderSavedPertemuan(tanggal);
}

function renderSavedPertemuan(tanggal){
  const key = 'pertemuan_' + tanggal;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  const tbody = document.getElementById('absensi-table-body');
  tbody.innerHTML='';
  if(!data.rows) return;
  let no=1;
  data.rows.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${no++}</td><td>${r.nama}</td><td>${r.hadir? 'Hadir':'Tidak Hadir'}</td><td>${r.alasan || '-'}</td>`;
    tbody.appendChild(tr);
  });
}

function exportPertemuanToWord(){
  const tanggal = document.getElementById('tglPertemuan').value;
  if(!tanggal) return alert('Pilih tanggal dahulu');
  const key = 'pertemuan_' + tanggal;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if(!data.rows) return alert('Tidak ada data untuk tanggal ini');
  let html = `<html><head><meta charset="utf-8"><title>Daftar Absen</title></head><body><h2 style="text-align:center">DAFTAR ABSEN EKSTRA TARI<br>SDI ULUMIYAH AL MAKRUF</h2><p>Tanggal: ${tanggal}</p><table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%"><tr><th>No</th><th>Nama</th><th>Kelas</th><th>Kehadiran</th><th>Keterangan</th></tr>`;
  let no=1;
  data.rows.forEach(r=>{ html += `<tr><td>${no++}</td><td>${r.nama}</td><td>-</td><td>${r.hadir? 'Hadir':'Tidak Hadir'}</td><td>${r.alasan || '-'}</td></tr>`; });
  html += `</table><br><p style="text-align:right">Pare, ______________ 2025</p><p style="text-align:right">Guru Ekstra Tari<br><br><br>(Nikmatu Zuhroh)</p></body></html>`;
  const blob = new Blob(['\ufeff', html], {type: 'application/msword'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `absensi-${tanggal}.doc`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function(){ renderAbsensiChecklist(); document.getElementById('tglPertemuan').addEventListener('change', function(e){ renderSavedPertemuan(this.value); }); });
