import styles from './Notification.module.css'

export const Notification = (props) => {
  const variants = {
    success: styles.submitSuccessfullMsg,
    fail: styles.submitErrorMsg,
    error: styles.errorMsg
  }

  return (
    <div className={`${variants[props.variant]} ${props.hidden && styles.msgHidden}`}>{props.msg}</div>
  )
}