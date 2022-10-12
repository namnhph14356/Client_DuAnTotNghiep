import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import persistor, { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import './index.css';
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { SWRConfig } from "swr";
import instance from "./api/instance";
import { PersistGate } from "redux-persist/integration/react";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig
          value={{
            fetcher: async (url) => instance.get(url),
          }}
        >
          <App />
        </SWRConfig>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
