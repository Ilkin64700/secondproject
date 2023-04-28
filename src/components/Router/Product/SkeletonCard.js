import { Skeleton } from "antd";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card p-2 m-2" style={{ width: "16.75rem" }}>
      <Skeleton.Image className="card-img-top"  active style={{marginLeft:"20px",marginTop:"20px", width:"100px", height:"100px"}} />
      <div className="card-body">
        <h5 className="card-title">
          <Skeleton active paragraph={false} title={{ width: "50%" }} />
          <Skeleton active paragraph={false} title={{ width: "50%" }} />
        </h5>
        <a href="#" className="btn">
          <Skeleton.Button active/>
        </a>
      </div>
    </div>
  );
};

export default SkeletonCard;
