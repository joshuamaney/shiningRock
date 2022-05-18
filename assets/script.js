
console.clear();

var body = document.body;
var modal = createModal(document.querySelector("#modal-1"));
var openButton = document.querySelector("#open-button");

openButton.addEventListener("click", function() {
  modal.open();
});

function createModal(container) {
  
  var content = container.querySelector(".modal-content");
  var dialog = container.querySelector(".modal-dialog");
  var polygon = container.querySelector(".modal-polygon");
  var svg = container.querySelector(".modal-svg");
  
  var point1 = createPoint(45, 45);
  var point2 = createPoint(55, 45);
  var point3 = createPoint(55, 55);
  var point4 = createPoint(45, 55);
      
  var animation = new TimelineMax({    
      onReverseComplete: onReverseComplete,
      onStart: onStart,
      paused: true
    })     
    .to(point1, 0.3, {
      x: 15,
      y: 30,
      ease: Power4.easeIn
    }, 0)
    .to(point4, 0.3, {
      x: 5,
      y: 80,
      ease: Power2.easeIn
    }, "-=0.1")
    .to(point1, 0.3, {
      x: 0,
      y: 0,
      ease: Power3.easeIn
    })
    .to(point2, 0.3, {
      x: 100,
      y: 0,
      ease: Power2.easeIn
    }, "-=0.2")
    .to(point3, 0.3, {
      x: 100,
      y: 100,
      ease: Power2.easeIn
    })
    .to(point4, 0.3, {
      x: 0,
      y: 100,
      ease: Power2.easeIn
    }, "-=0.1")  
    .to(container, 1, {
      autoAlpha: 1
    }, 0)  
    .to(content, 1, {
      autoAlpha: 1
    })
  
  var modal = {
    animation: animation,
    container: container,
    content: content,
    dialog: dialog,    
    isOpen: false,
    open: open,
    close: close   
  };
  
  body.removeChild(container);
    
  function onClick() {
    
    if (modal.isOpen) {
      close();
    }
  }
  
  function onStart() {
    body.appendChild(container);
    container.addEventListener("click", onClick);
  }
  
  function onReverseComplete() {
    container.removeEventListener("click", onClick);
    body.removeChild(container);
  }
  
  function open() {
    modal.isOpen = true;
    animation.play().timeScale(2);
  }
  
  function close() {
    modal.isOpen = false;
    animation.reverse().timeScale(2.5);
  }
    
  function createPoint(x, y) {
    var point = polygon.points.appendItem(svg.createSVGPoint());
    point.x = x || 0;
    point.y = y || 0;
    return point;
  }
  
  return modal;
}






// Get the modal
var modal = $('#modalDialog');

// Get the button that opens the modal
var btn = $("#mbtn");

// Get the <span> element that closes the modal
var span = $(".close");

$(document).ready(function(){
    // When the user clicks the button, open the modal 
    btn.on('click', function() {
        modal.show();
    });
    
    // When the user clicks on <span> (x), close the modal
    span.on('click', function() {
        modal.hide();
    });
});

// When the user clicks anywhere outside of the modal, close it
$('body').bind('click', function(e){
    if($(e.target).hasClass("modal")){
        modal.hide();
    }
});

$(document).ready(function(){
  $('#contactFrm').submit(function(e){
      e.preventDefault();
      $('.modal-body').css('opacity', '0.5');
      $('.btn').prop('disabled', true);
      
      $form = $(this);
      $.ajax({
          type: "POST",
          url: './submit.php',
          data: 'contact_submit=1&'+$form.serialize(),
          dataType: 'json',
          success: function(response){
              if(response.status == 1){
                  $('#contactFrm')[0].reset();
                  $('.response').html('<div class="alert alert-success">'+response.message+'</div>');
              }else{
                  $('.response').html('<div class="alert alert-danger">'+response.message+'</div>');
              }
              $('.modal-body').css('opacity', '');
              $('.btn').prop('disabled', false);
          }
      });
  });
});