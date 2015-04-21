function inlineSVG(){var e=document.querySelectorAll("img.svg"),t=0
for(t=0;t<e.length;t++){var r=e[t],i=e[t].id,s=e[t].className,l=e[t].src,a=e[t].getAttribute("alt"),n=e[t].getAttribute("width"),o=e[t].getAttribute("height"),u=new XMLHttpRequest
u.open("GET",l,!1),u.send()
var m=u.responseText,b=new DOMParser,A=b.parseFromString(m,"text/xml"),d=A.getElementsByTagName("svg")[0]
if(d.removeAttribute("xmlns:a"),d.removeAttribute("width"),d.removeAttribute("height"),d.removeAttribute("x"),d.removeAttribute("y"),d.removeAttribute("enable-background"),d.removeAttribute("xmlns:xlink"),d.removeAttribute("xml:space"),d.removeAttribute("version"),i&&d.setAttribute("id",i),s&&d.setAttribute("class",s+" replaced-svg"),n&&d.setAttribute("width",n),o&&d.setAttribute("height",o),a){d.setAttribute("aria-labelledby","title"),d.setAttribute("role","img")
var g=document.createElementNS("http://www.w3.org/2000/svg","title"),v=document.createTextNode(a)
g.appendChild(v),d.insertBefore(g,d.firstChild)}r.parentNode.replaceChild(d,r)}}