import{e as g,i as B,k as h,o as n,c,b as k,q as $,g as u,s as y,y as C,v as R,N as w,l as L,_ as T,F as b,J as M,t as j,x as q}from"./app.0d75901e.js";const E=["src"],N=["innerHTML"],V=g({props:{info:{type:Object,required:!1}},setup(i){const f=i;let o=null;const a=B(()=>(f.info&&(o=f.info),o)),l=B(()=>!!f.info),d=h(null),m=h(!1),v=()=>{var e,r;m.value=((r=(e=R(d))==null?void 0:e.scrollTop)!=null?r:0)>.1};return(e,r)=>(n(),c("div",{id:"content-mask",class:y({show:u(l)})},[k("figure",{class:"content",ref:(s,t)=>{t.content=s,d.value=s},onScroll:v},[$(e.$slots,"top"),u(a)?(n(),c("img",{key:0,src:u(a).icon,alt:"icon",class:y(["icon",{hide:m.value}])},null,10,E)):C("",!0),u(a)?(n(),c("div",{key:1,innerHTML:u(a).main},null,8,N)):C("",!0),$(e.$slots,"bottom")],544)],2))}}),S=["href"],x=["src","alt"],F=g({props:{info:{type:Object,required:!0}},setup(i){return(f,o)=>(n(),c("a",{href:"#"+i.info.head,class:y(["item",i.info.classes])},[k("img",{src:i.info.icon,alt:i.info.head},null,8,x)],10,S))}}),H={key:0},O={class:"list-container"},z=g({setup(i,{expose:f}){const o=w();let a=h(o.value[0].infos[0]),l=h(null);const d=e=>{l.value===e?(l.value=null,e&&(e.classes.selected=!1)):(l.value&&(l.value.classes.selected=!1),l.value=e,e&&(e.classes.selected=!0)),a.value=e},m=e=>{l.value===null&&(a.value=e)},v=h(null);return L(()=>{for(const r of o.value)for(const s of r.infos)s.classes.selected=!1,s.classes.fade=!1;const e=document.URL.split("#");if(e.length>1){const r=decodeURI(e[1]);for(const s of o.value)for(const t of s.infos)if(t.head===r){d(t);const _=R(T().refs[t.head]),I=document.documentElement.getBoundingClientRect(),p=_.getBoundingClientRect();v.value.scrollTo(p.left-I.left-p.width/2,p.top-I.top-p.height/2);break}}}),f({currentInfo:a,selectedInfo:l,click:d}),(e,r)=>(n(),c("figure",{class:"list",ref:(s,t)=>{t.root=s,v.value=s}},[$(e.$slots,"default",{},()=>[(n(!0),c(b,null,M(u(o),s=>(n(),c("div",{key:s},[u(o).length>1?(n(),c("h2",H,j(s.name),1)):C("",!0),k("div",O,[(n(!0),c(b,null,M(s.infos,t=>(n(),q(F,{info:t,key:t,ref:t.head,onClick:_=>d(t),onMouseover:_=>m(t)},null,8,["info","onClick","onMouseover"]))),128))])]))),128))])],512))}});export{V as _,z as a};
