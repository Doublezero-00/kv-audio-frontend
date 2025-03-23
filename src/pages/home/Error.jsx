import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1>404 error : Page not found</h1>
      <Link to="/" className="bg-red-400 p-1">
        Back to homepage
      </Link>
    </div>
  );
}
