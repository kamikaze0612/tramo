type ErrorProps = {
  error: string;
};

function Error({ error }: ErrorProps) {
  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 bg-transparent text-xl md:mt-12">
      <p className="text-xl font-bold lg:text-3xl">Oops!</p>
      <p className="text-base lg:text-xl">
        It looks like there has an error 💥
      </p>
      <span className="text-sm lg:text-base">{error}</span>
    </div>
  );
}

export default Error;
