gsap.registerPlugin(ScrollTrigger);

// 1. NEURAL CANVAS (Inside Bento)
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let points = [];

function init() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    points = Array.from({length: 40}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1
    }));
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0, 122, 255, 0.2)";
    points.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        points.slice(i+1).forEach(p2 => {
            let d = Math.hypot(p.x-p2.x, p.y-p2.y);
            if(d < 100) {
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        });
    });
    requestAnimationFrame(draw);
}
init(); draw();

// 2. ENTRANCE & SCROLL
gsap.from(".hero-title", { y: 100, opacity: 0, duration: 1.5, ease: "expo.out" });

gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// 3. MAGNETIC CURSOR
window.addEventListener("mousemove", (e) => {
    gsap.to(".cursor-follower", { x: e.clientX, y: e.clientY, duration: 0.1 });
});