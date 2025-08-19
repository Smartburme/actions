const toggleBtn=document.getElementById("themeToggle");
if(toggleBtn){
  const body=document.body;
  const current=localStorage.getItem("theme");
  if(current) body.classList.add(current);
  toggleBtn.addEventListener("click",()=>{
    body.classList.toggle("night");body.classList.toggle("day");
    localStorage.setItem("theme", body.classList.contains("night")?"night":"day");
  });
}