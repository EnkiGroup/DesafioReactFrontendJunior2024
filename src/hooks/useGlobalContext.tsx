import { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext";

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
