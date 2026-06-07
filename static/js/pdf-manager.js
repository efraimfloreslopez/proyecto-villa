// PDF Management System — Demo (MockAPI)
class PDFManager {
    constructor() {
        this.pdfs = []; this.currentPDF = null;
        this.pages = [
            { id:'transparencia', name:'Transparencia' }, { id:'comisiones', name:'Comisiones' },
            { id:'hayuntamiento', name:'H. Ayuntamiento' }, { id:'ArchivoMunicipal', name:'Archivo Municipal' },
            { id:'Normatividad', name:'Normatividad' }, { id:'Informesdegobierno', name:'Informes de Gobierno' },
            { id:'ContraloriaInterna', name:'Contraloría Interna' }, { id:'Planeacion', name:'Planeación' },
            { id:'ObligacionesdeTransparencia', name:'Obligaciones de Transparencia' },
            { id:'ArmonizacionContable', name:'Armonización Contable' }
        ];
    }

    async init() { await this.loadPDFs(); this.setupEventListeners(); this.displayPDFs(); this.populatePageSelector(); }

    async loadPDFs() {
        try { const data = await window.mockAPI.getPDFs(); this.pdfs = data.pdfs || []; }
        catch (error) { console.error('Error cargando PDFs:', error); this.pdfs = []; }
    }

    displayPDFs(filter = '') {
        const grid = document.getElementById('pdfs-grid'); if (!grid) return; grid.innerHTML = '';
        if (filter) { this.renderPDFList(this.pdfs.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()) || p.description.toLowerCase().includes(filter.toLowerCase())), grid); return; }
        const sections = {};
        this.pdfs.forEach(pdf => { const key = `${this.getPageName(pdf.page)} - ${pdf.section||'General'}`; if (!sections[key]) sections[key] = { name:pdf.section||'General', page:this.getPageName(pdf.page), pdfs:[] }; sections[key].pdfs.push(pdf); });
        Object.values(sections).forEach(section => {
            const card = document.createElement('div'); card.className = 'pdf-card folder-card';
            card.onclick = (e) => { if (e.target.tagName==='BUTTON') return; const c = document.getElementById('pdfs-grid'); c.innerHTML = `<div style="grid-column:1/-1;margin-bottom:20px;"><button class="btn-action" onclick="pdfManager.displayPDFs()" style="background:#666;color:white;">? Volver</button><h3 style="margin-top:10px;">${section.page} › ${section.name}</h3></div>`; this.renderPDFList(section.pdfs, c); };
            card.innerHTML = `<div class="pdf-icon" style="color:#FFC107;font-size:2.5rem;">??</div><div class="pdf-info"><h3>${section.name}</h3><p class="pdf-page">${section.page}</p><p class="pdf-meta">${section.pdfs.length} archivos</p></div>`;
            grid.appendChild(card);
        });
    }

    renderPDFList(list, container) {
        if (!list.length) { container.innerHTML += '<p style="grid-column:1/-1;text-align:center;color:#666;">Sin documentos</p>'; return; }
        list.forEach(pdf => container.appendChild(this.createPDFCard(pdf)));
    }

    createPDFCard(pdf) {
        const card = document.createElement('div'); card.className = 'pdf-card'; card.dataset.id = pdf.id;
        const isExcel = pdf.filename && (pdf.filename.endsWith('.xlsx')||pdf.filename.endsWith('.xls'));
        const icon = isExcel ? '??' : '??'; const color = isExcel ? '#217346' : '#e74c3c';
        card.innerHTML = `<div class="pdf-icon" style="color:${color};font-size:2.5rem;cursor:pointer;" onclick="pdfManager.viewPDF('${pdf.id}')">${icon}</div><div class="pdf-info"><h3>${pdf.title}</h3><p class="pdf-description">${pdf.description}</p><p class="pdf-meta"><span>?? ${pdf.category}</span> <span>?? ${pdf.size}</span></p><p class="pdf-page">?? ${this.getPageName(pdf.page)}</p><div class="pdf-actions"><button class="btn-action btn-download" onclick="pdfManager.downloadPDF('${pdf.id}')">Descargar</button><button class="btn-action btn-edit" onclick="pdfManager.editPDF('${pdf.id}')">Editar</button><button class="btn-action btn-delete" onclick="pdfManager.deletePDF('${pdf.id}')">Eliminar</button></div></div>`;
        return card;
    }

    viewPDF(id) {
        const pdf = this.pdfs.find(p => p.id===id); if (!pdf) return;
        this.showNotification(`?? Vista previa simulada: ${pdf.title}`, 'info');
    }

    downloadPDF(id) {
        const pdf = this.pdfs.find(p => p.id===id); if (!pdf) return;
        this.showNotification(`?? Descarga simulada: ${pdf.filename}`, 'info');
    }

    getPageName(pageId) { const p = this.pages.find(p => p.id===pageId); return p ? p.name : pageId; }

    populatePageSelector() {
        const sel = document.getElementById('pdf-page'); if (!sel) return;
        sel.innerHTML = '<option value="">Selecciona una página</option>';
        this.pages.forEach(p => { const o = document.createElement('option'); o.value=p.id; o.textContent=p.name; sel.appendChild(o); });
    }

    openAddModal() { const m=document.getElementById('pdf-modal'); const f=document.getElementById('pdf-form'); const t=document.querySelector('#pdf-modal .modal-header h2'); if(t) t.textContent='Subir PDF'; if(f) f.reset(); this.currentPDF=null; if(m) m.style.display='flex'; }
    closeModal() { const m=document.getElementById('pdf-modal'); if(m) m.style.display='none'; this.currentPDF=null; }

    editPDF(id) {
        const pdf = this.pdfs.find(p => p.id===id); if (!pdf) return; this.currentPDF = pdf;
        document.getElementById('pdf-title').value = pdf.title;
        document.getElementById('pdf-description').value = pdf.description||'';
        document.getElementById('pdf-page').value = pdf.page;
        document.getElementById('pdf-section').value = pdf.section||'';
        document.getElementById('pdf-category').value = pdf.category||'';
        const t=document.querySelector('#pdf-modal .modal-header h2'); if(t) t.textContent='Editar PDF';
        const m=document.getElementById('pdf-modal'); if(m) m.style.display='flex';
    }

    async deletePDF(id) {
        if (!confirm('¿Eliminar este PDF?')) return;
        try { await window.mockAPI.deletePDF(id); await this.loadPDFs(); this.displayPDFs(); this.showNotification('PDF eliminado','success'); }
        catch(e) { this.showNotification('Error al eliminar','error'); }
    }

    async savePDF(formData) {
        try {
            const data = { title:formData.get('title')||'Nuevo Documento', description:formData.get('description')||'', page:formData.get('page')||'transparencia', section:formData.get('section')||'General', category:formData.get('category')||'Documento', filename:'demo_doc.pdf', path:'#demo-pdf', size:'1.0 MB', fileType:'PDF' };
            if (this.currentPDF) await window.mockAPI.deletePDF(this.currentPDF.id);
            await window.mockAPI.addPDF(data);
            await this.loadPDFs(); this.closeModal(); this.displayPDFs();
            this.showNotification(this.currentPDF ? 'PDF actualizado' : 'PDF agregado (demo)','success');
        } catch(e) { this.showNotification('Error al guardar','error'); }
    }

    setupEventListeners() {
        const addBtn=document.getElementById('add-pdf-btn'); if(addBtn) addBtn.addEventListener('click',()=>this.openAddModal());
        const closeBtn=document.getElementById('close-modal'); if(closeBtn) closeBtn.addEventListener('click',()=>this.closeModal());
        const cancelBtn=document.getElementById('cancel-pdf'); if(cancelBtn) cancelBtn.addEventListener('click',()=>this.closeModal());
        const form=document.getElementById('pdf-form'); if(form) form.addEventListener('submit',e=>{ e.preventDefault(); this.savePDF(new FormData(form)); });
        const search=document.getElementById('search-pdf'); if(search) search.addEventListener('input',e=>this.displayPDFs(e.target.value));
        const modal=document.getElementById('pdf-modal'); if(modal) modal.addEventListener('click',e=>{ if(e.target===modal) this.closeModal(); });
    }

    showNotification(msg, type='info') {
        const n=document.createElement('div'); n.className=`notification notification-${type}`;
        n.innerHTML=`<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;font-size:1.2rem;">×</button>`;
        document.body.appendChild(n); setTimeout(()=>n.classList.add('show'),10);
        setTimeout(()=>{ n.classList.remove('show'); setTimeout(()=>n.remove(),300); },3500);
    }
}

let pdfManager;
document.addEventListener('DOMContentLoaded', () => { pdfManager = new PDFManager(); pdfManager.init(); });





