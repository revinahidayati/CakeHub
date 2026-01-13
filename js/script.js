// =====================
// DATA PRODUK
// =====================
const products = [
  {
    id:1,
    name:'Kue Lapis Legit',
    price:4000,
    seller:'Kue Basah Selfina',
    rating:4.8,
    preOrder:true,
    image:'img/lapis-legit.jpg'
  },
  {
    id:2,
    name:'Pisang Bakar Santan',
    price:5000,
    seller:'Manis Buah',
    rating:4.6,
    preOrder:true,
    image:'img/pisang-bakar.jpg'
  },
  {
    id:3,
    name:'Dadar Gulung',
    price:2000,
    seller:'Kupi & Lumer',
    rating:4.4,
    preOrder:false,
    image:'img/dadar-gulung.jpg'
  },
  {
    id:4,
    name:'Putu Ayu',
    price:2000,
    seller:'Snackies',
    rating:4.2,
    preOrder:false,
    image:'img/putu-ayu.jpg'
  },
  {
    id:5,
    name:'Nagasari',
    price:3000,
    seller:'Selfina Rumah',
    rating:4.7,
    preOrder:true,
    image:'img/nagasari.jpg'
  },
  {
    id:6,
    name:'Bolu Kukus',
    price:2000,
    seller:'Manis Buah',
    rating:4.1,
    preOrder:false,
    image:'img/bolu-kukus.jpg'
  },
  {
    id:7,
    name:'Onde-onde',
    price:2000,
    seller:'Kupi & Lumer',
    rating:4.9,
    preOrder:true,
    image:'img/ondeonde.jpg'
  },
  {
    id:8,
    name:'Pisang Coklat',
    price:1000,
    seller:'Kue Basah Selfina',
    rating:4.3,
    preOrder:false,
    image:'img/pisang-coklat.jpg'
  }
];

// =====================
// ELEMENT
// =====================
const grid = document.getElementById('productGrid');
const cartBtn = document.getElementById('openCart');
const cartSide = document.getElementById('cartSide');
const cartItemsEl = document.getElementById('cartItems');
const totalAmt = document.getElementById('totalAmt');

let cart = {};
let currentProduct = null;

// =====================
// RENDER PRODUK
// =====================
function renderProducts(){
  grid.innerHTML = '';
  const sorted = [...products].sort((a,b)=>b.rating - a.rating);

  sorted.forEach(p => {
    const el = document.createElement('div');
    el.className = 'card';

    el.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="thumb-img">

      <div class="card-body">
        <div class="name">${p.name}</div>
        <div class="seller">${p.seller}</div>

        <div class="rating">
          ⭐ ${p.rating}
          ${p.rating >= 4.5 ? `<span class="rec">(Direkomendasikan)</span>` : ``}
        </div>

        <div class="price">Rp ${p.price.toLocaleString()}</div>

        ${p.preOrder ? `<div class="preorder">⏱ Pre-Order Acara</div>` : ``}

        <button class="add" onclick="openModal(${p.id})">Lihat</button>
      </div>
    `;
    grid.appendChild(el);
  });
}

// =====================
// MODAL
// =====================
function openModal(id){
  const p = products.find(x => x.id === id);
  currentProduct = p;

  document.getElementById('mdName').innerText = p.name;
  document.getElementById('mdSeller').innerText = 'oleh ' + p.seller;
  document.getElementById('mdPrice').innerHTML =
    'Rp ' + p.price.toLocaleString() + ' <small>/ pcs</small>';
  document.getElementById('mdRating').innerText = p.rating;
  document.getElementById('mdImage').src = p.image;
  document.getElementById('mdPreorder').style.display =
    p.preOrder ? 'flex' : 'none';

  document.getElementById('modal').classList.add('show');
}

function closeModal(){
  document.getElementById('modal').classList.remove('show');
}

// =====================
// CART
// =====================
function addToCart(p){
  if(!cart[p.id]) cart[p.id] = {...p, qty:0};
  cart[p.id].qty++;
  updateCart();
  closeModal();
}

function pesanSekarang(p){
  if(!cart[p.id]) cart[p.id] = {...p, qty:1};
  updateCart();
  cartSide.classList.add('open');
  closeModal();
}

function updateCart(){
  cartItemsEl.innerHTML = '';
  const keys = Object.keys(cart);

  if(keys.length === 0){
    cartItemsEl.innerText = 'Tidak ada item';
    cartBtn.innerText = 'Keranjang (0)';
    totalAmt.innerText = '0';
    return;
  }

  let total = 0;
  keys.forEach(k=>{
    const it = cart[k];
    total += it.price * it.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div style="width:48px;height:48px;border-radius:10px;overflow:hidden">
        <img src="${it.image}" style="width:100%;height:100%;object-fit:cover">
      </div>

      <div style="flex:1">
        <strong>${it.name}</strong>
        <div style="font-size:12px;color:var(--muted)">${it.seller}</div>
      </div>

      <div class="qty">
        <button onclick="dec(${it.id})">-</button>
        <div>${it.qty}</div>
        <button onclick="inc(${it.id})">+</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });

  cartBtn.innerText = `Keranjang (${keys.length})`;
  totalAmt.innerText = total.toLocaleString();
}

function inc(id){ cart[id].qty++; updateCart(); }
function dec(id){ cart[id].qty--; if(cart[id].qty<=0) delete cart[id]; updateCart(); }

// =====================
// TOGGLE CART
// =====================
function toggleCart(){
  cartSide.classList.toggle('open');
}

cartBtn.addEventListener('click', toggleCart);

// =====================
// INIT
// =====================
renderProducts();
