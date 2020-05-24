import React, { useEffect, useState, Fragment } from "react";
import { getItemList } from "../actions/item";
import { useDispatch, useSelector } from "react-redux";
import "./itemList.css";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [selected, setSelected] = useState([]);

  // tabs에서 active되는 tab
  const [active, setActive] = useState("all");

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  useEffect(() => {
    setSelected(items);
  }, [items]);

  // tab을 눌렀을때 반환할 상품 배열을 결정하는 함수
  const handleSelected = (category) => {
    // category에 따라 배열을 filter 한 후 반환
    const filterdArray = (param) => {
      return items.slice().filter((item) => item.category === param);
    };

    switch (category) {
      case "all":
        setActive("all");
        return setSelected(items);
      case "vegan":
        setActive("vegan");
        return setSelected(filterdArray(`["비건"]`));
      case "seafood":
        setActive("seafood");
        return setSelected(filterdArray(`["해산물"]`));
      case "meat":
        setActive("meat");
        return setSelected(filterdArray(`["육류"]`));
      case "dairy":
        setActive("dairy");
        return setSelected(filterdArray(`["유제품"]`));
      default:
        setActive("all");
        return setSelected(items);
    }
  };

  return (
    <Fragment>
      <h1>2. Salads 🥗🥗🥗</h1>
      <div className="item-list-container">
        {items.length && (
          <div className="taps">
            <button
              className={`tap ${active === "all" ? "active" : ""}`}
              onClick={() => handleSelected("all")}
            >
              전체보기
            </button>
            <button
              className={`tap ${active === "vegan" ? "active" : ""}`}
              onClick={() => handleSelected("vegan")}
            >
              비건
            </button>
            <button
              className={`tap ${active === "seafood" ? "active" : ""}`}
              onClick={() => handleSelected("seafood")}
            >
              해산물
            </button>
            <button
              className={`tap ${active === "meat" ? "active" : ""}`}
              onClick={() => handleSelected("meat")}
            >
              육류
            </button>
            <button
              className={`tap ${active === "dairy" ? "active" : ""}`}
              onClick={() => handleSelected("dairy")}
            >
              유제품
            </button>
          </div>
        )}

        <ul className="item-list">
          {selected.length &&
            selected.map((item) => (
              <li key={item.id} className="item">
                <div className="item-image">
                  {item.isSold && ( //isSold가 true일때 soldMsg를 출력
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
                  {item.balloon.length > 1 && !item.isSold ? (
                    <strong className="item-balloon">{item.balloon}</strong>
                  ) : null}
                  <div className="item-size">
                    {item.summaryDetail.split(" ").slice(1).join(" ")}
                  </div>
                  <div className="item-tags">
                    {item.tags.map((tag, index) => (
                      <div
                        className={`item-tag  ${
                          index === 0 ? "first-tag" : "" // first tag 일때 class추가
                        }`}
                      >
                        {tag.name.split(" ").join("")}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ItemList;
