angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.balanceData={};
		$scope.loading = true;
		$scope.isFirstOneClicked=false;

		$scope._idA;
		$scope.valueA=new Number;

		$scope._idB;
		$scope.valueB=new Number;

		$scope.cash='';
		$scope.rcash='';
		$scope.trans='';
		$scope.fina = '';
		$scope.fyear='';
		$scope.isfinancialShow=false;
		$scope.isBalanceShow=false;
		$scope.isTransferShow=false;

		$scope.useB=false;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		$scope.setAccount=function(id,value){
			if($scope.isFirstOneClicked==false||$scope._idA==id){
				$scope._idA=id;
				$scope.valueA=value;
				$scope.isFirstOneClicked=true;
			}
			else{
				$scope._idB=id;
				$scope.valueB=value;
				$scope.useB=true;
			}
		
		};
		//存款
		$scope.deposit = function(){

			if ($scope.cash != ''){
							$scope.cash=Number($scope.cash);
					$scope.loading = true;
					var newBalance=new Number;
					if($scope.useB){
						newBalance=$scope.valueB+$scope.cash;
						$scope.balanceData.id=$scope._idB;	
						$scope.useB=false;
						}
					else{
						newBalance=$scope.valueA+$scope.cash;
						$scope.balanceData.id=$scope._idA;}
					$scope.balanceData.balance=newBalance;
					Todos.put($scope.balanceData)
			
						.success(function(data){
						$scope.loading = false;
						$scope.formData={};
						$scope.balanceData={};
						$scope.todos = data;
						$scope.cash='';
						});
					}
		};
		//理财
		$scope.financial = function(){
				if($scope.fina != ''){
						$scope.fina = Number($scope.fina);
						$scope.fyear=Number($scope.fyear);
						$scope.loading = true;
						var newBalance=new Number;
						var nebalance =new Number;
						if($scope.useB){
							nebalance=$scope.valueB+$scope.fina;
							$scope.balanceData.id=$scope._idB;	
							$scope.useB=false;
							}
						else{
							nebalance=$scope.valueA+$scope.fina;
							$scope.balanceData.id=$scope._idA;}
						newBalance=nebalance + $scope.fina*(1+0.1*$scope.fyear);
						

						Todos.put($scope.balanceData)
							.success(function(data){
							$scope.loading = false;
							$scope.formData={};
							$scope.balanceData={};
							$scope.todos=data;
							$scope.fina='';
							$scope.fyear='';
						});
						
					}
				};
			
		//取款
			$scope.redraw = function(){

			if ($scope.rcash != ''){
						$scope.rcash=Number($scope.rcash);
						$scope.loading = true;
						var newBalance=new Number;
						if($scope.useB){
							newBalance=$scope.valueB-$scope.rcash;
							$scope.balanceData.id=$scope._idB;	
							$scope.useB=false;
							}
						else{
							newBalance=$scope.valueA-$scope.rcash;
							$scope.balanceData.id=$scope._idA;}
						if(newBalance>=0){
								$scope.balanceData.balance=newBalance;
								Todos.put($scope.balanceData)
		
								.success(function(data){
								$scope.loading = false;
								$scope.formData={};
								$scope.balanceData={};
								$scope.todos = data;
								$scope.rcash='';
								});
						}
						else{
							//TODO 取款数大于存款数的逻辑
									
								alert("wrong");
								$scope.loading=false;
								$scope.formData={};
								$scope.balanceData={};
								$scope.rcash='';
						}
					}
		};
		

		
		//转账
		$scope.transfer = function(){

			if ($scope.trans != ''){
				$scope.trans=Number($scope.trans);
				$scope.loading = true;
			    var newBalance=new Number;
				newBalance=$scope.valueA-$scope.trans;
				$scope.balanceData.id=$scope._idA
				$scope.balanceData.balance=newBalance;
				console.log(newBalance);							
				Todos.put($scope.balanceData)
			
					.success(function(data){
						$scope.loading=false;
						$scope.formData={};
						$scope.balanceData={};
						$scope.todos = data;
		                $scope.loading = true;


						newBalance = $scope.valueB + $scope.trans;
						$scope.balanceData.id =$scope._idB;
						$scope.balanceData.balance = newBalance;
						Todos.put($scope.balanceData)

							.success(function (data) {
								$scope.loading = false;
								$scope.balanceData = {};
								$scope.todos = data;
								$scope.trans='';
							});
					});
			}
		};

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});


			}


		};
		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		//showBalanceDialog
		$scope.showAddBalanceDialog=function(){
			$scope.isBalanceShow=true;
		};

		//showTransferDialog
		$scope.showTransferDialog=function(){
			$scope.isTransferShow=true;
		}
	}]);


	
