// Dynamic Image Loader — Demo (MockAPI)
class DynamicImageLoader {
    constructor() { this.images=[]; this.currentPage=this.detectCurrentPage(); }
    detectCurrentPage() { return window.location.pathname.split('/').pop().replace('.html','')||'index'; }

    async init() { await this.loadImages(); this.renderImages(); }

    async loadImages() {
        try {
            const data=await window.mockAPI.getImages();
            this.images=(data.images||[]).filter(img=>img.page===this.currentPage);
        } catch(e) { console.error('Error cargando imágenes:',e); }
    }

    renderImages() {
        document.querySelectorAll('[data-dynamic-image]').forEach(container=>{
            const imageId=container.getAttribute('data-dynamic-image');
            const section=container.getAttribute('data-section');
            let image=null;
            if(imageId) image=this.images.find(i=>i.id===imageId);
            else if(section) image=this.images.find(i=>i.section===section);
            if(image) this.renderImageInContainer(container,image);
        });
        this.renderBanners(); this.renderGalleries();
    }

    renderBanners() {
        document.querySelectorAll('.banner, .hero-image, .page-banner').forEach(banner=>{
            const section=banner.getAttribute('data-section')||'banner';
            const image=this.images.find(i=>i.section===section||i.category==='Banner');
            if(image){ if(banner.tagName==='IMG'){ banner.src=image.path; banner.alt=image.alt||image.title; } else { banner.style.backgroundImage=`url('${image.path}')`; banner.style.backgroundSize='cover'; banner.style.backgroundPosition='center'; } }
        });
    }

    renderGalleries() {
        document.querySelectorAll('[data-gallery]').forEach(gallery=>{
            const section=gallery.getAttribute('data-gallery');
            const imgs=this.images.filter(i=>i.section===section);
            if(imgs.length){ gallery.innerHTML=''; imgs.forEach(image=>{ const card=document.createElement('article'); card.className='dif-event-card'; card.innerHTML=`<div class="dif-event-image-wrapper"><img src="${image.path}" alt="${image.alt||image.title}" class="dif-event-image" loading="lazy"><div class="dif-event-overlay"></div></div><div class="dif-event-body"><h2 class="dif-event-title">${image.title}</h2>${image.description?`<p class="dif-event-description">${image.description}</p>`:''}</div>`; gallery.appendChild(card); }); }
            else { gallery.innerHTML='<div class="empty-message">No hay imágenes disponibles</div>'; }
        });
    }

    renderImageInContainer(container,image) {
        if(container.tagName==='IMG'){ container.src=image.path; container.alt=image.alt||image.title; }
        else if(container.hasAttribute('data-background')){ container.style.backgroundImage=`url('${image.path}')`; container.style.backgroundSize='cover'; container.style.backgroundPosition='center'; }
        else { const img=document.createElement('img'); img.src=image.path; img.alt=image.alt||image.title; img.style.width='100%'; img.style.height='auto'; container.innerHTML=''; container.appendChild(img); }
    }
}

document.addEventListener('DOMContentLoaded',()=>{ const loader=new DynamicImageLoader(); loader.init(); });





