
import * as React from 'react';
import { FrameworkDelegate } from '@ionic/core'
import { Delegate } from '../../react-framework-delegate';
import Base, { EventHandler } from '../_Base';

export { FrameworkDelegate }

export type Props<P> = JSXElements.IonNavAttributes & {
  onIonNavChanged: EventHandler<HTMLIonNavElement>;
  root?: React.ComponentType<P>;
  rootParams?: P;
}

class IonNav<P = {}> extends Base<Props<P>, HTMLIonNavElement> {

  unsafeProps = [
    'root',
    'rootParams',
  ];

  eventProps = {
    onIonNavChanged: 'ionNavChanged',
  };

  staticProps = {
    delegate: Delegate,
  };

  render () {
    return (
      <ion-nav {...this.refProps} />
    );
  }
}

export default IonNav;
