!function(){document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelectorAll(".background-list li");setInterval((function(){var e=document.querySelector(".background-list .displayed");e.classList.remove("displayed"),(e.nextElementSibling||t[0]).classList.add("displayed")}),5e3)}));var t=document.querySelectorAll(".play-title");function e(){t.forEach((function(t,e){setTimeout((function(){t.style.transition="transform 0.2s ease-in-out",t.style.transform="translateY(-15px)",setTimeout((function(){t.style.transition="",t.style.transform="translateY(0)"}),200)}),100*e)}))}e(),setInterval((function(){e()}),5e3)}();
//# sourceMappingURL=index.570ef07d.js.map
