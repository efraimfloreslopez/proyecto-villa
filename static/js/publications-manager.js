// Publications Manager — Demo (MockAPI)
class PublicationsManager {
    constructor() { this.publications=[]; this.currentPublication=null; }

    async init() { await this.loadPublications(); this.setupEventListeners(); this.displayPublications(); }

    async loadPublications() {
        try { const data=await window.mockAPI.getPublications(); this.publications=data.publications||[]; }
        catch(e) { console.error('Error cargando publicaciones:',e); this.publications=[]; }
    }

    displayPublications(filter='') {
        const grid=document.getElementById('publications-grid'); if(!grid) return; grid.innerHTML='';
        const list=this.publications.filter(p=>p.title.toLowerCase().includes(filter.toLowerCase())||(p.content||'').toLowerCase().includes(filter.toLowerCase())).sort((a,b)=>new Date(b.date)-new Date(a.date));
        if(!list.length){ grid.innerHTML='<p style="grid-column:1/-1;text-align:center;color:#666;">Sin publicaciones</p>'; return; }
        list.forEach(p=>grid.appendChild(this.createCard(p)));
    }

    createCard(pub) {
        const card=document.createElement('div'); card.className='publication-card'; card.dataset.id=pub.id;
        const img=pub.image||'../static/img/placeholder.jpg';
        const statusClass=pub.status==='published'?'status-published':'status-draft';
        const statusText=pub.status==='published'?'Publicado':'Borrador';
        card.innerHTML=`<div class="publication-image" style="background-image:url('${img}');background-size:cover;background-position:center;height:180px;position:relative;"><span class="publication-status ${statusClass}" style="position:absolute;top:10px;right:10px;padding:4px 10px;border-radius:20px;font-size:0.8rem;font-weight:600;background:${pub.status==='published'?'#27ae60':'#f39c12'};color:white;">${statusText}</span></div><div class="publication-info"><h3>${pub.title}</h3><p class="publication-date">?? ${this.formatDate(pub.date)}</p><p class="publication-excerpt">${pub.excerpt||''}</p><div class="publication-actions"><button class="btn-action btn-edit" onclick="publicationsManager.editPublication('${pub.id}')">Editar</button><button class="btn-action btn-delete" onclick="publicationsManager.deletePublication('${pub.id}')">Eliminar</button></div></div>`;
        return card;
    }

    formatDate(ds) { return new Date(ds).toLocaleDateString('es-MX',{year:'numeric',month:'long',day:'numeric'}); }

    openAddModal() { const m=document.getElementById('publication-modal'); const f=document.getElementById('publication-form'); const t=document.querySelector('#publication-modal .modal-header h2'); if(t) t.textContent='Nueva Publicación'; if(f) f.reset(); this.currentPublication=null; const p=document.getElementById('image-preview'); if(p) p.style.backgroundImage='none'; if(m) m.style.display='flex'; }
    closeModal() { const m=document.getElementById('publication-modal'); if(m) m.style.display='none'; this.currentPublication=null; }

    editPublication(id) {
        const pub=this.publications.find(p=>p.id===id); if(!pub) return; this.currentPublication=pub;
        document.getElementById('pub-title').value=pub.title;
        document.getElementById('pub-content').value=pub.content||'';
        document.getElementById('pub-excerpt').value=pub.excerpt||'';
        document.getElementById('pub-category').value=pub.category||'Noticias';
        document.getElementById('pub-status').value=pub.status||'draft';
        const p=document.getElementById('image-preview'); if(p&&pub.image) p.style.backgroundImage=`url('${pub.image}')`;
        const t=document.querySelector('#publication-modal .modal-header h2'); if(t) t.textContent='Editar Publicación';
        const m=document.getElementById('publication-modal'); if(m) m.style.display='flex';
    }

    async deletePublication(id) {
        if(!confirm('¿Eliminar esta publicación?')) return;
        try { await window.mockAPI.deletePublication(id); await this.loadPublications(); this.displayPublications(); this.showNotification('Publicación eliminada','success'); }
        catch(e) { this.showNotification('Error al eliminar','error'); }
    }

    async savePublication(formData) {
        try {
            const data={ title:formData.get('title')||'Nueva Publicación', content:formData.get('content')||'', excerpt:formData.get('excerpt')||'', category:formData.get('category')||'Noticias', status:formData.get('status')||'draft', image:'' };
            if(this.currentPublication) await window.mockAPI.deletePublication(this.currentPublication.id);
            await window.mockAPI.addPublication(data);
            await this.loadPublications(); this.closeModal(); this.displayPublications();
            this.showNotification(this.currentPublication?'Publicación actualizada':'Publicación creada (demo)','success');
        } catch(e) { this.showNotification('Error al guardar','error'); }
    }

    setupEventListeners() {
        const addBtn=document.getElementById('add-pub-btn'); if(addBtn) addBtn.addEventListener('click',()=>this.openAddModal());
        const closeBtn=document.getElementById('close-modal'); if(closeBtn) closeBtn.addEventListener('click',()=>this.closeModal());
        const cancelBtn=document.getElementById('cancel-pub'); if(cancelBtn) cancelBtn.addEventListener('click',()=>this.closeModal());
        const form=document.getElementById('publication-form'); if(form) form.addEventListener('submit',e=>{ e.preventDefault(); this.savePublication(new FormData(form)); });
        const search=document.getElementById('search-pub'); if(search) search.addEventListener('input',e=>this.displayPublications(e.target.value));
        const imgInput=document.getElementById('pub-image'); const imgPrev=document.getElementById('image-preview');
        if(imgInput&&imgPrev) imgInput.addEventListener('change',e=>{ const f=e.target.files[0]; if(f){ const r=new FileReader(); r.onload=e=>imgPrev.style.backgroundImage=`url('${e.target.result}')`; r.readAsDataURL(f); } });
        const modal=document.getElementById('publication-modal'); if(modal) modal.addEventListener('click',e=>{ if(e.target===modal) this.closeModal(); });
    }

    showNotification(msg,type='info') {
        const n=document.createElement('div'); n.className=`notification notification-${type}`;
        n.innerHTML=`<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;font-size:1.2rem;">×</button>`;
        document.body.appendChild(n); setTimeout(()=>n.classList.add('show'),10);
        setTimeout(()=>{ n.classList.remove('show'); setTimeout(()=>n.remove(),300); },3500);
    }
}

let publicationsManager;
document.addEventListener('DOMContentLoaded',()=>{ publicationsManager=new PublicationsManager(); publicationsManager.init(); });





