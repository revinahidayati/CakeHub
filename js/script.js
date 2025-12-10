const products = [
  {id:1,name:'Kue Lapis Legit',price:4000,seller:'Kue Basah Selfina'},
  {id:2,name:'Pisang Bakar Santan',price:5000,seller:'Manis Buah'},
  {id:3,name:'Dadar Gulung',price:2000,seller:'Kupi & Lumer'},
  {id:4,name:'Putu Ayu',price:2000,seller:'Snackies'},
  {id:5,name:'Nagasari',price:3000,seller:'Selfina Rumah'},
  {id:6,name:'Bolu Kukus',price:2000,seller:'Manis Buah'},
  {id:7,name:'Onde-onde',price:2000,seller:'Kupi & Lumer'},
  {id:8,name:'Pisang Coklat',price:1000,seller:'Kue Basah Selfina'}
];

const grid = document.getElementById('productGrid');
const cartBtn = document.getElementById('openCart');
const cartSide = document.getElementById('cartSide');
const cartItemsEl = document.getElementById('cartItems');
const totalAmt = document.getElementById('totalAmt');
let cart = {};
let currentProduct = null;

function renderProducts(){
  grid.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <div class='thumb'>${p.name.split(' ').slice(0,2).join(' ')}</div>
      <div style='flex:1'>
        <div class='meta'><div class='name'>${p.name}</div><div class='price'>Rp ${p.price.toLocaleString()}</div></div>
        <div style='color:var(--muted);font-size:13px'>${p.seller}</div>
      </div>
      <div style='display:flex;gap:8px;justify-content:flex-end'>
        <button class='add' onclick='openModal(${p.id})'>Lihat</button>
      </div>
    `;
    grid.appendChild(el);
  })
}

function openModal(id){
  const p = products.find(x=>x.id===id);
  currentProduct = p;
  document.getElementById('mdName').innerText = p.name;
  document.getElementById('mdSeller').innerText = 'oleh ' + p.seller;
  document.getElementById('mdPrice').innerText = 'Rp ' + p.price.toLocaleString();
  document.getElementById('modal').style.display = 'flex';
}
function closeModal(){document.getElementById('modal').style.display='none'}

function addToCart(p){
  if(!cart[p.id]) cart[p.id] = {...p, qty:0};
  cart[p.id].qty += 1;
  updateCart();
  closeModal();
}

function updateCart(){
  const keys = Object.keys(cart);
  cartItemsEl.innerHTML = '';
  if(keys.length===0){cartItemsEl.innerText='Tidak ada item';cartBtn.innerText='Keranjang (0)';totalAmt.innerText='0';return}
  let total = 0;
  keys.forEach(k=>{
    const it = cart[k];
    total += it.price * it.qty;
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML = `<div style='width:64px;height:64px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center'>${it.name.split(' ')[0]}</div>
      <div style='flex:1'>
        <div style='font-weight:700'>${it.name}</div>
        <div style='color:var(--muted);font-size:13px'>${it.seller}</div>
      </div>
      <div class='qty'>
        <button onclick='dec(${it.id})'>-</button>
        <div>${it.qty}</div>
        <button onclick='inc(${it.id})'>+</button>
      </div>`;
    cartItemsEl.appendChild(div);
  })
  cartBtn.innerText = `Keranjang (${keys.length})`;
  totalAmt.innerText = total.toLocaleString();
}

function inc(id){cart[id].qty++; updateCart()}
function dec(id){cart[id].qty--; if(cart[id].qty<=0) delete cart[id]; updateCart()}

function toggleCart(){cartSide.classList.toggle('open')}
document.getElementById('openCart').addEventListener('click', toggleCart);

// init
renderProducts();
