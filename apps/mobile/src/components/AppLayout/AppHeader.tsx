import { Link } from "react-router-dom";
import { FallbackPath } from "../../router";

function AppHeader() {
  return (
    <header className="app-header">
      <nav className="h-full">
        <p>
          <Link to={FallbackPath}>Play</Link>
        </p>
        <p>
          <Link className="red" to="/home">
            Home
          </Link>
        </p>
        <p>
          <Link to="/posts">Posts</Link>
        </p>
        <p>
          <Link to="/albums">Albums</Link>
        </p>
        <p>
          <Link to="/forms">Forms</Link>
        </p>
        <p>
          <Link to="/motion">Motion</Link>
        </p>
      </nav>
    </header>
  );
}

AppHeader.displayName = "AppHeader";
export default AppHeader;
