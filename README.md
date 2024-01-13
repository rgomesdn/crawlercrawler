# crawler
Typescript crawler

1. Preparação do Ambiente LINUX:
	1. sudo apt update
	2. sudo apt install nodejs
	3. sudo apt install git
	4. Para instalação e configuração do mariadb segue link:
		https://docs.vultr.com/install-mariadb-on-ubuntu?ref=9141995&utm_source=performance-max-latam&utm_medium=paidmedia&obility_id=17096555207&utm_adgroup=&utm_campaign=&utm_term=&utm_content=&ref=9141995&gclid=Cj0KCQiAhomtBhDgARIsABcaYynVLmIlTNEh8A_pkBBsV5L_7U0u54F9Y8794Lv-EkKunMd9kt6zIYIaAjUoEALw_wcB
	5. Clone o repositório do projeto
	6. Abra o arquivo db.js do projeto e insira login, senha e host do banco de dados
	7. Abra o terminal e acessa a pasta do projeto. Execute o comando npm install
	8. Para executar o crawler rode o comando abaixo: 
		npx ts-node index.ts
	
	
	
	Erros ao instalar dependências ( Testes em virtualbox UBUNTU 2.04.3).
	Se o erro (vbox is not in the sudoers file) ocorrer, execute os abaixo:
		1. su + seu_usuario
		2. digite sua senha de login do ubuntu
		3. sudo nano /etc/sudoers (Para editar o arquivo de permissões de usuários)
		4. Encontre a linha onde se encontra a frase: ==> %sudo ALL=(ALL:ALL) ALL
		5. Escreva o seguinte texto abaixo da linha descrita no passo 4: 
			seu_usuario_ubuntu ALL=(ALL) ALL (Agora seu user terá acesso root)
		6. Ctrl + O e aperte Enter. (Salvar)
		7. Ctrl + X. (Fechar)
		8. Ctrl + D. (Sair do modo root)
		