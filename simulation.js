const canvas = document.getElementById('orbitCanvas');
const ctx = canvas.getContext('2d');

if (!canvas || !ctx) {
  console.error("Kanvas tidak ditemukan! Periksa ID elemen atau struktur HTML.");
} else {
  console.log("Kanvas berhasil dimuat.");
}

// Constants
const G = 1; // Gravitational constant (arbitrary units)
const M = 10; // Mass of the central object
const dt = 0.01; // Time step
const scale = 100; // Scaling factor for visualization

// Initial conditions
let r = { x: 3, y: 0 }; // Initial position (x, y)
let v = { x: 0, y: 1 }; // Initial velocity (vx, vy)
const path = []; // Array to store orbit path for visualization

console.log("Simulasi dimulai");

// Function to calculate acceleration
function acceleration(r) {
  const distance = Math.sqrt(r.x ** 2 + r.y ** 2);
  const factor = -G * M / Math.pow(distance, 3);
  return { x: factor * r.x, y: factor * r.y };
}

// Function to update simulation
function update() {
  const acc = acceleration(r); // Calculate acceleration
  v.x += acc.x * dt; // Update velocity
  v.y += acc.y * dt;
  r.x += v.x * dt; // Update position
  r.y += v.y * dt;

  // Store the current position for visualization
  path.push({ x: r.x, y: r.y });
  if (path.length > 1000) path.shift(); // Limit path history

  console.log(`Posisi saat ini: x=${r.x.toFixed(2)}, y=${r.y.toFixed(2)}`);
}

// Function to draw the simulation
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw central mass
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.fill();

  // Draw orbit path
  ctx.strokeStyle = "lightblue";
  ctx.beginPath();
  path.forEach((point, index) => {
    const x = canvas.width / 2 + point.x * scale;
    const y = canvas.height / 2 + point.y * scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw current position of the bintang
  const x = canvas.width / 2 + r.x * scale;
  const y = canvas.height / 2 + r.y * scale;
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

// Animation loop
function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}

// Start the simulation
animate();
