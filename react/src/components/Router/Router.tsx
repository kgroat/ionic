
import * as React from 'react';
import Base from '../_Base';

class IonRouter extends Base<JSXElements.IonRouterAttributes, HTMLIonRouterElement> {
  eventProps = {
    onIonRouteChanged: 'ionRouteChanged',
  };

  render () {
    return (
      <ion-router {...this.refProps} />
    );
  }
}

export default IonRouter;
