import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/ui/Loading";
import { languageContext, languageList, LanguageProps } from "./context/LanguageContext";
import ProductAppStyles from "./index.module.scss";
import Routes from "./routes";

function App() {
  const [lang, setSelectedLanguage] = useState<LanguageProps>("en");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const lang = event.target.value as LanguageProps;
    setSelectedLanguage(lang);
  };

  return (
    <languageContext.Provider
      value={{
        language: lang,
        setState: setSelectedLanguage,
      }}
    >
        <div>
          <select onChange={handleLanguageChange} className={ProductAppStyles.language}>
            {languageList.map((item) => {
              return (
                <option key={item} selected={item==='en'} defaultValue="en" value={item}>
                  {item.toUpperCase()}
                </option>
              );
            })}
          </select>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={Routes} />
          </Suspense>
        </div>
    </languageContext.Provider>
  );
}

export default App;
