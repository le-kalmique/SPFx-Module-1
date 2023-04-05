import * as React from 'react';
import styles from '../ModuleOne/ModuleOne.module.scss';
import { IModuleOneProps } from '../ModuleOne/IModuleOneProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ModuleOne extends React.Component<IModuleOneProps, {}> {
  public render(): React.ReactElement<IModuleOneProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.moduleOne} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../../assets/welcome-dark.png') : require('../../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h2>UPDATED VERSION</h2>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>

          </ul>
        </div>
      </section>
    );
  }
}
