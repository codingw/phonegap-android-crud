document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var db = window.openDatabase("phonegap-crud", "1.0", "phonegap-crud", 2000000);
    db.transaction(criarBancoSeNaoExistir, tratarErro);
    db.transaction(buscarRegistros, tratarErro);
}

function buscarRegistros(tx) {
	var sql = "select * from clientes order by upper(nome)";
	tx.executeSql(sql, [], montarTabelaRegistros);
}

function montarTabelaRegistros(tx, results) {
	$('#registros').empty();
	
    var qtdRegistros = results.rows.length;
    for (var i=0; i<qtdRegistros; i++) {
    	var registro = results.rows.item(i);
    	$('#registros').append(
    			'<li>' +
    			'<a href="form.html" rel="external" onclick="sessionStorage.setItem(\'id\',' +registro.id +');">' +registro.nome +'</a>' +
    			'<a onclick="if(confirm(\'Deseja excluir o Cliente?\')){excluirRegistro('+registro.id +')}">EXCLUIR</a>' +
    			'</li>'
    	);
    	$('#registros').listview('refresh');
    }
}

function excluirRegistro(id) {
	var db = window.openDatabase("phonegap-crud", "1.0", "phonegap-crud", 2000000);
		
    db.transaction(function(tx) { 
    	var sql = "DELETE FROM clientes WHERE id = ?"
    	tx.executeSql(sql, [id]);
    }, tratarErro);
	
    db.transaction(buscarRegistros, tratarErro);
    alert('Cliente excluído com sucesso!');
}

function criarBancoSeNaoExistir(tx) {
	var sql = 
		"CREATE TABLE IF NOT EXISTS clientes ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"nome VARCHAR(50), " +
		"cpf CHAR(14), " +
		"telefone VARCHAR(14), " +
		"uf CHAR(2))";
    tx.executeSql(sql);
}

function tratarErro(tx, error) {
    alert("Database Error: " + error);
}
