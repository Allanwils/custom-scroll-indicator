import { useState, useEffect } from "react";
import "./scroll.css";
function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollLevel, setScrollLevel] = useState(0);

  const fetchData = async (getUrl) => {
    try {
      setLoading(true);
      const resp = await fetch(getUrl);
      const data = await resp.json();

      console.log(data);

      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);
  function handlescrollLevel() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const scrolledLevel =
      document.body.scrollTop || document.documentElement.scrollTop;
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollLevel((scrolledLevel / totalHeight) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handlescrollLevel);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

  console.log(data, scrollLevel);
  if (errorMessage) {
    return <div>Error !{errorMessage}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
      
      <div className="scroll-progress-tracking-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollLevel}%` }}
        ></div>
      </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((dataItem) => <p key={dataItem.id}>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
}

export default ScrollIndicator;
