/**
 * ================================================================
 * MOCK API - Capa de simulación para demo de portafolio
 * [PRIVACIDAD] Reemplaza todas las llamadas HTTP reales.
 * Sin backend: datos 100% ficticios en memoria del navegador.
 * ================================================================
 */
class MockAPI {
    constructor() { this._initData(); this._nextId = 100; }

    _delay(ms) { return new Promise(r => setTimeout(r, ms || (Math.random() * 300 + 120))); }
    _genId() { return String(this._nextId++); }
    _photo() { return '../static/img/user-placeholder.svg'; }

    _initData() {
        const p = this._photo;
        this.officials = [
            { id:"1", name:"LIC. CARLOS MENDOZA RIVERA",   position:"Presidente Municipal",  email:"presidente@municipio.demo",  phone:"(555) 100-0001", photo:p(), type:"cabildo",   order:"1", period:"2024-2027", section:"" },
            { id:"2", name:"LIC. ANA GARCÍA TORRES",        position:"Síndico Municipal",     email:"sindicatura@municipio.demo", phone:"(555) 100-0002", photo:p(), type:"cabildo",   order:"2", period:"2024-2027", section:"" },
            { id:"3", name:"C. ROBERTO LÓPEZ HERNÁNDEZ",    position:"Primer Regidor",        email:"regidor1@municipio.demo",    phone:"(555) 100-0003", photo:p(), type:"cabildo",   order:"3", period:"2024-2027", section:"" },
            { id:"4", name:"C. MARIANA SÁNCHEZ DÍAZ",       position:"Segunda Regidora",      email:"regidor2@municipio.demo",    phone:"(555) 100-0004", photo:p(), type:"cabildo",   order:"4", period:"2024-2027", section:"" },
            { id:"5", name:"C. JORGE RAMÍREZ CASTRO",       position:"Tercer Regidor",        email:"regidor3@municipio.demo",    phone:"(555) 100-0005", photo:p(), type:"cabildo",   order:"5", period:"2024-2027", section:"" },
            { id:"6", name:"LIC. PATRICIA MORALES VEGA",    position:"Secretaria General",    email:"secretaria@municipio.demo",  phone:"(555) 200-0001", photo:p(), type:"directorio",order:"1", period:"2024-2027", section:"principales" },
            { id:"7", name:"C.P. FERNANDO RUIZ OLVERA",     position:"Tesorero Municipal",    email:"tesoreria@municipio.demo",   phone:"(555) 200-0002", photo:p(), type:"directorio",order:"2", period:"2024-2027", section:"principales" },
            { id:"8", name:"ING. LAURA JIMÉNEZ PEÑA",       position:"Dir. Obras Públicas",   email:"obras@municipio.demo",       phone:"(555) 200-0003", photo:p(), type:"directorio",order:"1", period:"2024-2027", section:"directores" },
            { id:"9", name:"LIC. DAVID HERRERA LUNA",       position:"Dir. Desarrollo Social",email:"desarrollo@municipio.demo",  phone:"(555) 200-0004", photo:p(), type:"directorio",order:"2", period:"2024-2027", section:"directores" },
            { id:"10",name:"MTRA. SOFÍA CRUZ MARTÍNEZ",     position:"Directora del DIF",     email:"dif@municipio.demo",         phone:"(555) 200-0005", photo:p(), type:"directorio",order:"1", period:"2024-2027", section:"dif" },
            { id:"11",name:"LIC. MANUEL CRUZ",              position:"Dir. Educación y Cultura",email:"cultura@municipio.demo",   phone:"(555) 200-0006", photo:p(), type:"directorio",order:"2", period:"2024-2027", section:"dif" },
            { id:"12",name:"C. MICHELLE JUÁREZ",            position:"Encargada de Turismo",  email:"turismo@municipio.demo",     phone:"(555) 200-0007", photo:p(), type:"directorio",order:"1", period:"2024-2027", section:"encargados" },
            { id:"13",name:"ING. RAÚL CRUZ RODRÍGUEZ",      position:"Encargado de TICs",     email:"tics@municipio.demo",      phone:"(555) 200-0008", photo:p(), type:"directorio",order:"2", period:"2024-2027", section:"encargados" },
            { id:"14",name:"LIC. EDGAR MONTES",             position:"Comunicación Social",   email:"comunicacion@municipio.demo",phone:"(555) 200-0009", photo:p(), type:"directorio",order:"3", period:"2024-2027", section:"encargados" }
        ];
        this.pdfs = [
            { id:"1",  title:"Ley de Ingresos 2025",              description:"Documento de demostración",          filename:"ley_ingresos_2025.pdf",    path:"#demo-pdf", page:"transparencia",             section:"Ley de Ingresos",  category:"Documento", size:"1.2 MB", uploadDate:"2025-01-10", fileType:"PDF" },
            { id:"2",  title:"Presupuesto de Egresos 2025",       description:"Presupuesto de egresos (demo)",        filename:"presupuesto_2025.pdf",     path:"#demo-pdf", page:"transparencia",             section:"Presupuesto",      category:"Documento", size:"2.5 MB", uploadDate:"2025-01-10", fileType:"PDF" },
            { id:"3",  title:"Cuenta Pública 1er Trimestre",      description:"Informe trimestral (demo)",            filename:"cuenta_t1.pdf",            path:"#demo-pdf", page:"ArmonizacionContable",      section:"Cuenta Publica",   category:"Informe",   size:"3.1 MB", uploadDate:"2025-04-15", fileType:"PDF" },
            { id:"4",  title:"Plan Municipal de Desarrollo",       description:"Plan de desarrollo (demo)",            filename:"plan_municipal.pdf",       path:"#demo-pdf", page:"Planeacion",                section:"Plan Municipal",   category:"Documento", size:"5.4 MB", uploadDate:"2024-10-01", fileType:"PDF" },
            { id:"5",  title:"Reglamento Interior",                description:"Reglamento interior (demo)",           filename:"reglamento.pdf",           path:"#demo-pdf", page:"Normatividad",              section:"Reglamentos",      category:"Normativa", size:"800 KB", uploadDate:"2024-11-20", fileType:"PDF" }
        ];
        this.images = [
            { id:"1", title:"Fachada Palacio Municipal", description:"Vista frontal (demo)", filename:"fachada.svg",   path:"../static/img/placeholder.svg", page:"index",         section:"banner",       category:"Banner",    size:"—", uploadDate:"2025-01-01", alt:"Palacio Municipal" },
            { id:"2", title:"Plaza Principal",           description:"Plaza central (demo)", filename:"plaza.svg",    path:"../static/img/placeholder.svg", page:"index",         section:"galeria",      category:"Galería",   size:"—", uploadDate:"2025-01-01", alt:"Plaza Principal" },
            { id:"3", title:"Evento Cultural",           description:"Festival cultural (demo)",filename:"evento.svg", path:"../static/img/placeholder.svg", page:"dif",           section:"eventos",      category:"Evento",    size:"—", uploadDate:"2025-03-15", alt:"Evento Cultural" }
        ];
        this.videos = [
            { id:"1", title:"Mensaje Institucional",       description:"Video demo",    filename:"mensaje.mp4", url:"#demo-video", path:"#demo-video", page:"index", section:"principal", category:"Video", size:"—", uploadDate:"2025-01-15", date:"2025-01-15", thumbnail:"../static/img/placeholder.svg", views:1250 },
            { id:"2", title:"Recorrido Turístico",         description:"Video demo",    filename:"turismo.mp4", url:"#demo-video", path:"#demo-video", page:"turismo", section:"turismo", category:"Video", size:"—", uploadDate:"2025-02-10", date:"2025-02-10", thumbnail:"../static/img/placeholder.svg", views:830 }
        ];
        this.publications = [
            { id:"1", title:"Convocatoria: Becas Municipales 2025", excerpt:"Convocatoria de demostración...", content:"Contenido demo.", category:"Noticias",     author:"Comunicación Social", date:"2025-04-10", status:"published", image:"" },
            { id:"2", title:"Aviso: Jornada de Vacunación",         excerpt:"Aviso de demostración...",        content:"Contenido demo.", category:"Eventos",      author:"DIF Municipal",       date:"2025-04-08", status:"published", image:"" }
        ];
        this.files = [
            { name:"index.html",         path:"template/index.html",         type:"html" },
            { name:"hayuntamiento.html", path:"template/hayuntamiento.html", type:"html" },
            { name:"transparencia.html", path:"template/transparencia.html", type:"html" },
            { name:"main.css",           path:"static/css/global.css",       type:"css" },
            { name:"main.js",            path:"static/js/main.js",           type:"javascript" }
        ];
    }

    async getOfficials() { await this._delay(); return { officials: [...this.officials] }; }
    async addOfficial(data) { await this._delay(); const o = { ...data, id: this._genId(), photo: this._photo() }; this.officials.push(o); return { success:true, official:o, message:'[Demo] Funcionario agregado (simulado)' }; }
    async deleteOfficial(id) { await this._delay(); this.officials = this.officials.filter(o => o.id !== id); return { success:true, message:'[Demo] Eliminación simulada' }; }

    async getPDFs() { await this._delay(); return { pdfs: [...this.pdfs] }; }
    async addPDF(data) { await this._delay(); const p = { ...data, id:this._genId(), path:'#demo-pdf', uploadDate:new Date().toISOString().split('T')[0] }; this.pdfs.push(p); return { success:true, pdf:p, message:'[Demo] PDF simulado' }; }
    async updatePDF(id, data) { await this._delay(); const i = this.pdfs.findIndex(p => p.id===id); if(i!==-1) this.pdfs[i]={...this.pdfs[i],...data}; return { success:true, message:'[Demo] Actualización simulada' }; }
    async deletePDF(id) { await this._delay(); this.pdfs = this.pdfs.filter(p => p.id!==id); return { success:true, message:'[Demo] Eliminación simulada' }; }

    async getImages() { await this._delay(); return { images: [...this.images] }; }
    async addImage(data) { await this._delay(); const im = { ...data, id:this._genId(), path:'../static/img/placeholder.svg', uploadDate:new Date().toISOString().split('T')[0] }; this.images.push(im); return { success:true, image:im, message:'[Demo] Imagen simulada' }; }
    async updateImage(id, data) { await this._delay(); const i = this.images.findIndex(im => im.id===id); if(i!==-1) this.images[i]={...this.images[i],...data}; return { success:true, message:'[Demo] Actualización simulada' }; }
    async deleteImage(id) { await this._delay(); this.images = this.images.filter(im => im.id!==id); return { success:true, message:'[Demo] Eliminación simulada' }; }

    async getVideos() { await this._delay(); return { videos: [...this.videos] }; }
    async addVideo(data) { await this._delay(); const v = { ...data, id:this._genId(), url:'#demo-video', date:new Date().toISOString().split('T')[0], views:0, thumbnail:'../static/img/placeholder.svg' }; this.videos.push(v); return { success:true, video:v, message:'[Demo] Video simulado' }; }
    async deleteVideo(id) { await this._delay(); this.videos = this.videos.filter(v => v.id!==id); return { success:true, message:'[Demo] Eliminación simulada' }; }

    async getPublications() { await this._delay(); return { publications: [...this.publications] }; }
    async addPublication(data) { await this._delay(); const p = { ...data, id:this._genId(), date:new Date().toISOString().split('T')[0], author:"Demo Admin" }; this.publications.push(p); return { success:true, publication:p, message:'[Demo] Publicación simulada' }; }
    async deletePublication(id) { await this._delay(); this.publications = this.publications.filter(p => p.id!==id); return { success:true, message:'[Demo] Eliminación simulada' }; }

    async getFiles() { await this._delay(); return { files: [...this.files] }; }
    async getFileContent(path) { await this._delay(); return { content:`<!-- [Demo] Archivo simulado: ${path} -->\n<p>Contenido de demostración. No se escribe en disco.</p>` }; }
    async saveFile(path, content) { await this._delay(); return { success:true, message:`[Demo] Guardado simulado: ${path}` }; }

    async login(username, password) {
        await this._delay(500);
        if (username==="demo" && password==="demo123") return { success:true, user:{ username:"demo", role:"admin" } };
        return { success:false, error:"Credenciales incorrectas. Usa: demo / demo123" };
    }

    async checkFileExists(url) { await this._delay(80); return { ok:true }; }
}

window.mockAPI = new MockAPI();
