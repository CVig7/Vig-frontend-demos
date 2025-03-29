import"./modulepreload-polyfill-B5Qt9EMX.js";const w=document.getElementById("initiate-game-button"),n=document.getElementById("game-canvas"),g=document.querySelector(".game-intro-screen"),d=document.querySelector(".checkpoint-message-screen"),v=document.querySelector(".checkpoint-message-screen > p"),h=n.getContext("2d");n.width=innerWidth;n.height=innerHeight;const a=.5;let c=!0;const o=i=>innerHeight<500?Math.ceil(i/500*innerHeight):i;class m{constructor(){this.position={x:o(10),y:o(400)},this.velocity={x:0,y:0},this.width=o(40),this.height=o(40)}draw(){h.fillStyle="#99c9ff",h.fillRect(this.position.x,this.position.y,this.width,this.height)}update(){this.draw(),this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.position.y+this.height+this.velocity.y<=n.height?(this.position.y<0&&(this.position.y=0,this.velocity.y=a),this.velocity.y+=a):this.velocity.y=0,this.position.x<this.width&&(this.position.x=this.width),this.position.x>=n.width-this.width*2&&(this.position.x=n.width-this.width*2)}}class u{constructor(e,s){this.position={x:e,y:s},this.width=200,this.height=o(40)}draw(){h.fillStyle="#acd157",h.fillRect(this.position.x,this.position.y,this.width,this.height)}}class k{constructor(e,s,f){this.position={x:e,y:s},this.width=o(40),this.height=o(70),this.claimed=!1}draw(){h.fillStyle="#f1be32",h.fillRect(this.position.x,this.position.y,this.width,this.height)}claim(){this.width=0,this.height=0,this.position.y=1/0,this.claimed=!0}}const t=new m,E=[{x:500,y:o(450)},{x:700,y:o(400)},{x:850,y:o(350)},{x:900,y:o(350)},{x:1050,y:o(150)},{x:2500,y:o(450)},{x:2900,y:o(400)},{x:3150,y:o(350)},{x:3900,y:o(450)},{x:4200,y:o(400)},{x:4400,y:o(200)},{x:4700,y:o(150)}],l=E.map(i=>new u(i.x,i.y)),b=[{x:1170,y:o(80),z:1},{x:2900,y:o(330),z:2},{x:4800,y:o(80),z:3}],p=b.map(i=>new k(i.x,i.y,i.z)),x=()=>{requestAnimationFrame(x),h.clearRect(0,0,n.width,n.height),l.forEach(i=>i.draw()),p.forEach(i=>i.draw()),t.update(),y.right.pressed&&t.position.x<o(400)?t.velocity.x=5:y.left.pressed&&t.position.x>o(100)?t.velocity.x=-5:(t.velocity.x=0,y.right.pressed&&c?(l.forEach(i=>i.position.x-=5),p.forEach(i=>i.position.x-=5)):y.left.pressed&&c&&(l.forEach(i=>i.position.x+=5),p.forEach(i=>i.position.x+=5))),l.forEach(i=>{if([t.position.y+t.height<=i.position.y,t.position.y+t.height+t.velocity.y>=i.position.y,t.position.x>=i.position.x-t.width/2,t.position.x<=i.position.x+i.width-t.width/3].every(Boolean)){t.velocity.y=0;return}[t.position.x>=i.position.x-t.width/2,t.position.x<=i.position.x+i.width-t.width/3,t.position.y+t.height>=i.position.y,t.position.y<=i.position.y+i.height].every(Boolean)&&(t.position.y=i.position.y+t.height,t.velocity.y=a)}),p.forEach((i,e,s)=>{[t.position.x>=i.position.x,t.position.y>=i.position.y,t.position.y+t.height<=i.position.y+i.height,c,t.position.x-t.width<=i.position.x-i.width+t.width*.9,e===0||s[e-1].claimed].every(Boolean)&&(i.claim(),e===s.length-1&&(c=!1,A("You reached the final checkpoint!"),r("ArrowRight",0,!1)))})},y={right:{pressed:!1},left:{pressed:!1}},r=(i,e,s)=>{if(!c){t.velocity.x=0,t.velocity.y=0;return}switch(i){case"ArrowLeft":y.left.pressed=s,e===0&&(t.velocity.x=e),t.velocity.x-=e;break;case"ArrowUp":case" ":case"Spacebar":t.velocity.y-=8;break;case"ArrowRight":y.right.pressed=s,e===0&&(t.velocity.x=e),t.velocity.x+=e;break}},S=()=>{n.style.display="block",g.style.display="none",x()},A=i=>{d.style.display="block",v.textContent=i,c&&setTimeout(()=>d.style.display="none",2e3)};w.addEventListener("click",S);window.addEventListener("keydown",({key:i})=>{r(i,8,!0)});window.addEventListener("keyup",({key:i})=>{r(i,0,!1)});
