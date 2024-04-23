import { createEffect } from "solid-js";
import { resultFormStore, setResultFormStore } from "../stores/resultFormStore";

type Props = {
  initialValue: string;
};

const CurrentConversionRateInput = (props: Props) => {
  createEffect(() => {
    if (props.initialValue) {
      setResultFormStore("current_conversion_rate", props.initialValue);
    }
  });
  return (
    <input
      type="text"
      min="0"
      max="100"
      step="1"
      placeholder="0"
      name="current_conversion_rate"
      id="current_conversion_rate"
      aria-describedby="current_conversion_rate"
      // autocomplete="current_conversion_rate"
      class="focus:ring-contrast block w-full rounded-xl border-0 bg-white/10 py-1.5 pr-8 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
      value={resultFormStore.current_conversion_rate || props.initialValue}
      onChange={(e) => {
        setResultFormStore("current_conversion_rate", e.currentTarget.value);
      }}
    />
  );
}

export default CurrentConversionRateInput;