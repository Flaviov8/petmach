# PetMatch - Site de Adoção de Animais

Um site moderno de adoção de animais com mecânica similar ao Tinder, desenvolvido com HTML5, CSS puro e JavaScript vanilla.

## 🚀 Características

- **Interface Swipe**: Arraste para a direita (👍 Quero adotar) ou esquerda (👎 Não quero)
- **Design Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis
- **Visual Moderno**: Design limpo com gradientes e animações suaves
- **Sistema de Match**: Modal de confirmação quando demonstra interesse em adotar
- **Integração WhatsApp**: Botão direto para conversar com o tutor
- **Código Minimalista**: Apenas HTML, CSS e JavaScript vanilla

## 📁 Estrutura do Projeto

```
src/
├── index.html          # Página principal
├── style.css          # Estilos CSS
├── script.js          # Funcionalidades JavaScript
└── assets/
    └── images/        # Imagens dos animais
        ├── cachorro1.jpeg
        ├── cachorro2.jpg
        ├── gato1.jpg
        ├── gato2.jpg
        └── ...
```

## 🎯 Funcionalidades

### Interface Principal
- Cards de animais com foto, nome, idade e descrição
- Botões de ação (❌ Não / ❤️ Adotar)
- Animações fluidas de swipe

### Sistema de Match
- Modal de confirmação ao demonstrar interesse
- Botão direto para WhatsApp do tutor
- Opção de continuar procurando

### Navegação
- Suporte a gestos de swipe (arrastar)
- Botões para quem prefere não usar gestos
- Tela de "fim dos pets" com opção de reiniciar

## 🛠️ Como Usar

1. **Abrir o site**: Abra o arquivo `index.html` em qualquer navegador moderno
2. **Navegar pelos pets**: Use os botões ou arraste os cards
3. **Demonstrar interesse**: Clique em "❤️ Adotar" ou arraste para a direita
4. **Contatar tutor**: Use o botão WhatsApp no modal de match
5. **Continuar procurando**: Clique em "Continuar procurando" ou "Ver novamente"

## 🎨 Personalização

### Adicionar Novos Animais
Edite o array `pets` no arquivo `script.js`:

```javascript
const pets = [
    {
        id: 9,
        name: "Nome do Pet",
        age: "Idade",
        description: "Descrição do animal",
        image: "assets/images/foto.jpg",
        whatsapp: "5511999999999"
    }
    // ... mais pets
];
```

### Alterar Cores e Estilos
Modifique as variáveis CSS no arquivo `style.css`:

```css
/* Gradientes principais */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(135deg, #ff6b6b, #ffa726);
```

### Personalizar Mensagem WhatsApp
Altere a mensagem padrão no arquivo `script.js`:

```javascript
const whatsappMessage = encodeURIComponent(`Sua mensagem personalizada aqui!`);
```

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- **Desktop**: Layout otimizado para telas grandes
- **Tablet**: Interface adaptada para toque
- **Mobile**: Experiência completa em smartphones

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Flexbox, Grid, animações e responsividade
- **JavaScript ES6+**: Funcionalidades interativas
- **Google Fonts**: Tipografia Poppins

## 🌟 Recursos Especiais

- **Animações CSS**: Transições suaves e efeitos visuais
- **Touch Support**: Suporte completo a gestos de toque
- **Acessibilidade**: Suporte a navegação por teclado
- **Performance**: Carregamento otimizado de imagens
- **Cross-browser**: Compatível com navegadores modernos

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, você pode:
- Modificar o código conforme suas necessidades
- Adicionar mais animais editando o array de dados
- Personalizar cores e estilos no CSS
- Integrar com APIs de adoção reais

---

**Desenvolvido com ❤️ para conectar pets e famílias**

