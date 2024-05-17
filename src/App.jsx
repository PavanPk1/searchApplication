import "./App.css";
import { CiSearch } from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { FaCircleArrowRight } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";

const url = "https://api.unsplash.com/search/photos";
const images_per_page = 24;
const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setPageCount] = useState(0);
  const [pageNo, setPage] = useState(1);
  // console.log(pageNo);
  const [loading, setLoading] = useState(false);

  const getImages = useCallback(async () => {
    setLoading(true);
    try {
      if (searchInput.current.value) {
        const response = await axios.get(
          `${url}?query=${
            searchInput.current.value
          }&page=${pageNo}&per_page=${images_per_page}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        // console.log(response);
        setImages(response.data.results);
        setPageCount(response.data.total_pages);
        // console.log(response.data.results[0].urls.small);
      }
    } catch (error) {
      console.log(`Error Occured While Api Call : ${error}`);
    } finally {
      setLoading(false);
    }
  },[pageNo]);

  
  useEffect(() => {
    getImages();
  }, [getImages, pageNo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getImages();
    setPage(1);
  };

  const handleSearch = (quickInput) => {
    searchInput.current.value = quickInput;
    getImages();
    setPage(1);
  };
  const renderLoader = () => (
    <div className="loader-container">
      <TailSpin color="#0284C7" height={50} width={50} />
    </div>
  );

  return (
    <div className="mainContainer">
      <h1 className="heading">Image Search Web App</h1>
      <div className="searchContainer">
        <Form onSubmit={handleSubmit}>
          <input
            type="search"
            className="searchInput"
            placeholder="Type Something to search..."
            ref={searchInput}
          />
        </Form>
        <CiSearch size={20} />
      </div>
      <div className="quick-actions">
        <button
          onClick={() => handleSearch("mountain")}
          className="quick-action"
        >
          Mountain
        </button>
        <button
          onClick={() => handleSearch("flowers")}
          className="quick-action"
        >
          Flowers
        </button>
        <button
          onClick={() => handleSearch("Beaches")}
          className="quick-action"
        >
          Beaches
        </button>
        <button onClick={() => handleSearch("bikes")} className="quick-action">
          Bikes
        </button>
        <button onClick={() => handleSearch("Cities")} className="quick-action">
          Cities
        </button>
      </div>
      <div className="imagesContainer">
        {loading ? (
          <div className="loading">{renderLoader()}</div>
        ) : images.length > 0 ? (
          images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className="fetch-image"
              title={image.alt_description}
            />
          ))
        ) : (
          <p className="para">
            No images found. Try searching for something else.
          </p>
        )}
      </div>
      {images.length > 0 && (
        <div className="pagination">
          <div>
            <p className="pageNo">
              Page No : <span>{pageNo}</span>
            </p>
          </div>
          <div className="pagination-btns">
            <button
              onClick={() => {
                if (pageNo > 1) {
                  setPage(pageNo - 1);
                  getImages();
                }
              }}
              className="page-btn"
            >
              <TiArrowBack />
              Previous
            </button>
            <button
              onClick={() => {
                if (pageNo < totalPages) {
                  setPage(pageNo + 1);
                  getImages();
                }
              }}
              className="page-btn"
            >
              Next <FaCircleArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
