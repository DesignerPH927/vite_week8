import{_ as m,m as g,r,o as p,c as f,a as t,d as o,e as n,w as v,f as u,b as c}from"./index-mwkYsuf-.js";import{u as x}from"./statusStore-2FA9jvuX.js";var L={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"getmarried",BASE_URL:"/vite_week8/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:k}=L,w={methods:{...g(x,["pushMessage"]),logout(){this.$http.post(`${k}/logout`).then(e=>{this.pushMessage({style:"success",title:"登出成功",content:e.data.message}),this.$router.push("/login"),this.$cookies.remove("getMarried")}).catch(e=>{this.pushMessage({style:"danger",title:"登出失敗",content:e.response.data.message}),this.$router.push("/login")})}},mounted(){const e=document.querySelector("#toggle-btn"),i=document.querySelector("#closeBtn"),l=document.querySelector("body");document.querySelectorAll("#routerLink").forEach(s=>{s.addEventListener("click",()=>{s.classList.toggle("adActive"),l.classList.remove("sideBar-toggled")})}),e.addEventListener("click",s=>{s.preventDefault(),l.classList.toggle("sideBar-toggled")}),i.addEventListener("click",()=>{l.classList.remove("sideBar-toggled")})}},y={class:"d-flex overflow-hidden"},B={class:"sideBar vh-100 border-end bg-white d-flex flex-column"},E=u('<div class="px-4 text-center bg-lilac py-2 position-relative"><small class="fw-bold fs-5 text-white">結 <strong class="text-danger fs-4">好</strong> 婚 </small><div class="position-absolute top-15 end-5 closeBtn d-none"><button class="btn btn-outline-danger btn-sm" type="button" id="closeBtn"><i class="bi bi-x-lg fw-bold"></i></button></div></div>',1),V={class:"overflow-auto"},R={class:"productList"},S=t("i",{class:"bi bi-card-list me-2"},null,-1),M=t("i",{class:"bi bi-list-ol me-2"},null,-1),P=t("i",{class:"bi bi-currency-exchange me-2"},null,-1),A=t("i",{class:"bi bi-clipboard-plus-fill me-2"},null,-1),$=t("i",{class:"bi bi-door-open-fill"},null,-1),T=t("small",{class:"fs-5"},"登出",-1),q=[$,T],C={class:"adMain"},D=u('<div class="bg-white w-100 border-bottom border-lilac d-flex align-items-center"><a href="#" class="px-3 py-2 d-inline-block border-end border-lilac" id="toggle-btn"><i class="bi bi-list text-lilac fs-2"></i></a><h3 class="fw-bold fs-2 mb-0 mx-auto"><i class="bi bi-stars"></i> 後台管理 <i class="bi bi-stars"></i></h3></div>',1);function N(e,i,l,_,s,d){const a=r("RouterLink"),b=r("RouterView");return p(),f("div",y,[t("aside",B,[E,t("div",V,[t("ul",R,[t("li",null,[o(a,{to:"/admin/adProducts/adProductList",id:"routerLink"},{default:n(()=>[S,c(" 產品列表 ")]),_:1})]),t("li",null,[o(a,{to:"/admin/adProducts/adOrders",id:"routerLink"},{default:n(()=>[M,c(" 訂單列表 ")]),_:1})]),t("li",null,[o(a,{to:"/admin/adProducts/adCoupons",id:"routerLink"},{default:n(()=>[P,c(" 優惠卷 ")]),_:1})]),t("li",null,[o(a,{to:"/admin/adProducts/adArticle",id:"routerLink"},{default:n(()=>[A,c(" 貼文 ")]),_:1})])])]),t("a",{href:"#",class:"px-4 fs-3 mt-auto py-2 bg-lilac logout text-white",onClick:i[0]||(i[0]=v((...h)=>d.logout&&d.logout(...h),["prevent"]))},q)]),t("div",C,[D,o(b)])])}const U=m(w,[["render",N]]);export{U as default};
