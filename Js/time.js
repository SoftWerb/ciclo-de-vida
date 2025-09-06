const btnOne = document.getElementById("btn-one");
const btnTwo = document.getElementById("btn-two");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registroForm");

const launchDate = new Date("2025-09-31T23:30:00Z").getTime(); // ACTUALIZA FECHA
const timer = setInterval(countdown, 1000);

// Temporizador
function countdown() {
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.querySelector(".countdown").style.display = "none";
        disableButtons();
        disableForm();
    }

    updateCountdown(timeLeft);
}

// Mostrar el tiempo en pantalla
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

// Bloqueo de botones
function disableButtons() {
    [btnOne, btnTwo].forEach(btn => {
        btn.disabled = true;
        btn.innerText = "Registro cerrado";
        btn.classList.add("disabled");
    });

    messageOne.style.display = "block";
    messageTwo.style.display = "block";

    Swal.fire({
        icon: "error",
        title: "⏰ Registro cerrado",
        text: "El tiempo de inscripción ha terminado.",
        confirmButtonText: "Entendido",
    });
}

// Bloqueo del formulario
function disableForm() {
    form.querySelectorAll("input, button").forEach(el => {
        el.disabled = true;
    });
}

// Evento botón uno
btnOne.addEventListener("click", () => {
    if (!btnOne.disabled) {
        window.location.href = "proy.html";
    }
});

// Evento botón dos
btnTwo.addEventListener("click", () => {
    if (!btnTwo.disabled) {
        window.location.href = "main.html";
    }
});

// Envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();

    if (nombre === "" || email === "") {
        Swal.fire("Error", "Por favor completa todos los campos", "warning");
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: `Gracias por inscribirte, ${nombre}!`,
        confirmButtonText: "OK"
    });

    form.reset();
});

