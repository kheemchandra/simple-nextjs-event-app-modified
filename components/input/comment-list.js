import classes from './comment-list.module.css';

function CommentList(props) {
  const { comments } = props; 

  if(comments.length === 0){
    return <p>No comments!</p>
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
