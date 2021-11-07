import { useRef, useState } from 'react';




const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <h1>Homepage</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            type="feedback"
            id="feedback"
            rows="5"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>load Feedback</button>
      <ul>
          {feedbackItems.map(item => <li key={item.id}>{item.text} :::___::: {item.email}</li>)}
      </ul>
    </div>
  );
};

export default HomePage;
