let amigos = [];
let amigosSorteados = [];

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();
    
    if (nome === "") {
        alert("Por favor, insira um nome.");
        return;
    }
    
    if (!/^[a-zA-ZÀ-ÿ' -]+$/.test(nome)) {
        alert("Por favor, insira apenas letras.");
        return;
    }

    nome = formatarNome(nome);

    amigos.push(nome);
    input.value = "";
    atualizarLista();
}

function formatarNome(nome) {
    return nome.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
}

function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo;

        let iconeLixeira = document.createElement("span");
        iconeLixeira.innerHTML = "🗑️";
        iconeLixeira.classList.add("icone-lixeira");
        iconeLixeira.onclick = () => removerAmigo(index);

        li.appendChild(iconeLixeira);
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Adicione pelo menos um amigo antes de sortear.");
        return;
    }

    if (amigosSorteados.length === amigos.length) {
        alert("Todos os amigos já foram sorteados.");
        resetarSorteio();
        return;
    }
    
    let indiceSorteado;
    do {
        indiceSorteado = Math.floor(Math.random() * amigos.length);
    } while (amigosSorteados.includes(indiceSorteado));

    amigosSorteados.push(indiceSorteado);
    let amigoSorteado = amigos[indiceSorteado];
    
    document.getElementById("resultado").innerHTML = `Amigo Secreto: <strong>${amigoSorteado}</strong>`;
}

function resetarSorteio() {
    amigos = [];
    amigosSorteados = [];
    atualizarLista();
    document.getElementById("resultado").innerHTML = "";
}