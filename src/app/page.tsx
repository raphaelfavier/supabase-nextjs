import User from "@/components/user/user";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-center text-4xl max-w-2xl font-bold">
        Next.js + Supabase
      </h1>
      <p className="text-center text-2xl max-w-2xl text-gray-600">
        Boilerplate for NextJs and Supabase with Typescript and TailwindCSS
      </p>
      <User />
    </div>
  );
}
