window.checkMQ=function(){var e,t=[]
e=[{theName:"mqCore",theQuery:window.matchMedia("screen and (max-width: 599px)")},{theName:"mq600",theQuery:window.matchMedia("screen and (min-width: 600px) and (max-width: 959px)")},{theName:"mq960",theQuery:window.matchMedia("screen and (min-width: 960px) and (max-width: 1199px)")},{theName:"mq1200",theQuery:window.matchMedia("screen and (min-width: 1200px)")}]
var n=function(){for(var t,n=0;n<e.length;n++)e[n].theQuery.matches&&t!==e[n].theName&&(t=e[n].theName)
return d(t),t},a=function(){for(var t=0;t<e.length;t++)e[t].theQuery.addListener(n)},d=function(e){for(var n=0;n<t.length;n++)t[n](e)},i=function(e){t.push(e)},h=function(){return n(),a(),this}
return{init:h,whichMQ:n,changeMQ:a,addFunction:i}}(),"loading"!=document.readyState?checkMQ.init():document.addEventListener?document.addEventListener("DOMContentLoaded",checkMQ.init):document.attachEvent("onreadystatechange",function(){"loading"!=document.readyState&&checkMQ.init()})
