import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import React from "react";
import "./dashboard.css";

const NoteCard = ({ title, content, date, tags, isPinned, onPin, onEdit, onDelete }) => {
  return (
    <div className={`note-card ${isPinned ? "pinned" : ""}`}>
      <div className="note-card-header">
        <div>
          <h6 className="note-title">{title}</h6>
          <span className="note-date">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`pin-icon ${isPinned ? "active" : ""}`}
          onClick={onPin}
        />
      </div>

      <p className="note-content">
        {content?.length > 100 ? content.slice(0, 100) + "..." : content}
      </p>

      {tags?.length > 0 && (
        <div className="note-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-actions">
        <MdCreate onClick={onEdit} />
        <MdDelete onClick={onDelete} />
      </div>
    </div>
  );
};

export default NoteCard;
