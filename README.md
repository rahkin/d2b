# D2B - Design to Business Platform

A comprehensive platform that bridges the gap between designers and businesses, providing tools for portfolio management, project collaboration, and marketplace integration.

## 🚀 Features

- **Designer Dashboard**: Portfolio management and project overview
- **AI Tools Integration**: Advanced design assistance tools
- **Marketplace**: Connect designers with businesses
- **Authentication System**: Secure user management
- **Payment Integration**: Seamless payment processing
- **Modern UI/UX**: Built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express
- **Authentication**: Custom auth system
- **State Management**: React Context API
- **Internationalization**: next-i18next

## 📁 Project Structure

```
d2b/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── designer/          # Designer dashboard
│   └── globals.css        # Global styles
├── backend/               # Express server
│   ├── routes/            # API routes
│   └── server.js          # Server entry point
├── components/            # Reusable React components
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page components
│   └── layout/            # Layout components
├── store/                 # Context providers
├── types/                 # TypeScript type definitions
└── projectDocs/           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd d2b
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The project uses a custom color palette and design system. See `COLOR_PALETTE.md` for detailed design specifications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please open an issue in the GitHub repository. 