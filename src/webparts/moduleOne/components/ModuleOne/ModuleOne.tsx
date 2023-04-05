import * as React from 'react';
import styles from '../ModuleOne/ModuleOne.module.scss';
import { IModuleOneProps } from '../ModuleOne/IModuleOneProps';
import { Header } from '../Header/Header';

export default class ModuleOne extends React.Component<IModuleOneProps, {}> {
  public render(): React.ReactElement<IModuleOneProps> {
    const {
      hasTeamsContext,
      context,
      description,
      title
    } = this.props;

    return (
      <section className={`${styles.moduleOne} ${hasTeamsContext ? styles.teams : ''}`}>
        <Header context={context} description={description} title={title} />
      </section>
    );
  }
}
