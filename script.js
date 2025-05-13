document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resumeForm');
    const resumeContent = document.getElementById('resumeContent');
    const addExperienceButton = document.getElementById('addExperienceButton');
    const addEducationButton = document.getElementById('addEducationButton'); // Adicionando o botão de educação

    if (addExperienceButton) {
        addExperienceButton.addEventListener('click', addExperience);
    }

    if (addEducationButton) {
        addEducationButton.addEventListener('click', addEducation);
    }

    resumeForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Limpa o conteúdo anterior do currículo
        resumeContent.innerHTML = '';

        // Obtém os valores dos campos de informações pessoais
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const linkedin = document.getElementById('linkedin').value;
        const summary = document.getElementById('summary').value;

        // Exibe as informações pessoais no currículo
        if (name) {
            resumeContent.innerHTML += `<h3>${name}</h3>`;
        }
        if (phone) {
            resumeContent.innerHTML += `<p>Telefone: ${phone}</p>`;
        }
        if (email) {
            resumeContent.innerHTML += `<p>Email: ${email}</p>`;
        }
        if (linkedin) {
            resumeContent.innerHTML += `<p>LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a></p>`;
        }
        if (summary) {
            resumeContent.innerHTML += `<hr><p><strong>Resumo Profissional:</strong> ${summary}</p>`;
        }

        // Processa e exibe a seção de experiência
        const jobTitles = document.querySelectorAll('#experienceFields input[name="jobTitle[]"]');
        const companies = document.querySelectorAll('#experienceFields input[name="company[]"]');
        const startDates = document.querySelectorAll('#experienceFields input[name="startDate[]"]');
        const endDates = document.querySelectorAll('#experienceFields input[name="endDate[]"]');
        const jobDescriptions = document.querySelectorAll('#experienceFields textarea[name="jobDescription[]"]');

        if (jobTitles.length > 0) {
            resumeContent.innerHTML += `<hr><h3>Experiência Profissional</h3>`;
            for (let i = 0; i < jobTitles.length; i++) {
                const title = jobTitles[i].value;
                const company = companies[i].value;
                const startDate = startDates[i].value;
                const endDate = endDates[i].value;
                const description = jobDescriptions[i].value;

                if (title && company) {
                    resumeContent.innerHTML += `<h4>${title}, ${company}</h4>`;
                    if (startDate || endDate) {
                        resumeContent.innerHTML += `<p><em>${startDate} - ${endDate}</em></p>`;
                    }
                    if (description) {
                        resumeContent.innerHTML += `<p>${description}</p>`;
                    }
                }
            }
        }

        // Processa e exibe a seção de educação
        const degrees = document.querySelectorAll('#educationFields input[name="degree[]"]');
        const institutions = document.querySelectorAll('#educationFields input[name="institution[]"]');
        const graduationDates = document.querySelectorAll('#educationFields input[name="graduationDate[]"]');

        if (degrees.length > 0) {
            resumeContent.innerHTML += `<hr><h3>Educação</h3>`;
            for (let i = 0; i < degrees.length; i++) {
                const degree = degrees[i].value;
                const institution = institutions[i].value;
                const graduationDate = graduationDates[i].value;

                if (degree && institution) {
                    resumeContent.innerHTML += `<h4>${degree}, ${institution}</h4>`;
                    if (graduationDate) {
                        resumeContent.innerHTML += `<p><em>${graduationDate}</em></p>`;
                    }
                }
            }
        }
    });
});

// Funções para adicionar mais experiência e educação (definidas globalmente)
function addExperience() {
    const experienceFields = document.getElementById('experienceFields');
    const newExperience = document.createElement('div');
    const index = experienceFields.children.length + 1;

    newExperience.innerHTML = `
        <label for="jobTitle${index}">Cargo:</label>
        <input type="text" id="jobTitle${index}" name="jobTitle[]"><br><br>

        <label for="company${index}">Empresa:</label>
        <input type="text" id="company${index}" name="company[]"><br><br>

        <label for="startDate${index}">Data de Início:</label>
        <input type="text" id="startDate${index}" name="startDate[]" placeholder="Ex: Jan/2023"><br><br>

        <label for="endDate${index}">Data de Fim (ou Atual):</label>
        <input type="text" id="endDate${index}" name="endDate[]" placeholder="Ex: Mar/2024 ou Atual"><br><br>

        <label for="jobDescription${index}">Descrição das Atividades:</label><br>
        <textarea id="jobDescription${index}" name="jobDescription[]" rows="3"></textarea><br><br>
        <button type="button" onclick="this.parentNode.remove()">Remover Experiência</button><br><br>
    `;

    experienceFields.appendChild(newExperience);
}

function addEducation() {
    const educationFields = document.getElementById('educationFields');
    const newEducation = document.createElement('div');
    const index = educationFields.children.length + 1;

    newEducation.innerHTML = `
        <label for="degree${index}">Formação:</label>
        <input type="text" id="degree${index}" name="degree[]"><br><br>

        <label for="institution${index}">Instituição:</label>
        <input type="text" id="institution${index}" name="institution[]"><br><br>

        <label for="graduationDate${index}">Data de Conclusão (ou Cursando):</label>
        <input type="text" id="graduationDate${index}" name="graduationDate[]" placeholder="Ex: Dez/2022 ou Cursando"><br><br>
        <button type="button" onclick="this.parentNode.remove()">Remover Formação</button><br><br>
    `;

    educationFields.appendChild(newEducation);
}