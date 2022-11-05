import { Component } from 'react';
import { AppStyled } from './AppStyled';
import { Searchbar } from './Searchbar/Searchbar';
import { searchImages } from './Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loadrer } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    findValue: '',
    data: [],
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    lageImg: '',
  };
  setFindValue = query => {
    if (this.state.findValue === query) {
      return;
    }
    this.setState({
      data: [],
      findValue: query,
      currentPage: 1,
    });
  };

  togleIsLoading = () =>
    this.setState({
      isLoading: !this.state.isLoading,
    });
  setTotalPages = totalImages => {
    const newTotalPages = Math.ceil(totalImages / 12);
    if (newTotalPages === this.state.totalPages) {
      return;
    }
    return this.setState({ totalPages: newTotalPages });
  };
  makeStatesData = response =>
    response.map(item => {
      return {
        id: item.id,
        webformatURL: item.webformatURL,
        tags: item.tags,
        largeImageURL: item.largeImageURL,
      };
    });

  getData = async () => {
    this.togleIsLoading();
    try {
      const response = await searchImages(
        this.state.findValue,
        this.state.currentPage
      );
      this.setTotalPages(response.total);
      if (response.hits.length < 1) {
        Notify.failure("We couldn't find any images with that value");
      }
      const newData = this.makeStatesData(response.hits);
      this.setState(prevState => {
        return {
          data: [...prevState.data, ...newData],
        };
      });
    } catch (error) {
      Notify.failure('An error occurred while downloading. Please try again.');
    } finally {
      this.togleIsLoading();
    }
  };
  onClickLoadMore = () => {
    return this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };
  updateLageImage = () =>
    this.setState({
      lageImg: '',
    });
  onImageClick = modalImg => {
    return this.setState({
      lageImg: modalImg,
    });
  };
  closeModal = e => {
    if (e.target === e.currentTarget) {
      return this.updateLageImage();
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.findValue === this.state.findValue &&
      prevState.currentPage === this.state.currentPage
    ) {
      return;
    }

    this.getData();

    if (this.state.totalPages === this.state.currentPage) {
      Notify.info('This is the last page');
    }
  }

  render() {
    const { data, isLoading, lageImg, totalPages, currentPage } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.setFindValue}></Searchbar>
        {data.length > 0 && (
          <ImageGallery data={data} onImageClick={this.onImageClick} />
        )}
        {data.length > 0 && !isLoading && totalPages !== currentPage && (
          <Button addPage={this.onClickLoadMore} />
        )}
        {isLoading && <Loadrer />}
        {lageImg && (
          <Modal
            img={lageImg}
            closeModal={this.closeModal}
            updateLageImage={this.updateLageImage}
          />
        )}
      </AppStyled>
    );
  }
}
