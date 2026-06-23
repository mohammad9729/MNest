// booking.js - basic interactivity for booking page
document.addEventListener('DOMContentLoaded', () => {
  initNavbarToggle();
  populateMovieFromStorage();
  initShowDates();
  initTimeSlots();
  generateSeatLayout();
  bindForm();
  initPaymentOptions();
});

function initNavbarToggle(){
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('navLinksMenu');
  if(btn){
    btn.addEventListener('click', ()=> menu.classList.toggle('open'))
  }
}

function populateMovieFromStorage(){
  const selected = localStorage.getItem('selectedMovie') || 'Inception';
  const dataRaw = localStorage.getItem('selectedMovieData');
  let data = null;
  try{ data = dataRaw? JSON.parse(dataRaw) : null; }catch(e){ data = null; }
  const titleEls = document.querySelectorAll('.booking-movie-title');
  titleEls.forEach(el=>el.textContent = selected);
  // set poster image
  const poster = (data && data.poster) || localStorage.getItem('selectedPoster');
  const posterImg = document.querySelector('.movie-poster-card img');
  if(posterImg && poster) posterImg.src = poster;
  // set hero background if available
  const hero = document.querySelector('.hero-banner');
  if(hero && poster){ hero.style.backgroundImage = `url('${poster}')`; }
  // fill other summary fields if movie data provided
  if(data){
    document.getElementById('summaryDuration') && (document.getElementById('summaryDuration').textContent = data.duration || 'N/A');
  }
}

// Payment selection
let selectedPayment = null;
function initPaymentOptions(){
  document.querySelectorAll('.pay-card').forEach(pc=>{
    // ensure data-method exists
    if(!pc.dataset.method){
      const text = pc.textContent.trim().toLowerCase();
      pc.dataset.method = text.split(' ')[0];
    }
    pc.addEventListener('click', ()=>{
      document.querySelectorAll('.pay-card').forEach(p=>p.classList.remove('active'));
      pc.classList.add('active');
      selectedPayment = pc.dataset.method;
    });
  });
}

// Dates as horizontal cards (Today, Tomorrow, +3 days)
let selectedDateIdx = 0;
function initShowDates(){
  const container = document.getElementById('dateCardsContainer');
  if(!container) return;
  const labels = ['Today','Tomorrow'];
  for(let i=2;i<7;i++) labels.push(new Date(Date.now()+i*86400000).toLocaleDateString(undefined,{weekday:'short'}));
  labels.forEach((lab,idx)=>{
    const d = document.createElement('div');
    d.className = 'date-card'+(idx===0? ' active':'');
    d.textContent = lab;
    d.addEventListener('click', ()=>{
      document.querySelectorAll('.date-card').forEach(el=>el.classList.remove('active'));
      d.classList.add('active');
      selectedDateIdx = idx;
      updateSummaryDate();
      generateSeatLayout();
    });
    container.appendChild(d);
  });
  updateSummaryDate();
}

function updateSummaryDate(){
  const el = document.getElementById('summaryDate');
  if(!el) return;
  const date = new Date(Date.now()+selectedDateIdx*86400000);
  el.textContent = date.toDateString();
}

// Time slots
let selectedTime = '';
function initTimeSlots(){
  const times = ['10:00 AM','12:30 PM','03:00 PM','05:30 PM','08:00 PM','10:30 PM'];
  const container = document.getElementById('timePillsContainer');
  if(!container) return;
  times.forEach(t=>{
    const c = document.createElement('div');
    c.className = 'time-chip';
    c.textContent = t;
    c.addEventListener('click', ()=>{
      document.querySelectorAll('.time-chip').forEach(el=>el.classList.remove('selected'));
      c.classList.add('selected');
      selectedTime = t;
      document.getElementById('summaryTime').textContent = t;
    });
    container.appendChild(c);
  });
}

// Seat layout generator: rows with curved effect handled in CSS
const seatState = {};
let selectedSeats = [];
function generateSeatLayout(){
  const map = document.getElementById('seatMap');
  if(!map) return;
  map.innerHTML = '';
  // simple 7 rows, varying seats
  const rows = [8,10,12,12,10,8];
  rows.forEach((count,rowIdx)=>{
    const row = document.createElement('div'); row.className='seat-row';
    for(let i=0;i<count;i++){
      const seatId = String.fromCharCode(65+rowIdx)+(i+1);
      const s = document.createElement('div');
      s.className='seat';
      s.dataset.seat = seatId;
      // randomly mark some seats booked for demo
      const rnd = Math.random();
      if(rnd>0.92) { s.classList.add('booked'); seatState[seatId]='booked'; }
      else if(rnd>0.9){ s.classList.add('vip'); seatState[seatId]='vip'; }
      else { seatState[seatId]='available'; }
      s.title = seatId + ' — ' + (seatState[seatId]);
      s.addEventListener('click', ()=>onSeatClick(s));
      row.appendChild(s);
    }
    map.appendChild(row);
  });
  updateSummarySeats();
}

function onSeatClick(el){
  if(el.classList.contains('booked')) return;
  const id = el.dataset.seat;
  if(el.classList.contains('selected')){
    el.classList.remove('selected');
    selectedSeats = selectedSeats.filter(x=>x!==id);
  } else {
    el.classList.add('selected');
    selectedSeats.push(id);
  }
  updateSummarySeats();
}

function updateSummarySeats(){
  const list = document.getElementById('summarySeats');
  const priceEl = document.getElementById('summaryPrice');
  const seats = selectedSeats.slice().sort();
  list.textContent = seats.length? seats.join(', '): 'None';
  const basePrice = 12;
  const subtotal = seats.length * basePrice;
  const convenience = Math.round(subtotal*0.05*100)/100;
  const gst = Math.round((subtotal+convenience)*0.18*100)/100;
  const total = (subtotal + convenience + gst).toFixed(2);
  priceEl.textContent = total;
  document.getElementById('summaryTicketCount') && (document.getElementById('summaryTicketCount').textContent = seats.length);
}

function bindForm(){
  const form = document.getElementById('finalBookingForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(selectedSeats.length===0){ alert('Select at least one seat'); return; }
    if(!selectedPayment){ alert('Please select a payment method'); return; }
    // simulate success
    const bookingId = 'MN'+Math.random().toString(36).slice(2,9).toUpperCase();
    document.getElementById('successBookingId').textContent = bookingId;
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
  });
}

// Ticket download: render a simple ticket canvas and download as PNG
function downloadTicket(){
  const title = localStorage.getItem('selectedMovie') || document.querySelector('.booking-movie-title')?.textContent || 'Movie';
  const seats = selectedSeats.join(', ') || 'NA';
  const date = document.getElementById('summaryDate')?.textContent || '';
  const time = document.getElementById('summaryTime')?.textContent || '';
  const bookingId = document.getElementById('successBookingId')?.textContent || ('MN'+Math.random().toString(36).slice(2,9).toUpperCase());

  const canvas = document.createElement('canvas'); canvas.width = 800; canvas.height = 450;
  const ctx = canvas.getContext('2d');
  // background
  ctx.fillStyle = '#0d0d0d'; ctx.fillRect(0,0,canvas.width,canvas.height);
  // accent bar
  ctx.fillStyle = '#00bfff'; ctx.fillRect(0,0,canvas.width,8);
  // title
  ctx.fillStyle = '#ffffff'; ctx.font = '28px sans-serif'; ctx.fillText('MovieNest Ticket', 20, 48);
  ctx.font = '22px sans-serif'; ctx.fillStyle = '#cfe8ff'; ctx.fillText(title, 20, 100);
  ctx.font = '18px sans-serif'; ctx.fillStyle = '#bfcbd6'; ctx.fillText(`Seats: ${seats}`, 20, 150);
  ctx.fillText(`Date: ${date}`, 20, 190);
  ctx.fillText(`Time: ${time}`, 20, 230);
  ctx.fillText(`Booking ID: ${bookingId}`, 20, 270);
  // QR placeholder
  ctx.fillStyle = '#111'; ctx.fillRect(canvas.width-180, 60, 140, 140);
  // footer
  ctx.fillStyle = '#9aa3ae'; ctx.font='14px sans-serif'; ctx.fillText('Enjoy the show at MovieNest', 20, canvas.height-30);

  // download
  const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = `${bookingId}_ticket.png`; a.click();
}
