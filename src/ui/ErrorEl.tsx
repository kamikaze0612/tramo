import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

function ErrorEl() {
  const error = useRouteError();

  const navigate = useNavigate();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.log(error);
    errorMessage = "Unknown error";
  }

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-400">
        <i>{errorMessage}</i>
      </p>
      <button onClick={() => navigate(-1)}></button>
    </div>
  );
}

export default ErrorEl;
