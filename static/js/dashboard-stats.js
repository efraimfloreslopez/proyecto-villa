// Dashboard Statistics Manager — Demo (MockAPI)
class DashboardStats {
    constructor() {
        this.stats={ pages:0, publicaciones:0, videos:0, pdfs:0, images:0, usuarios:0 };
        this.activities=[];
    }

    async loadAllStats() {
        try {
            await Promise.all([
                this.countPages(), this.loadPublicaciones(), this.loadVideos(),
                this.loadPDFs(), this.loadImages(), this.loadUsuarios()
            ]);
            this.updateDashboard(); this.loadRecentActivities();
        } catch(e) { console.error('Error cargando estadísticas:',e); }
    }

    async countPages() { this.stats.pages=24; }
    async loadPublicaciones() { try{ const d=await window.mockAPI.getPublications(); this.stats.publicaciones=d.publications?.length||0; }catch(e){ this.stats.publicaciones=0; } }
    async loadVideos()       { try{ const d=await window.mockAPI.getVideos();       this.stats.videos=d.videos?.length||0;             }catch(e){ this.stats.videos=0; } }
    async loadPDFs()         { try{ const d=await window.mockAPI.getPDFs();         this.stats.pdfs=d.pdfs?.length||0;                 }catch(e){ this.stats.pdfs=0; } }
    async loadImages()       { try{ const d=await window.mockAPI.getImages();       this.stats.images=d.images?.length||0;             }catch(e){ this.stats.images=0; } }
    async loadUsuarios()     { this.stats.usuarios=8; }

    updateDashboard() {
        this.animateCounter('pages-count', this.stats.pages);
        this.animateCounter('publicaciones-count', this.stats.publicaciones);
        this.animateCounter('videos-count', this.stats.videos);
        this.animateCounter('usuarios-count', this.stats.usuarios);
        this.updateContentSummary();
    }

    animateCounter(elementId, targetValue) {
        const el=document.getElementById(elementId); if(!el) return;
        let current=0; const inc=Math.ceil(targetValue/30); const step=1000/(targetValue/inc||1);
        const timer=setInterval(()=>{ current+=inc; if(current>=targetValue){ current=targetValue; clearInterval(timer); } el.textContent=current; },step);
    }

    updateContentSummary() {
        const pp=document.getElementById('published-pages'); const dp=document.getElementById('draft-pages'); const ap=document.getElementById('available-pdfs');
        if(pp) pp.textContent=this.stats.pages-7; if(dp) dp.textContent=7; if(ap) ap.textContent=this.stats.pdfs;
    }

    async loadRecentActivities() {
        try {
            const activities=[];
            const pubData=await window.mockAPI.getPublications();
            if(pubData.publications) pubData.publications.slice(0,2).forEach(p=>activities.push({ title:p.title, date:p.date, icon:'??' }));
            const vidData=await window.mockAPI.getVideos();
            if(vidData.videos) vidData.videos.slice(0,1).forEach(v=>activities.push({ title:v.title, date:v.date, icon:'??' }));
            activities.sort((a,b)=>new Date(b.date)-new Date(a.date));
            this.displayActivities(activities.slice(0,3));
        } catch(e) { console.error('Error cargando actividades:',e); }
    }

    displayActivities(activities) {
        const list=document.querySelector('.activity-list'); if(!list) return; list.innerHTML='';
        activities.forEach(a=>{ const item=document.createElement('div'); item.className='activity-item'; item.innerHTML=`<span class="activity-time">${this.getTimeAgo(a.date)}</span><p>${a.icon} ${a.title}</p>`; list.appendChild(item); });
    }

    getTimeAgo(ds) {
        const d=new Date(ds); const now=new Date(); const h=Math.floor((now-d)/3600000); const days=Math.floor((now-d)/86400000);
        if(h<1) return 'Hace menos de 1h'; if(h<24) return `Hace ${h}h`; if(days===1) return 'Ayer'; if(days<7) return `Hace ${days} días`;
        return d.toLocaleDateString('es-MX');
    }

    updateCurrentDate() { const dd=document.querySelector('.date-display'); if(dd) dd.textContent=new Date().toLocaleDateString('es-MX',{year:'numeric',month:'long',day:'numeric'}); }
    async refresh() { await this.loadAllStats(); }
}

document.addEventListener('DOMContentLoaded',()=>{
    const dashboard=new DashboardStats();
    dashboard.updateCurrentDate(); dashboard.loadAllStats();
    setInterval(()=>dashboard.refresh(), 5*60*1000);
});





