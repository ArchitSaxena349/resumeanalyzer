# Resume Analyzer

A modern Next.js application for analyzing resumes using AI-powered tools. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Secure user authentication with Clerk
- 📄 **File Upload**: Easy PDF upload with UploadThing
- 🤖 **AI Analysis**: Dual AI analysis using OpenAI GPT-4 and Google Gemini
- 📊 **ATS Scoring**: Applicant Tracking System compatibility scoring
- 🎯 **Keyword Analysis**: Identifies present and missing keywords
- 💡 **Suggestions**: Actionable recommendations for resume improvement
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔔 **Notifications**: Toast notifications with Sonner

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **File Upload**: UploadThing
- **AI Services**: OpenAI GPT-4, Google Gemini
- **UI Components**: Radix UI, Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for OpenAI and Google Gemini
- Clerk account for authentication
- UploadThing account for file uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Update the `.env` file with your actual API keys:
   ```env
   # Clerk Authentication (already configured)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YmVjb21pbmctb3J5eC0yNS5jbGVyay5hY2NvdW50cy5kZXYk
   CLERK_SECRET_KEY=sk_test_xZi5LUSoHCGviWTFBk6zKcmKINrowlFuGGvnqzvSo9

   # AI Services - Replace with your actual keys
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here

   # UploadThing - Replace with your actual credentials
   UPLOADTHING_SECRET=your_uploadthing_secret_here
   UPLOADTHING_TOKEN=base64_encoded_json_token
   UPLOADTHING_APP_ID=your_uploadthing_app_id_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### ⚠️ Important Notes

- **Clerk Authentication**: Already configured and working
- **UploadThing**: You'll need to sign up at [uploadthing.com](https://uploadthing.com) and get your credentials
- **OpenAI**: Get your API key from [platform.openai.com](https://platform.openai.com)
- **Google Gemini**: Get your API key from [ai.google.dev](https://ai.google.dev)

### 🔍 Configuration Status

Visit `/status` in your application to check which services are properly configured.

### 🛠️ Troubleshooting

- **Hydration Errors**: The app includes built-in hydration error suppression for browser extensions
- **UploadThing Errors**: The app gracefully handles missing UploadThing configuration
- **API Key Issues**: Check the status page for configuration guidance

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # Page-specific components
│   ├── (logged-in)/       # Protected routes
│   └── ...
├── components/            # Reusable components
│   ├── common/           # Common components
│   ├── ui/               # UI components
│   └── upload/           # Upload-related components
├── lib/                  # Utility libraries
│   ├── openai.ts         # OpenAI integration
│   ├── gemnai.ts         # Gemini integration
│   └── ...
├── utils/                # Utility functions
└── actions/              # Server actions
```

## API Endpoints

- `GET /api/analyze-resume?key={fileKey}` - Analyze uploaded resume
- `POST /api/uploadthing` - Handle file uploads

## Features in Detail

### Resume Analysis
- **ATS Score**: Compatibility score with Applicant Tracking Systems
- **Dual AI Analysis**: Comprehensive analysis from both OpenAI and Gemini
- **Keyword Extraction**: Identifies relevant skills and missing keywords
- **Improvement Suggestions**: Actionable recommendations

### File Upload
- Secure file upload with UploadThing
- PDF format support
- File size limit: 8MB
- Automatic processing after upload

### Authentication
- Secure authentication with Clerk
- Protected routes for logged-in users
- User session management

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.