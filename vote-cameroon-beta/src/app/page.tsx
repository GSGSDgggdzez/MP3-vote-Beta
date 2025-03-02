

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-[80px]">
      <main className="">
        <div className="text-center">
          <div className="mb-8">
            <div className="text-4xl font-bold mb-4">Your Vote, Your Voice, Your Cameroon</div>
            <div className="text-xl text-gray-600">
              Empower young Cameroonians to participate in the democratic process
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="flex gap-8 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">230</span>
              <span className="text-gray-600">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">230</span>
              <span className="text-gray-600">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">230</span>
              <span className="text-gray-600">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">230</span>
              <span className="text-gray-600">Seconds</span>
            </div>
          </div>
          <div className="mt-4 text-lg text-gray-700">
            Until presidential election day
          </div>
        </div>
      </main>
    </div>
  );
}
