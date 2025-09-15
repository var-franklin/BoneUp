import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

	const value = "Hello from context!";

	return (
		<AppContext.Provider value={{value}}>
			{props.children}
		</AppContext.Provider>
	);
};

