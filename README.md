# 📝 noteSync

## Live Link - https://note-sync-five.vercel.app/

**An AI-Powered Notion Clone with Real-time Collaboration**

noteSync is a modern, feature-rich document collaboration platform that combines the power of AI with seamless real-time editing capabilities. Built with cutting-edge technologies, it offers an intuitive workspace where teams can create, collaborate, and enhance their documents with intelligent AI assistance.

## 🌟 Features

### 🤖 AI-Powered Capabilities
- **Intelligent Document Chat**: Ask questions about your document content and get instant, contextual answers
- **Multi-language Translation**: Translate document summaries into 11 languages including English, Spanish, Portuguese, French, German, Chinese, Arabic, Hindi, Russian, Japanese, and Marathi
- **Smart Summarization**: Generate concise summaries of your documents using advanced AI models
- **Powered by Cloudflare Workers AI**: Leveraging enterprise-grade AI infrastructure for reliable performance

### 🔄 Real-time Collaboration
- **Live Cursors**: See exactly where your collaborators are working in real-time
- **Live Rich Text Editing**: Multiple users can edit the same document simultaneously without conflicts
- **Presence Indicators**: View the number of active users and their avatars
- **Color-coded Collaboration**: Each user gets a unique color for easy identification
- **Conflict-free Editing**: Powered by Liveblocks for seamless collaborative experience

### 📄 Document Management
- **Create & Delete Documents**: Full CRUD operations for document management
- **Ownership Controls**: Only document owners can delete documents or manage collaborators
- **Invitation System**: Invite team members to collaborate on specific documents
- **BlockNote Editor**: Rich text editing with a modern, intuitive interface
- **Multiple Documents**: Users can manage multiple documents in their workspace

### 🔐 Security & Authentication
- **Secure Authentication**: Powered by Clerk for reliable user management
- **Protected Routes**: All features require authentication
- **Role-based Access**: Document owners have special privileges

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production-ready applications
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible UI components
- **BlockNote Editor** - Rich text editing capabilities

### Backend & Services
- **Firebase** - Database and backend services
- **Liveblocks** - Real-time collaboration infrastructure
- **Cloudflare Workers** - AI backend and edge computing
- **Hono** - Lightweight web framework for AI endpoints
- **Clerk** - Authentication and user management

### AI Models
- **@cf/facebook/bart-large-cnn** - Document summarization
- **@cf/meta/m2m100-1.2b** - Multi-language translation
- **Gemini** - Conversational AI for document chat

### Deployment
- **Vercel** - Frontend hosting and deployment
- **Cloudflare Workers** - AI backend deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account
- Clerk account
- Cloudflare account
- Liveblocks account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/piyushpawar079/noteSync.git
   cd noteSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   # ... other Firebase config

   # Liveblocks
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
   LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key

   # Cloudflare Workers
   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Creating Documents
1. Sign in with your account
2. Click "New Document" to create a new document
3. Start typing in the BlockNote editor
4. Your document is automatically saved

### Collaborating
1. Open a document you own
2. Click "Invite" to add collaborators
3. Collaborators can edit in real-time

### AI Features
1. **Chat with Document**: Use the chat interface to ask questions about your document
2. **Translate Summary**: Generate and translate document summaries into different languages
3. **Get Insights**: Ask the AI to analyze or explain parts of your document

## 🔧 API Endpoints

### Cloudflare Workers Endpoints
- `POST /api/summarize` - Generate document summary
- `POST /api/translate` - Translate text to specified language
- `POST /api/chat` - Chat with document content

## 📞 Support

For support, email piyushpawar079@gmail.com.

---

**Built with ❤️ using Next.js, Cloudflare Workers AI, and Liveblocks**