import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { funSearch } from './FunSearch/FunSearch';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  // state = {
  //   array: [],
  //   page: 1,
  //   searchValue: '',
  //   loader: false,
  //   modal: false,
  //   tags: null,
  //   img: null,
  //   error: null,
  //   loadMore: false,
  // };

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
    // this.setState({
    //   searchValue: inputValue,
    //   array: [],
    //   page: 1,
    // });
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    if (
      // this.state.searchValue !== prevState.searchValue ||
      // this.state.page !== prevState.page
      true
    ) {
      setLoader(true);
      try {
        const data = funSearch(searchValue, page);
        console.log('11');
        if (data.hits.length === 0) {
          window.alert(
            'Sorry, nothing was found for your query. Look for something else.'
          );
          return;
        }

        setArray(prevState => [...prevState, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));

        // this.setState(prevState => {
        //   return {
        //     array: [...prevState.array, ...data.hits],
        //     loadMore: this.state.page < Math.ceil(data.totalHits / 12),
        //   };
        // });
      } catch (error) {
        setError(error);
        // this.setState({ error });
      } finally {
        setLoader(false);
        // this.setState({ loader: false });
      }
    }
  }, [searchValue, page]);

  // async  componentDidUpdate(_, prevState) {
  // if (
  //   this.state.searchValue !== prevState.searchValue ||
  //   this.state.page !== prevState.page
  // ) {
  //   this.setState({
  //     loader: true,
  //   });
  //   try {
  //     const data = await funSearch(this.state.searchValue, this.state.page);

  //     if (data.hits.length === 0) {
  //       window.alert(
  //         'Sorry, nothing was found for your query. Look for something else.'
  //       );
  //       return;
  //     }

  //     this.setState(prevState => {
  //       return {
  //         array: [...prevState.array, ...data.hits],
  //         loadMore: this.state.page < Math.ceil(data.totalHits / 12),
  //       };
  //     });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ loader: false });
  //   }
  // }
  // }

  const openModal = (tags, img) => {
    setModal(true);
    setTags(tags);
    setImg(img);
    // this.setState({
    //   modal: true,
    //   tags: tags,
    //   img: img,
    // });
  };

  const closeModal = () => {
    setModal(false);
    setTags(null);
    setImg(null);
    // this.setState({
    //   modal: false,
    //   tags: null,
    //   img: null,
    // });
  };

  const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
    // this.setState(prevState => {
    //   return {
    //     page: prevState.page + 1,
    //   };
    // });
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
