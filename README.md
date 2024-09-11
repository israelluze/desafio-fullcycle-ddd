# Desafio para implementação de métodos da OrderRepository

Nesse desafio deve ser implementado na classe OrderRepository todos os métodos definidos pelo OrderRepositoryInterface.
A implementação deve ser feita utilizando TDD.

# Desafio para implementação dos eventos de Customer
O primeiro evento deverá acontecer quando um novo Customer é criado. Nesse ponto, crie 2 handlers exibindo um "console.log". 

Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: CustomerCreated".
Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: CustomerCreated". 
O segundo evento deverá ser disparado quando o endereço do Customer é trocado (método changeAddress()). Nesse caso, o ID, Nome, bem como os dados do endereço devem ser passados ao evento.

Handler: EnviaConsoleLogHandler. Mensagem: "Endereço do cliente: {id}, {nome} alterado para: {endereco}".
