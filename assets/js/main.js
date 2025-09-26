
/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', function(){
  // simple active nav highlight
  const anchors = document.querySelectorAll('nav a');
  anchors.forEach(a=>{
    if(location.pathname.endsWith(a.getAttribute('href')) || (location.pathname.endsWith('/') && a.getAttribute('href')==='index.html')){
      a.style.background='linear-gradient(90deg,var(--green-2),var(--green))'; a.style.color='white';
    }
  });
});
