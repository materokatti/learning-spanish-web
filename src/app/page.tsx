import Image from "next/image";
import Quiz from "../components/Quiz.client";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-around p-24'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-center'>Quiz time</h1>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Quiz />
      </div>
    </main>
  );
}
