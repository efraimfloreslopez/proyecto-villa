// Officials Loader — Demo (MockAPI)
class OfficialsLoader {
    constructor() { this.officials=[]; }

    async init() {
        await this.loadOfficials();
        const path=window.location.pathname;
        if(path.includes('hayuntamiento')) this.renderCabildo();
        else if(path.includes('directoriomunicipal')) this.renderDirectorio();
    }

    async loadOfficials() {
        try { const data=await window.mockAPI.getOfficials(); this.officials=data.officials||[]; }
        catch(e) { console.error('Error cargando funcionarios:',e); }
    }

    renderCabildo() {
        const grid=document.querySelector('.officials-grid'); if(!grid) return;
        const cabildo=this.officials.filter(o=>o.type==='cabildo').sort((a,b)=>(parseInt(a.order)||999)-(parseInt(b.order)||999));
        if(!cabildo.length) return;
        grid.innerHTML='';
        cabildo.forEach(official=>{
            const card=document.createElement('div'); card.className='official-card';
            const photo=official.photo||'../static/img/user-placeholder.svg';
            card.innerHTML=`<div class="official-header"><div class="official-photo"><img src="${photo}" alt="${official.name}" loading="lazy"></div><div class="official-basic-info"><h3>${official.name}</h3><div class="official-position">${official.position}</div></div></div>`;
            grid.appendChild(card);
        });
        const presidente=cabildo.find(o=>o.position.toLowerCase().includes('presidente'));
        if(presidente) this._updatePresidente(presidente);
    }

    renderDirectorio() {
        const sectionMap={ 'principales':'track-principales', 'directores':'track-directores', 'dif':'track-dif', 'encargados':'track-encargados' };
        Object.entries(sectionMap).forEach(([section,trackId])=>{
            const track=document.getElementById(trackId); if(!track) return;
            const officials=this.officials.filter(o=>o.type==='directorio'&&o.section===section).sort((a,b)=>(parseInt(a.order)||999)-(parseInt(b.order)||999));
            if(!officials.length) return;
            track.innerHTML='';
            officials.forEach(official=>{
                const card=document.createElement('div'); card.className='official-card-carousel';
                const photo=official.photo||'../static/img/user-placeholder.svg';
                card.innerHTML=`<div class="official-photo-carousel"><img src="${photo}" alt="${official.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"></div><h3>${official.name}</h3><div class="official-position-carousel">${official.position}</div><p class="official-email">${official.email||''}</p>`;
                track.appendChild(card);
            });
        });
        const presidente=this.officials.find(o=>o.position.toLowerCase().includes('presidente'));
        if(presidente) this._updatePresidente(presidente);
    }

    _updatePresidente(oficial) {
        const section=document.querySelector('.president-highlight'); if(!section) return;
        const img=section.querySelector('.president-photo img'); const name=section.querySelector('h3'); const pos=section.querySelector('.president-position');
        if(img&&oficial.photo) img.src=oficial.photo; if(name) name.textContent=oficial.name; if(pos) pos.textContent=oficial.position;
    }
}

document.addEventListener('DOMContentLoaded',()=>{ const loader=new OfficialsLoader(); loader.init(); });





