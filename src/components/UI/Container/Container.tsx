import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './Container.module.scss';

interface IProps extends PropsWithChildren {
  className?: string;
}

const Container: FC<IProps> = ({ children, className = '' }) => {
  return (
    <div className={cn(styles['container'], styles[className])}>{children}</div>
  );
};

export { Container };
