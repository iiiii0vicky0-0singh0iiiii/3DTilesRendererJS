import{S as k,W as M,P as L,a as b,D as C,A as F,L as P}from"./three.module-CvwULque.js";import{O as S}from"./OrbitControls-BgKm-X_F.js";import{D as x}from"./DRACOLoader-_-dX8e_o.js";import{G}from"./GLTFLoader-nx88wwE7.js";import{G as g}from"./GLTFExtensionLoader-XUNwtda-.js";import"./LoaderBase-CVSPpjX2.js";let s,t,r,e,i;R();h();function R(){r=new k,e=new M({antialias:!0}),e.setPixelRatio(window.devicePixelRatio),e.setSize(window.innerWidth,window.innerHeight),e.setClearColor(1383455),e.shadowMap.enabled=!0,e.shadowMap.type=L,document.body.appendChild(e.domElement),s=new b(60,window.innerWidth/window.innerHeight,1,4e3),s.position.set(3,10,20),t=new S(s,e.domElement),t.screenSpacePanning=!1,t.minDistance=1,t.maxDistance=2e3,i=new C(16777215,1.25),i.position.set(1,2,3).multiplyScalar(40),i.castShadow=!0,i.shadow.bias=-.01,i.shadow.mapSize.setScalar(2048);const d=i.shadow.camera;d.left=-200,d.bottom=-200,d.right=200,d.top=200,d.updateProjectionMatrix(),r.add(i);const p=new F(16777215,.05);r.add(p);let c=0;const f=["https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb","https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Embedded/CesiumMilkTruck.gltf","https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf"];for(const o of f){const n=new g;n.workingPath=n.workingPathForURL(o),n.loadAsync(o).then(a=>{a.scene.position.set(c+=5,0,0),t.target.set(c/2,0,0),t.update(),console.log("default loader:",{gltf:a,url:o}),r.add(a.scene)})}const T=["https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Draco/CesiumMilkTruck.gltf","https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb"],l=new P,m=new G(l),w=new x(l);w.setDecoderPath("https://unpkg.com/three@0.153.0/examples/jsm/libs/draco/gltf/"),m.setDRACOLoader(w),l.addHandler(/\.gltf$/,m),l.addHandler(/\.glb$/,m);for(const o of T){const n=new g(l);n.workingPath=n.workingPathForURL(o),n.loadAsync(o).then(a=>{a.scene.position.set(c+=5,0,0),t.target.set(c/2,0,0),t.update(),console.log("custom loader:",{gltf:a,url:o}),r.add(a.scene)})}u(),window.addEventListener("resize",u,!1)}function u(){s.aspect=window.innerWidth/window.innerHeight,e.setPixelRatio(window.devicePixelRatio),e.setSize(window.innerWidth,window.innerHeight),s.updateProjectionMatrix()}function h(){requestAnimationFrame(h),D()}function D(){e.render(r,s)}
