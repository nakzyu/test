import React, { useEffect, useState } from "react";
import { getItemList } from "../actions/item";
import { useDispatch, useSelector } from "react-redux";
import "./itemList.css";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  useEffect(() => {
    setSelected(items);
  }, [items]);

  const handleSelected = (category) => {
    const filterdArray = (param) => {
      const result = items.slice().filter((item) => item.category === param);
      return result;
    };

    switch (category) {
      case "all":
        return setSelected(items);
      case "vegan":
        return setSelected(filterdArray(`["비건"]`));
      case "seafood":
        return setSelected(filterdArray(`["해산물"]`));
      case "meat":
        return setSelected(filterdArray(`["육류"]`));
      case "dairy":
        return setSelected(filterdArray(`["유제품"]`));
      default:
        return setSelected(items);
    }
  };

  return (
    <div>
      {items.length && (
        <div className="taps">
          <button className="tap" onClick={() => handleSelected("all")}>
            전체보기
          </button>
          <button className="tap" onClick={() => handleSelected("vegan")}>
            비건
          </button>
          <button className="tap" onClick={() => handleSelected("seafood")}>
            해산물
          </button>
          <button className="tap" onClick={() => handleSelected("meat")}>
            육류
          </button>
          <button className="tap" onClick={() => handleSelected("dairy")}>
            유제품
          </button>
        </div>
      )}

      <ul className="item-list">
        {selected.length &&
          selected.map((item) => (
            <li key={item.id} className="item">
              <div className="item-image">
                {item.isSold && (
                  <div className="item-soldMsg">{item.soldMsg}</div>
                )}
                <img
                  className={`${item.isSold ? "is-sold" : ""}`}
                  src={item.imgUrl}
                  alt="food"
                />
              </div>
              <div className="item-content">
                <div className="item-name">
                  <strong>{item.name}</strong>
                </div>
                <div className="item-summary">{item.summary}</div>
                <div
                  className={`item-price ${
                    item.isSold ? "item-soldMsg-text" : ""
                  }`}
                >
                  <strong>{item.details[0].price}</strong>
                  <div className="won">원~</div>
                </div>
                {item.balloon.length > 1 ? (
                  <strong className="item-balloon">{item.balloon}</strong>
                ) : null}
                <div className="item-size">
                  {item.summaryDetail.split(" ").slice(1).join(" ")}
                </div>
                <div className="item-tags">
                  {item.tags.map((tag, index) => (
                    <div
                      className={`item-tag  ${index === 0 ? "first-tag" : ""}`}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ItemList;
