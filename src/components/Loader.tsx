type Props = {
  width: number;
};

const Loader = (props: Props) => {
  return (
    <>
      <style>
        {`
          .loader-inner {
            width: ${props.width}%;
          }
        `}
      </style>
      <div class="w-full rounded-full h-2.5 bg-contrast/50 animate-pulse max-w-full">
        <div class="bg-contrast h-2.5 rounded-full loader-inner max-w-[calc(100%-1rem)]"></div>
      </div>
    </>
  );
};

export default Loader;