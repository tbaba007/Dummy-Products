import { Link } from "react-router-dom";
import NotFoundStyles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={NotFoundStyles.container}>
      The requested page not found.  <Link to="/"> Click here to go back to home</Link> 
    </div>
  );
};

export default NotFound;
