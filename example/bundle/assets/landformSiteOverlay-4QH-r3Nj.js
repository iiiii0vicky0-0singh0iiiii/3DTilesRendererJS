import{k as v,j as N,Q as P,C as k,ac as J,ad as S,S as U,W as j,a as q,G as I,a2 as Y,n as B}from"./three.module-CvwULque.js";import{g as D}from"./lil-gui.module.min-Bc0DeA9g.js";import{P as Q,T as V}from"./TilesRenderer-B__2iXax.js";import{E as K}from"./EnvironmentControls-1r8kezR_.js";import"./I3DMLoader-MN4j8OdF.js";import"./readMagicBytes-Da5ueiou.js";import"./LoaderBase-CVSPpjX2.js";import"./GLTFLoader-nx88wwE7.js";import"./Ellipsoid-LZ-ZKZQp.js";import"./B3DMLoader-CD9oTgMD.js";import"./PNTSLoader-Dw0W6_Z8.js";import"./CMPTLoader-lyV0-C59.js";import"./GLTFExtensionLoader-XUNwtda-.js";import"./EllipsoidRegion-DxePPRoU.js";const M=new v,w=new P,y=new v;function E(a,e){if(a.sceneMatrix)return;const{translation:t,rotation:r,scale:s}=a;if(M.set(t.x,t.y,t.z),w.set(r.x,r.y,r.z,r.w),y.set(s.x,s.y,s.z),a.matrix=new N().compose(M,w,y),a.sceneMatrix=new N().copy(a.matrix),a.parent_id!==""){const i=e.find(o=>o.id===a.parent_id);E(i,e),a.sceneMatrix.premultiply(i.sceneMatrix)}}class W{constructor(){this.fetchOptions={}}loadAsync(e){return fetch(e,this.fetchOptions).then(t=>t.json()).then(t=>this.parse(t))}parse(e){return e.frames.forEach(t=>E(t,e.frames)),e}}const z=a=>class extends a{constructor(...e){super(...e),this.textures=[],this.overlayColor=new k(8716287),this.displayAsOverlay=!1}onBeforeCompile(e){const t=this.textures,r=this;e.uniforms.textures={get value(){return r.textures}},e.uniforms.overlayColor={get value(){return r.overlayColor}},e.defines={DISPLAY_AS_OVERLAY:Number(this.displayAsOverlay)},t.length!==0&&(e.fragmentShader=e.fragmentShader.replace(/void main/,s=>`
					uniform sampler2D textures[ ${t.length} ];
					uniform vec3 overlayColor;
					${s}

				`).replace(/#include <color_fragment>/,s=>`

					${s}

					vec4 col;
					#pragma unroll_loop_start
					for ( int i = 0; i < ${t.length}; i ++ ) {

						col = texture( textures[ i ], vMapUv );

						#if DISPLAY_AS_OVERLAY

						diffuseColor = mix( diffuseColor, vec4( overlayColor, 1.0 ), col.r * 0.5 );

						#else

						diffuseColor = mix( diffuseColor, col, col.a );

						#endif

					}
					#pragma unroll_loop_end

				`))}customProgramCacheKey(){return String(this.displayAsOverlay)+String(this.textures.length)+this.onBeforeCompile.toString()}};function G(){let a=!1,e=!1,t=-1;return typeof navigator<"u"&&(a=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,e=navigator.userAgent.indexOf("Firefox")>-1,t=e?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),!(typeof createImageBitmap>"u"||a||e&&t<98)}class ${constructor(e,t){this.cache={},this.fetchOptions={},this.loadTextureCallback=e,this.queue=t}getTextureLoader(){const e=this.fetchOptions;let t;return G()?t=new J:t=new S,e.credentials==="include"&&e.mode==="cors"&&t.setCrossOrigin("use-credentials"),"credentials"in e&&t.setWithCredentials(e.credentials==="include"),e.headers&&t.setRequestHeader(e.headers),t}loadTexture(e){const t=this.cache;if(e in t)return t[e].promise;const r=new AbortController,s=this.queue.add(e,()=>this.loadTextureCallback(e)).then(i=>{if(r.signal.aborted)throw new Error("TextureCache: Texture load aborted.");return t[e].texture=i,i});return this.cache[e]={texture:null,abortController:r,promise:s},s}getTexture(e){const t=this.cache;return e in t?t[e].texture:null}deleteTexture(e){const t=this.cache;if(e in t){const r=t[e];r.refs--,r.refs===0&&(r.texture?r.texture.dispose():r.abortController&&(r.abortController.abort(),this.queue.remove(e)),delete this.cache[e])}}dispose(){const e=this.cache;for(const t in e){const r=e[t];r.texture?(r.texture.dispose(),r.texture.image instanceof ImageBitmap&&r.texture.image.close()):r.abortController&&r.abortController.abort()}}}class H{constructor(e={}){e={textureUpdateCallback:()=>{throw new Error('TextureOverlayPlugin: "textureUpdateCallback" required.')},waitForLoadCompletion:!0,...e},this.name="TEXTURE_OVERLAY_PLUGIN",this.caches=null,this.queue=null,this.tiles=null,this.textureUpdateCallback=e.textureUpdateCallback,this.waitForLoadCompletion=e.waitForLoadCompletion}init(e){this.tiles=e,this.caches={},this.queue=new Q,this.queue.priorityCallback=(t,r)=>e.downloadQueue.priorityCallback(t,r),this._disposeModelCallback=({tile:t})=>{const r=this.caches;for(const s in r)r[s].deleteTexture(this.getTileKey(t))},this._assignTexturesCallback=({tile:t,scene:r})=>{queueMicrotask(()=>this.textureUpdateCallback(r,t,this))},e.addEventListener("dispose-model",this._disposeModelCallback),e.addEventListener("load-model",this._assignTexturesCallback),e.addEventListener("layer-textures-change",this._assignTexturesCallback)}processTileModel(e,t){const r=this.caches,s=[];for(const i in r){const n=r[i].loadTexture(this.getTileKey(t)).catch(()=>{});s.push(n)}return Promise.all(s)}dispose(){const{caches:e,tiles:t}=this;Object.keys(e).forEach(r=>{this.unregisterLayer(r)}),t.removeEventListener("dispose-model",this._disposeModelCallback),t.removeEventListener("load-model",this._assignTexturesCallback),t.removeEventListener("layer-textures-change",this._assignTexturesCallback)}getTileKey(e){return new URL(e.content.uri,e.__basePath+"/").toString()}getTexturesForTile(e,t={}){const r=this.getTileKey(e),s=this.caches;for(const i in t)i in s||delete t[i];for(const i in s)t[i]=s[i].getTexture(r);return t}hasLayer(e){return e in this.caches}registerLayer(e,t){if(e in this.caches)throw new Error(`TextureOverlayPlugin: Texture overlay named ${e} already exists.`);const r=this.tiles,s=new $(t,this.queue);if(s.fetchOptions=r.fetchOptions,this.caches[e]=s,this.waitForLoadCompletion){const i=[];r.forEachLoadedModel((o,n)=>{const c=s.loadTexture(this.getTileKey(n)).then(()=>({scene:o,tile:n}));i.push(c)}),Promise.allSettled(i).then(o=>{e in this.caches&&o.forEach(n=>{n.status==="fulfilled"&&this.textureUpdateCallback(n.value.scene,n.value.tile,this)})})}else r.forEachLoadedModel((i,o)=>{s.loadTexture(this.getTileKey(o)).then(()=>this.textureUpdateCallback(i,o,this)).catch(()=>{})})}unregisterLayer(e){const t=this.tiles,r=this.caches;if(e in r){const s=r[e];delete r[e],t.forEachLoadedModel((i,o)=>{s.getTexture(this.getTileKey(o))&&this.textureUpdateCallback(i,o,this)}),s.dispose()}}}const X=["NLF_0477_0709296508M723RAS_N0261004NCAM00701_0A0085J02/NLF_0477_0709296508M723RAS_N0261004NCAM00701_0A0085J02_scene.json","NLF_0477_0709296508M723RAS_N0261004NCAM00708_0A00LLJ02/NLF_0477_0709296508M723RAS_N0261004NCAM00708_0A00LLJ02_scene.json","NLF_0477_0709297328M366RAS_N0261004NCAM03477_0A0195J02/NLF_0477_0709297328M366RAS_N0261004NCAM03477_0A0195J02_scene.json","NLF_0477_0709297503M102RAS_N0261004NCAM03477_0A0195J02/NLF_0477_0709297503M102RAS_N0261004NCAM03477_0A0195J02_scene.json","NLF_0477_0709297668M065RAS_N0261004NCAM03477_0A0195J02/NLF_0477_0709297668M065RAS_N0261004NCAM03477_0A0195J02_scene.json","NLF_0477_0709297838M897RAS_N0261004NCAM02477_0A0195J02/NLF_0477_0709297838M897RAS_N0261004NCAM02477_0A0195J02_scene.json","NLF_0477_0709298005M099RAS_N0261004NCAM02477_0A0195J02/NLF_0477_0709298005M099RAS_N0261004NCAM02477_0A0195J02_scene.json","NLF_0477_0709298187M680RAS_N0261004NCAM13477_0A0195J02/NLF_0477_0709298187M680RAS_N0261004NCAM13477_0A0195J02_scene.json","NLF_0477_0709298299M678RAS_N0261004NCAM13477_0A0195J02/NLF_0477_0709298299M678RAS_N0261004NCAM13477_0A0195J02_scene.json","NLF_0477_0709298393M010RAS_N0261004NCAM13477_0A0195J02/NLF_0477_0709298393M010RAS_N0261004NCAM13477_0A0195J02_scene.json"].map(a=>"https://raw.githubusercontent.com/NASA-AMMOS/3DTilesSampleData/master/m20-drive-1004/tilesets/"+a),x=[];let d,f,A,u;const g={errorTarget:12,slopeDisplay:"NONE"};Z();R();function Z(){A=new U,u=new j({antialias:!0}),u.setPixelRatio(window.devicePixelRatio),u.setSize(window.innerWidth,window.innerHeight),u.setClearColor(14208704),document.body.appendChild(u.domElement),u.domElement.tabIndex=1,d=new q(60,window.innerWidth/window.innerHeight,.025,4e3),d.position.set(-20,10,20),d.lookAt(0,0,0),f=new K(A,d,u.domElement),f.adjustHeight=!1,f.minDistance=1,f.maxAltitude=Math.PI;const a=new I;a.rotation.set(Math.PI/2,0,0),A.add(a);let e=null,t=null,r=null;const s=async o=>{const n=o.replace("/tilesets/","/textures/SMG/").replace(/\.[0-9a-z]+$/i,".png");return new S().loadAsync(n).then(c=>(c.colorSpace=Y,c.flipY=!1,c))};X.forEach(async o=>{const n=await new W().loadAsync(o),c=o.split(/[\\/]/g);c.pop();const C=z(B);n.tilesets.forEach(p=>{const b=[...c,`${p.id}_tileset.json`].join("/"),l=new V(b),O=(m,L,_)=>{m.traverse(h=>{h.material&&(h.material.textures=Object.values(_.getTexturesForTile(L)),h.material.displayAsOverlay=g.slopeDisplay==="OVERLAY",h.material.needsUpdate=!0)})},F=new H({textureUpdateCallback:O});l.registerPlugin(F),l.addEventListener("load-model",({tile:m,scene:L})=>{L.traverse(_=>{if(_.material){const h=new C;h.copy(_.material),_.material=h}})}),r=r||l.lruCache,t=t||l.parseQueue,e=e||l.downloadQueue,l.lruCache=r,l.downloadQueue=e,l.parseQueue=t,l.setCamera(d),n.frames.find(m=>m.id===p.frame_id).sceneMatrix.decompose(l.group.position,l.group.quaternion,l.group.scale),a.add(l.group),x.push(l)})}),T(),window.addEventListener("resize",T,!1);const i=new D;i.add(g,"errorTarget",0,100),i.add(g,"slopeDisplay",["NONE","OVERLAY","SOLID"]).onChange(o=>{o!=="NONE"?x.forEach(n=>{const c=n.getPluginByName("TEXTURE_OVERLAY_PLUGIN");c.hasLayer("slopeLayer")||c.registerLayer("slopeLayer",s),n.forEachLoadedModel(C=>{C.traverse(p=>{p.material&&(p.material.displayAsOverlay=o==="OVERLAY",p.material.needsUpdate=!0)})})}):x.forEach(n=>{n.getPluginByName("TEXTURE_OVERLAY_PLUGIN").unregisterLayer("slopeLayer")})}),i.open()}function T(){d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),u.setSize(window.innerWidth,window.innerHeight),u.setPixelRatio(window.devicePixelRatio)}function R(){requestAnimationFrame(R),f.update(),d.updateMatrixWorld(),x.forEach(a=>{a.errorTarget=g.errorTarget,a.setResolutionFromRenderer(d,u),a.update()}),u.render(A,d)}
