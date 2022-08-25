import classes from './comment-list.module.css';

function CommentList(props) {
  const { comments } = props;

  if(!comments){
    return <p>Loading...</p>
  }

  if(comments.length === 0){
    return <p>No comments added!</p>
  }

  return (
    <ul className={classes.comments}>
      {comments.map(comment => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))} 
    </ul>
  );
}

export default CommentList;
