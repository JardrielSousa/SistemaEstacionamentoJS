document.getElementById('formulario').
addEventListener('submit',cadastrar);

function cadastrar(e){
    var modelocarro = document.getElementById('modelo').value;
    var placacarro = document.getElementById('placa').value;
    var time = new Date();

    if(!modelocarro && !placacarro){
        alert("Por Favor , preencha os campos em branco");
        return false;
    }

    carro = {
        modelo : modelocarro,
        placa : placacarro,
        hora : time.getHours(),
        minutos : time.getMinutes()

    }
    
    if(localStorage.getItem('patio') == null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
        
    }
    e.preventDefault();
    document.getElementById("formulario").reset();
}

function apaga(placa){
    var carros = JSON.parse(localStorage.getItem('patio'));
    for(var i = 0; i< carros.length;i++){
        if(carros[i].placa == placa){
            carros.splice(i,1);
        }
        localStorage.setItem('patio',JSON.stringify(carros));

    }
    mostrar();
}
function mostrar(){
    var carros = JSON.parse(localStorage.getItem('patio'));
    var carrosResul = document.getElementById("resultados");

   carrosResul.innerHTML = "" ;
   for(var i = 0 ; i<carros.length;i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResul.innerHTML += '<tr><td>' +
        modelo + '<td>' + placa +
        '<td>' + hora + ':'+ minutos + '</td><td><button class="btn btn-danger" onclick="apaga(\''+placa+'\')">Excluir</button></td>'
        + '</tr>';
   }

}