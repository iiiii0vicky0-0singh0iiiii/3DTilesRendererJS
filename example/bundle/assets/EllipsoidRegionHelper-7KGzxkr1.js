import{k as m,ag as G,ah as I,ai as A,aj as _,ak as z,g as R,al as H,i as w}from"./three.module-CvwULque.js";import{E as L}from"./EllipsoidRegion-DxePPRoU.js";const r=new m,E=["x","y","z"];class T extends G{constructor(t,o=16776960,i=40){const l=new I,p=[];for(let n=0;n<3;n++){const f=E[n],h=E[(n+1)%3];r.set(0,0,0);for(let u=0;u<i;u++){let e;e=2*Math.PI*u/(i-1),r[f]=Math.sin(e),r[h]=Math.cos(e),p.push(r.x,r.y,r.z),e=2*Math.PI*(u+1)/(i-1),r[f]=Math.sin(e),r[h]=Math.cos(e),p.push(r.x,r.y,r.z)}}l.setAttribute("position",new A(new Float32Array(p),3)),l.computeBoundingSphere(),super(l,new _({color:o,toneMapped:!1})),this.sphere=t,this.type="SphereHelper"}updateMatrixWorld(t){const o=this.sphere;this.position.copy(o.center),this.scale.setScalar(o.radius),super.updateMatrixWorld(t)}}const b=new m,x=new m,c=new m,P=new m,S=new m;function v(s){s=s.toNonIndexed();const{groups:t}=s,{position:o,normal:i}=s.attributes,l=[],p=[];for(const f of t){const{start:h,count:u}=f;for(let e=h,d=h+u;e<d;e++)P.fromBufferAttribute(o,e),S.fromBufferAttribute(i,e),p.push(...P),l.push(...S)}const n=new I;return n.setAttribute("position",new A(new Float32Array(p),3)),n.setAttribute("normal",new A(new Float32Array(l),3)),n}function N(s,{computeNormals:t=!1}={}){const{latStart:o=-Math.PI/2,latEnd:i=Math.PI/2,lonStart:l=0,lonEnd:p=2*Math.PI,heightStart:n=0,heightEnd:f=0}=s,h=new H(1,1,1,32,32),{normal:u,position:e}=h.attributes,d=e.clone();for(let a=0,M=e.count;a<M;a++){c.fromBufferAttribute(e,a);const g=w.mapLinear(c.x,-.5,.5,o,i),y=w.mapLinear(c.y,-.5,.5,l,p);let B=n;s.getCartographicToNormal(g,y,b),c.z<0&&(B=f),s.getCartographicToPosition(g,y,B,c),e.setXYZ(a,...c)}t&&h.computeVertexNormals();for(let a=0,M=d.count;a<M;a++){c.fromBufferAttribute(d,a);const g=w.mapLinear(c.x,-.5,.5,o,i),y=w.mapLinear(c.y,-.5,.5,l,p);b.fromBufferAttribute(u,a),s.getCartographicToNormal(g,y,x),Math.abs(b.dot(x))>.1&&(c.z>0&&x.multiplyScalar(-1),u.setXYZ(a,...x))}return h}class k extends G{constructor(t=new L,o=16776960){super(),this.ellipsoidRegion=t,this.material.color.set(o),this.update()}update(){const t=N(this.ellipsoidRegion);this.geometry.dispose(),this.geometry=new z(t,80)}dispose(){this.geometry.dispose(),this.material.dispose()}}class V extends R{constructor(t=new L,o=16776960){super(),this.ellipsoidRegion=t,this.material.color.set(o),this.update()}update(){this.geometry.dispose();const t=N(this.ellipsoidRegion,{computeNormals:!0}),{lonStart:o,lonEnd:i}=this;i-o>=2*Math.PI?(t.groups.splice(2,2),this.geometry=v(t)):this.geometry=t}dispose(){this.geometry.dispose(),this.material.dispose()}}export{V as E,T as S,k as a};
