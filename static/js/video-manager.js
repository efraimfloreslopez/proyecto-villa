// Video Manager — Demo (MockAPI)
class VideoManager {
    constructor() {
        this.videos=[]; this.currentVideo=null;
        this.pages=[{id:'index',name:'Página Principal'},{id:'hayuntamiento',name:'H. Ayuntamiento'},{id:'ob',name:'Obra Pública'},{id:'dif',name:'DIF'},{id:'turismo',name:'Turismo'},{id:'multideportivo',name:'Multideportivo'},{id:'transparencia',name:'Transparencia'}];
    }

    async init() { await this.loadVideos(); this.setupEventListeners(); this.displayVideos(); this.populatePageSelector(); }

    async loadVideos() {
        try { const data=await window.mockAPI.getVideos(); this.videos=data.videos||[]; }
        catch(e) { console.error('Error cargando videos:',e); this.videos=[]; }
    }

    displayVideos(filter='',pageFilter='') {
        const grid=document.getElementById('videos-grid'); if(!grid) return; grid.innerHTML='';
        let list=this.videos.filter(v=>v.title.toLowerCase().includes(filter.toLowerCase())||v.description.toLowerCase().includes(filter.toLowerCase()));
        if(pageFilter) list=list.filter(v=>v.page===pageFilter);
        if(!list.length){ grid.innerHTML='<p style="grid-column:1/-1;text-align:center;color:#666;">Sin videos</p>'; return; }
        list.forEach(v=>grid.appendChild(this.createCard(v)));
    }

    createCard(video) {
        const card=document.createElement('div'); card.className='video-card'; card.dataset.id=video.id;
        const thumb=video.thumbnail||'../static/img/video-placeholder.jpg';
        card.innerHTML=`<div class="video-thumbnail" style="background-image:url('${thumb}');background-size:cover;background-position:center;height:180px;cursor:pointer;position:relative;" onclick="videoManager.viewVideo('${video.id}')"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);font-size:3rem;">?</div></div><div class="video-info"><h3>${video.title}</h3><p class="video-meta"><span>?? ${this.formatDate(video.date)}</span> <span>??? ${video.views||0}</span></p><p class="video-page">?? ${this.getPageName(video.page)}</p><div class="video-actions"><button class="btn-action btn-download" onclick="videoManager.downloadVideo('${video.id}')">Descargar</button><button class="btn-action btn-edit" onclick="videoManager.editVideo('${video.id}')">Editar</button><button class="btn-action btn-delete" onclick="videoManager.deleteVideo('${video.id}')">Eliminar</button></div></div>`;
        return card;
    }

    viewVideo(id) { const v=this.videos.find(v=>v.id===id); if(v) this.showNotification(`?? Vista previa simulada: ${v.title}`,'info'); }
    downloadVideo(id) { const v=this.videos.find(v=>v.id===id); if(v) this.showNotification(`?? Descarga simulada: ${v.filename||v.title}`,'info'); }
    getPageName(id) { const p=this.pages.find(p=>p.id===id); return p?p.name:id; }
    formatDate(ds) { return new Date(ds).toLocaleDateString('es-MX',{year:'numeric',month:'long',day:'numeric'}); }

    populatePageSelector() {
        ['video-page','filter-page'].forEach(selId=>{
            const sel=document.getElementById(selId); if(!sel) return;
            sel.innerHTML=selId==='filter-page'?'<option value="">Todas las páginas</option>':'<option value="">Selecciona una página</option>';
            this.pages.forEach(p=>{ const o=document.createElement('option'); o.value=p.id; o.textContent=p.name; sel.appendChild(o); });
        });
    }

    openAddModal() { const m=document.getElementById('video-modal'); const f=document.getElementById('video-form'); const t=document.querySelector('#video-modal .modal-header h2'); if(t) t.textContent='Agregar Video'; if(f) f.reset(); this.currentVideo=null; if(m) m.style.display='flex'; }
    closeModal() { const m=document.getElementById('video-modal'); if(m) m.style.display='none'; this.currentVideo=null; }

    editVideo(id) {
        const v=this.videos.find(v=>v.id===id); if(!v) return; this.currentVideo=v;
        document.getElementById('video-title').value=v.title;
        document.getElementById('video-url').value=v.url||'';
        document.getElementById('video-description').value=v.description||'';
        document.getElementById('video-page').value=v.page;
        if(document.getElementById('video-section')) document.getElementById('video-section').value=v.section||'';
        const t=document.querySelector('#video-modal .modal-header h2'); if(t) t.textContent='Editar Video';
        const m=document.getElementById('video-modal'); if(m) m.style.display='flex';
    }

    async deleteVideo(id) {
        if(!confirm('¿Eliminar este video?')) return;
        try { await window.mockAPI.deleteVideo(id); await this.loadVideos(); this.displayVideos(); this.showNotification('Video eliminado','success'); }
        catch(e) { this.showNotification('Error al eliminar','error'); }
    }

    async saveVideo(formData) {
        try {
            const data={ title:formData.get('title')||'Nuevo Video', url:formData.get('url')||'#demo-video', description:formData.get('description')||'', page:formData.get('page')||'index', section:formData.get('section')||'', filename:'demo_video.mp4', path:'#demo-video', size:'50 MB', category:'Video' };
            if(this.currentVideo) await window.mockAPI.deleteVideo(this.currentVideo.id);
            await window.mockAPI.addVideo(data);
            await this.loadVideos(); this.closeModal(); this.displayVideos();
            this.showNotification(this.currentVideo?'Video actualizado':'Video agregado (demo)','success');
        } catch(e) { this.showNotification('Error al guardar','error'); }
    }

    setupEventListeners() {
        const addBtn=document.getElementById('add-video-btn'); if(addBtn) addBtn.addEventListener('click',()=>this.openAddModal());
        const closeBtn=document.getElementById('close-modal'); if(closeBtn) closeBtn.addEventListener('click',()=>this.closeModal());
        const cancelBtn=document.getElementById('cancel-video'); if(cancelBtn) cancelBtn.addEventListener('click',()=>this.closeModal());
        const form=document.getElementById('video-form'); if(form) form.addEventListener('submit',e=>{ e.preventDefault(); this.saveVideo(new FormData(form)); });
        const search=document.getElementById('search-video'); if(search) search.addEventListener('input',e=>{ const pf=document.getElementById('filter-page')?.value||''; this.displayVideos(e.target.value,pf); });
        const fp=document.getElementById('filter-page'); if(fp) fp.addEventListener('change',e=>{ const st=document.getElementById('search-video')?.value||''; this.displayVideos(st,e.target.value); });
        const modal=document.getElementById('video-modal'); if(modal) modal.addEventListener('click',e=>{ if(e.target===modal) this.closeModal(); });
    }

    showNotification(msg,type='info') {
        const n=document.createElement('div'); n.className=`notification notification-${type}`;
        n.innerHTML=`<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;font-size:1.2rem;">×</button>`;
        document.body.appendChild(n); setTimeout(()=>n.classList.add('show'),10);
        setTimeout(()=>{ n.classList.remove('show'); setTimeout(()=>n.remove(),300); },3500);
    }
}

let videoManager;
document.addEventListener('DOMContentLoaded',()=>{ videoManager=new VideoManager(); videoManager.init(); });





