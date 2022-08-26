import { useContext, useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import NotificationContext from '../../store/notification-context';
import classes from './comments.module.css';
 

function Comments(props) {
  const {notification, showNotification} = useContext(NotificationContext);

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [didComment, setDidComment] = useState(false);

  useEffect(() => {
    if(!notification && didComment){
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        return response.json().then(data => {
          throw new Error('Something went wrong!')
        })
      })
      .then(data => { 
        setComments(data.comments);
        setIsLoading(false);
      }).catch(error => {         
        setIsLoading(false);
        setComments(null);
      }).finally(() => setDidComment(false));
    }
  }, [notification, didComment]);
   
  function toggleCommentsHandler() {
    if(!showComments){
      setShowComments(true);
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        return response.json().then(data => {
          throw new Error('Something went wrong!')
        })
      })
      .then(data => { 
        setComments(data.comments);
        setIsLoading(false);
      }).catch(error => {         
        setIsLoading(false);
        setComments(null);
      });
    }else{
      setShowComments(false);
    }
  } 

  function addCommentHandler(commentData) {
    // send data to API
    showNotification({
      title: 'Pending',
      message: 'Commenting...',
      status: 'pending'
    });
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
    .then(response => {
      if(response.ok){
        return response.json();
      }
      return response.json().then(data => {
        throw new Error('Something went wrong!')
      })
    })
    .then(data => {        
        showNotification({
          title: 'Success',
          message: 'You commented!',
          status: 'success'
        });
    }).catch(error => {
      showNotification({
        title: 'Error',
        message: error.message || 'Your comment was not submitted!',
        status: 'error'
      })
    }).finally(() => setDidComment(true));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {!isLoading && showComments && <CommentList comments={comments}/>}
      {isLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
