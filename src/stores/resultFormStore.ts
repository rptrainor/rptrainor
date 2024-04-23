import { createStore } from "solid-js/store";

type Props = {
  current_conversion_rate: string | undefined;
  current_conversion_value: string | undefined;
  current_monthly_traffic: string | undefined;
};

const [resultFormStore, setResultFormStore] = createStore<Props>({
  current_conversion_rate: undefined,
  current_conversion_value: undefined,
  current_monthly_traffic: undefined,
});

export { resultFormStore, setResultFormStore };