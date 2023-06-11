import {
  CategoryItemContainer,
  BackgroundImage,
  CategoryItemBodyContainer,
} from "./category-item.styles";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryItemBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </CategoryItemBodyContainer>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
