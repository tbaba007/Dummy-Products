import errorPageStyles from "./error.module.scss";

const ErrorPage = () => {
  return (
    <div className={errorPageStyles.container}>
      An error occured while trying to load the requested page.
    </div>
  );
};

export default ErrorPage;
