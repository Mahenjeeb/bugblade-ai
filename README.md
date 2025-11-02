# 🐛 BugBlade AI

> **Intelligent Code Review & Bug Detection Platform**

BugBlade AI is a modern web application that leverages AI to automatically review your code, detect bugs, and suggest optimizations in real-time. Built with React, Monaco Editor, OpenAI's GPT-5, and puter.js API, it provides instant feedback to help you write cleaner, more efficient code.

![BugBlade AI](https://img.shields.io/badge/BugBlade-AI-blue?style=for-the-badge&logo=bug)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--5-412991?style=for-the-badge&logo=openai)

## ✨ Features

- 🔍 **Real-time Code Analysis** - Get instant feedback as you code
- 🐛 **Bug Detection** - Identify potential bugs and issues automatically
- ⚡ **Performance Optimization** - Receive suggestions for code improvements
- 🎨 **Modern UI** - Clean, intuitive interface with Monaco Editor
- 🌐 **Multi-language Support** - Works with JavaScript, Python, Java, and more
- 🤖 **AI-Powered** - Powered by OpenAI's GPT-5 for intelligent analysis
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start
### Prerequisites

- Node.js (v16 or higher)
- npm (v7+ recommended for workspaces) or yarn

### Installation (monorepo: client + server)

1. Clone the repository:

```powershell
git clone https://github.com/Mahenjeeb/bugblade-ai.git
cd bugblade-ai
```

2. Install dependencies (at repo root). This uses npm workspaces which will install both `client` and `server` deps:

```powershell
npm install
```

3. Create env files from the examples:

```powershell
copy client\.env.example client\.env
copy server\.env.example server\.env
# Then edit client\.env and server\.env and fill in real values (do NOT commit secrets)
```

4. Start client and server in development (two options):

- Start client only:

```powershell
npm run dev
```

- Start server only:

```powershell
npm run server:dev
```

- Start both together (root `npm start` uses `concurrently`):

```powershell
npm start
```

5. Open your browser:

Client (Vite): http://localhost:5173 (or http://localhost:3000 if your setup uses that port)

API (server): http://localhost:5000 (default)

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Monaco Editor** - Professional code editor (same as VS Code)
- **Axios** - HTTP client for API requests
- **puter.js API** - Cloud development platform integration

### Development Tools
- **ESLint** - Code linting and formatting
- **JavaScript** - Type safety (dev dependencies)

## 📁 Project Structure

```
bugblade-ai/
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── context/          # React context providers
│   ├── data/             # Configuration files
│   ├── hooks/            # Custom React hooks
│   └── App.jsx           # Main app component
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎯 How It Works

1. **Code Input** - Write or paste your code in the Monaco Editor
2. **Language Selection** - Choose your programming language
3. **AI Analysis** - BugBlade AI sends your code to OpenAI's GPT-5 via puter.js API
4. **Instant Feedback** - Receive detailed analysis and suggestions
5. **Iterate** - Apply suggestions and get continuous feedback

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Build
npm run build        # Build for production

# Code Quality
npm run lint         # Run ESLint
```

## 🌟 Usage Examples

### JavaScript Code Review
```javascript
// Example code that BugBlade AI will analyze
function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {  // Bug: should be < not <=
    sum += arr[i];
  }
  return sum;
}
```

### Python Code Review
```python
# Example Python code
def find_max(numbers):
    max_num = numbers[0]  # Potential bug: empty list will fail
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT-5 API
- [puter.js](https://puter.com/) for the cloud development platform API
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the excellent code editor
- [React](https://reactjs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support
-
- **Issues**: [GitHub Issues](https://github.com/Mahenjeeb/bugblade-ai/issues)
 
## 🔐 Git, .gitignore & Environment files

This repository includes a recommended `.gitignore` (added at the project root) that excludes generated files and local secrets so you don't accidentally commit sensitive data.

Key things the `.gitignore` covers:

- `node_modules/` (root, `client/` and `server/`)
- Build output folders: `dist/`, `client/dist/`, `server/dist/`
- Vite cache (`.vite/`), editor folders (`.vscode/`, `.idea/`), OS files (`.DS_Store`, `Thumbs.db`)
- Local environment files: `.env`, `.env.local`, and other `.env.*` variants
- Firebase local emulator files (`.firebase/`) and debug logs

Environment file guidance

- Do NOT commit real secrets. Instead add a committed `*.env.example` with placeholder values and create the real `.env` locally from it.

Suggested example contents (placeholders) — create these files in the matching folders and commit the `*.env.example` files only:

client/.env.example
```
VITE_apiKey=your_api_key_here
VITE_projectId=your_project_id_here
VITE_appId=your_app_id_here
VITE_messagingSenderId=your_messaging_sender_id_here
```

server/.env.example
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
# add other server environment variables here
```

How to create your local env from the examples (PowerShell):

```powershell
copy client\.env.example client\.env
copy server\.env.example server\.env
# then edit client\.env and server\.env and fill in real values (do NOT commit these)
```

Quick check which files are ignored (helpful to confirm `.gitignore`):

```powershell
git status --ignored
# or check a specific file
git check-ignore -v client\.env
```

If you'd like, I can add example `client/.env.example` and `server/.env.example` files to the repo with the placeholder values. Just tell me to add them and I'll commit them for you.
- **Discussions**: [GitHub Discussions](https://github.com/Mahenjeeb/bugblade-ai/discussions)
- **Email**: mahenjeeb.biswal@gmail.com

---

<div align="center">

**Made with ❤️ by Mahenjeeb**

[![GitHub stars](https://img.shields.io/github/stars/Mahenjeeb/bugblade-ai?style=social)](https://github.com/Mahenjeeb/bugblade-ai)
[![GitHub forks](https://img.shields.io/github/forks/Mahenjeeb/bugblade-ai?style=social)](https://github.com/Mahenjeeb/bugblade-ai)
[![GitHub issues](https://img.shields.io/github/issues/Mahenjeeb/bugblade-ai)](https://github.com/Mahenjeeb/bugblade-ai/issues)

</div>
