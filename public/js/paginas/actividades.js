function crear_actividad(id_grupo){
    console.log(id_grupo)
    $.ajax({
        url: 'actividades/create',
        data: {id_grupo: id_grupo},
        type: "POST",
        dataType: 'json',
        success: function (res) {
            console.log(res)
        },
        error: function (err) {
            console.log(err.statusText);
        }
    });
}