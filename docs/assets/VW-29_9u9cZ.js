import"./styles-B-291lNV.js";const A=document.getElementById("initiate-game-button"),h=document.getElementById("game-canvas"),r=document.getElementById("bg-music"),H=document.querySelector(".game-intro-screen"),k=document.querySelector(".checkpoint-message-screen"),L=document.querySelector(".checkpoint-message-screen > p"),z=document.querySelector(".checkpoint-message-screen > h2"),l=h.getContext("2d");let C=performance.now(),f=0,E=0;performance.now();h.width=innerWidth;h.height=innerHeight;const m=.5;let d=!0;const s=e=>innerHeight<500?Math.ceil(e/500*innerHeight):e;class F{constructor(){this.position={x:s(10),y:s(400)},this.velocity={x:0,y:0},this.width=s(40),this.height=s(40),this.color="black"}draw(){l.fillStyle="black",l.fillRect(this.position.x,this.position.y,this.width,this.height)}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.position.y+this.height+this.velocity.y<=h.height?(this.position.y<0&&(this.position.y=0,this.velocity.y=m),this.velocity.y+=m):this.velocity.y=0,this.position.x<this.width&&(this.position.x=this.width),this.position.x>=h.width-this.width*2&&(this.position.x=h.width-this.width*2)}}class T{constructor(n,p){this.position={x:n,y:p},this.velocity={x:0,y:0},this.width=s(40),this.height=s(40),this.color="red",this.speed=1}draw(){l.fillStyle=this.color,l.fillRect(this.position.x,this.position.y,this.width,this.height)}update(n,p){const i=n-this.position.x,c=Math.abs(i);c>1?this.velocity.x=i/c*this.speed:this.velocity.x=0,this.velocity.y+=m,this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.draw()}}class M{constructor(n,p){this.position={x:n,y:p},this.width=200,this.height=s(40),this.color=["blue","white","orange"],this.currentColorIndex=Math.floor(Math.random()*this.color.length),this.framrate=0}draw(){l.fillStyle="blue",l.fillRect(this.position.x,this.position.y,this.width,this.height)}}class R{constructor(n,p,i){this.position={x:n,y:p},this.width=s(40),this.height=s(70),this.claimed=!1}draw(){l.fillStyle="gold",l.fillRect(this.position.x,this.position.y,this.width,this.height)}claim(){this.width=0,this.height=0,this.position.y=1/0,this.claimed=!0}}const t=new F,o=new T(1400,h.height-s(40)),q=[{x:500,y:s(450)},{x:700,y:s(400)},{x:850,y:s(350)},{x:900,y:s(350)},{x:1050,y:s(150)},{x:2500,y:s(450)},{x:2900,y:s(400)},{x:3150,y:s(350)},{x:3900,y:s(450)},{x:4200,y:s(400)},{x:4400,y:s(200)},{x:4700,y:s(150)}],g=q.map(e=>new M(e.x,e.y));let a=!0;const I=[{x:1170,y:s(80),z:1},{x:2900,y:s(330),z:2},{x:4800,y:s(80),z:3}],w=I.map(e=>new R(e.x,e.y,e.z));document.body.classList.add("playing");const b=()=>{const e=performance.now(),n=e-C;f++,n>=1e3&&(E=f,f=0,C=e,console.log(`FPS: ${E}`)),requestAnimationFrame(b),l.clearRect(0,0,h.width,h.height),g.forEach(i=>i.draw()),w.forEach(i=>i.draw()),t.update(),o.update(t.position.x,t.position.y),x.right.pressed&&t.position.x<s(400)?t.velocity.x=5:x.left.pressed&&t.position.x>s(100)?t.velocity.x=-5:(t.velocity.x=0,x.right.pressed&&d?(g.forEach(i=>i.position.x-=5),w.forEach(i=>i.position.x-=5)):x.left.pressed&&d&&(g.forEach(i=>i.position.x+=5),w.forEach(i=>i.position.x+=5))),g.forEach(i=>{const c=t.position.y+t.velocity.y;t.velocity.y>=0;const y=t.position.x+t.width>i.position.x&&t.position.x<i.position.x+i.width&&t.position.y+t.height<=i.position.y&&c+t.height>=i.position.y;y?(t.velocity.y=0,t.position.y=i.position.y-t.height,a=!0):t.position.y+t.height===i.position.y&&t.position.x+t.width>i.position.x&&t.position.x<i.position.x+i.width&&(a=!0),t.position.y+t.height>i.position.y&&t.position.y<i.position.y+i.height&&t.position.x+t.width>i.position.x&&t.position.x<i.position.x+i.width&&!y&&(t.position.x<i.position.x?t.position.x=i.position.x-t.width:t.position.x=i.position.x+i.width),t.position.y>=i.position.y+i.height&&c<=i.position.y+i.height&&t.position.x+t.width>i.position.x&&t.position.x<i.position.x+i.width&&(t.velocity.y=1,t.position.y=i.position.y+i.height+1,a=!1)}),t.position.y+t.height>=h.height&&t.velocity.y===0&&(a=!0),o.position.y+o.height>=h.height&&(o.velocity.y=0,o.position.y=h.height-o.height),g.forEach(i=>{const c=o.position.y+o.velocity.y,y=o.position.x+o.width>i.position.x&&o.position.x<i.position.x+i.width&&o.position.y+o.height<=i.position.y&&c+o.height>=i.position.y;y&&(o.velocity.y=0,o.position.y=i.position.y-o.height),o.position.y+o.height>i.position.y&&o.position.y<i.position.y+i.height&&o.position.x+o.width>i.position.x&&o.position.x<i.position.x+i.width&&!y&&(o.position.x<i.position.x?o.position.x=i.position.x-o.width:o.position.x=i.position.x+i.width),o.position.y>=i.position.y+i.height&&c<=i.position.y+i.height&&o.position.x+o.width>i.position.x&&o.position.x<i.position.x+i.width&&(o.velocity.y=1,o.position.y=i.position.y+i.height+1)}),t.position.x<o.position.x+o.width&&t.position.x+t.width>o.position.x&&t.position.y<o.position.y+o.height&&t.position.y+t.height>o.position.y&&(S("You've been caught!","Game Over!"),d=!1,t.velocity.x=0,t.velocity.y=0),w.forEach((i,c,y)=>{[t.position.x>=i.position.x,t.position.y>=i.position.y,t.position.y+t.height<=i.position.y+i.height,d,t.position.x-t.width<=i.position.x-i.width+t.width*.9,c===0||y[c-1].claimed].every(Boolean)&&(i.claim(),c===y.length-1&&(d=!1,S("You have reached the last checkpoint!🔥","BOOM-SHACKA-LAKA!"),u("ArrowRight",0,!1)))})},x={right:{pressed:!1},left:{pressed:!1}},u=(e,n,p)=>{if(!d){t.velocity.x=0,t.velocity.y=0;return}switch(e){case"ArrowLeft":x.left.pressed=p,n===0&&(t.velocity.x=n),t.velocity.x-=n;break;case"ArrowUp":case" ":case"Spacebar":(a||t.velocity.y===0)&&(t.velocity.y=-8);break;case"ArrowRight":x.right.pressed=p,n===0&&(t.velocity.x=n),t.velocity.x+=n;break}},O=()=>{h.style.display="block",H.style.display="none",r.volume=.5,r.play().catch(e=>{console.warn("Autoplay failed — user interaction might be required."),console.error(e)}),b()},S=(e,n="Checkpoint!")=>{k.style.display="block",z.textContent=n,L.textContent=e,d&&setTimeout(()=>k.style.display="none",2e3)};A.addEventListener("click",O);window.addEventListener("keydown",({key:e})=>{u(e,8,!0)});window.addEventListener("keyup",({key:e})=>{u(e,0,!1)});
