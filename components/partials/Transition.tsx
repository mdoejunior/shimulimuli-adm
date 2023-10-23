import React, { useRef, useEffect, useContext } from 'react';
// @ts-ignore
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

type TransitionContextType = {
  parent: {
    appear?: boolean;
    isInitialRender: boolean;
    show?: boolean;
  };
};

const TransitionContext = React.createContext<TransitionContextType>({
  parent: { isInitialRender: true },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

type CSSTransitionProps = {
  className?:string
  show?: boolean;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
  appear?: boolean;
  unmountOnExit?: boolean;
  tag?: string;
  children?: React.ReactNode;
};

function CSSTransition({
                         show,
                         enter = '',
                         enterStart = '',
                         enterEnd = '',
                         leave = '',
                         leaveStart = '',
                         leaveEnd = '',
                         appear,
                         unmountOnExit,
                         tag = 'div',
                         children,
                         ...rest
                       }: CSSTransitionProps) {
  const enterClasses = enter.split(' ').filter((s) => s.length);
  const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
  const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
  const leaveClasses = leave.split(' ').filter((s) => s.length);
  const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
  const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
  const removeFromDom = unmountOnExit;

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes);
  }

  const nodeRef = useRef<HTMLElement | null>(null);
  const Component:string | undefined = tag;

  // @ts-ignore
  // @ts-ignore
  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done: (this: HTMLElement, ev: TransitionEvent) => any) => {
        nodeRef.current?.addEventListener('transitionend', done, false);
      }}
      onEnter={() => {
        if (!removeFromDom) { // @ts-ignore
          nodeRef.current?.style.display = null;
        }
        addClasses(nodeRef.current!, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(nodeRef.current!, enterStartClasses);
        addClasses(nodeRef.current!, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current!, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current!, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current!, leaveStartClasses);
        addClasses(nodeRef.current!, leaveEndClasses);
      }}
      onExited={() => {
        removeClasses(nodeRef.current!, [...leaveEndClasses, ...leaveClasses]);
        if (!removeFromDom) { // @ts-ignore
          nodeRef.current?.style.display = 'none';
        }
      }}
    >
    </ReactCSSTransition>
  );
}

type TransitionProps = CSSTransitionProps & {
  show?: boolean;
  appear?: boolean;
};

function Transition({ show, appear, ...rest }: TransitionProps) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition appear={parent.appear || !parent.isInitialRender} show={parent.show} {...rest} />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
