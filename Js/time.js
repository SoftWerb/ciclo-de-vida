// 🕒 1. TEMPORIZADOR GENERAL
const countdown = () => {
    const launchDate = new Date("2025-07-27T18:00:00Z").getTime(); // Fecha límite
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").style.display = "none";
        deshabilitarAmbosBotones("El tiempo de inscripción terminó.");
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
};

// 🚫 2. Función para deshabilitar ambos botones con una sola alerta
const deshabilitarAmbosBotones = (mensaje) => {
    const imgOneButton = document.querySelector(".img-one button");
    const imgTwoButton = document.querySelector(".img-two button");

    if (imgOneButton) {
        imgOneButton.disabled = true;
        imgOneButton.innerText = "Registro cerrado";
        imgOneButton.classList.add("disabled");
    }

    if (imgTwoButton) {
        imgTwoButton.disabled = true;
        imgTwoButton.innerText = "Registro cerrado";
        imgTwoButton.classList.add("disabled");
    }

    Swal.fire({
        icon: "warning",
        title: "🚫 CicloVida - Registro cerrado",
        text: mensaje,
        confirmButtonText: "Entendido"
    });
};

// 📅 3. Validar horario img-one y img-two (Lunes a Sábado 24h, Domingo 6am–1pm)
const validarHorarioGeneral = () => {
    const ahora = new Date();
    const dia = ahora.getDay(); // 0=Domingo, 1=Lunes,...6=Sábado
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();

    let permitido = false;

    if (dia >= 1 && dia <= 6) {
        permitido = true; // Lunes a sábado: todo el día
    } else if (dia === 0) {
        // Domingo: 6:00 a.m. hasta 12:59 p.m.
        if ((hora === 6 && minutos >= 0) || (hora > 6 && hora < 13)) {
            permitido = true;
        }
    }

    if (!permitido) {
        const alerta = "⛔ Publicaciones permitidas:\n🗓️ Lunes a sábado (24 horas)\n🌞 Domingo de 6:00 a.m. a 1:00 p.m.";
        deshabilitarAmbosBotones(alerta);
    }
};

// ✅ 4. Ejecutar cuando cargue la página
window.addEventListener("DOMContentLoaded", () => {
    validarHorarioGeneral();
    timer = setInterval(countdown, 1000);
});

let timer;

