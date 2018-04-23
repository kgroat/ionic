
import * as React from 'react';
import '@ionic/core';

export interface EventHandler<T extends HTMLElement> {
  (event: CustomEvent & { currentTarget: T }): void;
}

abstract class IonBase<Props extends HTMLAttributes & object, TElement extends HTMLElement> extends React.Component<Props> {
  element: TElement;

  protected readonly unsafeProps: string[] = [];

  protected readonly eventProps: {
    [P in keyof Partial<Props>]: string;
  } = {} as any;

  protected readonly staticProps: {
    [P in keyof Partial<Props>]: Props[P];
  } = {} as any;

  protected readonly refProps: React.Props<TElement> & Props = Object.assign({}, this.props, {
    ref: this.setRef,
  });

  protected get cleanProps () {
    const propsCopy: Partial<Props> = { ...this.props }
    return propsCopy
  }

  componentDidUpdate (prevProps: Props) {
    this.applyProps(this.props, prevProps);
  }

  private setRef = (ref: TElement) => {
    this.element = ref;
    this.applyProps(this.props);
  };

  private applyProps = (props: Props, prevProps?: Props) => {
    if (this.element) {
      this.applyEventProps(props, prevProps)
      this.applyUnsafeProps(props, prevProps)
      this.applyStaticProps()
    }
  }

  private applyEventProps = (props: Props, prevProps?: Props) => {
    Object.keys(this.eventProps).forEach((propName: string) => {
      const eventName = this.eventProps[propName]
      // There was a previous event listener registered
      if (prevProps && prevProps[propName] && props[propName] !== prevProps[propName]) {
        // unregister it and register the new one
        this.element.removeEventListener(eventName, prevProps[propName]);
        this.element.addEventListener(eventName, props[propName]);
      } else if (props[propName]) {
        // There was not a previous event listener, but there is a current event listener
        this.element.addEventListener(eventName, props[propName]);
      }
    });
  };

  private applyUnsafeProps = (props: Props, prevProps?: Props) => {
    this.unsafeProps.forEach((propName: string) => {
      if (prevProps && prevProps[propName] === props[propName]) {
        return;
      }

      this.element[propName] = props[propName];
    });
  };

  private applyStaticProps = () => {
    Object.keys(this.staticProps).forEach((propName: string) => {
      this.element[propName] = this.staticProps[propName];
    });
  };
}

export default IonBase;
