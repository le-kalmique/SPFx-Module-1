import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import {
  Log
} from '@microsoft/sp-core-library';
import styles from './Header.module.scss';
// import * as strings from 'ModuleOneWebPartStrings';

interface IProps {
  context: WebPartContext;
  description: string;
  title: string;
}

export const Header: React.FC<IProps> = (props) => {

  React.useEffect(() => {
    Log.error("ModuleOneWebPart", new Error("ERROR message"), props.context.serviceScope);
    Log.warn("ModuleOneWebPart", "WARNING message", props.context.serviceScope);
  }, []);

  return (
    <div>
      <h1>{props.title}</h1>
      <p className={styles.paragraph}>{props.description}</p>
    </div>
  );
};