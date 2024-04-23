import { createStore } from "solid-js/store";

const [resultFormStore, setResultFormStore] = createStore({
  current_conversion_rate: "2",
  current_conversion_value: "42",
  current_monthly_traffic: "1680",
});

export { resultFormStore, setResultFormStore };