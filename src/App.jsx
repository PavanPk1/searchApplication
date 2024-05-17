import "./App.css";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
const App = () => {
  const searchInput = useRef(null);
  return (
    <div className="mainContainer">
      <h1 className="heading">Image Search Web App</h1>
      <div className="searchContainer">
        <Form>
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
        <button className="quick-action">Mountain</button>
        <button className="quick-action">Flowers</button>
        <button className="quick-action">Beaches</button>
        <button className="quick-action">Bikes</button>
        <button className="quick-action">Cities</button>
      </div>
    </div>
  );
};
export default App;
