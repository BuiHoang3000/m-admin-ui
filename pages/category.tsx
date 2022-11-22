import Category from '../component/pages/category';
import { CategoryContextProvider } from '../component/pages/category/CategoryProvider';

function NewCategoryPage() {
  return (
    <CategoryContextProvider>
      <Category />
    </CategoryContextProvider>
  );
}

export default NewCategoryPage;
