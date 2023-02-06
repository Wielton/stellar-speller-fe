import React from 'react';

import styles from './button.scss';

export interface buttonProps {
  prop?: string;
}

export function button({prop = 'default value'}: buttonProps) {
  return <div className={styles.button}>button {prop}</div>;
}
