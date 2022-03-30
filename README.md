Este projeto é o back-end de um sistema para o gerenciamento de tarefas.

A API desenvolvida em NodeJS tem a responsabilidade de intermediar as requisições feitas pelo pelo client ( API do front-end ) e encaminhá-las ao database.

Nas issues estão listadas as tarefas do back-end e seu andamento.

Pré-requisitos
- Instalar o docker (baseado no Ubuntu 20.04)
    sudo apt update
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
    apt-cache policy docker-ce
    sudo apt install docker-ce
    sudo systemctl status docker (confirmar status do serviço)
