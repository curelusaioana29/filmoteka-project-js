const e=document.querySelector(".movies-container"),t=document.querySelector(".search-movie"),n=t.querySelector("input"),o=async(t,n=1)=>{const o=`https://api.themoviedb.org/3/search/movie?api_key=1d5cb9487b50db9f810f217d59251cf8&query=${t}&page=${n}`;try{const t=await axios.get(o);(t=>{e.innerHTML="",t.forEach((t=>{const n=document.createElement("div");n.classList.add("movie"),n.innerHTML=`<p>${t.title}</p>`,e.appendChild(n)}))})(t.data.results)}catch(e){console.error("Error fetching movies:",e)}};t.addEventListener("submit",(function(e){e.preventDefault(),r()})),n.addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),r())}));const r=()=>{const e=n.value.trim();""!==e&&o(e)};document.addEventListener("DOMContentLoaded",(async()=>{await o("",1)}));
//# sourceMappingURL=index.a1902a1f.js.map
