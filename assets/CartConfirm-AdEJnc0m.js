import{_ as C,m as k,r as b,o as i,c as l,d as f,a as t,w as o,F as y,g as L,b as d,t as _,j as x,k as w}from"./index-mwkYsuf-.js";import{T as M}from"./ToastMessage-YDSysd-y.js";import{u as T}from"./statusStore-2FA9jvuX.js";var V={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"getmarried",BASE_URL:"/vite_week8/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:c,VITE_PATH:u}=V,$={data(){return{isLoading:!1,remoteCarts:[]}},components:{ToastMessages:M},methods:{...k(T,["pushMessage"]),getCarts(){this.isLoading=!0,this.$http(`${c}/api/${u}/cart`).then(e=>{this.isLoading=!1,this.remoteCarts=e.data.data}).catch(e=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"錯誤訊息",content:e.response.data.message})})},delCart(e){this.isLoading=!0,this.$http.delete(`${c}/api/${u}/cart/${e}`).then(()=>{this.isLoading=!1,this.getCarts()}).catch(n=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"錯誤訊息",content:n.response.data.message})})},deleteCarts(){this.isLoading=!0,this.$http.delete(`${c}/api/${u}/carts`).then(e=>{this.isLoading=!1,this.pushMessage({style:"success",title:"成功訊息",content:e.data.message}),this.getCarts()}).catch(e=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"錯誤訊息",content:e.response.data.message})})},changeCartQty(e,n=1){const p={product_id:e.id,qty:n};this.isLoading=!0,this.$http.put(`${c}/api/${u}/cart/${e.id}`,{data:p}).then(()=>{this.isLoading=!1,this.getCarts()}).catch(g=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"錯誤訊息",content:g.response.data.message})})},backProducts(){this.$router.push("/productsPage")},fillInInfo(){this.$router.push("/carts/fillIn")}},mounted(){this.getCarts()}},E={class:"row justify-content-center"},q={class:"col-lg-10"},P={class:"card me-auto border border-lilac",style:{background:"#ffeeff"}},U={class:"card-body"},D={class:"text-end p-3"},R={class:"table-responsive"},S={class:"table align-middle text-nowrap"},A=t("thead",null,[t("tr",{class:"text-center"},[t("th",null,"縮圖"),t("th",null,"商品"),t("th",{width:"300px;"},"數量"),t("th",null,"單價")])],-1),B={style:{"max-width":"200px"}},j=["src"],N={class:"input-group input-group-sm"},Q=["onClick"],F=t("i",{class:"bi bi-dash-lg"},null,-1),H=[F],O=["onClick"],z=t("i",{class:"bi bi-trash3-fill text-danger"},null,-1),G=[z],J=["onUpdate:modelValue"],K=["onClick"],W=t("i",{class:"bi bi-plus-lg"},null,-1),X=[W],Y={colspan:"4",class:"text-end fw-bold fs-4 p-4"},Z=t("i",{class:"bi bi-currency-dollar"},null,-1),I={class:"d-flex justify-content-between"},tt=t("i",{class:"bi bi-arrow-left"},null,-1),st=t("i",{class:"bi bi-arrow-right"},null,-1);function et(e,n,p,g,h,a){const m=b("VLoading"),v=b("ToastMessages");return i(),l(y,null,[f(m,{active:h.isLoading},null,8,["active"]),f(v),t("div",E,[t("div",q,[t("div",P,[t("div",U,[t("div",D,[t("button",{class:"btn btn-outline-danger",onClick:n[0]||(n[0]=o((...s)=>a.deleteCarts&&a.deleteCarts(...s),["prevent"])),type:"button"},"刪除購物車")]),t("div",R,[t("table",S,[A,t("tbody",null,[(i(!0),l(y,null,L(h.remoteCarts.carts,s=>(i(),l("tr",{key:s.id,class:"text-center"},[t("td",B,[t("div",null,[t("img",{src:s.product.imageUrl,class:"img-thumbnail"},null,8,j)])]),t("th",null,[t("span",null,_(s.product.category),1)]),t("td",null,[t("div",N,[s.qty>1?(i(),l("button",{key:0,class:"btn btn-outline-lilac p-1",type:"button",onClick:o(r=>{s.qty--,a.changeCartQty(s,s.qty)},["prevent"])},H,8,Q)):(i(),l("button",{key:1,class:"btn btn-outline-danger p-1",type:"button",onClick:o(r=>a.delCart(s.id),["prevent"])},G,8,O)),x(t("input",{type:"number",class:"form-control bg-transparent shadow-none text-center",readonly:"","onUpdate:modelValue":r=>s.qty=r},null,8,J),[[w,s.qty]]),t("button",{class:"btn btn-outline-lilac p-1",type:"button",onClick:o(r=>{s.qty++,a.changeCartQty(s,s.qty)},["prevent"])},X,8,K)])]),t("td",null,"$"+_(s.total),1)]))),128))]),t("tfoot",null,[t("tr",null,[t("td",Y,[t("span",null,[d(" 總價 "),Z,d(" "+_(h.remoteCarts.total),1)])])])])]),t("div",I,[t("button",{class:"btn btn-lilac",type:"button",onClick:n[1]||(n[1]=o((...s)=>a.backProducts&&a.backProducts(...s),["prevent"]))},[tt,d(" 繼續購物 ")]),t("button",{class:"btn btn-lilac",type:"button",onClick:n[2]||(n[2]=o((...s)=>a.fillInInfo&&a.fillInInfo(...s),["prevent"]))},[d(" 確認結帳 "),st])])])])])])])],64)}const it=C($,[["render",et]]);export{it as default};
