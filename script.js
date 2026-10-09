const P=[
{id:1,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTInGsHOz9opXJ40zXuVGEyXZ36ioFkmMgFH9TeWXfOgA&s=10",n:"Mini 4 Pro",c:"drone",p:11500000,i:"airplane",d:"Drone under 250g with 4K HDR video and obstacle detection.",s:["Weight 249 g","Video 4K/60 fps","Battery 34 minutes"],b:"Best Seller"},
{id:2,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4pTVBcP7zPyShxV5VQy44HvcAoE7xjBBRldi6lO1v5g&s=10",n:"Air 3",c:"drone",p:16900000,i:"send",d:"Dual-camera drone for landscapes and portraits.",s:["Dual Camera","Video 4K/100 fps","Battery 46 minutes"]},
{id:3,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-lFzrnjHRxi422V0NRNNByjykkYb32O8lxFsKv871kQ&s=10",n:"Pocket 3",c:"camera",p:7900000,i:"camera-video",d:"Compact gimbal camera with 1-inch sensor.",s:["1-inch Sensor","Video 4K/120 fps","Rotating Screen"],b:"New"},
{id:4,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqQDMeh3GrIavPZYX8ppnkg6yl_5wu4JU0JKeKqQFjA&s=10",n:"Action 5 Pro",c:"camera",p:5600000,i:"lightning-charge",d:"Waterproof action camera for adventures.",s:["Waterproof to 20 m","Video 4K/120 fps","Battery 4 hours"]},
{id:5,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCwa9sXkuEllctcAs_-fArspglC1A_8UGF9tjM6Lfew&s=10",n:"RS 4 Gimbal Stabilizer",c:"accessory",p:6700000,i:"gear",d:"3-axis gimbal for mirrorless cameras.",s:["Load Capacity 3 kg","Battery Life 12 hours","Touchscreen"]},
{id:6,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6KvVpilvo3MatVQ1JCsJDefKPbSm9T68-TBKEq82Mw&s=10",n:"Mic 2",c:"accessory",p:4100000,i:"mic",d:"Wireless microphone with internal recording.",s:["Range 250 m","Recording 32-bit","Windscreen Included"]},
{id:7,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mvgH1yID5Vd9a8Ahb5_v1YUUX4UbbSR5SZzGm9Zu5A&s=10",n:"RC 2 Remote",c:"accessory",p:3300000,i:"joystick",d:"Remote with built-in screen for drones.",s:["Screen 5,5 inch","Battery 4 Hours","Transmission 1080p"]},
{id:8,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfu_Zgyly2IDA9L4286H98-_e-3q6bmgx2ZNlLEpgwA&s=10",n:"Neo",c:"drone",p:2900000,i:"emoji-smile",d:"Mini drone for vlogging and aerial selfies.",s:["Weight 135 g","Gesture Control","Video 4K"],b:"Discount"}
];
const rp=n=>"Rp"+n.toLocaleString("id-ID"),cart={};
const toastEl=new bootstrap.Toast(document.getElementById("toastEl"));
function toast(t){document.getElementById("toastBody").textContent=t;toastEl.show()}
function render(cat="all"){
  document.getElementById("grid").innerHTML=P.filter(x=>cat=="all"||x.c==cat).map(x=>`
  <div class="col-6 col-lg-3"><div class="card card-p h-100">
    <div class="card-img-box position-relative"><img src="${x.img}" alt="${x.n}" loading="lazy" referrerpolicy="no-referrer">${x.b?`<span class="badge badge-sm text-bg-dark position-absolute top-0 start-0 m-2">${x.b}</span>`:""}</div>
    <div class="card-body d-flex flex-column"><h3 class="h6 fw-bold card-name">${x.n}</h3><p class="small text-secondary mb-2">${rp(x.p)}</p>
    <div class="mt-auto d-flex gap-2"><button class="btn btn-sm btn-outline-dark btn-pill flex-grow-1" onclick="view(${x.id})"> <i class="bi bi-eye"></i> View</button>
    <button class="btn btn-sm btn-dark btn-pill" onclick="add(${x.id})" aria-label=" Add to Cart"><i class="bi bi-bag-plus"></i></button></div></div>
  </div></div>`).join("");
}
document.getElementById("filter").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;
  document.querySelectorAll("#filter .nav-link").forEach(l=>l.classList.remove("active"));
  b.classList.add("active");render(b.dataset.cat);
});
let cur=null;const modal=new bootstrap.Modal("#prodModal");
function view(id){
  cur=P.find(x=>x.id==id);
  mTitle.textContent=cur.n;mDesc.textContent=cur.d;mPrice.textContent=rp(cur.p);
  mIcon.innerHTML=`<i class="bi bi-${cur.i}"></i>`;
  mSpec.innerHTML=cur.s.map(s=>`<li class="list-group-item bg-transparent"><i class="bi bi-check2 text-primary me-2"></i>${s}</li>`).join("");
  modal.show();
}
mAdd.onclick=()=>{add(cur.id);modal.hide()};
function add(id){cart[id]=(cart[id]||0)+1;upd();toast(P.find(x=>x.id==id).n+" added to cart.")}
function del(id){delete cart[id];upd()}
function upd(){
  const ids=Object.keys(cart);let total=0,qty=0;
  cartList.innerHTML=ids.length?ids.map(id=>{const x=P.find(p=>p.id==id),q=cart[id];total+=x.p*q;qty+=q;
    return `<li class="list-group-item d-flex align-items-center gap-3"><i class="bi bi-${x.i} fs-3"></i><div class="flex-grow-1"><div class="fw-semibold">${x.n}</div><small class="text-secondary">${q} x ${rp(x.p)}</small></div><button class="btn btn-sm" onclick="del(${id})" aria-label="Delete"><i class="bi bi-trash"></i></button></li>`}).join("")
    :`<li class="list-group-item text-center text-secondary py-5">Your cart is empty.<br>Select products on the main page.</li>`;
  cartCount.textContent=qty;cartTotal.textContent=rp(total);
  const goal=10000000,pct=Math.min(100,total/goal*100);shipBar.style.width=pct+"%";
  shipTxt.textContent=total>=goal?"You can get free shipping!":"Spend "+rp(goal-total)+" more for free shipping";
}
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el=>new bootstrap.Tooltip(el));
render();upd();

const vm=document.getElementById("videoModal"),yt=document.getElementById("ytFrame");
vm.addEventListener("show.bs.modal",()=>{yt.src="https://www.youtube.com/embed/BNEmDcQr6hk?autoplay=1&rel=0"});
vm.addEventListener("hidden.bs.modal",()=>{yt.src=""});
