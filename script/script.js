/*jquery pagina index*/

/*Boton de ver mas*/
$(document).ready(function(){
  $("#miBoton").click(function(){
    $("#miContenido").toggle();
  });
});


/*jquery pagina amenzas*/

/*Boton de ver mas*/
$(document).ready(function(){
  $("#miBoton1").click(function(){
    $("#miContenido1").toggle();
  });
});
$(document).ready(function(){
  $("#miBoton2").click(function(){
    $("#miContenido2").toggle();
  });
});
$(document).ready(function(){
  $("#miBoton3").click(function(){
    $("#miContenido3").toggle();
  });
});
$(document).ready(function(){
  $("#miBoton4").click(function(){
    $("#miContenido4").toggle();
  });
});

/*jquery ultima pagina*/

/*form*/
$('#contactForm').on('submit', function(e) {
    e.preventDefault();
    let valid = true;
    $(this).find('input, textarea').each(function() {
      if (!this.value.trim()) {
        alert('Completa todos los campos');
        valid = false;
        return false;
      }
    });
    if (valid) {
      alert('Formulario enviado correctamente!');
      this.reset();
    }
  });

/*modal preguntas*/

  $(document).ready(function() {
    const questions = [
        {
            question: "¿Qué debes hacer si recibes un correo sospechoso?",
            answers: [
                { text: "Abrirlo y leer", correct: false },
                { text: "No abrirlo y reportar", correct: true },
                { text: "Reenviarlo a un compañero", correct: false },
                { text: "Descargar los archivos adjuntos", correct: false }
            ]
        },
        {
            question: "¿Cuál de estas es la contraseña más segura?",
            answers: [
                { text: "123456", correct: false },
                { text: "Password1", correct: false },
                { text: "J7#p2$k9mL!", correct: true },
                { text: "nombreyapellido", correct: false }
            ]
        },
        {
            question: "¿Qué es la autenticación de dos factores (2FA)?",
            answers: [
                { text: "Usar dos contraseñas diferentes", correct: false },
                { text: "Un método que requiere dos formas de verificación", correct: true },
                { text: "Tener dos cuentas de usuario", correct: false },
                { text: "Un sistema de doble firewall", correct: false }
            ]
        },
        {
            question: "¿Qué deberías hacer si pierdes tu dispositivo móvil con acceso al trabajo?",
            answers: [
                { text: "Nada, esperar a encontrarlo", correct: false },
                { text: "Reportarlo inmediatamente al departamento de TI", correct: true },
                { text: "Comprar uno nuevo sin decir nada", correct: false },
                { text: "Cambiar solo las contraseñas personales", correct: false }
            ]
        },
        {
            question: "¿Cuándo deberías actualizar tu software?",
            answers: [
                { text: "Solo cuando el equipo de TI lo indique", correct: false },
                { text: "Inmediatamente cuando hay actualizaciones disponibles", correct: true },
                { text: "Nunca, para evitar cambios", correct: false },
                { text: "Cada 5 años", correct: false }
            ]
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = questions.length;
    let userAnswers = new Array(totalQuestions).fill(null);

    function showQuestion() {
        const question = questions[currentQuestion];
        $('#question-container').html(`
            <h5>Pregunta ${currentQuestion + 1}/${totalQuestions}</h5>
            <p class="mb-3">${question.question}</p>
            <div id="answers-container">
                ${question.answers.map((answer, index) => `
                    <button class="btn btn-outline-primary mb-2 w-100 answer-btn" 
                            data-correct="${answer.correct}" 
                            data-index="${index}">
                        ${answer.text}
                    </button>
                `).join('')}
            </div>
        `);

        // Marcar respuesta seleccionada previamente si existe
        if (userAnswers[currentQuestion] !== null) {
            $(`.answer-btn[data-index="${userAnswers[currentQuestion]}"]`).removeClass('btn-outline-primary').addClass('btn-primary');
        }

        // Actualizar botones de navegación
        $('#prev-btn').prop('disabled', currentQuestion === 0);
        $('#next-btn').text(currentQuestion === totalQuestions - 1 ? 'Finalizar' : 'Siguiente');
        
        // Actualizar barra de progreso
        $('#quiz-progress').css('width', `${((currentQuestion + 1) / totalQuestions) * 100}%`);
        
        $('#feedback').html('');
    }

    function showResults() {
        $('#question-container, #prev-btn, #next-btn').hide();
        $('#results').html(`
            <h4>Resultados del Test</h4>
            <p>Obtuviste ${score} de ${totalQuestions} puntos</p>
            <p>${getFeedbackMessage(score, totalQuestions)}</p>
            <button class="btn btn-warning mt-2" onclick="location.reload()">Intentar de nuevo</button>
        `);
    }

    function getFeedbackMessage(score, total) {
        const percentage = (score / total) * 100;
        if (percentage >= 80) return "¡Excelente! Tienes un gran conocimiento de ciberseguridad.";
        if (percentage >= 60) return "Buen trabajo, pero hay áreas que puedes mejorar.";
        return "Necesitas reforzar tus conocimientos de seguridad. Considera capacitarte más.";
    }

    // Mostrar primera pregunta al cargar
    showQuestion();

    // Manejar clic en respuestas
    $(document).on('click', '.answer-btn', function() {
        const isCorrect = $(this).data('correct') === true;
        const answerIndex = $(this).data('index');
        
        // Guardar respuesta del usuario
        userAnswers[currentQuestion] = answerIndex;
        
        // Deshabilitar todos los botones de respuesta
        $('.answer-btn').prop('disabled', true);
        
        // Resaltar la respuesta correcta
        $('.answer-btn').each(function() {
            if ($(this).data('correct') === true) {
                $(this).removeClass('btn-outline-primary').addClass('btn-success');
            } else if ($(this).data('index') === answerIndex && !isCorrect) {
                $(this).removeClass('btn-outline-primary').addClass('btn-danger');
            }
        });
        
        // Actualizar puntaje si es la primera vez que responde
        if (isCorrect && userAnswers[currentQuestion] === answerIndex) {
            score++;
        }
        
        $('#feedback').html(isCorrect ? 
            '<span class="text-success">¡Correcto! Buen trabajo.</span>' : 
            '<span class="text-danger">Incorrecto. Revisa la respuesta correcta.</span>');
    });

    // Manejar botón Siguiente/Finalizar
    $('#next-btn').click(function() {
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResults();
        }
    });

    // Manejar botón Anterior
    $('#prev-btn').click(function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });
});

