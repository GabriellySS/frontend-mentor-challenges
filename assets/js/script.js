// Criação da variável global para guardar os projects,
// assim o filtro de dificuldade vai conseguir acessá-la depois!
let allProjects = [];
const gridProjects = document.getElementById("grid-projects");
const difficultyFilter = document.getElementById("difficulty-filter");

// A função principal que busca os dados
async function loadProjects() {
    try {
        // Passo A: O JS "bate na porta" do arquivo JSON e pede os dados
        const response = await fetch("./assets/data/projects.json");

        // Passo B: O JS traduz o texto do arquivo JSON para uma lista real que ele entende
        allProjects = await response.json();

        // Passo C: Agora que temos os dados, mandamos desenhar na tela!
        renderizarCards(allProjects);
    } catch (erro) {
        // Boas práticas: se der erro (ex: você digitou o nome do arquivo errado), a gente avisa
        console.error(
            "Ops! Não conseguimos carregar os projects da pasta:",
            erro,
        );
    }
}

// A função que desenha os cards (Exatamente a mesma que já criamos!)
function renderizarCards(listProjects) {
    gridProjects.innerHTML = ""; // Limpa o grid

    listProjects.forEach((project) => {
        const tagsHTML = project.tags
            .map(
                (tag) => `<span class="tag ${tag}">${tag.toUpperCase()}</span>`,
            )
            .join("");

        const cardHTML = `
            <article class="challenge-card" data-difficulty="${project.difficulty}">
                <div class="card-image-container">
                    <img src="${project.image}" alt="Preview do ${project.title}" class="card-image">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title}</h3>
                    <div class="card-tags">
                        <div class="tech-tags">${tagsHTML}</div>
                        <span class="project-difficulty ${project.difficulty}">${project.difficulty}</span>
                    </div>
           
                    <div class="card-links">
                        <a href="${project.linkPreview}" target="_blank" rel="noopener" class="card-link">prévia</a>
                        <a href="${project.linkRepo}" target="_blank" rel="noopener" class="card-link">repositório</a>
                    </div>
                </div>
            </article>
        `;
        gridProjects.innerHTML += cardHTML;
    });
}

difficultyFilter.addEventListener("change", (evento) => {
    const selectedDifficulty = evento.target.value;

    if (selectedDifficulty === "all") {
        renderizarCards(allProjects);
    } else {
        const filteredProjects = allProjects.filter(
            (project) => project.difficulty === selectedDifficulty,
        );
        renderizarCards(filteredProjects);
    }
});

// Por fim, damos o "Play" chamando a função quando a página carrega
loadProjects();
