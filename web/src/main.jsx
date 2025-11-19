//file path: web/src/main.jsx

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ThemeProvider>
			<AppContextProvider>
				<App />
			</AppContextProvider>
		</ThemeProvider>
	</BrowserRouter>
)