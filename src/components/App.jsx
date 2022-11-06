import { useState, useEffect } from 'react';
import { AppStyled } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImages, normalizeData } from './Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loadrer } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [findValue, setFindValue] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lageImg, setLageImg] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const changeTotalPages = totalImages => {
      const newTotalPages = Math.ceil(totalImages / 12);
      if (newTotalPages === totalPages) {
        return;
      }
      return setTotalPages(newTotalPages);
    };
    changeTotalPages(totalImages);
  }, [totalImages, totalPages]);
  useEffect(() => {
    if (totalPages === currentPage) {
      Notify.info('This is the last page');
    }
  }, [totalPages, currentPage]);
  useEffect(() => {
    if (!findValue) {
      return;
    }
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await searchImages(findValue, currentPage);
        setTotalImages(response.total);
        if (response.hits.length < 1) {
          Notify.failure("We couldn't find any images with that value");
        }
        const newData = normalizeData(response.hits);
        setData(prevData => [...prevData, ...newData]);
      } catch (error) {
        Notify.failure(
          'An error occurred while downloading. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [findValue, currentPage]);

  const changeFindValue = query => {
    if (findValue === query) {
      return;
    }
    setData([]);
    setFindValue(query);
    setCurrentPage(1);
  };

  const onClickLoadMore = () => {
    return setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };
  const updateLageImage = () => setLageImg('');
  const onImageClick = modalImg => setLageImg(modalImg);
  const closeModal = e => {
    if (e.target === e.currentTarget) {
      return updateLageImage();
    }
  };

  return (
    <AppStyled>
      <Searchbar changeInputValue={changeFindValue}></Searchbar>
      {data.length > 0 && (
        <ImageGallery data={data} onImageClick={onImageClick} />
      )}
      {data.length > 0 && !isLoading && totalPages !== currentPage && (
        <Button addPage={onClickLoadMore} />
      )}
      {isLoading && <Loadrer />}
      {lageImg && (
        <Modal
          img={lageImg}
          closeModal={closeModal}
          updateLageImage={updateLageImage}
        />
      )}
    </AppStyled>
  );
};
