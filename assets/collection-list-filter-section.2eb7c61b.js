import"./index.592a6222.js";import"./index.c90fdd2b.js";import"./_commonjsHelpers.de833af9.js";const C=e=>{const o=e.querySelector(".button_previous"),n=e.querySelector(".button_next"),s=e.querySelector(".products_container"),i=()=>{const f=s.scrollLeft===0,l=s.scrollLeft+s.clientWidth>=s.scrollWidth;o.style.opacity=f?0:1,n.style.opacity=l?0:1};s.addEventListener("scroll",i),o.addEventListener("click",()=>{const f=-s.offsetWidth;s.scrollTo({left:s.scrollLeft+f,behavior:"smooth"})}),n.addEventListener("click",()=>{const f=s.offsetWidth;s.scrollTo({left:s.scrollLeft+f,behavior:"smooth"})}),i(),s.scrollWidth>s.clientWidth&&(n.style.opacity=1),n.style.opacity=1},w=(e,o,n,s,i)=>{const f=e.querySelector(".products_container"),l={};o.forEach(d=>{let g=d.variant;g||(g=d.title),l[g]||(l[g]=[]),l[g].push(d)});for(const d in l)l[d].forEach((r,v)=>{const y=document.createElement("div");y.classList.add("product_card");const m=c=>{for(const t of l[d])if(t.color===c)return t.url;return"#"};console.log(r),y.innerHTML=`
                <a class="product_images_container" href="${r.url}">
                    <img src="${r.front_image}" alt="" class="top">
                    <img src="${r.back_image}" alt="" class="bottom">
                </a>
                ${r.tags&&r.tags.length>0?`<span class="product_badge">${r.tags.map((c,t)=>`<span style="color:${c.color}; margin-left:${t===0?"0":"0.42vw"};">${c.label}</span>`).join("")}</span>`:'<span class="product_badge"></span>'}
                <a class="product_title" href="${r.url}" style="text-decoration:none;color:${n};">${r.title}</a>
                ${r.data_rating!=""?`<a href= "${r.url}">
                <div
                  class="loox-rating"
                  data-id="${r.id}"
                  data-rating="${r.data_rating}"
                  data-raters="${r.data_raters}"
                  data-pattern="[count] Reviews"
                  style="font-size: 15px"
                >
                </div>
              </a>`:""}
                <div class="bottom_container">
                ${i.map(c=>`<a class="color_product" href="${m(c)}" style="background-color: ${c}"></a>`).join("")}
                <a class="see_more" style="color:${s};text-decoration:none;" href="${r.url}"  >See more</a>
                <div class="prices_container"><span class="price_product_compare">${e.getAttribute("showVariants")==="all_variants"?r.compare_at_price:e.getAttribute("curreny")+(r.variants[0].compare_at_price/100).toFixed(2)}</span><span class="price_product">${r.price}</span></div>
                </div>
            `,f.appendChild(y)})},S=e=>{const o=e.querySelector(".products_container"),n=o.classList.contains("compact")?"compact":"standard";window.innerWidth<=768&&window.innerWidth>=430?(o.style.height="fit-content",o.style.gap="3%",o.querySelectorAll(".product_card").forEach(i=>{i.style.width="90%"})):window.innerWidth<430?(o.style.height="fit-content",o.style.gap="3%",o.querySelectorAll(".product_card").forEach(i=>{i.style.width="85%"})):n=="compact"&&window.innerWidth>650&&(o.querySelectorAll(".product_images_container").forEach(i=>{i.style.height=80/1.5+"vh"}),o.style.gap="2%",o.querySelectorAll(".product_card").forEach(i=>{i.style.width="23%"}))},L=(e,o,n,s,i)=>{const f=`
    #${e.id} .action_button_collection_filter:hover{
        background-color: ${o};
        border: 2px solid ${n};
        color:${i};
    }
    #${e.id} .action_button_collection_filter{
        background-color: ${n};
        border: 2px solid ${n};
        color:${s};
    }
  `,l=document.createElement("style");l.textContent=f,document.head.appendChild(l)},q=(e,o)=>{const n=e.querySelector(".colors_picker_wrapper");o.forEach(s=>{const i=document.createElement("div");i.classList.add("color_container"),i.innerHTML='<div class="color" style="background-color: '+s+'"></div>',n.appendChild(i)})},T=(e,o)=>{const n=e.querySelector(".collection_tabs_container");o.forEach(s=>{const i=document.createElement("div");i.classList.add("collection_tab"),i.style.color=typesColor;const f=`
        .collection_tab {
            border-bottom: 2px solid transparent;
          }
        .collection_tab:hover {
          border-bottom: 2px solid ${typesColor};
        }
        .collection_tab_active{
            border-bottom: 2px solid ${typesColor};
        }
      `,l=document.createElement("style");l.textContent=f,document.head.appendChild(l),i.innerHTML=s,n.appendChild(i)})},P=(e,o,n,s,i,f,l)=>{let d=e.querySelectorAll(".collection_tab");d.forEach((g,r)=>{g.addEventListener("click",()=>{l==uniqueTypesFilter[r]?(l="",d.forEach((c,t)=>{c.style.borderBottom=t===r?"0px solid #152f4e":"none"})):(l=uniqueTypesFilter[r],d.forEach((c,t)=>{c.style.borderBottom=t===r?"2px solid #152f4e":"none"}));const v=s.filter(c=>(o===""||c.color===o)&&(l===""||c.type===l)),y=e.querySelector(".products_container");y.innerHTML="";const m={};v.forEach(c=>{let t=c.variant;t||(t=c.title),m[t]||(m[t]=[]),m[t].push(c)});for(const c in m)m[c].forEach((a,u)=>{const E=document.createElement("div");E.classList.add("product_card");const _=h=>{for(const b of m[c])if(b.color===h)return b.url;return"#"};E.innerHTML=`
                        <a class="product_images_container" href="${a.url}">
                            <img src="${a.front_image}" alt="" class="top">
                            <img src="${a.back_image}" alt="" class="bottom">
                        </a>
                        ${a.tags&&a.tags.length>0?`<span class="product_badge">${a.tags.map((h,b)=>`<span style="color:${h.color}; margin-left:${b===0?"0":"0.42vw"};">${h.label}</span>`).join("")}</span>`:'<span class="product_badge"></span>'}
                        <a class="product_title" href="${a.url}" style="text-decoration:none;color:${i};">${a.title}</a>
                        ${a.data_rating!=""?`<a href= "${a.url}">
                        <div
                          class="loox-rating"
                          data-id="${a.id}"
                          data-rating="${a.data_rating}"
                          data-raters="${a.data_raters}"
                          data-pattern="[count] Reviews"
                          style="font-size: 15px"
                        >
                        </div>
                      </a>`:""}
                <div class="bottom_container">
                ${n.map(h=>`<a class="color_product" href="${_(h)}" style="background-color: ${h}"></a>`).join("")}
                    <a class="see_more" style="color:${f};text-decoration:none;" href="${a.url}"  >See more</a>
                    <div class="prices_container"><span class="price_product_compare">${e.getAttribute("showVariants")==="all_variants"?a.compare_at_price:e.getAttribute("curreny")+(a.variants[0].compare_at_price/100).toFixed(2)}</span><span class="price_product">${a.price}</span></div>
                </div>
                    `,y.appendChild(E)}),(y.classList.contains("compact")?"compact":"standard")=="compact"&&window.innerWidth>650&&(y.querySelectorAll(".product_images_container").forEach(u=>{u.style.height=80/1.5+"vh"}),y.style.gap="2%",y.querySelectorAll(".product_card").forEach(u=>{u.style.width="23%"}))})})},H=(e,o,n,s,i,f,l)=>{let d=e.querySelectorAll(".color_container");d.forEach((g,r)=>{g.addEventListener("click",()=>{let v=e.querySelector(".title_section"),y=e.querySelector(".button_previous"),m=e.querySelector(".button_next");o===n[r]?(g.style.border="",o="",v&&(v.style.color="black"),m.style.backgroundColor="black",y.style.backgroundColor="black",d.forEach((a,u)=>{a.style.border=u===r?`0px solid ${n[r]}`:"none"})):(v&&(v.style.color=n[r]),m.style.backgroundColor=n[r],y.style.backgroundColor=n[r],o=n[r],d.forEach((a,u)=>{a.style.border=u===r?`1px solid ${n[r]}`:"none"}));const c=s.filter(a=>{const u=a.color===o||o==="",E=a.type===l||l==="";return u&&E}),t=e.querySelector(".products_container");t.innerHTML="";const p={};c.forEach(a=>{let u=a.variant;u||(u=a.title),p[u]||(p[u]=[]),p[u].push(a)});for(const a in p)p[a].forEach((_,h)=>{const b=document.createElement("div");b.classList.add("product_card");const x=$=>{for(const A of p[a])if(A.color===$)return A.url;return"#"};b.innerHTML=`
                        <a class="product_images_container" href="${_.url}">
                            <img src="${_.front_image}" alt="" class="top">
                            <img src="${_.back_image}" alt="" class="bottom">
                        </a>
                        ${_.tags&&_.tags.length>0?`<span class="product_badge">${_.tags.map(($,A)=>`<span style="color:${$.color}; margin-left:${A===0?"0":"0.42vw"};">${$.label}</span>`).join("")}</span>`:'<span class="product_badge"></span>'}
                        <a class="product_title" href="${_.url}" style="text-decoration:none;color:${i};">${_.title}</a>
                        ${_.data_rating!=""?`<a href= "${_.url}">
                        <div
                          class="loox-rating"
                          data-id="${_.id}"
                          data-rating="${_.data_rating}"
                          data-raters="${_.data_raters}"
                          data-pattern="[count] Reviews"
                          style="font-size: 15px"
                        >
                        </div>
                      </a>`:""}
                <div class="bottom_container">
                ${n.map($=>`<a class="color_product" href="${x($)}" style="background-color: ${$}"></a>`).join("")}
                <a class="see_more" style="color:${f};text-decoration:none;" href="${_.url}"  >See more</a>
                    <div class="prices_container"><span class="price_product_compare">${e.getAttribute("showVariants")==="all_variants"?_.compare_at_price:e.getAttribute("curreny")+(_.variants[0].compare_at_price/100).toFixed(2)}</span><span class="price_product">${_.price}</span></div>
                </div>
                    `,t.appendChild(b)}),(t.classList.contains("compact")?"compact":"standard")=="compact"&&window.innerWidth>650&&(t.querySelectorAll(".product_images_container").forEach(h=>{h.style.height=80/1.5+"vh"}),t.style.gap="2%",t.querySelectorAll(".product_card").forEach(h=>{h.style.width="23%"}))})})},z=e=>{e.getAttribute("typescolor");let o=e.getAttribute("productCardPrimaryColor"),n=e.getAttribute("productCardSecondaryColor"),s=e.getAttribute("ctaHoverBg"),i=e.getAttribute("ctaHoverColor"),f=e.getAttribute("ctaNoHoverBg"),l=e.getAttribute("ctaNoHoverColor"),d=JSON.parse(e.querySelector('script[type="application/json"]').innerHTML);d.forEach(function(t){if(Array.isArray(t.tags)&&t.tags.length>0&&Array.isArray(t.tags)&&t.tags.length<3){var p=t.tags[0];t.tags=p.filter(function(a){return typeof a=="string"&&a.includes(",")}).map(function(a){var u=a.split(",");return{label:u[0],color:u[1]}})}});const g=[];d.forEach(t=>{e.getAttribute("showVariants")==="all_variants"&&t.variants&&Array.isArray(t.variants)?t.variants.forEach(p=>{g.push({...t,title:t.title+" - "+p.title.split("/")[0],price:e.getAttribute("curreny")+" "+(p.price/100).toFixed(2),compare_at_price:e.getAttribute("curreny")+" "+(p.compare_at_price/100).toFixed(2),url:t.url,variant_id:p.id,front_image:t.front_image,back_image:t.back_image})}):g.push(t)}),d=g,d.forEach(function(t){if(Array.isArray(t.type_tag)&&t.type_tag.length>0){var p=t.type_tag[0];t.type_tag=p.filter(function(a){return typeof a=="string"&&a.includes(",")}).map(function(a){var u=a.split(",");return{collection:u[0],type:u[1]}})}});let r=[...new Set(d.map(t=>t.color))],v=[...new Set(d.flatMap(t=>{if(t.type_tag&&Array.isArray(t.type_tag)){const p=t.type_tag.filter(a=>a.collection===t.collection);return p.map(a=>t.type=a.type),p.map(a=>a.type)}return[]}))],y="",m="",c={};d.forEach(t=>{let p=t.variant;p||(p=t.title),c[p]||(c[p]=[]),c[p].push(t)}),C(e),w(e,d,o,n,r),S(e),window.addEventListener("resize",()=>{S(e)}),L(e,s,f,l,i),q(e,r),T(e,v),H(e,m,r,d,o,n,y),P(e,m,r,d,o,n,y)};export{z as default};
