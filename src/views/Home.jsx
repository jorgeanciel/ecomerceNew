import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../store/slice/userSlice';
import { Form, useLoaderData } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { loadCartProducts } from '../store/slice/cartSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.user);
  const { products, categories, category, title } = useLoaderData();

  const [categoryValue, setCategoryValue] = useState(category ?? null);
  const [nameValue, setNameValue] = useState(title ?? '');

  const handleChangeName = (e) => {
    setNameValue(e.target.value);
  };

  useEffect(() => {
    if (isLogged) dispatch(loadCartProducts(token));
  }, []);

  useEffect(() => {
    setCategoryValue(category);
  }, [category]);

  useEffect(() => {
    setNameValue(title);
  }, [title]);

  return (
    <div>
      <section className="pt-5">
        <Form>
          <fieldset className="flex justify-center gap-14 pt-5 mb-8">
            <legend className="text-center pt-2 text-red-500 text-xl font-semibold">
              Categories
            </legend>
            {categories.map((category) => (
              <div key={category.id}>
                <label
                  htmlFor={category.id + category.name}
                  className={
                    categoryValue?.id === category.id
                      ? 'text-orange-400 font-semibold'
                      : 'text-lg hover:text-orange-400'
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {category.name}
                </label>
                <input
                  type="radio"
                  name="category"
                  id={category.id + category.name}
                  className=""
                  checked={categoryValue?.id === category.id}
                  onChange={() => {
                    setCategoryValue(category);
                  }}
                  value={category.id}
                  style={{ display: 'none' }}
                />
              </div>
            ))}
          </fieldset>
          <div className="flex justify-center ">
            <input
              type="search"
              name="title"
              placeholder="   Type Product Name"
              value={nameValue}
              onChange={handleChangeName}
              className="border border-black w-2/4 rounded"
            />
            <button
              type="submit"
              className="text-3xl flex flex-row justify-center items-center bg-orange-500 rounded-xl p-2"
            >
              <i class="bx bx-search text-white "></i>
            </button>
          </div>
        </Form>
      </section>

      <section>
        <ul className="flex justify-evenly flex-wrap p-8 m-10 border-2 border-black gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        {!products.length && <p>no product matches the search parameter"{nameValue}"</p>}
      </section>
    </div>
  );
};

export default Home;
