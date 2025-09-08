const btnOne = document.getElementById("btn-one");
const btnTwo = document.getElementById("btn-two");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");

// --- Bloqueamos btnTwo desde el inicio ---
btnTwo.disabled = true;
btnTwo.innerText = "Registro cerrado";
messageTwo.style.display = "block";
btnTwo.classList.add("disabled");

// Fecha límite
const launchDate = new Date("2025-09-30T23:30:00Z").getTime(); // OJO: septiembre solo tiene 30 días
const timer = setInterval(countdown, 1000);

// Temporizador
function countdown() {
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.querySelector(".countdown").style.display = "none";
        disableBtnOne();
    }

    updateCountdown(timeLeft);
}

// Mostrar tiempo
function updateCountdown(timeLeft) {
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    document.getElementById("days").innerText = pad(days);
    document.getElementById("hours").innerText = pad(hours);
    document.getElementById("minutes").innerText = pad(minutes);
    document.getElementById("seconds").innerText = pad(seconds);
}

function pad(n) {
    return n < 10 ? "0" + n : n;
}

// Bloquear solo btnOne cuando se acabe el tiempo
function disableBtnOne() {
    btnOne.disabled = true;
    btnOne.innerText = "Registro cerrado";
    messageOne.style.display = "block";

    Swal.fire({
        icon: "error",
        title: "⏰ Registro cerrado",
        text: "El tiempo de inscripción ha terminado.",
        confirmButtonText: "Entendido",
    });
}

// Evento botón uno (funciona solo antes del cierre)
btnOne.addEventListener("click", () => {
    if (!btnOne.disabled) {
        window.location.href = "proy.html";
    }
});
