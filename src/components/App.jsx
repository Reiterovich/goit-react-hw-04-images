import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { funSearch } from './FunSearch/FunSearch';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [array, setArray] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState(null);
  const [img, setImg] = useState(null);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  const onSubmit = inputValue => {
    setSearchValue(inputValue);
    setArray([]);
    setPage(1);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setLoader(true);

    try {
      async function f() {
        const data = await funSearch(searchValue, page);

        if (data.hits.length === 0) {
          window.alert(
            'Sorry, nothing was found for your query. Look for something else.'
          );

          return;
        }

        setArray(prevState => [...prevState, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      }
      f();
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoader(false);
    }
  }, [searchValue, page]);

  const openModal = (tags, img) => {
    setModal(true);
    setTags(tags);
    setImg(img);
  };

  const closeModal = () => {
    setModal(false);
    setTags(null);
    setImg(null);
  };

  const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />

      {modal && <Modal closeModal={closeModal} tags={tags} modalImg={img} />}

      <ImageGallery>
        <ImageGalleryItem openModal={openModal} arrayPhotos={array} />
      </ImageGallery>

      <Loader loader={loader} />

      {error && <p>Something went wrong ....</p>}

      {loadMore && !loader && array.length > 0 && (
        <Button loadMoreBtn={loadMoreBtn} />
      )}
    </div>
  );
};
