import { Scrollbar } from 'react-scrollbars-custom';

const ScrollbarComponent = ({
  children,
  noDefaultStyles = true,
  vTrackStyle,
  scrollTop,
  ...props
}) => {
  return (
    <Scrollbar
      noDefaultStyles={noDefaultStyles}
      momentum={true}
      permanentTracks={true}
      scrollTop={scrollTop}
      renderer={(props) => {
        const { elementRef, ...restProps } = props;
        return (
          <span {...restProps} ref={elementRef} className='scrollbar-holder' />
        );
      }}
      wrapperProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <span
              {...restProps}
              ref={elementRef}
              className='scrollbar-wrapper'
            />
          );
        },
      }}
      scrollerProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <span
              {...restProps}
              ref={elementRef}
              className='scrollbar-scroller'
            />
          );
        },
      }}
      contentProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className='Content' />;
        },
      }}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;
          return (
            <span
              {...restProps}
              style={{ ...style, ...vTrackStyle }}
              ref={elementRef}
              className='trackY'
            />
          );
        },
      }}
      thumbYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className='thumbY' />;
        },
      }}
      {...props}
    >
      {children}
    </Scrollbar>
  );
};

export default ScrollbarComponent;
