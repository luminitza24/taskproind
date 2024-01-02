import { Comment } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="loading-container">
      <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div>
  );
};
export default Loading;
