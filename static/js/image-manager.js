// Image Management System — Demo (MockAPI)
class ImageManager {
    constructor() {
        this.images = []; this.currentImage = null;
        this.pages = [
            {id:'index',name:'Página Principal'},{id:'hayuntamiento',name:'H. Ayuntamiento'},
            {id:'transparencia',name:'Transparencia'},{id:'turismo',name:'Turismo'},
            {id:'dif',name:'DIF'},{id:'multideportivo',name:'Multideportivo'},{id:'ob',name:'Obra Pública'}
        ];
    }

    async init() { await this.loadImages(); this.setupEventListeners(); this.displayImages(); this.populatePageSelector(); }

    async loadImages() {
        try { const data = await window.mockAPI.getImages(); this.images = data.images || []; }
        catch (e) { console.error('Error cargando imágenes:', e); this.images = []; }
    }

    displayImages(filter='', pageFilter='') {
        const grid=document.getElementById('images-grid'); if(!grid) return; grid.innerHTML='';
        if (filter||pageFilter) {
            let f=this.images.filter(i=>i.title.toLowerCase().includes(filter.toLowerCase())||i.description.toLowerCase().includes(filter.toLowerCase()));
            if(pageFilter) f=f.filter(i=>i.page===pageFilter);
            this.renderImageList(f,grid); return;
        }
        const sections={};
        this.images.forEach(img=>{ const key=`${this.getPageName(img.page)}-${img.section||'General'}`; if(!sections[key]) sections[key]={name:img.section||'General',page:this.getPageName(img.page),images:[]}; sections[key].images.push(img); });
        Object.values(sections).forEach(s=>{
            const card=document.createElement('div'); card.className='image-card folder-card';
            card.onclick=(e)=>{ if(e.target.tagName==='BUTTON') return; const g=document.getElementById('images-grid'); g.innerHTML=`<div style="grid-column:1/-1;margin-bottom:20px;"><button class="btn-action" onclick="imageManager.displayImages()" style="background:#666;color:white;">? Volver</button><h3 style="margin-top:10px;">${s.page} › ${s.name}</h3></div>`; this.renderImageList(s.images,g); };
            card.innerHTML=`<div class="image-preview" style="background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:3rem;height:180px;">??</div><div class="image-info"><h3>${s.name}</h3><p class="image-page">${s.page}</p><p class="image-meta">${s.images.length} imágenes</p></div>`;
            grid.appendChild(card);
        });
    }

    renderImageList(list,container) {
        if(!list.length){ container.innerHTML+='<p style="grid-column:1/-1;text-align:center;color:#666;">Sin imágenes</p>'; return; }
        list.forEach(i=>container.appendChild(this.createImageCard(i)));
    }

    createImageCard(image) {
        const card=document.createElement('div'); card.className='image-card'; card.dataset.id=image.id;
        card.innerHTML=`<div class="image-preview" style="background-image:url('${image.path}');background-size:cover;background-position:center;height:180px;cursor:pointer;" onclick="imageManager.viewImage('${image.id}')"><div class="image-overlay" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:rgba(0,0,0,0.3);opacity:0;transition:0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0"><span style="color:white;font-size:2rem;">???</span></div></div><div class="image-info"><h3>${image.title}</h3><p class="image-description">${image.description}</p><p class="image-meta"><span>?? ${image.category}</span> <span>?? ${image.size}</span></p><p class="image-page">?? ${this.getPageName(image.page)}</p><div class="image-actions"><button class="btn-action btn-download" onclick="imageManager.downloadImage('${image.id}')">Descargar</button><button class="btn-action btn-edit" onclick="imageManager.editImage('${image.id}')">Editar</button><button class="btn-action btn-delete" onclick="imageManager.deleteImage('${image.id}')">Eliminar</button></div></div>`;
        return card;
    }

    viewImage(id) { const img=this.images.find(i=>i.id===id); if(img) this.showNotification(`??? Vista previa: ${img.title}`,'info'); }
    downloadImage(id) { const img=this.images.find(i=>i.id===id); if(img) this.showNotification(`?? Descarga simulada: ${img.filename}`,'info'); }
    getPageName(id) { const p=this.pages.find(p=>p.id===id); return p?p.name:id; }

    populatePageSelector() {
        ['image-page','filter-page'].forEach(selId => {
            const sel=document.getElementById(selId); if(!sel) return;
            sel.innerHTML=selId==='filter-page'?'<option value="">Todas las páginas</option>':'<option value="">Selecciona una página</option>';
            this.pages.forEach(p=>{ const o=document.createElement('option'); o.value=p.id; o.textContent=p.name; sel.appendChild(o); });
        });
    }

    openAddModal() { const m=document.getElementById('image-modal'); const f=document.getElementById('image-form'); const t=document.querySelector('#image-modal .modal-header h2'); if(t) t.textContent='Subir Imagen'; if(f) f.reset(); this.currentImage=null; if(m) m.style.display='flex'; }
    closeModal() { const m=document.getElementById('image-modal'); if(m) m.style.display='none'; this.currentImage=null; }

    editImage(id) {
        const img=this.images.find(i=>i.id===id); if(!img) return; this.currentImage=img;
        document.getElementById('image-title').value=img.title;
        document.getElementById('image-description').value=img.description||'';
        document.getElementById('image-page').value=img.page;
        document.getElementById('image-section').value=img.section||'';
        document.getElementById('image-category').value=img.category||'';
        if(document.getElementById('image-alt')) document.getElementById('image-alt').value=img.alt||'';
        const t=document.querySelector('#image-modal .modal-header h2'); if(t) t.textContent='Editar Imagen';
        const m=document.getElementById('image-modal'); if(m) m.style.display='flex';
    }

    async deleteImage(id) {
        if(!confirm('¿Eliminar esta imagen?')) return;
        try { await window.mockAPI.deleteImage(id); await this.loadImages(); this.displayImages(); this.showNotification('Imagen eliminada','success'); }
        catch(e) { this.showNotification('Error al eliminar','error'); }
    }

    async saveImage(formData) {
        try {
            const data={ title:formData.get('title')||'Nueva Imagen', description:formData.get('description')||'', page:formData.get('page')||'index', section:formData.get('section')||'General', category:formData.get('category')||'Imagen', alt:formData.get('alt')||'', filename:'demo_image.jpg', path:'../static/img/placeholder.jpg', size:'1.0 MB' };
            if(this.currentImage) await window.mockAPI.deleteImage(this.currentImage.id);
            await window.mockAPI.addImage(data);
            await this.loadImages(); this.closeModal(); this.displayImages();
            this.showNotification(this.currentImage?'Imagen actualizada':'Imagen agregada (demo)','success');
        } catch(e) { this.showNotification('Error al guardar','error'); }
    }

    setupEventListeners() {
        const addBtn=document.getElementById('add-image-btn'); if(addBtn) addBtn.addEventListener('click',()=>this.openAddModal());
        const closeBtn=document.getElementById('close-modal'); if(closeBtn) closeBtn.addEventListener('click',()=>this.closeModal());
        const cancelBtn=document.getElementById('cancel-image'); if(cancelBtn) cancelBtn.addEventListener('click',()=>this.closeModal());
        const form=document.getElementById('image-form'); if(form) form.addEventListener('submit',e=>{ e.preventDefault(); this.saveImage(new FormData(form)); });
        const search=document.getElementById('search-image'); if(search) search.addEventListener('input',e=>{ const pf=document.getElementById('filter-page')?.value||''; this.displayImages(e.target.value,pf); });
        const fp=document.getElementById('filter-page'); if(fp) fp.addEventListener('change',e=>{ const st=document.getElementById('search-image')?.value||''; this.displayImages(st,e.target.value); });
        const modal=document.getElementById('image-modal'); if(modal) modal.addEventListener('click',e=>{ if(e.target===modal) this.closeModal(); });
    }

    showNotification(msg,type='info') {
        const n=document.createElement('div'); n.className=`notification notification-${type}`;
        n.innerHTML=`<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;font-size:1.2rem;">×</button>`;
        document.body.appendChild(n); setTimeout(()=>n.classList.add('show'),10);
        setTimeout(()=>{ n.classList.remove('show'); setTimeout(()=>n.remove(),300); },3500);
    }
}

let imageManager;
document.addEventListener('DOMContentLoaded',()=>{ imageManager=new ImageManager(); imageManager.init(); });





