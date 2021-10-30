import Link from 'next/link'

import style from './button.module.css'

function Button (props){
    return (
      <Link href={props.link}>
        <a className={style.btn}>{props.children}</a>
      </Link>
    );
}

export default Button