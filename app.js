let amigos = [];

function agregarAmigo() {
  const inputAmigo = document.getElementById("amigo");
  const nombre = inputAmigo.value.trim();

  if (nombre === "") {
    alert("Por favor, inserte un nombre.");
    return;
  }

  const nombreNormalizado = nombre.toLowerCase();
  const existeDuplicado = amigos.some(
    (amigo) => amigo.toLowerCase() === nombreNormalizado
  );

  if (existeDuplicado) {
    alert("Este nombre ya existe en la lista.");
    inputAmigo.value = "";
    inputAmigo.focus();
    return;
  }

  amigos.unshift(nombre);
  inputAmigo.value = "";
  mostrarAmigos();
  inputAmigo.focus();
}

function mostrarAmigos() {
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = "";

  if (amigos.length === 0) {
    listaAmigos.innerHTML =
      '<li class="empty-message">No hay amigos agregados aún</li>';
    return;
  }

  for (let i = 0; i < amigos.length; i++) {
    const amigo = amigos[i];

    const li = document.createElement("li");
    li.className = "amigo-item";

    const numeroOrden = i + 1;
    li.innerHTML = `
            <span class="amigo-numero">${numeroOrden}.</span>
            <span class="amigo-nombre">${amigo}</span>
            <button class="btn-eliminar" onclick="eliminarAmigo(${i})" title="Eliminar ${amigo}">
                ×
            </button>
        `;

    listaAmigos.appendChild(li);
  }

  actualizarEstadisticas();
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert(
      "No hay amigos en la lista. Agrega al menos un amigo antes de sortear."
    );
    return;
  }

  if (amigos.length < 2) {
    alert(
      "Se requieren mínimo 2 participantes para realizar el sorteo del amigo secreto. Agrega al menos un amigo más."
    );
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  mostrarModalResultado(amigoSorteado);
}

function limpiarLista() {
  amigos = [];
  mostrarAmigos();
  const inputAmigo = document.getElementById("amigo");
  if (inputAmigo) {
    inputAmigo.value = "";
  }
  const resultado = document.getElementById("resultado");
  if (resultado) {
    resultado.innerHTML = "";
  }
  actualizarEstadisticas();
  actualizarEstadoBotonSorteo();
}

function eliminarAmigo(indice) {
  const nombreAmigo = amigos[indice];
  const confirmacion = confirm(
    `¿Estás seguro de que quieres eliminar a "${nombreAmigo}" de la lista?`
  );

  if (confirmacion) {
    amigos.splice(indice, 1);
    mostrarAmigos();
    const resultado = document.getElementById("resultado");
    if (resultado) {
      resultado.innerHTML = "";
    }
  }
}

function actualizarEstadisticas() {
  const totalAmigos = document.getElementById("totalAmigos");
  const ultimoSorteado = document.getElementById("ultimoSorteado");
  const requirementMessage = document.getElementById("requirementMessage");

  if (totalAmigos) {
    totalAmigos.textContent = amigos.length;
    totalAmigos.className =
      amigos.length < 2 ? "stat-value insufficient" : "stat-value";

    if (amigos.length < 2) {
      if (requirementMessage) {
        requirementMessage.style.display = "block";
      }
    } else {
      if (requirementMessage) {
        requirementMessage.style.display = "none";
      }
    }
  }

  actualizarEstadoBotonSorteo();
}

function actualizarEstadoBotonSorteo() {
  const botonSortear = document.querySelector(".button-draw");
  if (botonSortear) {
    if (amigos.length < 2) {
      botonSortear.disabled = true;
      botonSortear.style.opacity = "0.5";
      botonSortear.style.cursor = "not-allowed";
      botonSortear.title = "Se requieren mínimo 2 participantes para sortear";
    } else {
      botonSortear.disabled = false;
      botonSortear.style.opacity = "1";
      botonSortear.style.cursor = "pointer";
      botonSortear.title = "Sortear amigo secreto";
    }
  }
}

function mostrarModalResultado(amigoSorteado) {
  const modalResultado = document.getElementById("modalResultado");
  const modalWinnerName = document.getElementById("modalWinnerName");
  const ultimoSorteado = document.getElementById("ultimoSorteado");

  if (modalWinnerName) {
    modalWinnerName.textContent = amigoSorteado;
  }

  if (ultimoSorteado) {
    ultimoSorteado.textContent = amigoSorteado;
  }

  if (modalResultado) {
    modalResultado.classList.add("show");
  }
}

function cerrarModal() {
  const modalResultado = document.getElementById("modalResultado");
  if (modalResultado) {
    modalResultado.classList.remove("show");
  }
}

function resetearAplicacion() {
  cerrarModal();
  amigos = [];

  const inputAmigo = document.getElementById("amigo");
  if (inputAmigo) {
    inputAmigo.value = "";
    inputAmigo.focus();
  }

  const resultado = document.getElementById("resultado");
  if (resultado) {
    resultado.innerHTML = "";
  }

  const buscador = document.getElementById("buscadorAmigos");
  if (buscador) {
    buscador.value = "";
  }

  mostrarAmigos();

  const ultimoSorteado = document.getElementById("ultimoSorteado");
  if (ultimoSorteado) {
    ultimoSorteado.textContent = "-";
  }

  actualizarEstadisticas();
  actualizarEstadoBotonSorteo();
}

function filtrarAmigos() {
  const busqueda = document
    .getElementById("buscadorAmigos")
    .value.toLowerCase()
    .trim();
  const listaAmigos = document.getElementById("listaAmigos");

  if (busqueda === "") {
    mostrarAmigos();
    return;
  }

  const amigosFiltrados = amigos.filter((amigo) =>
    amigo.toLowerCase().includes(busqueda)
  );

  listaAmigos.innerHTML = "";

  if (amigosFiltrados.length === 0) {
    listaAmigos.innerHTML = `<li class="empty-message">No se encontraron amigos que coincidan con "${busqueda}"</li>`;
    return;
  }

  for (let i = 0; i < amigosFiltrados.length; i++) {
    const amigo = amigosFiltrados[i];
    const indiceOriginal = amigos.indexOf(amigo);

    const li = document.createElement("li");
    li.className = "amigo-item";

    const numeroOrden = i + 1;
    li.innerHTML = `
            <span class="amigo-numero">${numeroOrden}.</span>
            <span class="amigo-nombre">${amigo}</span>
            <button class="btn-eliminar" onclick="eliminarAmigo(${indiceOriginal})" title="Eliminar ${amigo}">
                ×
            </button>
        `;

    listaAmigos.appendChild(li);
  }
}

function limpiarBusqueda() {
  const buscador = document.getElementById("buscadorAmigos");
  buscador.value = "";
  mostrarAmigos();
  buscador.focus();
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarAmigos();
  actualizarEstadoBotonSorteo();

  const inputAmigo = document.getElementById("amigo");
  if (inputAmigo) {
    inputAmigo.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        agregarAmigo();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      cerrarModal();
    }
  });

  const modalOverlay = document.querySelector(".modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (event) {
      if (event.target === modalOverlay) {
        cerrarModal();
      }
    });
  }
});