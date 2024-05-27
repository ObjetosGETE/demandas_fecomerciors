$(function(){
    var lastSection = "#apresentacao";

    $(".bto-hamburguer").click(function(){
        $("#menuMobile-content").toggle("fast")
        
        if(!$(this).hasClass("ativo")){
          $(this).addClass("ativo");
          $("#menuMobile, #menuMobile-content").addClass("h-100");
        }else{
          $(this).removeClass("ativo");
          $("#menuMobile, #menuMobile-content").removeClass("h-100");
        }
    });
    $("#menuMobile a").click(function (){
      $(".bto-hamburguer").removeClass("ativo");
      $("#menuMobile, #menuMobile-content").removeClass("h-100");
      $("#menuMobile-content").hide("fast")
    })
    $("a").click(function(e){
        var hash = $(this).attr("href");
        var ignore = $(this).attr("data-ignore");
        
        if(ignore === undefined || 
        ignore == false){
            // e.preventDefault();
            rolar(hash);
            lastSection = hash;
        }else if(ignore == "true"){
            // e.preventDefault();
            $(hash).modal("show");
        }
    });
    // Função para rolar para o lugar correto ao clicar no link
    var rolar = function (h){
        let tirar = 0;
        switch (h){
            case "#apresentacao":
                tirar = 150;
                break;
            default: 
                tirar = 90;
                break;
        }
        $('html, body').animate({
            scrollTop: $(h).offset().top-tirar
        }, 850);
    }
    // Corrigindo a url acessível
    $('body').on('hidden.bs.modal', '.modal', function (event) {
        const modalId = $(this).attr('id'); // Obtém o ID da modal fechada
        console.log('A modal com ID ' + modalId + ' foi fechada!');
        if (lastSection) {
            history.replaceState(null, null, lastSection);
          }
      });

  const $links = $('#menu a, #menuMobile a');
  const $sections = $('#apresentacao, #municipal, #estadual, #federal');

  // Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const $link = $(`a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        $link.addClass('ativo');
        $(`#menu, #menuMobile-content`).removeClass("bg-apresentacao bg-municipal bg-estadual bg-federal");
        $(`#menu`).addClass('bg-'+ entry.target.id);
        $(`#menuMobile-content`).addClass('bg-'+ entry.target.id);
      } else {
        $link.removeClass('ativo');
      }
    });
  }, { threshold: 0.5 });

  $sections.each(function() {
    observer.observe(this);
  });

  // Evento de scroll
  $(window).scroll(function() {
    const scrollPos = $(window).scrollTop();

    $sections.each(function() {
      const $section = $(this);
      const sectionTop = $section.offset().top - 100; // Ajuste o offset conforme necessário

      if (scrollPos >= sectionTop) {
        $links.removeClass('ativo');
        $(`a[href="#${$section.attr('id')}"]`).addClass('ativo');
        $(`#menu, #menuMobile-content`).removeClass("bg-apresentacao bg-municipal bg-estadual bg-federal");
        $(`#menu`).addClass('bg-'+ $section.attr('id'));
        $(`#menuMobile-content`).addClass('bg-'+ $section.attr('id'));
      }
    });
  });


});