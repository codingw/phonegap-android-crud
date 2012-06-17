function salvarOuAtualizarRegistro() {
	if ($('#nome').val().trim() == '') {
		alert('Preencha o campo Nome!');
		return;
	}
	
	var db = window.openDatabase("phonegap-crud", "1.0", "phonegap-crud", 2000000);
    db.transaction(function insert(tx) {
    	var id = sessionStorage.getItem("id");
    	if (id == null) {
    		var sql = "INSERT INTO clientes(nome, cpf, uf, telefone) values(?,?,?,?)";
        	tx.executeSql(sql, [$('#nome').val(), $('#cpf').val(), $('#uf').val(), $('#telefone').val()]);
        	alert('Registro salvo com sucesso!');
    	} else {
    		var sql = "UPDATE clientes SET nome = ?, cpf = ?, uf = ?, telefone = ? WHERE id = ?";
        	tx.executeSql(sql, [$('#nome').val(), $('#cpf').val(), $('#uf').val(), $('#telefone').val(), id]);
        	alert('Registro atualizado com sucesso!');
    	}
    }, tratarErro);
    
    window.location = "index.html";
}

function verificarSeEstaEditandoRegistro() {
	var id = sessionStorage.getItem("id");
	if (id != null) {
		carregarRegistro(id);
	}
}

function carregarRegistro(id) {
	var db = window.openDatabase("phonegap-crud", "1.0", "phonegap-crud", 2000000);
	
    db.transaction(function select(tx) {
    	var sql = "SELECT * FROM clientes WHERE id = ?";
    	tx.executeSql(sql, [id], preencherCampos);
    }, tratarErro);
}

function preencherCampos(tx, results) {
	var registro = results.rows.item(0);
	$('#nome').val(registro.nome);
    $('#cpf').val(registro.cpf);
    $('#uf').val(registro.uf);
    $('#uf').selectmenu('refresh', true);
    $('#telefone').val(registro.telefone);
}

function tratarErro(tx, error) {
    alert("Database Error: " + error);
}
