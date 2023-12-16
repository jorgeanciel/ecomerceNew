import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductId } from '../services/getProductId';
import { getAllProducts } from '../services/getAllProducts';
import ProductCard from '../components/common/ProductCard';
import ProductDesciption from '../components/productDetail/ProductDesciption';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const productData = await getProductId(id);
      const categoryId = productData.categoryId;

      const relatedProductsData = await getAllProducts({
        categoryId,
      });

      const relatedProductsWithoutTargetProduct = relatedProductsData.filter(
        (product) => product.id !== productData.id,
      );

      setProduct(productData);
      setRelatedProducts(relatedProductsWithoutTargetProduct);
    };
    loadData();
  }, [id]);
  return (
    <div>
      {!product ? <p>Loading Product...</p> : <ProductDesciption product={product} />}

      <aside className="mt-8">
        <h2 className="text-xl font-semibold text-orange-400 text-center">
          Discover similar items
        </h2>
        <ul className="flex justify-center gap-10 flex-wrap pt-10">
          {relatedProducts.map((product) => (
            <li key={product.id} className="max-w-2xl">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default ProductDetail;
