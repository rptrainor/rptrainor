import { resultFormStore, setResultFormStore } from "../stores/resultFormStore";

const CurrentConversionValueInput = () => {
  return (
    <input
      type="text"
      name="current_conversion_value"
      id="current_conversion_value"
      class="focus:ring-contrast block w-full rounded-xl border-0 bg-white/10 py-1.5 pl-7 pr-12 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
      placeholder="0.00"
      aria-describedby="current_conversion_value"
      value={resultFormStore.current_conversion_value}
      onChange={(e) => {
        setResultFormStore('current_conversion_value', e.target.value);
      }}
    />
  );
}

export default CurrentConversionValueInput;