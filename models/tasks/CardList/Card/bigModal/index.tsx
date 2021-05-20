import React, {useState} from 'react'
import styles from './bigModal.module.scss'
import HeaderMenu from '../../../../header/headerMenu'
import HeaderStylized from '../../../../header/headerStylized'

export default function bigModal() {
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState ([])

    const commentHandler = (e) => {
        setComment(e.target.value)
    }

    const sendHandler = () => {
        setCommentList(commentList.concat([comment]))
        setComment('')
    }

    return (
        <div 
            className={styles.modal}
            onClick={(e) => {e.stopPropagation()}}
        >
            <HeaderMenu modal={true} />
            <HeaderStylized modal={true} />
            <div className={styles.modal__info}>
                <div>
                    <div>Assign</div>
                    <button>+ Add a property</button>
                </div>
                <div>
                    {
                        commentList.map((commentItem,i) => {
                            return (<div key={`${commentItem}`+`${i}`}>{commentItem}</div>)
                        })
                    }
                    <textarea 
                        placeholder="add a comment..."
                        value={comment}
                        onChange={commentHandler}
                    ></textarea>
                    <button onClick={sendHandler}>send</button>
                </div>
            </div>
        </div>
    )
}
