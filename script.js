// Vibrant animated "Work In Progress" (SVG is handled in HTML/CSS)
// Canvas: Simple, colorful animated progress bar for "Work In Progress"

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;

    // Set canvas dimensions to fill parent width and fixed height
    canvas.width = canvas.offsetWidth || 600;
    canvas.height = 200;

    const ctx = canvas.getContext('2d');
    let progress = 0;
    let direction = 1;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Vibrant background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#43cea2");
        gradient.addColorStop(0.5, "#fcb69f");
        gradient.addColorStop(1, "#185a9d");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated progress bar
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "#fff";
        ctx.fillRect(50, canvas.height / 2 - 20, canvas.width - 100, 40);

        ctx.restore();
        ctx.save();
        ctx.shadowColor = "#43cea2";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#185a9d";
        ctx.fillRect(50, canvas.height / 2 - 20, (canvas.width - 100) * progress, 40);
        ctx.restore();

        // Text
        ctx.font = "bold 1.5rem 'Segoe UI', Arial";
        ctx.fillStyle = "#185a9d";
        ctx.fillText("Work In Progress", canvas.width / 2 - 80, canvas.height / 2 + 50);

        // Animated sparkles
        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.globalAlpha = 0.9 - (i * 0.1);
            ctx.beginPath();
            ctx.arc(
                50 + ((canvas.width - 100) * (progress + i * 0.02)),
                canvas.height / 2,
                7 - i,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = i % 2 === 0 ? "#fcb69f" : "#43cea2";
            ctx.fill();
            ctx.restore();
        }
    }

    function animate() {
        progress += direction * 0.01;
        if (progress >= 1) {
            direction = -1;
            progress = 1;
        } else if (progress <= 0) {
            direction = 1;
            progress = 0;
        }
        draw();
        requestAnimationFrame(animate);
    }

    animate();
});

// Optional: Enhance form interaction
document.getElementById('feedback-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you for your feedback, Dr Sumanta Majumdar!');
    this.reset();
});
