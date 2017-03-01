class LinhaTabela{
	

	constructor(codigo, produto, fornecedor, quantidade, valor){
		this.codigo = codigo;
		this.produto = produto;
		this.fornecedor = fornecedor;
		this.quantidade = quantidade;
		this.valor = valor;
	}
}


$(document).ready(function(){

	let itensPedido = [];
	let count = 0;
	let total = 0;
	let cnpj;
	let nomeFornecedor;

	 
	 $(document).on("change", "select[name='estado']", function(){

		$id = $("select[name='estado']").val();
		$dados = new Object();
		console.log("passou");

		$dados['id'] = $id;
		var endereco = location.href;
		endereco = endereco.split("/");
		var final = "http://" + endereco[2] + "/FoodExpress/gui/listarCidades";
		$.ajax({
			url: ( final),
			type: "post",
			async: true,
			data: $dados,
			cache: false
		})
		.done(function(data){
			
			$("select[name='cidade']").empty();
			$("select[name='cidade']").append(data);

		})
		.fail(function(){
			console.log("pãã");
		});
	});

	$(document).on("blur", "[name='boxFornecedor']", function(){

		$dados = new Object();

		$dados['nome'] = $(this).val();;
		var endereco = location.href;
		endereco = endereco.split("/");
		var final = "http://" + endereco[2] + "/FoodExpress/gui/listarP";
		$.ajax({
			url: ( final),
			type: "post",
			async: true,
			data: $dados,
			cache: false
		})
		.done(function(data){
			console.log(data);
			data = $.parseJSON(data);
			$("#listaProdutos").empty();
			$("#listaProdutos").append(data['pagina']);
			cnpj = data['id'];
			nomeFornecedor = data['nome'];


			$("[name='boxFornecedor']").attr("disabled", true);

		})
		.fail(function(){
			console.log("pãã");
		});
	});

	$(document).on("click",".btn-adicionar-item", function(event){

		event.preventDefault();
		var d = [];
		
		d["codigo"] = ++count;
		d["produto"] = $("[name='boxProduto']").val();
		d["fornecedor"] = $("[name='boxFornecedor']").val();
		d["quantidade"] =  parseFloat($("[name='quantidadeF']").val());
		d["valor"] =  parseFloat($("[name='valorF']").val());

		//validar
		var validado = true;

		if(validado){
			
			let linha = "<tr><td>"+d['codigo']+"</td><td>"+d['produto']+"</td><td>"+d['fornecedor']+"</td><td>"+d['quantidade'].toFixed(3)+"</td><td>R$ "+d['valor'].toFixed(2)+"</td><td>R$ "+(d['quantidade']*d['valor']).toFixed(2)+"</td></tr>";
			itensPedido.push(new LinhaTabela(d['codigo'],d['produto'],d['fornecedor'],d['quantidade'],d['valor']));
			$(".item-pedido").append(linha);

			total = 0;
			for (let i = 0; i < itensPedido.length; i++) {

				total += itensPedido[i].quantidade*itensPedido[i].valor;
			}

			$('.total-compra')[0].innerText = "Total da Compra: R$ " + (parseFloat(total).toFixed(2)); 

			$(".message-alert").css("display","none");
		}
	}); 

	$(document).on("click", ".btn-finalizar-pedido", function(event){

		event.preventDefault();

	 	let dados = {
	 		descricao: $("[name='descricaoPagamento']").val(),
	 		total: total,
	 		itens: itensPedido,
	 		cnpj: cnpj,
	 		nome: nomeFornecedor
	 	}

	 	$.ajax({
			url: ( location.href + "/finalizarPedido"),
			type: "post",
			async: true,
			data: dados,
			cache: false
		})
		.done(function(data){
			console.log(data);
		})
		.fail(function(){
			console.log("pãã pãã pãã pãã hey");
		});
	});
});