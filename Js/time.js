// 🚫 1. Función para deshabilitar ambos botones con una sola alerta
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

// 📅 2. Validar horario img-one y img-two (Lunes a Sábado 24h, Domingo 6am–1pm)
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

// ✅ 3. Ejecutar cuando cargue la página
window.addEventListener("DOMContentLoaded", () => {
    validarHorarioGeneral();
});
