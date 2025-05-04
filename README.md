# Country Explorer React Application

## Student Details
- **Student ID**: IT22097224
- **Student Name**: Meegama D M

## Overview
Country Explorer is a modern React application that leverages the [REST Countries API](https://restcountries.com/) to provide comprehensive information about countries worldwide. The application features user authentication via Firebase and a responsive Material UI interface.

## URL
[Project URL](https://explorenation-d16e0.web.app)

## Features
### Core Functionality
- Search countries by name with real-time filtering
- Filter countries by region
- View detailed country information:
  - Official name and common name
  - Capital city
  - Geographic region
  - Population statistics
  - Spoken languages
  - National flag
- Secure user authentication

### User Experience
- Responsive design for all device sizes
- Intuitive navigation and search
- Real-time data updates
- Error handling and loading states
- Session persistence

## Technologies Used
### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Material UI v5
- **State Management**: React Context API
- **Routing**: React Router v6
- **Alerts**: SweetAlert

### Backend & Services
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **API**: REST Countries API
- **HTTP Client**: Axios

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Vite
- **Testing**: Jest & React Testing Library
- **Code Quality**: ESLint & Prettier

## Installation and Setup
1. Clone the repository:
```bash
git clone https://github.com/your-username/country-explorer.git
cd country-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Add configuration details to `.env`

4. Start development server:
```
npm run dev
```

## API Integration
The application integrates with the REST Countries API through:
- Centralized service layer for API calls
- Type-safe responses using TypeScript interfaces
  <ul>
▪ GET /all – to get a list of all countries. 
▪ GET /name/{name} – to search a country by its name. 
▪ GET /region/{region} – to get countries from a specific region. 
▪ GET /alpha/{code} – to get full details using a country code. 
  </ul>

## Session Management
User sessions are managed using Firebase Authentication:
- Secure login/logout functionality
- Session persistence
- Protected routes
- User state management via Context API

## Testing
### Unit Tests
- Component testing with Jest and React Testing Library
- Service layer testing
- Utility function testing

### Integration Tests
- API integration testing
- Authentication flow testing
- User journey testing

Run tests:
```bash
npm test                 # Run all tests
```

## Challenges Faced & Solutions
Since this is the first time I used firebase authentication and hosting, I faced challenges when configuring it to my project

## Future Enhancements
- [ ] Implement dark mode
- [ ] Add country comparison feature
- [ ] Support multiple languages

## Contribution
Contributions are welcome! 

## Acknowledgements
- [REST Countries API](https://restcountries.com/) for providing the data
- [Material UI](https://mui.com/) for the UI components
- [Firebase](https://firebase.google.com/) for authentication and hosting

---
© 2025 Country Explorer. Created as part of coursework at SLIIT.
