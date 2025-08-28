// Interactive graphic - medical cross animation
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  if (!canvas) return;
  canvas.width = canvas.offsetWidth || 300;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  function drawCross(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size / 6;
    ctx.beginPath();
    ctx.moveTo(-size/2, 0);
    ctx.lineTo(size/2, 0);
    ctx.moveTo(0, -size/2);
    ctx.lineTo(0, size/2);
    ctx.stroke();
    ctx.restore();
  }

  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    let maxSize = Math.min(canvas.width, canvas.height) / 2.2;
    let pulse = maxSize * (0.85 + 0.15 * Math.sin(t));
    drawCross(cx, cy, pulse, "#6C63FF");
    t += 0.05;
    requestAnimationFrame(animate);
  }
  animate();
});

// Feedback form logic: downloads form as text file
document.getElementById('feedback-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  const content = `Name: ${name}\nMessage: ${message}\n---\n`;

  // Save to text file
  const blob = new Blob([content], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `feedback_${Date.now()}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  this.reset();
  alert("Thank you! Your feedback/registration has been saved.");
});