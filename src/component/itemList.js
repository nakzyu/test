import React, { useEffect, useState } from "react";
import { getItemList } from "../actions/item";
import { useDispatch, useSelector } from "react-redux";
import "./itemList.css";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [selected, setSelected] = useState();

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  useEffect(() => {
    items.length && setSelected(items);
  });

  const handleSelected = (category) => {
    console.log(category, selected, items);

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
      <ul>{}</ul>
    </div>
  );
};

export default ItemList;
