!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(function(){t.setAttribute("disabled","true"),e.removeAttribute("disabled"),setTimer=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(){t.setAttribute("disabled","true"),e.removeAttribute("disabled"),clearInterval(setTimer)}))}();
//# sourceMappingURL=01-color-switcher.63fbdccf.js.map
