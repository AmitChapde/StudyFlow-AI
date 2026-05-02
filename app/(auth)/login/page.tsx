  import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <LoginForm />

      <footer className="text-center text-xs text-gray-500">
        <p>Built by Amit Chapde</p>
        <div className="mt-1 flex justify-center gap-3">
          <a
            href="https://github.com/AmitChapde"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href="http://www.linkedin.com/in/amit-chapde"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
