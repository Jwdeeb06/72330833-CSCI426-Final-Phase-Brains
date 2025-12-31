import React from "react";

const CourseItem = ({ image, name, price, category }) => {
  return (
    <div className="menuItem">
      <div
        className="menuImage"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="menuInfo">
        <h2>{name}</h2>
        <p className="category">{category}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  );
};

export default CourseItem;
