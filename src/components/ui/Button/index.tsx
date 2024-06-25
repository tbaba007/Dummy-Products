import { buttonProps } from "./types"
import buttonStyles from './Button.module.scss'

const ProductButton=({onClick,text}:buttonProps)=>{
    return <button className={buttonStyles.container} onClick={onClick}>{text}</button>
}

export default ProductButton;