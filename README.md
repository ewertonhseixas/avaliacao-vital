# Avaliação Vital - Sistema de Automação Biomecânica

**Acesse o aplicativo online:** [https://ewertonhseixas.github.io/avaliacao-vital/](https://ewertonhseixas.github.io/avaliacao-vital/)

O **Avaliação Vital** é uma aplicação web voltada para a análise biomecânica e postural. O sistema permite o registro de medidas angulares de diferentes articulações durante a execução de movimentos, avaliando o desempenho do atleta/paciente com base em valores de referência consolidados.

## 🚀 Funcionalidades

- **Registro de Avaliação:** Identificação do atleta e data da coleta.
- **Múltiplas Vistas Analíticas:**
  - **Vista Lateral (Lat.):** Avaliação de inclinação anterior do tronco, flexão/extensão do quadril e flexão/extensão do joelho.
  - **Vista Posterior (Post.):** Avaliação de inclinação lateral do tronco, queda da pelve e valgo do joelho.
  - **Step Down (SD):** Avaliação de inclinação lateral do tronco, queda da pelve e valgo dinâmico do joelho durante a descida de degrau.
- **Geração de Relatórios Automáticos:** O sistema processa os ângulos informados e os compara com valores de referência da literatura (baseados em Perry & Burnfield, 2010).
- **Feedback Visual de Status:** Indicadores automáticos ("Dentro" ou "Fora" do padrão) com sinalização em cores (verde/vermelho).
- **Exportação Fácil:** Botão dedicado para copiar a tabela de resultados com formatação limpa (fonte tamanho 12, alinhamento corrigido), ideal para colar diretamente em editores de texto como Microsoft Word ou Google Docs sem perder o formato.
- **Interface Responsiva e Moderna:** Design premium "dark mode" com elementos "glassmorphism", ideal para uso em tablets e celulares na rotina clínica.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e acessível.
- **CSS3:** Estilização moderna, variáveis nativas (Custom Properties), layout flexível, animações suaves e design responsivo.
- **JavaScript (Vanilla):** Lógica de estado da aplicação, cálculo de tolerâncias referenciais e manipulação da área de transferência (Clipboard) para exportação de dados.
- **FontAwesome:** Ícones vetoriais embutidos para melhor experiência do usuário (UX).

## 📚 Como Usar

1. Acesse o [link do projeto](https://ewertonhseixas.github.io/avaliacao-vital/).
2. Insira o **Nome** e a **Data** na tela inicial para liberar a avaliação.
3. Navegue entre as abas (`Lat.`, `Post.` e `Step Down`) e insira os ângulos medidos na avaliação clínica.
4. Clique em **Gerar Relatório** no rodapé fixo.
5. O relatório apresentará os cálculos. Se desejar exportar, clique em **Copiar Tabela** e cole (Ctrl+V) no seu documento de texto.
6. Clique em **Nova Avaliação** para reiniciar o processo.

## 📝 Referências
Os cálculos normativos embutidos no sistema têm como base referencial:
- *Perry, J., & Burnfield, J. M. (2010). Gait analysis: normal and pathological function.*

---

*Desenvolvido para facilitar a rotina de avaliações biomecânicas.*
