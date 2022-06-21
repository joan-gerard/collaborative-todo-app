import React from "react";

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p>{list.listName}</p>
              <p>{list.listDesc}</p>
            </div>
            <a className="btn btn-secondary" href={`/project/${list.id}`}>
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
