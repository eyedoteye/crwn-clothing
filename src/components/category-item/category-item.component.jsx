import {
  CategoryItemContainer,
  BackgroundImage,
  CategoryItemBodyContainer,
} from "./category-item.styles";

import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`shop/${title}`);
  };

  return (
    <CategoryItemContainer onClick={onClickHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryItemBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </CategoryItemBodyContainer>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
