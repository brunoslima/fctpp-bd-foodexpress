<?php

	/**
		* 
		*/
		class DepositoModel extends Model{
			
			private $table = "deposito";

			public function add($nome,$descricao){			
				
				$this->query("call novoDeposito('$descricao','$nome')");
				
				//$this->insert("INSERT INTO `$this->table` (numero, descricao, nome) VALUES (null, '$descricao','$nome');");
			}

			public function listar(){
				return $this->select("SELECT * FROM deposito");
			}

			public function modificarDeposito($idDeposito, $nome, $descricao){

				$this->query("call modificarDeposito('$idDeposito', '$nome', '$descricao');");
			}

			public function getDeposito($id){
				return $this->select("SELECT * FROM deposito WHERE numero = $id")[0];
			}
			
		}	

?>