# FACTORIO-DEDICATED-SERVER-TUI
**FACTORIO DEDICATED SERVER TUI** é um projeto de **interface em modo texto (TUI/CLI)** e **ferramenta CMD** criado para **automatizar, gerenciar e monitorar servidores dedicados de Factorio** de forma simples, rápida e confiável em ambientes Windows.

O projeto foi desenvolvido com foco em **administração de servidores**, eliminando tarefas repetitivas e reduzindo falhas humanas ao iniciar, reiniciar ou supervisionar um servidor dedicado.

---

## Descrição do Projeto

O **Factorio Dedicated Server TUI** fornece uma interface interativa no terminal que centraliza todas as operações essenciais de um servidor dedicado de Factorio. A aplicação permite iniciar servidores com saves específicos, retomar o último save automaticamente, acompanhar logs em tempo real e utilizar um sistema de **watchdog** para reinício automático em caso de falhas.

A ferramenta utiliza diretamente o **executável oficial do Factorio**, respeitando a estrutura padrão do jogo (binários, saves e arquivos de configuração), sem modificações invasivas. O objetivo é oferecer um **painel de controle leve**, ideal para servidores locais, dedicados ou hospedados remotamente via acesso por terminal.

---

## Interface TUI

A interface exibe informações críticas do servidor de forma clara:

* Caminho do executável do servidor
* Diretório de saves
* Arquivo de configurações do servidor
* Lista de comandos nativos do Factorio
* Menu interativo por opções numéricas

Exemplo de funcionalidades disponíveis no menu:

* Iniciar servidor com save fixo
* Iniciar servidor usando o último save
* Watchdog com reinício automático
* Visualização de logs
* Encerramento seguro do servidor

Tudo é feito diretamente pelo **CMD**, sem necessidade de interface gráfica.

---

## Funcionalidades Principais

* Automação completa do servidor dedicado de Factorio
* Interface TUI simples e intuitiva
* Inicialização por save específico ou último save
* Watchdog para reinício automático em caso de crash
* Visualização de logs em tempo real
* Encerramento seguro do processo do servidor
* Integração direta com comandos internos do Factorio
* Baixo consumo de recursos

---

## Objetivo

Facilitar a vida de administradores de servidores de Factorio, oferecendo uma solução prática, leve e eficiente para **controle total do servidor via terminal**, ideal para ambientes headless, servidores domésticos ou VPS.

---

## Pontos Positivos

* Não depende de interface gráfica
* Reduz erros operacionais
* Fácil de manter e expandir
* Ideal para automação e scripts
* Organização clara das informações do servidor
* Compatível com a estrutura oficial do Factorio
