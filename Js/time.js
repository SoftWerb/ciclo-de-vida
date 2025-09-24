const btnOne = document.getElementById("btn-one");
const btnTwo = document.getElementById("btn-two");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");
const form = document.getElementById("registroForm");

// Fecha límite: 30 septiembre 2025, 23:59:59 hora local
const deadline = new Date("2025-09-30T23:59:59").getTime();
const timer = setInterval(countdown, 1000);

// Temporizador
function countdown() {
    const now = new Date().getTime();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.querySelector(".countdown").style.display = "none";
        disableBtnTwo();
        disableForm();
    }

    updateCountdown(timeLeft);
}

// Mostrar el tiempo en pantalla
function updateCountdown(timeLeft) {
    if (timeLeft <= 0) return;

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

// Desactivar solo botón dos
function disableBtnTwo() {
    btnTwo.disabled = true;
    btnTwo.innerText = "Registro cerrado";
    btnTwo.classList.add("disabled");
    messageTwo.style.display = "block";

    Swal.fire({
        icon: "error",
        title: "⏰ Registro cerrado",
        text: "El botón 2 y el formulario ya no están disponibles.",
        confirmButtonText: "Entendido",
    });
}

// Bloqueo del formulario
function disableForm() {
    form.querySelectorAll("input, button").forEach(el => {
        el.disabled = true;
    });
}

// Evento botón uno (siempre libre)
btnOne.addEventListener("click", () => {
    window.location.href = "proy.html";
});

// Evento botón dos (solo antes de 30 septiembre)
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
