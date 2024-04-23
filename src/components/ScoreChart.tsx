import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';

const BASE_DASH_ARRAY = 352;

const getClassStrokeByScore = (scoreLocal: number) => {
  if (scoreLocal < 0.5) {
    return 'stroke--slow';
  }
  if (scoreLocal < 0.9) {
    return 'stroke--avg';
  }
  return 'stroke--fast';
};

export const getClassByScore = (scoreLocal: number) => {
  if (scoreLocal < 0.5) {
    return 'is--slow';
  }
  if (scoreLocal < 0.9) {
    return 'is--avg';
  }
  return 'is--fast';
};

const ScoreChart = (props: { score?: number; variant: 'large' | 'small' }): JSX.Element => {
  const dashArray = createMemo(() => Math.floor(BASE_DASH_ARRAY * (props.score || 0)));
  const scoreIndex = createMemo(() => Math.round((props.score || 0) * 100));

  return (
    <div class={`${getClassByScore(props.score || 0)} absolute rounded-xl`}>
      <div class="w-12 h-12 rounded-full flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          height='60px' // Directly setting height attribute
          width='60px'  // Directly setting width attribute
          stroke-linecap="round" // Converted to camelCase
        >
          <circle
            r="56"
            cx="60"
            cy="60"
            class={`svg-circle ${getClassStrokeByScore(props.score || 0)}`}
          />
          <circle
            class={`svg-circle__arc ${getClassStrokeByScore(props.score || 0)}`}
            transform="rotate(-90 60 60)"
            r="56"
            cx="60"
            cy="60"
            stroke-dasharray={`${dashArray()}, 352`} // Directly setting stroke-dasharray attribute in camelCase
          />
        </svg>
      </div>
      <p class="font-bold absolute top-1/4 w-full text-center">{scoreIndex()}</p>
    </div>
  );
};

export default ScoreChart;
