import{S as f,W as h,a as P,i as l,R}from"./three.module-CvwULque.js";import{D as y}from"./DRACOLoader-_-dX8e_o.js";import{g as D}from"./lil-gui.module.min-Bc0DeA9g.js";import{O as L}from"./OrbitControls-BgKm-X_F.js";import{T as x}from"./TilesRenderer-B__2iXax.js";import{G as T}from"./GoogleCloudAuthPlugin-ByYp_pcn.js";import{T as A}from"./TileCompressionPlugin-D4njFejO.js";import{T as C}from"./TilesFadePlugin-Qr9WKzim.js";import{G as E}from"./GLTFExtensionsPlugin-D2kmT0dy.js";import{W as G}from"./I3DMLoader-MN4j8OdF.js";import{t as S}from"./Ellipsoid-LZ-ZKZQp.js";import"./B3DMLoader-CD9oTgMD.js";import"./readMagicBytes-Da5ueiou.js";import"./LoaderBase-CVSPpjX2.js";import"./GLTFLoader-nx88wwE7.js";import"./PNTSLoader-Dw0W6_Z8.js";import"./CMPTLoader-lyV0-C59.js";import"./GLTFExtensionLoader-XUNwtda-.js";import"./EllipsoidRegion-DxePPRoU.js";let t,i,m,o,e;const W=new R;W.firstHitOnly=!0;const b=localStorage.getItem("googleApiKey")??"put-your-api-key-here",d={apiKey:b,reload:g};v();w();function g(){localStorage.setItem("googleApiKey",d.apiKey),e&&(m.remove(e.group),e.dispose(),e=null),e=new x,e.registerPlugin(new T({apiToken:d.apiKey})),e.registerPlugin(new A),e.registerPlugin(new C),e.registerPlugin(new E({dracoLoader:new y().setDecoderPath("https://unpkg.com/three@0.153.0/examples/jsm/libs/draco/gltf/")})),e.setLatLonToYUp(35.6586*l.DEG2RAD,139.7454*l.DEG2RAD),m.add(e.group),e.setResolutionFromRenderer(t,o),e.setCamera(t)}function v(){m=new f,o=new h({antialias:!0}),o.setClearColor(1383455),document.body.appendChild(o.domElement),t=new P(60,window.innerWidth/window.innerHeight,100,16e5),t.position.set(1e3,1e3,1e3).multiplyScalar(.5),i=new L(t,o.domElement),i.minDistance=500,i.maxDistance=1e4*2,i.minPolarAngle=0,i.maxPolarAngle=3*Math.PI/8,i.enableDamping=!0,i.autoRotate=!0,i.autoRotateSpeed=.5,i.enablePan=!1,g(),c(),window.addEventListener("resize",c,!1),window.addEventListener("hashchange",u);const n=new D;n.width=300,n.add(d,"apiKey"),n.add(d,"reload"),n.open(),u()}function c(){t.aspect=window.innerWidth/window.innerHeight,o.setSize(window.innerWidth,window.innerHeight),t.updateProjectionMatrix(),o.setPixelRatio(window.devicePixelRatio)}function u(){const r=window.location.hash.replace(/^#/,"").split(/,/g).map(s=>parseFloat(s));if(r.length!==2||r.findIndex(s=>Number.isNaN(s))!==-1)return;const[p,a]=r;e.setLatLonToYUp(p*l.DEG2RAD,a*l.DEG2RAD)}function w(){requestAnimationFrame(w),e&&(i.update(),e.setResolutionFromRenderer(t,o),e.setCamera(t),t.updateMatrixWorld(),e.update(),F())}function F(){var n;if(o.render(m,t),e){const r=e.group.matrixWorld.clone().invert(),p=t.position.clone().applyMatrix4(r),a={};G.getPositionToCartographic(p,a);const s=((n=e.getAttributions()[0])==null?void 0:n.value)||"";document.getElementById("credits").innerText=S(a.lat,a.lon)+`
`+s}}
