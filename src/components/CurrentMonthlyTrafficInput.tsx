import { createEffect } from "solid-js";
import { resultFormStore, setResultFormStore } from "../stores/resultFormStore";

type Props = {
  initialValue: string;
};

const CurrentMonthlyTrafficInput = (props: Props) => {
  createEffect(() => {
    if (props.initialValue) {
      setResultFormStore("current_monthly_traffic", props.initialValue);
    }
  });
  return (
    <input
      type="text"
      placeholder="0"
      value={resultFormStore.current_monthly_traffic || props.initialValue}
      name="current_monthly_traffic"
      id="current_monthly_traffic"
      class="focus:ring-contrast block w-full rounded-xl border-0 bg-white/10 py-1.5 text-white placeholder-white/60 shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
      onChange={(e) => {
        setResultFormStore("current_monthly_traffic", e.currentTarget.value);
      }}
    />
  );
}

export default CurrentMonthlyTrafficInput;