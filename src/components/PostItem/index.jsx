import './styles.css';

export const PostItem = (props) => {

    const { user, text, img } = props;

    return (
        <div className='post'>
            <div className='postUser'>
                <h1>{user}</h1>
            </div>
            <div className='postContent'>
                <p>{text}</p>
                <img src={img} alt="post-image" />
            </div>
        </div>
    )
}