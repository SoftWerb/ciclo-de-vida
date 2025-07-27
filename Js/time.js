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

// 📅 2. Validar horario img-one y img-two (ahora: todos los días 24h)
const validarHorarioGeneral = () => {
    const permitido = true; // Permitir siempre

    if (!permitido) {
        const alerta = "⛔ Registro no disponible en este momento.";
        deshabilitarAmbosBotones(alerta);
    }
};

// ✅ 3. Ejecutar cuando cargue la página
window.addEventListener("DOMContentLoaded", () => {
    validarHorarioGeneral();
});
