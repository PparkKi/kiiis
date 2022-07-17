import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import Avatar from "@mui/material/Avatar";

const CommPostComment = ({ cafeId, postId }) => {
  const [postComment, setPostComment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = await query(
        collection(dbService, "cafe", cafeId, "posts", postId, "comment"),
        orderBy("createdDate", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const commentArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostComment(commentArray);
      });
    };
    fetchData();
  }, [postId]);

  return (
    <ul>
      {postComment.map((comment, index) => {
        return (
          <li key={index} className="flex align-items-stretch mb-1">
            <div className="width-40px height-40px min-width-40px min-height-40px mr-1">
              {comment.creatorPhoto === null ? (
                <Avatar className="width-100p height-100p border-radius-50p" />
              ) : (
                <img
                  src={comment.creatorPhoto}
                  alt={comment.creatorNickName}
                  className="width-100p height-100p border-radius-50p"
                />
              )}
            </div>

            <div>
              <div className="mb-05">
                <h3 className="inline-flex text-bold mr-05">
                  {comment.creatorNickName}
                </h3>
                <span className="lh-12">{comment.postComment}</span>
              </div>

              <span className="text-s07 text-color">{comment.createdAt}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommPostComment;
