function WelcomeContent() {
  return (
    <div className="h-screen flex items-center justify-center bg-primary w-full">
      <div className="flex flex-col gap-3">
        <img src="./event.svg" alt="logo" className="w-96 h-96" />
        <h1 className="text-orange-500 text-5xl font-bold">
          Golbahar Event Platform
        </h1>
        <p className="text-gray-400 text-sm">
          Welcome to Golbahar Event Platform, where your events shine!.
        </p>
      </div>
    </div>
  );
}

export default WelcomeContent;
