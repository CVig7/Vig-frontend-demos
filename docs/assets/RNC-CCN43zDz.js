import"./modulepreload-polyfill-B5Qt9EMX.js";const l=document.getElementById("number"),c=document.getElementById("convert-btn"),r=document.getElementById("output");c.addEventListener("click",()=>{const e=+l.value;if(!e){r.innerText="Please enter a valid number";return}if(e<0){r.innerText="Please enter a number greater than or equal to 1";return}if(e>=4e3){r.innerText="Please enter a number less than or equal to 3999";return}const t=s(+l.value);r.innerText=t});const s=e=>{const t=[1e3,900,500,400,100,90,50,40,10,9,5,4,1],a=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];let o="",n=0;for(;e>0;){const u=Math.floor(e/t[n]);e-=u*t[n],o+=a[n].repeat(u),n++}return o};console.log(document.getElementById("attribution"));
