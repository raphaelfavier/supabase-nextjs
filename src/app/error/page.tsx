import ActionButton from "@/templates/actionButton/actionButton";
import Link from "next/link";

interface ErrorPageProps {
  searchParams: {
    type: string;
  };
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const { type } = await searchParams;
  const knownErrors = [
    "login-failed",
    "invalid_magiclink",
    "magiclink",
    "recovery",
    "missing_token",
  ];

  return (
    <div className="flex flex-col items-center w-full gap-4 p-6">
      <h1>Ooops!</h1>
      {type === "login-failed" && (
        <strong>Login was not successfull, sorry.</strong>
      )}
      {type === "invalid_magiclink" && (
        <strong>
          The magic link was invalid. Maybe it expired? Please request a new
          one.
        </strong>
      )}

      {type === "magiclink" && (
        <strong>
          Could not send a magic link. Maybe you had a typo in your E-Mail?
        </strong>
      )}

      {type === "recovery" && (
        <strong>
          Could not request new password. Maybe you had a typo in your E-Mail?
        </strong>
      )}

      {type === "missing_token" && (
        <strong>
          The magic link was invalid. Maybe it expired? Please request a new
          one.
        </strong>
      )}

      {!knownErrors.includes(type) && (
        <strong>
          Something went wrong. Please try again or contact support.
        </strong>
      )}

      <Link role="button" href="/">
        <ActionButton>Go back.</ActionButton>
      </Link>
    </div>
  );
}
