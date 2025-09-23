const canvas = document.getElementById('rangoliCanvas');
const ctx = canvas.getContext('2d');

// Set canvas full screen
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

// State variables
let drawing = false;
let color = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;
let symmetry = parseInt(document.getElementById('symmetry').value);

// Update settings
document.getElementById('colorPicker').addEventListener('input', e => color = e.target.value);
document.getElementById('brushSize').addEventListener('input', e => brushSize = e.target.value);
document.getElementById('symmetry').addEventListener('change', e => symmetry = parseInt(e.target.value));

// Mouse & Touch events
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => { drawing = true; draw(e.touches[0]); });
canvas.addEventListener('touchend', () => drawing = false);
canvas.addEventListener('touchmove', (e) => { draw(e.touches[0]); e.preventDefault(); });

// Draw function
function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = color;

    for (let i = 0; i < symmetry; i++) {
        const angle = (i * 2 * Math.PI) / symmetry;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Rotate around center
        const dx = x - cx;
        const dy = y - cy;
        const rx = cx + dx * Math.cos(angle) - dy * Math.sin(angle);
        const ry = cy + dx * Math.sin(angle) + dy * Math.cos(angle);

        ctx.beginPath();
        ctx.arc(rx, ry, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download button
document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'rangoli.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Responsive canvas
window.addEventListener('resize', () => {
    const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;
    ctx.putImageData(imageData,0,0);
});
