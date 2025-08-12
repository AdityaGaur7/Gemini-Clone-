# Gemini Clone - AI Chat Application

A fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat application. This project demonstrates modern React/Next.js development with comprehensive UX/UI features.

## 🌟 Features

### Authentication
- **OTP-based Login/Signup** with country code selection
- **Country Data Integration** from restcountries.com API
- **Form Validation** using React Hook Form + Zod
- **Simulated OTP** sending and verification with setTimeout

### Dashboard
- **Chatroom Management** - Create, delete, and organize conversations
- **Search Functionality** - Debounced search to filter chatrooms
- **Toast Notifications** - Real-time feedback for all actions
- **Responsive Design** - Works seamlessly on desktop and mobile

### Chat Interface
- **Real-time Messaging** - User and AI message exchange
- **Typing Indicators** - "Gemini is typing..." with animated dots
- **Auto-scroll** - Automatically scrolls to latest messages
- **Infinite Scroll** - Simulated pagination for older messages
- **Image Upload** - Support for image sharing (base64 preview)
- **Copy to Clipboard** - Hover to copy message content
- **Timestamps** - Message timing with proper formatting

### Global Features
- **Dark Mode Toggle** - Complete theme switching
- **Mobile Responsive** - Optimized for all screen sizes
- **Local Storage** - Persistent authentication and chat data
- **Loading States** - Skeleton loaders and loading indicators
- **Keyboard Accessibility** - Full keyboard navigation support
- **Toast Notifications** - Success, error, and info messages

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Utilities**: clsx, tailwind-merge

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gemini-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
gemini-clone/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── chat/             # Chat interface components
├── lib/                  # Utility functions
│   ├── api.ts           # API functions
│   ├── utils.ts         # Helper functions
│   └── validations.ts   # Zod schemas
├── store/               # State management
│   └── useStore.ts      # Zustand store
├── types/               # TypeScript types
│   └── index.ts         # Type definitions
└── public/              # Static assets
```

## 🔧 Implementation Details

### State Management (Zustand)
- **Persistent Storage**: User data and chatrooms saved to localStorage
- **Real-time Updates**: Immediate UI updates for all actions
- **Type Safety**: Full TypeScript integration

### Form Validation (React Hook Form + Zod)
- **Phone Validation**: Country code + phone number format
- **OTP Validation**: 6-digit numeric input
- **Message Validation**: Content length and format
- **Real-time Feedback**: Instant validation errors

### Authentication Flow
1. **Phone Input**: Country selection + phone number
2. **OTP Send**: Simulated API call with loading state
3. **OTP Verification**: 6-digit input with auto-focus
4. **User Creation**: Automatic user object creation
5. **Redirect**: Seamless navigation to dashboard

### Chat Features
- **Message Handling**: User and AI message types
- **Image Upload**: File validation and base64 conversion
- **Typing Simulation**: Realistic AI response delays
- **Auto-scroll**: Smooth scrolling to new messages
- **Copy Functionality**: Clipboard API integration

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoint System**: Tailwind responsive classes
- **Touch Friendly**: Proper touch targets and gestures
- **Dark Mode**: Complete theme system

## 🎨 UI/UX Features

### Dark Mode
- **System Preference**: Respects user's OS preference
- **Manual Toggle**: Persistent theme selection
- **Smooth Transitions**: Animated theme switching

### Loading States
- **Skeleton Loaders**: Placeholder content while loading
- **Spinner Animations**: Loading indicators
- **Typing Indicators**: Animated dots for AI responses

### Notifications
- **Toast System**: Non-intrusive notifications
- **Success Messages**: Green toasts for positive actions
- **Error Handling**: Red toasts for errors
- **Auto-dismiss**: Automatic cleanup

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus indicators
- **Screen Reader**: Semantic HTML structure
- **Color Contrast**: WCAG compliant colors

## 🔄 Data Flow

1. **Authentication** → Store user data in Zustand
2. **Chatroom Creation** → Add to store, update localStorage
3. **Message Sending** → Add to chatroom, trigger AI response
4. **AI Response** → Simulated delay, add to chatroom
5. **State Persistence** → Automatic localStorage sync

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Netlify
1. Connect repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

## 📱 Mobile Features

- **Touch Optimized**: Large touch targets
- **Swipe Gestures**: Intuitive navigation
- **Responsive Layout**: Adaptive to screen size
- **Performance**: Optimized for mobile devices

## 🔒 Security Features

- **Input Validation**: All user inputs validated
- **File Upload Limits**: 5MB image size limit
- **XSS Prevention**: Safe content rendering
- **CSRF Protection**: Form validation

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Form Validation**: Real-time input validation
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations
- **Fallback UI**: Graceful degradation

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js image optimization
- **Lazy Loading**: Components loaded on demand
- **Debounced Search**: Optimized search performance
- **Throttled AI Responses**: Controlled response timing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
