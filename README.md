# ⏱️ Pomodev (Pomodoro)

Um temporizador simples e elegante baseado na técnica Pomodoro, projetado para ajudar você a alternar entre períodos de foco intenso e descansos curtos. A interface muda de cor e tema dependendo do modo (Foco ou Descanso) e inclui um favicon dinâmico que exibe o tempo restante diretamente na aba do navegador.

## ✨ Funcionalidades

  * **Modo Foco:** Um temporizador padrão de 25 minutos para trabalho focado.
  * **Modo Descanso:** Um temporizador de 5 minutos para uma pausa curta.
  * **Controles Intuitivos:** Botões para Iniciar, Pausar e Reiniciar o ciclo.
  * **Design Adaptativo:** A cor primária e o gradiente de fundo mudam suavemente ao alternar entre os modos.
  * **Progresso Visual:** Um círculo de progresso em SVG que se completa à medida que o tempo passa.
  * **Favicon Dinâmico:** O ícone da aba do navegador é atualizado em tempo real, mostrando os minutos restantes e a cor do modo atual (Roxo para Foco, Verde para Descanso).
  * **Contador de Ciclos:** Acompanha quantos ciclos de foco você completou.
  * **Alerta Sonoro:** Um som é reproduzido quando um ciclo termina (requer o arquivo `alert.mp3`).
  * **Responsivo:** Funciona bem em dispositivos móveis e desktops.

## 💻 Tecnologias Utilizadas

  * **HTML5:** Para a estrutura da página.
  * **CSS3:** Para estilização, incluindo:
      * Variáveis CSS (Custom Properties) para fácil customização de temas.
      * Animações `@keyframes` para o gradiente de fundo.
      * SVG para os ícones e o círculo de progresso.
  * **JavaScript (Vanilla JS):** Para toda a lógica do temporizador, manipulação do DOM e geração dinâmica do favicon.

## 🚀 Como Executar

Por ser um projeto puramente front-end (HTML, CSS, JS), não é necessário um servidor ou processo de build.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Navegue até a pasta:**

    ```bash
    cd seu-repositorio
    ```

3.  **Adicione o som de alerta:**
    Este projeto espera um arquivo de áudio chamado `alert.mp3` na mesma pasta. Certifique-se de adicionar um arquivo com esse nome.

4.  **Abra o `index.html`:**
    Basta abrir o arquivo `index.html` diretamente no seu navegador de preferência (Chrome, Firefox, etc.).

## 📁 Estrutura do Projeto

```
/projeto-timer
├── index.html       (A estrutura da página)
├── style.css        (Os estilos)
├── script.js        (A lógica do timer e do favicon)
└── alert.mp3        (O som de alerta - necessário)
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar como desejar.
