$(document).ready(function(){
    var clicked = false;
    var lic_option = $("#licMateria option:selected"); 
    console.log("lic_option: " + JSON.stringify(lic_option));
    $("#actualizar").hide();         
    $('._solonumero').on('input', function(){
        this.value = this.value.replace(/[^0-9]/g,'');
    });
    $('._sololetra').on('input', function(){
        this.value = this.value.replace(/[^a-zA-ZÀ-ÿñÑ ]/g,'');
    });
    $('#_email').on('input',function(){
        var regexp = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)
        var email = this.value;
        if(!regexp.test(email)){
            $('#_email').css('border-bottom','2px solid #EE6E73');
            $('#_submitlogin').prop( "disabled", true );

        }else{
            $('#_email').css('border-bottom','1px solid #000000');
            $('#_submitlogin').prop( "disabled", false );
        }
    });
    $('#_contrasena').on('input',function(){
        var contraseña = this.value;
        if(contraseña.length < 8){
            $('#_contrasena').css('border-bottom','2px solid #EE6E73');
            $('#_submitlogin').prop( "disabled", true );
        }else{
            $('#_contrasena').css('border-bottom','1px solid #000000');
            $('#_submitlogin').prop( "disabled", false );
        }
    });
    //Habilita la edicion de los campos y el boton de actualizar
    $("#editar").click(function(){
        if(clicked){
            clicked = false;
            $("._editarMateria").attr("readonly", "readonly");
            $("#info").text("Se deshabilitó la edicion");
            $("#editar").attr("value", "Habilitar edicion");
            $("#actualizar").hide();         
        }else{
            clicked = true;
            $("._editarMateria").removeAttr("readonly");
            $("#info").text("Ahora puedes editar. La clave y la licenciatura no son editables");
            $("#editar").attr("value", "Deshabilitar edicion");
            $("#actualizar").show();         
        }
    });

    //confirma la eliminacion de la base de datos y redirecciona para la eliminacion
    $("#eliminar").click(function(){
        var confirma = confirm("¿Seguro que deseas eliminar la materia? Esta accion no se puede deshacer");
        if(confirma){
            //alert(window.location.pathname + "/delete");
            $(location).attr('href', window.location.pathname + "/delete");
        }
    });

    //confirma la eliminacion de la base de datos y redirecciona para la eliminacion
   /* $("#actualizar").click(function(){
        var confirma = confirm("¿Seguro que deseas actualizar la materia?");
        if(confirma){
            //alert(window.location.pathname + "/delete");
            $(location).attr('href', window.location.pathname + "/update");
        }
    });*/

    //evita el cambio de licenciatura en el select
    $("#licMateria").click(function(evt){
        lic_option.prop("selected", true);
    });
    //evita el cambio de licenciatura en el select
    $("#licMateria").change(function(evt){
        lic_option.prop("selected", true);
    });
});