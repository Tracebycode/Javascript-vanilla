const sidebartoggle = document.getElementById('sidebarToggle');
 if(sidebartoggle){
    sidebartoggle.addEventListener('click',()=>{
        const sidebar = document.getElementById('sidebar');
        if(sidebar){
            sidebar.classList.toggle('hidden');
        }
    })
 }