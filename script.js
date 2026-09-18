/* ================= PARTICLES ================= */

const particles = document.getElementById("particles");

for (let i = 0; i < 80; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (Math.random() * 8 + 5) + "s";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particle.style.opacity =
        Math.random();

    particles.appendChild(particle);
}


/* ================= CELEBRATE ================= */

function celebrate() {

    launchConfetti();

    document.body.style.animation = "none";

    setTimeout(() => {
        document.body.style.animation = "";
    }, 10);

}


/* ================= GIFT ================= */

function openGift() {

    document.getElementById("popup")
        .classList.add("active");

    launchConfetti();
}


function closeGift() {

    document.getElementById("popup")
        .classList.remove("active");

}


/* Close popup */

document.getElementById("popup").addEventListener("click", function(e) {

    if (e.target === this) {
        closeGift();
    }

});


/* ================= CONFETTI ================= */

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

let pieces = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


function launchConfetti() {

    pieces = [];

    for (let i = 0; i < 180; i++) {

        pieces.push({

            x: window.innerWidth / 2,

            y: window.innerHeight / 2,

            size: Math.random() * 8 + 4,

            speedX:
                (Math.random() - .5) * 15,

            speedY:
                Math.random() * -15 - 5,

            gravity: .35,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                (Math.random() - .5) * 10,

            life: 150

        });

    }

    animateConfetti();

}


function animateConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    pieces.forEach((p, index) => {

        p.x += p.speedX;

        p.y += p.speedY;

        p.speedY += p.gravity;

        p.rotation += p.rotationSpeed;

        p.life--;

        ctx.save();

        ctx.translate(p.x, p.y);

        ctx.rotate(
            p.rotation * Math.PI / 180
        );

        ctx.fillStyle =
            index % 2 === 0
                ? "#ff0000"
                : "#ffffff";

        ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
        );

        ctx.restore();

    });

    pieces = pieces.filter(
        p => p.life > 0
    );

    if (pieces.length > 0) {

        requestAnimationFrame(
            animateConfetti
        );

    }

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".section, .stat-card, .memory-card, .wish"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
        "translateY(40px)";

    el.style.transition =
        "all .8s ease";

    observer.observe(el);

});


/* ================= START EFFECT ================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        launchConfetti();

    }, 1000);

});