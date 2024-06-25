import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import ProductButton from "../../../components/ui/Button";
import ErrorPage from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import { languageContext } from "../../../context/LanguageContext";
import useApi from "../../../hooks/useApi";
import { urls } from "../../../utils/urls";
import { productProps } from "../ProductList/types";
import ProductReviewStyles from "./ProductReview.module.scss";

document.title = "Product Review";

const ProductReview = () => {
  const selectedLanguage = useContext(languageContext);
  const { t, i18n } = useTranslation();

  const params = useParams();
  const { productId } = params;
  const { data, error, loading } = useApi(`${urls.productById}${productId}`);
  const [product, setProduct] = useState<Partial<productProps>>({});
  useEffect(() => {
    if (data) {
      i18n.changeLanguage(selectedLanguage?.language);

      const productData: productProps = data as productProps;
      setProduct(productData);
    }
  }, [data, i18n, selectedLanguage?.language]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const ProductReviews = ({ reviews }: Partial<productProps>) => {
    if (!Array.isArray(reviews)) {
      return null;
    }

    return (
      <div>
        {reviews.map((review) => (
          <section key={review.date.concat(review.comment)}>
            <p
              className={ProductReviewStyles.container__productData__reviews}
              key={review.comment}
            >
              {t("productReview.comment")}: {review.comment}
            </p>
            <p
              className={ProductReviewStyles.container__productData__reviews}
              key={review.rating}
            >
              {t("productReview.rating")} :{review.rating}
            </p>
          </section>
        ))}
      </div>
    );
  };
  const { title, rating, category, description } = product;
  return (
    <>
      <h4 className={ProductReviewStyles.container__productDataHeader}>
        {t(`${title}`)}
      </h4>
      <div className={ProductReviewStyles.container}>
        <section className={ProductReviewStyles.container__productData}>
          <label> {t("productReview.productCategory")}:</label>
          <label>{category}</label>
        </section>
        <section className={ProductReviewStyles.container__productData}>
          <label> {t("productReview.description")}:</label>
          <label>{description}</label>
        </section>
        <section className={ProductReviewStyles.container__productData}>
          <label> {t("productReview.rating")}:</label>
          <label>{rating}</label>
        </section>
        <section className={ProductReviewStyles.container__productData}>
          <label> {t("productReview.reviews")}:</label>
          {ProductReviews(product)}
        </section>

        <section>
          <Link to="/">
            <ProductButton text={t("productReview.goBack")} />
          </Link>
        </section>
      </div>
    </>
  );
};

export default ProductReview;
