import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-center'>Quiz time</h1>
      </div>
      <div className='flex flex-col items-center justify-center mt-20'>
        <Link href={"/quiz"}>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Quiz
          </button>
        </Link>
      </div>
    </main>
  );
}
