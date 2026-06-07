// Code Editor — Demo (MockAPI)
class CodeEditor {
    constructor() { this.editor=null; this.currentFile=null; this.currentFilePath=null; this.files=[]; }

    async init() {
        try { await this.loadMonacoEditor(); this.createEditor(); await this.loadFileList(); this.setupEventListeners(); console.log('Code Editor inicializado (demo)'); }
        catch(e) { console.error('Error inicializando editor:',e); this.showNotification('Error inicializando el editor','error'); }
    }

    async loadMonacoEditor() {
        return new Promise((resolve)=>{
            if(window.monaco){ resolve(); return; }
            require.config({ paths:{ vs:'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
            require(['vs/editor/editor.main'],()=>{ resolve(); });
        });
    }

    createEditor() {
        const container=document.getElementById('code-editor'); if(!container) return;
        this.editor=monaco.editor.create(container,{ theme:'vs-dark', fontSize:14, minimap:{enabled:true}, automaticLayout:true, scrollBeyondLastLine:false, wordWrap:'on', formatOnPaste:true, formatOnType:true, language:'html', value:'<!-- Selecciona un archivo del explorador para editar -->' });
    }

    async loadFileList() {
        try { const data=await window.mockAPI.getFiles(); this.files=data.files||[]; this.renderFileTree(); }
        catch(e) { console.error('Error cargando archivos:',e); this.showNotification('Error al cargar la lista de archivos','error'); }
    }

    renderFileTree() {
        const container=document.getElementById('file-list'); if(!container) return; container.innerHTML='';
        const groups={ html:{name:'HTML',icon:'??',color:'#e34c26',files:[]}, css:{name:'CSS',icon:'??',color:'#264de4',files:[]}, js:{name:'JavaScript',icon:'??',color:'#f7df1e',files:[]} };
        this.files.forEach(f=>{ if(f.type==='html'||f.name.endsWith('.html')) groups.html.files.push(f); else if(f.type==='css'||f.name.endsWith('.css')) groups.css.files.push(f); else if(f.type==='javascript'||f.name.endsWith('.js')) groups.js.files.push(f); });
        Object.values(groups).forEach(g=>g.files.sort((a,b)=>a.name.localeCompare(b.name)));
        Object.entries(groups).forEach(([,group])=>{
            const folderDiv=document.createElement('div'); folderDiv.className='tree-folder';
            const headerDiv=document.createElement('div'); headerDiv.className='tree-folder-header';
            headerDiv.innerHTML=`<span class="tree-toggle">?</span><span class="tree-icon" style="color:${group.color}">${group.icon}</span><span class="tree-label">${group.name}</span><span class="tree-count">${group.files.length}</span>`;
            const contentDiv=document.createElement('div'); contentDiv.className='tree-content expanded';
            group.files.forEach(file=>{
                const item=document.createElement('div'); item.className='tree-item'; item.dataset.filename=file.name; item.dataset.path=file.path;
                item.innerHTML=`<span class="tree-icon" style="color:${group.color};opacity:0.7;">${group.icon}</span><span class="tree-label">${file.name}</span>`;
                item.onclick=(e)=>{ e.stopPropagation(); this.loadFile(file.name,file.path); document.querySelectorAll('.tree-item').forEach(el=>el.classList.remove('active')); item.classList.add('active'); };
                contentDiv.appendChild(item);
            });
            headerDiv.onclick=()=>{ const exp=contentDiv.classList.contains('expanded'); contentDiv.classList.toggle('expanded'); headerDiv.querySelector('.tree-toggle').textContent=exp?'?':'?'; };
            folderDiv.appendChild(headerDiv); folderDiv.appendChild(contentDiv); container.appendChild(folderDiv);
        });
    }

    getLanguage(filename) { if(filename.endsWith('.html')) return 'html'; if(filename.endsWith('.css')) return 'css'; if(filename.endsWith('.js')) return 'javascript'; if(filename.endsWith('.json')) return 'json'; return 'plaintext'; }

    async loadFile(filename,filepath) {
        try {
            const data=await window.mockAPI.getFileContent(filepath);
            this.currentFile=filename; this.currentFilePath=filepath;
            const el=document.getElementById('current-file-name'); if(el) el.textContent=filename;
            monaco.editor.setModelLanguage(this.editor.getModel(),this.getLanguage(filename));
            this.editor.setValue(data.content);
            this.showNotification(`Archivo cargado: ${filename}`,'success');
        } catch(e) { this.showNotification(`Error al cargar ${filename}: ${e.message}`,'error'); }
    }

    async saveFile() {
        if(!this.currentFile||!this.currentFilePath){ this.showNotification('No hay archivo seleccionado','warning'); return; }
        try { await window.mockAPI.saveFile(this.currentFilePath,this.editor.getValue()); this.showNotification(`? ${this.currentFile} guardado (demo)`,'success'); }
        catch(e) { this.showNotification(`? Error al guardar: ${e.message}`,'error'); }
    }

    showNotification(message,type='info') {
        document.querySelectorAll('.editor-notification').forEach(n=>n.remove());
        const n=document.createElement('div'); n.className=`editor-notification notification-${type}`; n.textContent=message;
        n.style.cssText=`position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;color:white;font-weight:500;z-index:10000;max-width:400px;`;
        if(type==='success') n.style.background='#27ae60'; else if(type==='error') n.style.background='#e74c3c'; else if(type==='warning') n.style.background='#f39c12'; else n.style.background='#3498db';
        document.body.appendChild(n);
        setTimeout(()=>{ n.style.opacity='0'; n.style.transition='opacity 0.3s'; setTimeout(()=>n.remove(),300); },3000);
    }

    setupEventListeners() {
        const saveBtn=document.getElementById('save-btn'); if(saveBtn) saveBtn.addEventListener('click',()=>this.saveFile());
        document.addEventListener('keydown',(e)=>{ if((e.ctrlKey||e.metaKey)&&e.key==='s'){ e.preventDefault(); this.saveFile(); } });
    }
}

let codeEditor;
document.addEventListener('DOMContentLoaded',()=>{ codeEditor=new CodeEditor(); codeEditor.init(); });





