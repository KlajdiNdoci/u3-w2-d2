import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = props => {
  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: String(props.asin),
  });
  const sendComment = async e => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTNlZGMwMzRmZjAwMTQwM2Y0ZDYiLCJpYXQiOjE2OTQ1MjMzMzQsImV4cCI6MTY5NTczMjkzNH0.ODo21wybCYFBh1-EMKvm6SnMtr2I2O0cYGeVtgqhxOo",
        },
      });
      if (response.ok) {
        alert("Comment was sent!");
        setComment({
          comment: "",
          rate: 1,
          elementId: String(props.asin),
        });
      } else {
        console.log("error");
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setComment({ ...comment, elementId: props.asin });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment.comment}
            onChange={e => setComment({ ...comment, comment: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={e => setComment({ ...comment, rate: e.target.value })}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
