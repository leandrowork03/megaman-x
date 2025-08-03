
# Mega Man X: Maverick Hunter Saga

Bem-vindo ao **Mega Man X: Maverick Hunter Saga**!  
Este é um projeto de fã, feito com carinho para os amantes da clássica franquia da Capcom, Mega Man X.  
Mergulhe em uma experiência que combina a emoção de batalhas contra Mavericks, uma exploração rica da história e um sistema de autenticação robusto para personalizar sua jornada.

Prepare-se para reviver a glória dos Maverick Hunters!

---

## 🌟 Recursos em Destaque

- **Boss Rush Interativo**  
  Enfrente os icônicos Mavericks em uma sequência desafiadora. Utilize as fraquezas elementais de cada chefe para garantir sua vitória!

- **Sistema de Batalha Dinâmico**  
  Um sistema de combate simples, mas eficaz, que simula o confronto direto, onde a escolha da arma certa é crucial.

- **Desbloqueio do Sigma**  
  Somente os Maverick Hunters mais dedicados, que derrotarem todos os chefes, terão a chance de enfrentar o temível Sigma.

- **Autenticação de Usuários**  
  Crie sua conta ou faça login para ter uma experiência personalizada. Há uma mensagem especial esperando por você!

- **Jornada pela História**  
  Explore a rica e fascinante lore do universo de Mega Man X em uma seção dedicada.

- **Experiência Imersiva**  
  Uma introdução cinematográfica envolvente e animações fluidas para te transportar diretamente para o mundo de Mega Man X.

- **Design Responsivo**  
  Jogue e explore o site em qualquer dispositivo, seja desktop, tablet ou celular.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias de ponta:

- **Next.js** – Framework React para aplicações web modernas e performáticas.  
- **React** – Biblioteca JavaScript para construção de interfaces interativas.  
- **TypeScript** – Superset do JavaScript com tipagem estática.  
- **Tailwind CSS** – Framework CSS utilitário para estilização rápida e personalizável.  
- **Framer Motion** – Biblioteca de animação usada para transições fluidas.  
- **Firebase**  
  - Firebase Authentication: Autenticação de usuários.  
  - Firestore: Banco de dados NoSQL.  
- **React Hook Form** – Gerenciamento de formulários com validação eficiente.  
- **Zod** – Validação de dados integrada ao React Hook Form.

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Clone o Repositório:

```bash
git clone https://github.com/leandrowork03/mega-man-x-maverick-hunter-saga.git
cd mega-man-x-maverick-hunter-saga
```

### 2. Instale as Dependências:

```bash
npm install
# ou
yarn install
```

### 3. Configure o Firebase

Crie um projeto no [Firebase](https://console.firebase.google.com) e adicione suas credenciais no arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_Messaginger_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 4. Inicie o Servidor de Desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O app estará disponível em `http://localhost:3000`.

---

## 🎮 Como Jogar e Navegar

- **Introdução**  
  Ao acessar o site, você será recebido por uma introdução cinematográfica. Você pode esperar ou pular.

- **Jogar**  
  Clique em **"Venha jogar!"** para iniciar o modo Boss Rush. Escolha suas armas com sabedoria!

- **Registro/Login**  
  Crie uma conta ou faça login para ter acesso a recursos exclusivos.

- **História**  
  Acesse a seção de história clicando em **"Veja a história"**.

---

## 📁 Estrutura do Projeto

```plaintext
.
├── public/
│   ├── images/      # Imagens dos personagens e do jogo
│   └── videos/      # Vídeo de introdução
├── src/
│   ├── app/         # Páginas do Next.js
│   ├── components/  # Componentes reutilizáveis
│   ├── context/     # Contexto global (ex: autenticação)
│   ├── data/        # Dados dos chefes e do Sigma
│   ├── lib/         # Configuração do Firebase
│   └── utils/       # Funções auxiliares (ex: sistema de batalha)
└── ... outros arquivos de configuração
```

---

## 🤝 Contribuições

Contribuições são sempre bem-vindas!  
Siga os passos abaixo:

1. Fork o repositório.  
2. Crie uma branch:  
   ```bash
   git checkout -b feature/sua-feature
   ```
3. Faça suas alterações e commit:  
   ```bash
   git commit -m 'feat: Adiciona nova feature'
   ```
4. Dê push na sua branch:  
   ```bash
   git push origin feature/sua-feature
   ```
5. Abra um Pull Request.

---

## 📜 Licença

Este projeto é um trabalho de fã e **não é afiliado à Capcom**.  
O código-fonte está licenciado sob a **licença MIT**.

---

## 🙏 Agradecimentos

- À **Capcom**, por criar a lendária franquia Mega Man X.  
- Às comunidades e desenvolvedores das bibliotecas utilizadas, que tornaram este projeto possível.

---

## ✉️ Contato

- **LinkedIn**: [Leandro Santos](https://www.linkedin.com/in/leandro-santos)  
- **GitHub**: [leandrowork03](https://github.com/leandrowork03)  
- **Email**: leandrotrabalho03@gmail.com  
- **WhatsApp**: +55 (51) 98212-6888
