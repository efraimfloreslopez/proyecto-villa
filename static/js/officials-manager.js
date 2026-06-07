// Officials Manager — Demo (MockAPI)
class OfficialsManager {
    constructor() { this.officials=[]; this.currentOfficial=null; }

    async init() { await this.loadOfficials(); this.setupEventListeners(); this.displayOfficials(); }

    async loadOfficials() {
        try { const data=await window.mockAPI.getOfficials(); this.officials=data.officials||[]; }
        catch(e) { console.error('Error cargando funcionarios:',e); this.officials=[]; }
    }

    displayOfficials(filter='') {
        const grid=document.getElementById('officials-grid'); if(!grid) return;
        grid.innerHTML=''; grid.style.cssText='display:flex;flex-direction:column;gap:40px;';
        let list=this.officials.filter(o=>o.name.toLowerCase().includes(filter.toLowerCase())||o.position.toLowerCase().includes(filter.toLowerCase()));
        if(!list.length){ grid.innerHTML='<p style="text-align:center;color:#666;padding:20px;">Sin resultados</p>'; return; }

        const cabildo=list.filter(o=>o.type==='cabildo').sort((a,b)=>(parseInt(a.order)||999)-(parseInt(b.order)||999));
        const directorio=list.filter(o=>o.type==='directorio').sort((a,b)=>(parseInt(a.order)||999)-(parseInt(b.order)||999));

        const renderSec=(title,items)=>{
            if(!items.length) return;
            const sc=document.createElement('div');
            const h=document.createElement('h3'); h.textContent=title; h.style.cssText='color:#0a1f44;border-bottom:3px solid #C9A961;padding-bottom:10px;margin-bottom:25px;font-size:1.5rem;font-weight:700;';
            sc.appendChild(h);
            const g=document.createElement('div'); g.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:25px;';
            items.forEach(o=>g.appendChild(this.createCard(o)));
            sc.appendChild(g); grid.appendChild(sc);
        };
        renderSec('H. Ayuntamiento — Cabildo',cabildo);
        renderSec('Directorio Municipal',directorio);
    }

    createCard(official) {
        const card=document.createElement('div');
        card.style.cssText='background:white;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.08);overflow:hidden;display:flex;flex-direction:column;transition:transform 0.3s,box-shadow 0.3s;border:1px solid #eee;';
        card.dataset.id=official.id;
        const photo=official.photo||'../static/img/user-placeholder.png';
        card.innerHTML=`<div style="width:100%;aspect-ratio:3/4;overflow:hidden;background:#f5f5f5;"><img src="${photo}" alt="${official.name}" style="width:100%;height:100%;object-fit:cover;display:block;"></div><div style="padding:20px;flex:1;display:flex;flex-direction:column;"><h3 style="font-size:1.05rem;color:#333;margin:0 0 5px;font-weight:700;">${official.name}</h3><p style="color:#C9A961;font-weight:600;font-size:0.9rem;margin-bottom:10px;">${official.position}</p><div style="margin-top:auto;font-size:0.82rem;color:#666;">${official.email?`<div style="margin-bottom:4px;">?? ${official.email}</div>`:''} ${official.phone?`<div>?? ${official.phone}</div>`:''}</div><div style="margin-top:15px;padding-top:15px;border-top:1px solid #eee;display:flex;gap:10px;"><button class="btn-action btn-edit" onclick="officialsManager.editOfficial('${official.id}')" style="flex:1;">Editar</button><button class="btn-action btn-delete" onclick="officialsManager.deleteOfficial('${official.id}')" style="flex:1;">Eliminar</button></div></div>`;
        card.onmouseenter=()=>{ card.style.transform='translateY(-5px)'; card.style.boxShadow='0 10px 25px rgba(0,0,0,0.15)'; };
        card.onmouseleave=()=>{ card.style.transform=''; card.style.boxShadow='0 4px 15px rgba(0,0,0,0.08)'; };
        return card;
    }

    openAddModal() { const m=document.getElementById('official-modal'); const f=document.getElementById('official-form'); const t=document.querySelector('#official-modal .modal-header h2'); if(t) t.textContent='Agregar Funcionario'; if(f) f.reset(); this.currentOfficial=null; if(m) m.style.display='flex'; }
    closeModal() { const m=document.getElementById('official-modal'); if(m) m.style.display='none'; this.currentOfficial=null; }

    editOfficial(id) {
        const o=this.officials.find(o=>o.id===id); if(!o) return; this.currentOfficial=o;
        ['name','position','email','phone','period','type','order'].forEach(k=>{ const el=document.getElementById(`official-${k}`); if(el) el.value=o[k]||''; });
        const t=document.querySelector('#official-modal .modal-header h2'); if(t) t.textContent='Editar Funcionario';
        const m=document.getElementById('official-modal'); if(m) m.style.display='flex';
    }

    async deleteOfficial(id) {
        if(!confirm('¿Eliminar este funcionario?')) return;
        try { await window.mockAPI.deleteOfficial(id); await this.loadOfficials(); this.displayOfficials(); this.showNotification('Funcionario eliminado','success'); }
        catch(e) { this.showNotification('Error al eliminar','error'); }
    }

    async saveOfficial(formData) {
        try {
            const data={ name:formData.get('name')||'Nuevo Funcionario', position:formData.get('position')||'Cargo', email:formData.get('email')||'', phone:formData.get('phone')||'', period:formData.get('period')||'2024-2027', type:formData.get('type')||'directorio', order:formData.get('order')||'99', photo:'', section:'' };
            if(this.currentOfficial) await window.mockAPI.deleteOfficial(this.currentOfficial.id);
            await window.mockAPI.addOfficial(data);
            await this.loadOfficials(); this.closeModal(); this.displayOfficials();
            this.showNotification(this.currentOfficial?'Funcionario actualizado':'Funcionario agregado (demo)','success');
        } catch(e) { this.showNotification('Error al guardar','error'); }
    }

    setupEventListeners() {
        const addBtn=document.getElementById('add-official-btn'); if(addBtn) addBtn.addEventListener('click',()=>this.openAddModal());
        const closeBtn=document.getElementById('close-modal'); if(closeBtn) closeBtn.addEventListener('click',()=>this.closeModal());
        const cancelBtn=document.getElementById('cancel-official'); if(cancelBtn) cancelBtn.addEventListener('click',()=>this.closeModal());
        const form=document.getElementById('official-form'); if(form) form.addEventListener('submit',e=>{ e.preventDefault(); this.saveOfficial(new FormData(form)); });
        const search=document.getElementById('search-official'); if(search) search.addEventListener('input',e=>this.displayOfficials(e.target.value));
        const photoInput=document.getElementById('official-photo'); const preview=document.getElementById('photo-preview');
        if(photoInput&&preview) photoInput.addEventListener('change',function(){ const f=this.files[0]; if(f){ const r=new FileReader(); r.onload=e=>preview.style.backgroundImage=`url('${e.target.result}')`; r.readAsDataURL(f); } });
        const modal=document.getElementById('official-modal'); if(modal) modal.addEventListener('click',e=>{ if(e.target===modal) this.closeModal(); });
    }

    showNotification(msg,type='info') {
        const n=document.createElement('div'); n.className=`notification notification-${type}`;
        n.innerHTML=`<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:10px;font-size:1.2rem;">×</button>`;
        document.body.appendChild(n); setTimeout(()=>n.classList.add('show'),10);
        setTimeout(()=>{ n.classList.remove('show'); setTimeout(()=>n.remove(),300); },3500);
    }
}

let officialsManager;
document.addEventListener('DOMContentLoaded',()=>{ officialsManager=new OfficialsManager(); officialsManager.init(); });





