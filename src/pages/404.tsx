import { Link } from "react-router";
import { Button } from "../components/ui";

export default function Error() {
  return (
    <div className="Pic404">
      <h1>Oops! Page Not Found</h1>
      <img src="/src/assets/The-404-Page.jpg" alt="" />

      <div className="home-btn">
        <Button className="go-home" type="submit">
          <Link className="link-a" to="/">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
