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

  function checkAnswer(correct) {
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = correct
      ? "<span class='text-success'>¡Correcto! Siempre reporta correos sospechosos.</span>"
      : "<span class='text-danger'>Incorrecto. No abras correos sospechosos.</span>";
  }

