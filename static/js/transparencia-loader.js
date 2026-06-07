// Transparencia Loader — Demo (MockAPI)
class TransparenciaLoader {
    constructor() { this.pdfs=[]; this.currentPage=this.detectCurrentPage(); }
    detectCurrentPage() { return window.location.pathname.split('/').pop().replace('.html','')||'index'; }

    async init() { await this.loadPDFs(); this.renderPDFs(); this.renderAvisoRows(); }

    async loadPDFs() {
        try { const data=await window.mockAPI.getPDFs(); this.pdfs=data.pdfs||[]; }
        catch(e) { console.error('Error cargando PDFs:',e); }
    }

    renderPDFs() {
        document.querySelectorAll('[data-pdf-section]').forEach(container=>{
            const sectionName=container.getAttribute('data-pdf-section');
            const sectionPDFs=this.pdfs.filter(pdf=>this._normalize(pdf.section)===this._normalize(sectionName)&&pdf.page===this.currentPage);
            if(sectionPDFs.length){ container.innerHTML=''; sectionPDFs.forEach(pdf=>container.appendChild(this.createPDFCard(pdf))); }
            else { container.innerHTML='<div class="empty-message">No hay documentos disponibles</div>'; }
        });
    }

    renderAvisoRows() {
        const ac=document.querySelector('.aviso-years'); if(!ac||ac.hasAttribute('data-dynamic')) return;
        const pagePDFs=this.pdfs.filter(pdf=>pdf.page===this.currentPage);
        if(pagePDFs.length){ ac.innerHTML=''; ac.setAttribute('data-dynamic','true'); pagePDFs.forEach(pdf=>ac.appendChild(this.createAvisoRow(pdf))); }
    }

    _normalize(name) { return (name||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,''); }

    createAvisoRow(pdf) {
        const row=document.createElement('div'); row.className='aviso-year-row';
        row.innerHTML=`<span class="aviso-year">${pdf.title}</span><span class="aviso-dots"></span><a href="${pdf.path}" target="_blank" class="aviso-download"><span class="aviso-download-icon">??</span>Ver Documento</a>`;
        return row;
    }

    createPDFCard(pdf) {
        const card=document.createElement('div'); card.className='pdf-document-card';
        const isExcel=pdf.fileType==='Excel'||pdf.filename?.endsWith('.xlsx')||pdf.filename?.endsWith('.xls');
        const color=isExcel?'#217346':'#D32F2F'; const label=isExcel?'Excel':'PDF';
        card.innerHTML=`<div class="pdf-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6V22H18V8L14 2Z" fill="${color}"/></svg></div><div class="pdf-title">${pdf.title}</div><div class="pdf-description">${pdf.description||''}</div><div class="pdf-size">${label} · ${pdf.size||'N/A'}</div><div class="pdf-buttons"><a href="${pdf.path}" class="pdf-download-btn" download><span>Descargar</span></a><button class="pdf-view-btn" onclick="window.open('${pdf.path}','_blank')"><span>Ver</span></button></div>`;
        return card;
    }
}

document.addEventListener('DOMContentLoaded',()=>{ const loader=new TransparenciaLoader(); loader.init(); });





